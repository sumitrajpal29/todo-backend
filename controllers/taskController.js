const db = require('../utils/mockDb');

// Get all tasks for logged in user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await db.findTasks(req.userId); // userId injected by middleware
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, deadline, priority } = req.body;
        const userId = req.userId;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const newTask = await db.createTask({
            title,
            description,
            deadline,
            priority: priority || 'Low',
            userId
        });

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update task
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedTask = await db.updateTask(id, updates);

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await db.deleteTask(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
