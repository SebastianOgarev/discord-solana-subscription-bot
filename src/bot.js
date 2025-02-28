require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { Connection, PublicKey } = require('@solana/web3.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ]
});

// Solana connection
const connection = new Connection('YOUR_RPC_URL');
const multisigWallet = new PublicKey('YOUR_MULTISIG_ADDRESS');

// Subscription price in SOL
const SUBSCRIPTION_PRICE = 1; // adjust as needed 