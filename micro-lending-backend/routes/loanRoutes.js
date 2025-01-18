const express = require('express');
const { createLoan, fundLoan, repayLoan, penalizeLoan } = require('../controllers/loanController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create-loan', verifyToken, createLoan);
router.post('/fund-loan/:loanId', verifyToken, fundLoan);
router.post('/repay-loan/:loanId', verifyToken, repayLoan);
router.post('/penalize-loan/:loanId', verifyToken, penalizeLoan);

module.exports = router;
