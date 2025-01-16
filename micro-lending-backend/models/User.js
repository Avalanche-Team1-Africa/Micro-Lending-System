const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    walletAddress: { type: String, required: true },
    reputationScore: { type: Number, default: 0 },
    dateCreated: { type: Date, default: Date.now },
    role: { type: String, enum: ['borrower', 'lender', 'admin'], required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;