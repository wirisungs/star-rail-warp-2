const mongoose = require('mongoose');

const warpStatsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  bannerType: {
    type: String,
    required: true,
    enum: ['beginner', 'char', 'weap', 'standard']
  },
  totalPulls: {
    type: Number,
    default: 0
  },
  singlePulls: {
    type: Number,
    default: 0
  },
  tenPulls: {
    type: Number,
    default: 0
  },
  totalJades: {
    type: Number,
    default: 0
  },
  pityFive: {
    type: Number,
    default: 0
  },
  pityFour: {
    type: Number,
    default: 0
  },
  guaranteedFive: {
    type: Boolean,
    default: false
  },
  guaranteedFour: {
    type: Boolean,
    default: false
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WarpStats', warpStatsSchema);
