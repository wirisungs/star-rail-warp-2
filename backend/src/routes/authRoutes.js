const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Đăng ký
router.post('/register', authController.register);

// Đăng nhập
router.post('/login', authController.login);

// Đăng xuất
router.post('/logout', auth, authController.logout);

// Lấy thông tin user hiện tại
router.get('/me', auth, authController.getCurrentUser);

module.exports = router;
