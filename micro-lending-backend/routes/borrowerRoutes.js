const express = require("express");
const Borrower = require("../models/Borrower");
const router = express.Router();
// Create a new loan request
router.post("/create-request", async (req, res) => {
  try {
    const { userId, loanAmount, lenderAddress, borrowerAddress, loanPurpose, repaymentTerms, interestRate } = req.body;

    const loanRequest = new Borrower({
      userId,
      loanAmount,
      lenderAddress,
      borrowerAddress,
      loanPurpose,
      repaymentTerms,
      interestRate,
    });

    await loanRequest.save();
    res.status(201).json({ message: "Loan request created successfully", loan: newLoanRequest });
  } catch (error) {
    res.status(500).json({ message: "Error creating loan request", error: error.message });
  }
});

// Get all loan requests by a specific borrower
router.get("/requests/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const requests = await Borrower.find({ userId });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving loan requests", error: error.message });
  }
});

// Update a loan request status
router.put("/update-status/:loanId", async (req, res) => {
  try {
    const { loanId } = req.params;
    const { status } = req.body;

    const updatedLoan = await BorrowerData.findByIdAndUpdate(
      loanId,
      { status },
      { new: true }
    );

    if (!updatedLoan) return res.status(404).json({ message: "Loan request not found" });

    res.status(200).json({ message: "Loan request status updated successfully", loan: updatedLoan });
  } catch (error) {
    res.status(500).json({ message: "Error updating loan request status", error: error.message });
  }
});

module.exports = router;
