const { SingleWarpCommand, TenWarpCommand } = require('../commands/WarpCommand');
const bannerService = require('../services/BannerService');
const db = require('../facades/DatabaseFacade');

// Get banner state
exports.getBannerState = async (req, res) => {
  try {
    const { bannerType } = req.params;
    const state = await bannerService.getBannerState(req.user.userId, bannerType);
    res.json(state);
  } catch (error) {
    console.error('Error getting banner state:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update banner state
exports.updateBannerState = async (req, res) => {
  try {
    const { bannerType } = req.params;
    const state = await bannerService.updateBannerState(req.user.userId, bannerType, req.body);
    res.json(state);
  } catch (error) {
    console.error('Error updating banner state:', error);
    res.status(500).json({ message: error.message });
  }
};

// Perform warp
exports.performWarp = async (req, res) => {
  const session = await db.startTransaction();
  try {
    const { bannerType, warps } = req.body;
    const command = warps === 10
      ? new TenWarpCommand(req.user.userId, bannerType, warps)
      : new SingleWarpCommand(req.user.userId, bannerType, warps);

    const result = await command.execute();
    await db.commitTransaction(session);
    res.json(result);
  } catch (error) {
    await db.abortTransaction(session);
    console.error('Error performing warp:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get warp history
exports.getWarpHistory = async (req, res) => {
  try {
    const history = await db.getWarpHistory(req.user.userId);
    res.json(history);
  } catch (error) {
    console.error('Error getting warp history:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get warp stats
exports.getWarpStats = async (req, res) => {
  try {
    const stats = await db.getWarpStats(req.user.userId);
    res.json(stats);
  } catch (error) {
    console.error('Error getting warp stats:', error);
    res.status(500).json({ message: error.message });
  }
};
