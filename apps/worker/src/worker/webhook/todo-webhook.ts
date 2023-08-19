import { PrismaClient, Todo } from "database";

const client = new PrismaClient();


const workerFunction: WorkerFunction<Todo, any> = async ({ data: todoModel }) => {
    try {

        const resData = await client.todo.create({
            data: todoModel
        })

        return {
            success: true,
            data: resData
        }
    } catch (error) {
        throw error;
    }
}


const webhookHandler: WebhookHandler = async (dispatchJob, data) => {
    try {
        await dispatchJob(`todo-webhook-${new Date().getTime()}`, data);
        return {
            success: true,
            message: "webhook todo added to the queue",
            data: data
        }
    } catch (error) {
        throw error;
    }

};


const queueConfig: IQueueOptions = {
    defaultJobOptions: {
        priority: 1,
        delay: 8000,
        attempts: 3,
    },
};

const workerConfig: IWorkerOptions = {
    concurrency: 5,
    lockDuration: 30000,
    lockRenewTime: 1000,
};

export const worker: IWebhookWorker = {
    name: 'todo-webhook',
    webhookRoute: '/todo',
    webhookHandler,
    workerConfig,
    queueConfig,
    workerFunction,
};
