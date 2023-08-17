const queueConf: IQueueOptions = {

    defaultJobOptions: {
        priority: 1,
        delay: 3000,
        attempts: 3,
        // ... other default job options
    },
    // limiter: {
    //     max: 1000,
    //     duration: 1000,
    //     groupKey: 'slackGroup',
    // },
    // settings: {
    //     lockDuration: 30000,
    //     stalledInterval: 5000,
    //     maxStalledCount: 3,
    //     guardInterval: 5000,
    //     retryProcessDelay: 5000,
    //     drainDelay: 5,
    //     backoffStrategies: {
    //         // Define custom backoff strategies if needed
    //     },
    // },
    // ... other queue options
};

const workerConf: IWorkerOptions = {
    concurrency: 5,
    lockDuration: 30000,
    lockRenewTime: 1000,
    // settings: {
    //     lockDuration: 30000,
    //     stalledInterval: 5000,
    //     maxStalledCount: 3,
    //     guardInterval: 5000,
    //     retryProcessDelay: 5000,
    //     drainDelay: 5,
    //     backoffStrategies: {
    //         // Define custom backoff strategies if needed
    //     },
    // },
    // limiter: {
    //     max: 1000,
    //     duration: 1000,
    //     groupKey: 'slackGroup',
    // },
    // ... other worker options
};

const workerFunc: WorkerFunction<any, any> = async (job) => {
    try {
        const data = await new Promise<boolean>((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Some error occurred!'));
                // resolve(true);
            }, 5000);
        });

        return {
            success: true,
            data
        };
    } catch (error) {
        throw error;
    }
};

export const worker: IWorker = {
    name: 'slack-job',
    workerConf,
    queueConf,
    workerFunc,
};


// // Handle completed jobs
// worker.on('completed', (job) => {
//     console.log(`Job ${job.id} completed!`);
//   });
  
//   // Handle failed jobs
//   worker.on('failed', (job, err) => {
//     console.error(`Job ${job.id} failed with error: ${err.message}`);
//   });
  