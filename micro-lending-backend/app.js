const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const loanRoutes = require('./routes/loanRoutes');
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET;



// Initialize the app
const app = express();

// Middleware for parsing JSON
app.use(express.json());
app.use(bodyParser.json());  // Backup parser
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors())

// Load environment variables
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

console.log('MongoDB URI:', uri);
// Connect to MongoDB
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth/', userRoutes);
app.use('/api/loans/', loanRoutes);



// Define a basic route for health check
app.get('/', (req, res) => {
    res.send('Micro-Lending System Backend is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
