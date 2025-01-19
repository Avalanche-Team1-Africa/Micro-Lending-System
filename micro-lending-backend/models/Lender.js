const mongoose = require('mongoose');

const LenderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Reference to the User model
  loanId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Borrower', 
    required: true 
  }, // Reference to the BorrowerData model
  amountLent: { type: Number, required: true },
  borrowerAddress: {type: String, required: true},
  lenderAddress: {type: String, required: true},
  interestRate: { type: Number, required: true }, // Percentage
  repaymentStatus: { type: String, default: 'On Track' }, // e.g., "On Track", "Delayed"
  issuedAt: { type: Date, default: Date.now }, // Timestamp
});

const Lender = mongoose.model('Lender', LenderSchema);

module.exports = Lender;
