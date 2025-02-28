client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand() || interaction.commandName !== 'subscribe') return;
  
  // Generate a payment instruction with unique reference
  const paymentInstructions = `Send ${SUBSCRIPTION_PRICE} SOL to ${multisigWallet.toString()}`;
  await interaction.reply({
    content: paymentInstructions,
    ephemeral: true
  });
}); 