import {
  Job,
  WorkerOptions,
  QueueOptions,
  Queue,
  ConnectionOptions,
  BaseJobOptions,
  JobsOptions,
} from "bullmq";

declare global {
  type IWorkerOptions = WorkerOptions;
  type IQueueOptions = QueueOptions;
  type ICronOptions = BaseJobOptions & { cronPayload: any };

  type IWorker = {
    name: string;
    workerConfig: IWorkerOptions;
    queueConfig: IQueueOptions;
    workerFunction: WorkerFunction;
    connectionConfig?: ConnectionOptions;
  };

  type ICronWorker = {
    name: string;
    workerConfig: IWorkerOptions;
    queueConfig: IQueueOptions;
    cronConfig: ICronOptions;
    workerFunction: WorkerFunction;
    connectionConfig?: ConnectionOptions;
  };

  type IWebhookWorker = {
    name: string;
    webhookRoute: string;
    webhookHandler: WebhookHandler;
    workerConfig: IWorkerOptions;
    queueConfig: IQueueOptions;
    workerFunction: WorkerFunction;
    connectionConfig?: ConnectionOptions;
  };

  type WebhookHandler<T = any> = (
    dispatchJob: (name: string, data: any) => Promise<Job>,
    data: T
  ) => Promise<WebhookHandlerResponse> | WebhookHandlerResponse;

  type WebhookHandlerResponse = {
    success: true;
    message?: string;
    data?: any;
  };

  type WorkerFunction<T = any, K = any> = (
    job: Job<T>
  ) => Promise<{ success: boolean; data: K }>;

  type IWorkerPool = {
    queueName: string;
    queue: Queue;
    jobOptions: IQueueOptions;
  };

  type JobPayload<T = any> = {
    queueName: string;
    data: T;
    jobName?: string;
    jobId?: string;
  };
}
