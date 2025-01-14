// Import required modules
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize the app
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Load environment variables
const { PORT, MONGO_URI } = process.env;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define a basic route for health check
app.get('/', (req, res) => {
    res.send('Micro-Lending System Backend is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
