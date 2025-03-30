const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const inventoryController = require('../controllers/inventoryController');

// Tất cả routes yêu cầu authentication
router.use(auth);

// Lấy inventory của user
router.get('/', inventoryController.getInventory);

// Lấy thống kê inventory
router.get('/stats', inventoryController.getInventoryStats);

// Cập nhật số lượng item
router.put('/item', inventoryController.updateItemQuantity);

// Thêm item mới
router.post('/item', inventoryController.addItem);

module.exports = router;
