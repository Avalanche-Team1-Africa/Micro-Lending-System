const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./micro-lending-backend/routes/userRoutes');

dotenv.config()

// Initialize the app
const app = express();

// Middleware for parsing JSON
app.use(express.json());

app.use(cors())

app.use('/api/auth/', userRoutes);

// Load environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI
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
