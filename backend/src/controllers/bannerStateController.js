const WarpStats = require('../models/WarpStats');

// Get banner state
exports.getBannerState = async (req, res) => {
  try {
    const { bannerType } = req.params;
    const stats = await WarpStats.findOne({
      userId: req.user.userId,
      bannerType
    });

    if (!stats) {
      return res.json({
        pityFive: 0,
        pityFour: 0,
        guaranteeFive: false,
        guaranteeFour: false
      });
    }

    res.json({
      pityFive: stats.pityFive || 0,
      pityFour: stats.pityFour || 0,
      guaranteeFive: stats.guaranteed || false,
      guaranteeFour: stats.guaranteedFour || false
    });
  } catch (error) {
    console.error('Error getting banner state:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update banner state
exports.updateBannerState = async (req, res) => {
  try {
    const { bannerType, pityFive, pityFour, guaranteeFive, guaranteeFour } = req.body;

    const stats = await WarpStats.findOneAndUpdate(
      { userId: req.user.userId, bannerType },
      {
        pityFour: pityFour,
        pityFive: pityFive,
        guaranteed: guaranteeFive,
        guaranteedFour: guaranteeFour,
        lastUpdate: new Date()
      },
      { new: true, upsert: true }
    );

    res.json({
      pityFive: stats.pityFive || 0,
      pityFour: stats.pityFour || 0,
      guaranteeFive: stats.guaranteed || false,
      guaranteeFour: stats.guaranteedFour || false
    });
  } catch (error) {
    console.error('Error updating banner state:', error);
    res.status(500).json({ message: error.message });
  }
};
