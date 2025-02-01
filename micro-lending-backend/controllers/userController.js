const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

const signup = async (req, res) => {
    const { username, email, password, walletAddress, role } = req.body;
     console.log({ username, email, password, walletAddress, role})
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (!['borrower', 'lender', 'admin'].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const user = new User({ username, email, password: hashedPassword, walletAddress, role });

        await user.save();

        // Include the role in the JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(201).json({ message: "User created successfully", user, token });
    } catch (err) {
        res.status(400).json({ message: "You are already a user", error: err.message });
    }
};

const login = async (req, res) => {
    console.log("Received request body:", req.body); // Log request body

    const { email, password } = req.body;

    if (!email || !password) {
        console.log("Missing email or password");  // Log missing fields
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: "Login successful", user, token });
    } catch (err) {
        console.log("Error in login function:", err.message); // Log any errors
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};


module.exports = { signup, login};
