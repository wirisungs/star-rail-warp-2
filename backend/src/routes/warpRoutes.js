const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const warpHistoryController = require('../controllers/warpHistoryController');
const warpStatsController = require('../controllers/warpStatsController');

// Warp History routes
router.get('/history', auth, warpHistoryController.getWarpHistory);
router.post('/history', auth, warpHistoryController.addWarpHistory);
router.delete('/history', auth, warpHistoryController.deleteWarpHistory);

// Warp Stats routes
router.get('/stats', auth, warpStatsController.getWarpStats);
router.put('/stats', auth, warpStatsController.updateWarpStats);
router.delete('/stats', auth, warpStatsController.resetWarpStats);

module.exports = router;
