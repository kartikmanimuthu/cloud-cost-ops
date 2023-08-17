const queueConf: IQueueOptions = {
    defaultJobOptions: {
        priority: 1,
        delay: 3000,
        attempts: 3,
    },
};

const workerConf: IWorkerOptions = {
    concurrency: 5,
    lockDuration: 30000,
    lockRenewTime: 1000,
};

const cronConf: ICronOptions = {
    repeat: {
        pattern: '*/2 * * * *',  // This cron expression represents every 5 minutes
    },
    cronPayload: {
        message: "cron trigged"
    }
}

const workerFunc: WorkerFunction<any, any> = async (job) => {
    // do something 

    console.log("data : ", job.data);

    // mock promise to stimulate async task 
    const data = await new Promise<boolean>((resolve, _) => {
        setTimeout(() => {
            resolve(true);
        }, 5000)
    })

    return {
        success: true,
        data
    }
}


export const worker: ICronWorker = {
    name: 'email-cron-job',
    workerConf,
    queueConf,
    cronConf,
    workerFunc,
};
