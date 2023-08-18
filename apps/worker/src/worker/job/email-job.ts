const queueConf: IQueueOptions = {
    defaultJobOptions: {
        priority: 1,
        delay: 3000,
        attempts: 3,
        // ... other default job options
    },
};

const workerConf: IWorkerOptions = {
    concurrency: 5,
    lockDuration: 30000,
    lockRenewTime: 1000,
};

const workerFunc: WorkerFunction<any, any> = async (job) => {
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

export const worker: IWorker = {
    name: 'email-job',
    workerConf,
    queueConf,
    workerFunc,
};
