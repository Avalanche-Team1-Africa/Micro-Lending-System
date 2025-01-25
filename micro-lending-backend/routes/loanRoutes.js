const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// Loan management routes
router.post('/loans', loanController.createLoan);
router.post('/loans/:loanId/fund', loanController.fundLoan);
router.post('/loans/:loanId/repay', loanController.repayLoan);
router.post('/loans/:loanId/penalize', loanController.penalizeLoan);
router.get('/loans/user/:userAddress', loanController.fetchLoansByUser);
router.get('/loans/lender/:lenderAddress', loanController.fetchLenderLoans);
router.get('/loans/requests', loanController.fetchLoanRequests);

module.exports = router;
