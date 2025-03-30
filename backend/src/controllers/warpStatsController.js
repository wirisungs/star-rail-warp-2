const WarpStats = require('../models/WarpStats');

// Lấy thống kê roll của user
exports.getWarpStats = async (req, res) => {
  try {
    const stats = await WarpStats.find({ userId: req.user.userId });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật thống kê roll
exports.updateWarpStats = async (req, res) => {
  try {
    const { bannerType } = req.body;
    const stats = await WarpStats.findOneAndUpdate(
      { userId: req.user.userId, bannerType },
      { ...req.body, lastUpdate: new Date() },
      { new: true, upsert: true }
    );
    res.json(stats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Reset thống kê roll
exports.resetWarpStats = async (req, res) => {
  try {
    await WarpStats.deleteMany({ userId: req.user.userId });
    res.json({ message: 'Warp stats reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
