import express from "express";
import { createBullBoard } from "bull-board";
import { BullMQAdapter } from "bull-board/bullMQAdapter";

/**
 * Initializes and starts the Bull UI dashboard.
 *
 * @param workerPool - Array of worker pool configurations.
 * @param port - Port on which the dashboard will run. Defaults to 3000.
 */
export function setupBullDashboard(
  workerPool: IWorkerPool[],
  port: Number = process.env.BULL_DASHBOARD_PORT as unknown as Number
) {
  const app = express();

  // Middleware for API key authentication
  app.use("/admin/queues", (req, res, next) => {
    next(); // comment out later to disable authencation.
    return;
    const apiKey = req.headers["x-api-key"];
    if (apiKey === process.env.API_KEY) {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  });

  // Add all queues from the workerPool to Bull Board
  const bullMQAdapters = workerPool.map((wp) => new BullMQAdapter(wp.queue));

  const { addQueue, removeQueue, setQueues, replaceQueues, router } =
    createBullBoard(bullMQAdapters);
  app.use("/admin/queues", router);

  // Start the Express server
  app.listen(port, () => {
    console.log(
      `📊 Bull Dashboard is running on http://localhost:${port}/admin/queues`
    );
  });
}
