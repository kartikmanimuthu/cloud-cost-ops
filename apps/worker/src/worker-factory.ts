import { Queue, Worker, QueueEvents } from 'bullmq';

export function WorkerFactory(worker: IWorker | ICronWorker) {
    const {
        name,
        workerFunc,
        connectionConf,
        workerConf = {},
        queueConf = {}
    } = worker;

    const queue = new Queue(name, {
        connection: connectionConf,
        ...queueConf
    });

    const workerInstance = new Worker(name, workerFunc, {
        connection: connectionConf,
        ...workerConf
    });

    const events = new QueueEvents(name, {
        connection: connectionConf
    });

    // If worker is of type ICronWorker, add a repeating job with the cron configuration
    if ('cronConf' in worker) {
        const { cronConf } = worker;
        queue.add(name, cronConf.cronPayload, {
            ...queueConf,
            ...cronConf
        });
    }

    // ... [Rest of the code remains unchanged]


    // Helper function to fetch job details and print job name
    const logJobDetails = async (jobId: string, event: string, additionalArgs?: string) => {
        const job = await queue.getJob(jobId);
        if (job) {
            console.log(`JobId : ${job.id} —— JobName : "${job.name}" —— Event : "${event}" ${additionalArgs ? `—— ${additionalArgs}` : ''}`);
        }
    };

    events.on('completed', async ({ jobId }) => {
        await logJobDetails(jobId, "completed");
    });

    events.on('failed', async ({ jobId, failedReason }) => {
        await logJobDetails(jobId, "failed", `—— error : "${failedReason}"`);
    });

    events.on('waiting', async ({ jobId }) => {
        await logJobDetails(jobId, "waiting");
    });

    events.on('active', async ({ jobId }) => {
        await logJobDetails(jobId, "active");
    });

    events.on('stalled', async ({ jobId }) => {
        await logJobDetails(jobId, "stalled");
    });

    events.on('progress', async ({ jobId, data: progress }) => {
        await logJobDetails(jobId, "progress", `—— progress : "${progress}"`);
    });

    events.on('paused', () => {
        console.log(`Queue "${name}" is paused.`);
    });

    events.on('resumed', async ({ }, jobId) => {
        await logJobDetails(jobId, "resumed"); // check
    });

    events.on('cleaned', async ({ count }, jobId) => {
        await logJobDetails(jobId, "cleaned", `—— count : "${count}"`);
    });

    events.on('drained', () => {
        console.log(`Queue "${name}" is drained.`);
    });

    events.on('removed', async ({ jobId }) => {
        await logJobDetails(jobId, "removed");
    });

    return { queue, worker, events };


}



