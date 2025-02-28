const SubscriptionService = require('../services/subscriptionService');
const subscriptionService = new SubscriptionService();

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand() || interaction.commandName !== 'verify') return;
  
  const signature = interaction.options.getString('signature');
  const paymentService = new PaymentService(connection, multisigWallet);
  
  if (await paymentService.verifyPayment(signature)) {
    // Add subscription to file
    await subscriptionService.addSubscription({
      discordId: interaction.user.id,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString(),
      transactionSignature: signature,
      active: true
    });
    
    // Add role
    const member = interaction.member;
    await member.roles.add(process.env.SUBSCRIBER_ROLE_ID);
    
    await interaction.reply({ content: 'Subscription activated!', ephemeral: true });
  }
}); 