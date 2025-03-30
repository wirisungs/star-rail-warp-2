const mongoose = require('mongoose');
const generateId = require('../utils/idGenerator');

const warpSchema = new mongoose.Schema({
  warpId: {
    type: String,
    unique: true,
    default: () => generateId('WID')
  },
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  bannerType: {
    type: String,
    required: true,
    enum: ['character', 'weapon']
  },
  bannerVersion: {
    type: String,
    required: true
  },
  itemId: {
    type: String,
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  itemType: {
    type: String,
    required: true,
    enum: ['character', 'weapon']
  },
  rarity: {
    type: Number,
    required: true,
    enum: [3, 4, 5]
  },
  pity: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
warpSchema.index({ userId: 1, timestamp: -1 });
warpSchema.index({ warpId: 1 });

module.exports = mongoose.model('Warp', warpSchema);
