const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// Loan management routes
router.post('/createLoan', loanController.createLoan);         // Create a loan
router.post('/lendFunds/:loanId', loanController.lendFunds);     // Fund a loan (with loanId as param)
router.post('/repayLoan/:loanId', loanController.repayLoan);   // Repay a loan (with loanId as param)
router.post('/penalizeLoan/:loanId', loanController.penalizeLoan); // Penalize a loan (with loanId as param)
router.get('/fetchLoansByBorrower/:walletAddress', loanController.fetchLoansByBorrower); // Fetch loans by user (with userAddress as param)
router.get('/fetchLenderLoans/:lenderAddress', loanController.fetchLenderLoans); // Fetch loans for a lender (with lenderAddress as param)
router.get('/fetchLoanRequests/:lenderAddress', loanController.fetchLoanRequests); // Fetch loan requests for a lender (with lenderAddress as param)

module.exports = router;
