const WarpHistory = require('../models/WarpHistory');

// Lấy lịch sử roll của user
exports.getWarpHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    console.log('Finding history for user:', userId);
    const history = await WarpHistory.find({ userId: userId })
      .sort({ timestamp: -1 });
    res.json(history);
  } catch (error) {
    console.error('Error in getWarpHistory:', error);
    res.status(500).json({ message: error.message });
  }
};

// Thêm một lần roll mới
exports.addWarpHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    console.log('Adding history for user:', userId);

    const warpHistory = new WarpHistory({
      userId: userId,
      ...req.body
    });

    console.log('Creating warp history:', warpHistory);
    const newHistory = await warpHistory.save();
    res.status(201).json(newHistory);
  } catch (error) {
    console.error('Error in addWarpHistory:', error);
    res.status(400).json({ message: error.message });
  }
};

// Xóa lịch sử roll
exports.deleteWarpHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    await WarpHistory.deleteMany({ userId: userId });
    res.json({ message: 'Warp history deleted successfully' });
  } catch (error) {
    console.error('Error in deleteWarpHistory:', error);
    res.status(500).json({ message: error.message });
  }
};

