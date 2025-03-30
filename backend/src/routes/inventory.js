const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

router.get('/', inventoryController.getInventory);
router.get('/stats', inventoryController.getInventoryStats);
router.put('/item', inventoryController.updateItemQuantity);

module.exports = router;
