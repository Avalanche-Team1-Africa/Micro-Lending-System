const { loanRequestContract, lenderFundingContract, loanRepaymentContract, penaltyRewardContract } = require('../services/blockchainService.js');
const Loan = require('../models/Loan.js');
const { ethers } = require("ethers");
const createLoan = async (req, res) => {
    const { lender, borrower, amount, interestRate, repaymentDeadline } = req.body;

    try {

        console.log("Amount before conversion:", amount);
        console.log("Amount type:", typeof amount);
    
        // Ensure amount is a valid number before parsing
        if (!amount || isNaN(amount)) {
            throw new Error(`Invalid amount: ${amount}`);
        }

        const amountString = amount.toString();  
        console.log("Amount after conversion:", amountString);

        const loanAmountInWei = ethers.utils.parseEther(amountString);
        console.log("Amount in Wei:", loanAmountInWei.toString());
       
        const repaymentDate = new Date();
        repaymentDate.setMonth(repaymentDate.getMonth() + parseInt(repaymentDeadline));
        // Initiate the loan creation on the blockchain
        const tx = await loanRequestContract.createLoanRequest(
            loanAmountInWei,
            interestRate,
            repaymentDeadline,
        );
        const txReceipt = await tx.wait();
        const loanId = txReceipt.events.find(e => e.event === "LoanCreated")?.args.loanId.toString();
        
    
        
        // Save loan details in the database
        const newLoan = new Loan({
            loanId,
            amount,
            interestRate,
            borrower,  // Should be mapped to the User _id in the future
            lender,    // Should be mapped to the User _id in the future
            repaymentDeadline: repaymentDate,
            status: 'pending',  // Default status
            dateCreated: new Date()
        });

        await newLoan.save();

        return res.status(201).json({ message: "Loan created successfully on blockchain", loanId });
    } catch (err) {
        return res.status(500).json({ message: "Blockchain transaction failed", error: err.message });
    }
};
const lendFunds = async (req, res) => {
    const { loanId } = req.params;
    const { amount } = req.body;

    try {
        // Fetch the loan from the database
        const loan = await Loan.findOne({ loanId: String(loanId) });

        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        // Check that the loan status is 'pending' before funding
        if (loan.status !== 'pending') {
            return res.status(400).json({ message: "Loan is already funded or closed" });
        }

        // Initiate the funding transaction on the blockchain
        const tx = await lenderFundingContract.lendFunds(loanId, {
            value: ethers.utils.parseEther(amount.toString())
        });
        await tx.wait();

        // After successful transaction, update loan status in the database
        loan.status = 'approved';  // Update status to 'approved' after funding
        await loan.save();

        return res.status(200).json({ message: "Loan funded successfully on blockchain" });
    } catch (err) {
        return res.status(500).json({ message: "Funding transaction failed", error: err.message });
    }
};

const repayLoan = async(req, res) => {
    const { loanId } = req.params;
    const { amount } = req.body;

    try {
        const tx = await loanRepaymentContract.repayLoan(loanId, {
            value: ethers.utils.parseEther(amount.toString())
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
        const tx = await penaltyRewardContract.enforcePenalty(loanId);
        await tx.wait();

        return res.status(200).json({ message: "Penalty enforced successfully on blockchain" });
    }catch(err) {
        return res.status(500).json({ message: "Penalty enforcement failed", error: err.message });
    }
};

const fetchLoansByBorrower = async (req, res) => {
    const { walletAddress } = req.params;  // Accept the user address as a route parameter

    try {
        // Fetch loans where either lenderAddress or borrowerAddress matches the user's address
        const loans = await Loan.find({ 
            borrower: walletAddress,
            });

        if (loans.length === 0) {
            return res.status(404).json({ message: "No loans found for this user" });
        }

        return res.status(200).json(loans);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching loans", error: err.message });
    }
};

const fetchLenderLoans = async (req, res) => {
    const { lender } = req.params; // Assuming lender's address is passed as a parameter
  
    try {
      // Find all loans where the lender is involved (either as a lender or borrower)
      const lenderLoans = await Loan.find({ lender }); // Or adjust query as needed (e.g., where borrower matches)
  
      if (lenderLoans.length === 0) {
        return res.status(404).json({ message: "No loans found for this lender" });
      }
  
      return res.status(200).json(lenderLoans);
    } catch (err) {
      return res.status(500).json({ message: "Error fetching lender loans", error: err.message });
    }
  };
  
const fetchLoanRequests = async (req, res) => {
    try {
      const lender = req.params.lender;
      const loanRequests = await Loan.find({ status: 'pending' });
  
      if (!loanRequests || loanRequests.length === 0) {
        return res.status(404).json({ message: 'No loan requests found' });
      }
  
      res.status(200).json(loanRequests);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching loan requests', error: err.message });
    }
  };

module.exports = { createLoan, lendFunds, repayLoan, penalizeLoan, fetchLoansByBorrower, fetchLenderLoans, fetchLoanRequests};
