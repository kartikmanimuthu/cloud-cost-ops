const workerFunction: WorkerFunction<any, any> = async (job) => {
  // do something
  // mock promise to stimulate async task
  const data = await new Promise<boolean>((resolve, _) => {
    setTimeout(() => {
      resolve(true);
    }, 5000);
  });

  return {
    success: true,
    data,
  };
};

const queueConfig: IQueueOptions = {
  defaultJobOptions: {
    priority: 1,
    delay: 3000,
    attempts: 3,
  },
};

const workerConfig: IWorkerOptions = {
  concurrency: 5,
  lockDuration: 30000,
  lockRenewTime: 1000,
};

const cronConfig: ICronOptions = {
  repeat: {
    pattern: "*/5 * * * *", // This cron expression represents every 5 minutes
  },
  cronPayload: {
    message: "Email Cron Triggered!",
  },
};

export const worker: ICronWorker = {
  name: "db-backup-cron",
  workerConfig,
  queueConfig,
  cronConfig,
  workerFunction,
};
