const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: String,
  discordId: String,
  startDate: Date,
  endDate: Date,
  transactionSignature: String,
  active: Boolean
});

module.exports = mongoose.model('Subscription', subscriptionSchema); 