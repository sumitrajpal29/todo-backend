const db = require('../utils/mockDb');

// Register User
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Simple validation
        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide username and password' });
        }

        // Check if user exists
        const existingUser = await db.findUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const user = await db.createUser({ username, password });

        res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await db.findUserByUsername(username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // In real app, compare hashed password
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // In real app, generate JWT token here
        res.json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
