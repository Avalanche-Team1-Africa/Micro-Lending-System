const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

const signup = async(req, res) => {
    const { username, email, password, walletAddress } = req.body;

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword, walletAddress });

        await user.save();

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: "User created successfully", user, token});
    } catch(err) {
        res.status(400).json({ message: "Error creating user", error: err.message })
    }
};

const login = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successfull", user, token });
    } catch(err) {
        return res.status(400).json({ message: "Error logging in", error: err.message });
    }
}


module.exports = { signup, login };
