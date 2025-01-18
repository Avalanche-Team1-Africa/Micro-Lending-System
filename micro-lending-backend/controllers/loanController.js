const { loanRequestContract, lenderFundingContract, loanRepaymentContract, penaltyRewardContract } = require('../services/blockchainService.js');
const Loan = require('../models/Loan.js');

const createLoan = async(req, res) => {
    const { amount, interestRate, repaymentDeadline } = req.body;

    try {
        const tx = loanRequestContract.createLoanRequest(
            ethers.utils.parseEthers(amount.tostring()),
            interestRate,
            repaymentDeadline
        );
        await tx.wait();

        return res.status(201).json({ message: "Loan created successfully on blockchain" });
    } catch(err) {
        return res.status(500).json({ message: "Blockchain transaction failed", error: err.message });
    }
}
