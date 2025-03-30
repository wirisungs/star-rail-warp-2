const mongoose = require('mongoose');
const generateId = require('../utils/idGenerator');

const inventorySchema = new mongoose.Schema({
  inventoryId: {
    type: String,
    unique: true,
    default: () => generateId('IID')
  },
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  items: [{
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
    quantity: {
      type: Number,
      default: 1
    },
    obtainedAt: {
      type: Date,
      default: Date.now
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
inventorySchema.index({ userId: 1 });
inventorySchema.index({ inventoryId: 1 });

module.exports = mongoose.model('Inventory', inventorySchema);
