const queueConf: IQueueOptions = {
    defaultJobOptions: {
        priority: 1,
        delay: 8000,
        attempts: 2,
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
        // do something 
        // mock promise to stimulate async task 
        const data = await new Promise<boolean>((resolve, _) => {
            setTimeout(() => {
                resolve(true);
                // _("custom error");
            }, 5000)
        })

        return {
            success: true,
            data
        }
    } catch (error) {
        throw error;
    }
}



const webhookHandler: WebhookHandler = async (dispatchJob, data) => {
    // do some payload transformtion.
    // add the job to the queue 
    // and call next to complete the webhook execution.
    try {
        await dispatchJob(`webhook-slack-${new Date().toISOString()}`, data)
        return {
            success: true,
            data: data
        }
    } catch (error) {
        throw error;
    }

};


export const worker: IWebhookWorker = {
    name: 'webhook-slack',
    webhookRoute: '/webhook-slack',
    webhookHandler,
    workerConf,
    queueConf,
    workerFunc,
};
