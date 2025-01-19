const mongoose = require('mongoose');

const BorrowerSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Reference to the User model
  loanAmount: { type: Number, required: true },
  lenderAddress: {type: String, required: true},
  borrowerAddress: {type: String, required: true},
  repaymentTerms: { type: String, required: true }, // e.g., "12 months"
  interestRate: { type: Number, required: true }, // Percentage
  status: { type: String, default: 'Pending' }, // e.g., "Pending", "Approved", "Rejected"
  submittedAt: { type: Date, default: Date.now }, // Timestamp
});

const Borrower = mongoose.model('Borrower', BorrowerSchema);

module.exports = Borrower;
