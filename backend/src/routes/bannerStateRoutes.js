const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bannerStateController = require('../controllers/bannerStateController');

// Apply auth middleware to all routes
router.use(auth);

// Get banner state
router.get('/:bannerType', bannerStateController.getBannerState);

// Update banner state
router.put('/', bannerStateController.updateBannerState);

module.exports = router;
