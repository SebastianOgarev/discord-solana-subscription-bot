const { Connection, PublicKey } = require('@solana/web3.js');

class PaymentService {
  constructor(connection, multisigAddress) {
    this.connection = connection;
    this.multisigAddress = new PublicKey(multisigAddress);
  }

  async verifyPayment(signature) {
    try {
      const tx = await this.connection.getTransaction(signature);
      
      // Verify transaction details
      if (!tx) return false;
      
      // Check if payment is to correct multisig
      const receiverAddress = tx.transaction.message.accountKeys[1].toString();
      if (receiverAddress !== this.multisigAddress.toString()) return false;
      
      // Verify amount
      const amount = tx.meta.postBalances[1] - tx.meta.preBalances[1];
      return amount >= SUBSCRIPTION_PRICE * LAMPORTS_PER_SOL;
    } catch (error) {
      console.error('Payment verification failed:', error);
      return false;
    }
  }
} 