const { loanRequestContract, lenderFundingContract, loanRepaymentContract, penaltyRewardContract } = require('../services/blockchainService.js');
const Loan = require('../models/Loan.js');

const createLoan = async(req, res) => {
    const { amount, interestRate, repaymentDeadline } = req.body;

    try {
        const tx = await loanRequestContract.createLoanRequest(
            ethers.utils.parseEthers(amount.toString()),
            interestRate,
            repaymentDeadline
        );
        await tx.wait();

        return res.status(201).json({ message: "Loan created successfully on blockchain" });
    } catch(err) {
        return res.status(500).json({ message: "Blockchain transaction failed", error: err.message });
    }
}

const fundLoan = async(req, res) => {
    const { loanId } = req.params;
    const { amount } = req.body;

    try {
        const tx = await lenderFundingContract.lendFunds(loanId, {
            value: ethers.utils.parseEthers(amount.toString())
        });
        await tx.wait();

        return res.status(200).json({ message: "Loan funded successfully on blockchain" });
    } catch(err) {
        return res.status(500).json({ message: "Funding transaction failed", error: err.message });
    }
}

const repayLoan = async(req, res) => {
    const { loanId } = req.params;
    const { amount } = req.body;

    try {
        const tx = await loanRepaymentContract.repayLoan(loanId, {
            value: ethers.utils.parseEthers(amount.toString())
        });
        await tx.wait();

        return res.status(200).json({ message: "Loan repaid successfully on blockchain" });
    } catch(err) {
        return res.status(500).json({ message: "Repayment trasnaction failed", error: err.message });
    }
}

const penalizeLoan = async(req, res) => {
    const { loanId } = req.params;

    try {
        const tx = penaltyRewardContract.enforcePenalty(loanId);
        await tx.wait();

        return res.status(200).json({ message: "Penalty enforced successfully on blockchain" });
    }catch(err) {
        return res.status(500).json({ message: "Penalty enforcement failed", error: err.message });
    }
};

module.exports = { createLoan, fundLoan, repayLoan, penalizeLoan };
