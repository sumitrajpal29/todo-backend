const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Simple Middleware to simulate auth (since we don't have JWT middleware yet)
// In a real app, this would verify the token and attach user to req
const mockAuthMiddleware = (req, res, next) => {
    const userId = req.headers['x-user-id'];
    if (!userId) {
        return res.status(401).json({ message: 'No user ID provided in headers' });
    }
    req.userId = userId; // Attach to req object directly
    next();
};

router.use(mockAuthMiddleware);

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
