const workerFunction: WorkerFunction<any, any> = async (job) => {
    try {
        const data = await new Promise<boolean>((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Some error occurred!'));
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




const queueConfig: IQueueOptions = {
    defaultJobOptions: {
        priority: 1,
        delay: 3000,
        attempts: 3,
        // ... other default job options
    },
};

const workerConfig: IWorkerOptions = {
    concurrency: 5,
    lockDuration: 30000,
    lockRenewTime: 1000,
};

export const worker: IWorker = {
    name: 'email-job',
    workerConfig,
    queueConfig,
    workerFunction,
};
