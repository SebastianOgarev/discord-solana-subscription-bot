const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
    console.log('Welcome to the Discord Subscription Bot Setup!\n');
    
    const envPath = path.join(__dirname, '..', '.env');
    const subscriptionsPath = path.join(__dirname, '..', 'subscriptions.json');
    
    // Create initial subscriptions file if it doesn't exist
    if (!fs.existsSync(subscriptionsPath)) {
        fs.writeFileSync(subscriptionsPath, JSON.stringify([], null, 2));
    }

    const token = await question('Enter your Discord bot token: ');
    const guildId = await question('Enter your Discord server ID: ');
    const roleId = await question('Enter your subscriber role ID: ');
    const rpcUrl = await question('Enter your Solana RPC URL: ');
    const multisigAddress = await question('Enter your multisig wallet address: ');
    
    const envContent = `DISCORD_TOKEN=${token}
GUILD_ID=${guildId}
SUBSCRIBER_ROLE_ID=${roleId}
SOLANA_RPC_URL=${rpcUrl}
MULTISIG_ADDRESS=${multisigAddress}`;

    fs.writeFileSync(envPath, envContent);
    
    console.log('\nSetup complete! You can now run the bot with: node src/bot.js');
    rl.close();
}

setup().catch(console.error); 