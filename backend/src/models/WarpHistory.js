const mongoose = require('mongoose');

const warpHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  bannerType: {
    type: String,
    required: true,
    enum: ['beginner', 'char', 'weap', 'standard']
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
    required: true
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

module.exports = mongoose.model('WarpHistory', warpHistorySchema);
