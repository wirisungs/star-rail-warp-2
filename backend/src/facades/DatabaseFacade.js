const mongoose = require('mongoose');
const WarpStats = require('../models/WarpStats');
const WarpHistory = require('../models/WarpHistory');
const Inventory = require('../models/Inventory');

class DatabaseFacade {
  constructor() {
    this.mongoose = mongoose;
  }

  async connect() {
    try {
      await this.mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/HSRWarpSimulator');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  // Warp Stats operations
  async getWarpStats(userId, bannerType) {
    return await WarpStats.findOne({ userId, bannerType });
  }

  async updateWarpStats(userId, bannerType, stats) {
    return await WarpStats.findOneAndUpdate(
      { userId, bannerType },
      { ...stats, lastUpdate: new Date() },
      { new: true, upsert: true }
    );
  }

  // Warp History operations
  async getWarpHistory(userId, limit = 10) {
    return await WarpHistory.find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit);
  }

  async addWarpHistory(history) {
    return await WarpHistory.create(history);
  }

  // Inventory operations
  async getInventory(userId) {
    return await Inventory.findOne({ userId });
  }

  async updateInventory(userId, item) {
    return await Inventory.findOneAndUpdate(
      { userId },
      {
        $push: {
          items: {
            itemId: item.itemId,
            itemName: item.itemName,
            itemType: item.itemType,
            rarity: item.rarity,
            quantity: 1
          }
        }
      },
      { new: true, upsert: true }
    );
  }

  async updateItemQuantity(userId, itemId, quantity) {
    return await Inventory.findOneAndUpdate(
      { userId, 'items.itemId': itemId },
      { $inc: { 'items.$.quantity': quantity } },
      { new: true }
    );
  }

  // Transaction support
  async startTransaction() {
    const session = await this.mongoose.startSession();
    session.startTransaction();
    return session;
  }

  async commitTransaction(session) {
    await session.commitTransaction();
    session.endSession();
  }

  async abortTransaction(session) {
    await session.abortTransaction();
    session.endSession();
  }
}

module.exports = new DatabaseFacade();
