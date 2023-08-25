// Redis configuration
export const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  enableOfflineQueue: false,
  // Add other Redis options if needed
};
