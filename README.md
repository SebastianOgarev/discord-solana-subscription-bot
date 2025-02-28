# Discord Subscription Bot with Solana Payments

A Discord bot that manages subscription-based roles using Solana payments. Members can subscribe by sending SOL payments and receive automatic role management.

## Features
- Automated subscription management through Discord commands
- Secure Solana payment verification
- Automatic role assignment and removal
- Daily checks for expired subscriptions
- File-based subscription tracking
- Easy setup process

## Prerequisites
- Node.js (v16.0.0 or higher)
- Discord Bot Token
- Discord Server with admin permissions
- Solana wallet address for receiving payments
- Solana RPC URL (from providers like Helius, QuickNode, or Alchemy)

## Installation

1. Clone the repository
2. Install dependencies
3. Run the setup script
4. Start the bot


## Setup Guide

### Discord Setup
1. Create a new Discord application at [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a bot for your application and copy the token
3. Invite the bot to your server with required permissions
4. Create a role for subscribers
5. Copy your server ID and subscriber role ID

### Solana Setup
1. Set up a Solana wallet to receive payments
2. Get a Solana RPC URL from a provider
3. Have these ready for the setup script

### Bot Setup
Run `npm run setup` and provide:
- Discord Bot Token
- Discord Server ID
- Subscriber Role ID
- Solana RPC URL
- Multisig/Wallet Address

## Commands

### For Users
- `/subscribe` - Get payment instructions for subscription
- `/verify <signature>` - Verify payment and activate subscription

### File Structure
project/
├── src/
│ ├── bot.js
│ ├── setup.js
│ ├── commands/
│ ├── services/
│ └── cron/
├── .env
└── subscriptions.json


## Configuration
The bot uses a `.env` file for configuration. Required variables:
- `DISCORD_TOKEN`: Your Discord bot token
- `GUILD_ID`: Your Discord server ID
- `SUBSCRIBER_ROLE_ID`: Role ID for subscribers
- `SOLANA_RPC_URL`: Your Solana RPC endpoint
- `MULTISIG_ADDRESS`: Wallet address for receiving payments

## Subscription Management
- Subscriptions are stored in `subscriptions.json`
- Roles are automatically managed
- Daily checks for expired subscriptions
- Automatic role removal upon expiration

## Troubleshooting
- Ensure all environment variables are set correctly
- Check bot has proper Discord permissions
- Verify Solana RPC endpoint is responsive
- Confirm wallet address is correct
- Check `subscriptions.json` file permissions

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Support
For support, please open an issue in the GitHub repository.

## Security
- Never share your `.env` file
- Regularly backup your `subscriptions.json`
- Keep your bot token secure
- Monitor Solana transactions regularly

## Disclaimer
This bot is provided as-is. Please ensure proper testing before using in a production environment.
