const fs = require('fs');
const path = require('path');

class SubscriptionService {
  constructor() {
    this.filePath = path.join(__dirname, '../../subscriptions.json');
    this.ensureFile();
  }

  ensureFile() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }
  }

  async loadSubscriptions() {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data);
  }

  async saveSubscriptions(subscriptions) {
    fs.writeFileSync(this.filePath, JSON.stringify(subscriptions, null, 2));
  }

  async checkSubscription(discordId) {
    const subscriptions = await this.loadSubscriptions();
    return subscriptions.some(sub => 
      sub.discordId === discordId && 
      sub.active && 
      new Date(sub.endDate) > new Date()
    );
  }

  async addSubscription(subscriptionData) {
    const subscriptions = await this.loadSubscriptions();
    subscriptions.push(subscriptionData);
    await this.saveSubscriptions(subscriptions);
  }

  async checkExpiredSubscriptions(client, roleId) {
    const subscriptions = await this.loadSubscriptions();
    const now = new Date();
    
    const updated = subscriptions.map(sub => {
      if (sub.active && new Date(sub.endDate) < now) {
        this.removeRole(client, sub.discordId, roleId);
        return { ...sub, active: false };
      }
      return sub;
    });

    await this.saveSubscriptions(updated);
  }

  async removeRole(client, discordId, roleId) {
    try {
      const guild = client.guilds.cache.get(process.env.GUILD_ID);
      const member = await guild.members.fetch(discordId);
      if (member) {
        await member.roles.remove(roleId);
      }
    } catch (error) {
      console.error('Error removing role:', error);
    }
  }
}

module.exports = SubscriptionService; 