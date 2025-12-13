const Task = require('../models/Task');

// Get all tasks for logged in user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.userId });
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

        const newTask = await Task.create({
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

        const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });

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

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
