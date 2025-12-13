const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to sync Firebase user with MongoDB
router.post('/sync', authMiddleware, authController.syncUser);

module.exports = router;
