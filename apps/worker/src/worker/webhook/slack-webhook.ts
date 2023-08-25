const workerFunction: WorkerFunction<any, any> = async (job) => {
  try {
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
  } catch (error) {
    throw error;
  }
};

const webhookHandler: WebhookHandler = async (dispatchJob, data) => {
  // do some payload transformtion.
  // add the job to the queue
  // and call next to complete the webhook execution.
  try {
    await dispatchJob(`slack-webhook-${new Date().toISOString()}`, data);
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

const queueConfig: IQueueOptions = {
  defaultJobOptions: {
    priority: 1,
    delay: 8000,
    attempts: 2,
    // ... other default job options
  },
};

const workerConfig: IWorkerOptions = {
  concurrency: 5,
  lockDuration: 30000,
  lockRenewTime: 1000,
};

export const worker: IWebhookWorker = {
  name: "slack-webhook",
  webhookRoute: "/slack",
  webhookHandler,
  queueConfig,
  workerConfig,
  workerFunction,
};
