const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    amount: {type: Number, required: true},
    interestRate: {type: Number, required: true},
    borrower: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    lender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    repaymentDeadline: {type: Date, required: true},
    status: {type: String, enum: ['pending', 'defaulted', 'approved', 'repaid'], default: 'pending'},
    dateCreated: {type: String, default: Date.now}
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;