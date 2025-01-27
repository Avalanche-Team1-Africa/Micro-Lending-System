const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    amount: {type: String, required: true},
    interestRate: {type: Number, required: true},
    borrower: { type: String, required: true },  // Store as String
    lender: { type: String, required: true },
    repaymentDeadline: { type: Date, required: true }, // Ensure this is a valid Date
    status: {type: String, enum: ['pending', 'defaulted', 'approved', 'repaid'], default: 'pending'},
    dateCreated: {type: String, default: Date.now}
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;