import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import express, { Router } from 'express';

import { WorkerFactory } from "./worker-factory";
import * as workers from './worker';
import { setupBullDashboard } from './bullmq-dashboard';
import { redisConfig } from "./config";


const [workerPools, app, startListening] = initializeAllWorkers(workers as unknown as Array<IWorker | IWebhookWorker | ICronWorker>);
if (app) {
    startListening();  // Starts the server on port 3000
}

setupBullDashboard(workerPools);


// Type Guard for ICronWorker
function isCronWorker(worker: any): worker is ICronWorker {
    return 'cronConfig' in worker;
}

// Type Guard for IWebhookWorker
function isWebhookWorker(worker: any): worker is IWebhookWorker {
    return 'webhookRoute' in worker;
}

function initializeAllWorkers(workers: Array<IWorker | IWebhookWorker | ICronWorker>): [IWorkerPool[], express.Express | null, () => void] {
    const jobWorkers: IWorker[] = Object.values(workers).filter(worker => !isWebhookWorker(worker) && !isCronWorker(worker));
    const cronWorkers: ICronWorker[] = Object.values(workers).filter(isCronWorker);
    const webhookWorkers: IWebhookWorker[] = Object.values(workers).filter(isWebhookWorker);

    const workerPools: IWorkerPool[] = [];

    // Initialize Job Workers
    jobWorkers.forEach(w => {
        const { queue } = WorkerFactory({
            name: w.name,
            queueConfig: w.queueConfig,
            workerConfig: w.workerConfig,
            workerFunction: w.workerFunction,
            connectionConfig: redisConfig,
        });
        workerPools.push({
            queueName: w.name,
            queue,
            jobOptions: w.queueConfig,
        });
    });

    // Initialize Cron Workers
    cronWorkers.forEach(w => {
        const { queue } = WorkerFactory({
            name: w.name,
            queueConfig: w.queueConfig,
            workerConfig: w.workerConfig,
            workerFunction: w.workerFunction,
            cronConfig: w.cronConfig,
            connectionConfig: redisConfig,
        });
        workerPools.push({
            queueName: w.name,
            queue,
            jobOptions: w.queueConfig,
        });
    });

    // Check if there are any Webhook Workers
    if (webhookWorkers.length === 0) {
        return [workerPools, null, () => { }];
    }

    const app = express();
    const router = Router();

    // Middleware to parse JSON payloads
    app.use(express.json());

    // Initialize Webhook Workers
    webhookWorkers.forEach(w => {
        const { queue } = WorkerFactory({
            name: w.name,
            queueConfig: w.queueConfig,
            workerConfig: w.workerConfig,
            workerFunction: w.workerFunction,
            connectionConfig: redisConfig,
        });
        router.post(w.webhookRoute, async (req, res) => {
            try {
                const data = await w.webhookHandler(
                    (name: string, data: unknown) => queue.add(name, data, w.queueConfig.defaultJobOptions),
                    req.body
                );
                res.status(200).send(data);
            } catch (err) {
                res.status(500).send((err as Error).message);
            }
        });

        workerPools.push({
            queueName: w.name,
            queue,
            jobOptions: w.queueConfig,
        });
    });

    app.use('/webhook', router);

    const startListening = (port: number = process.env.WEBHOOK_PORT as unknown as number) => {
        app.listen(port, () => console.log(`🚀 BullMQ Webhook is running on port http://localhost:${port}/webhook/`));
    };

    return [workerPools, app, startListening];
}


export const dispatchJob = async <T = unknown>(job: JobPayload) => {
    console.log(`dispatchBulkJobs - Queue : ${job.queueName} JobName : ${job.jobName} | JobId: ${job.jobId} | payload : ${job.data}`);
    const { queue, jobOptions } = workerPools.find((q: IWorkerPool) => q.queueName === job.queueName) as IWorkerPool;
    return queue.add(job.jobName ? `${job.jobName}-${new Date().toISOString()}` : job.queueName, job.data, job.jobId ? { ...jobOptions.defaultJobOptions, ...{ jobId: job.jobId } } : jobOptions.defaultJobOptions);
};

export const dispatchBulkJobs = async <T = unknown>(jobs: JobPayload[]) => {
    const promises = jobs.map((job) => {
        console.log(`dispatchBulkJobs - Queue : ${job.queueName} JobName : ${job.jobName} | JobId: ${job.jobId} | payload : ${job.data}`);
        const { queue, jobOptions } = workerPools.find((q: IWorkerPool) => q.queueName === job.queueName) as IWorkerPool;
        return queue.add(job.jobName ? `${job.jobName}-${new Date().toISOString()}` : job.queueName, job.data, job.jobId ? { ...jobOptions.defaultJobOptions, ...{ jobId: job.jobId } } : jobOptions.defaultJobOptions);
    });

    return Promise.all(promises);
};

