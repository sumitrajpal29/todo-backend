const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mongoose connection removed for Mock DB usage
// mongoose.connect(process.env.MONGO_URI) ...

// Routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Todo API is running...' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
