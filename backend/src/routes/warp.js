const express = require('express');
const router = express.Router();
const warpController = require('../controllers/warpController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

router.get('/history', warpController.getWarpHistory);
router.post('/perform', warpController.performWarp);
router.get('/stats', warpController.getWarpStats);

module.exports = router;
