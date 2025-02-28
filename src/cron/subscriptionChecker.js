const cron = require('node-cron');
const subscriptionService = new SubscriptionService();

// Run every day at midnight
cron.schedule('0 0 * * *', async () => {
  await subscriptionService.checkExpiredSubscriptions(client, process.env.SUBSCRIBER_ROLE_ID);
}); 