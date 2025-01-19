const express = require("express");
const Lender = require("../models/Lender");
const router = express.Router();

// Create a new loan offer
router.post("/create-offer", async (req, res) => {
  try {
    const { userId, loanId, amountLent, borrowerAddress, myAddress, interestRate } = req.body;

    const loanOffer = new Lender({
      userId,
      loanId,
      amountLent,
      borrowerAddress,
      myAddress,
      interestRate,
    });

    await loanOffer.save();
    res.status(201).json({ message: "Loan offer created successfully", loan: newLoanOffer });
  } catch (error) {
    res.status(500).json({ message: "Error creating loan offer", error: error.message });
  }
});

// Get all loan offers by a specific lender
router.get("/offers/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const offers = await Lender.find({ userId }).populate("loanId");
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving loan offers", error: error.message });
  }
});

// Update a loan offer's repayment status
router.put("/update-status/:loanId", async (req, res) => {
  try {
    const { loanId } = req.params;
    const { repaymentStatus } = req.body;

    const updatedLoan = await LenderData.findOneAndUpdate(
      { loanId },
      { repaymentStatus },
      { new: true }
    );

    if (!updatedLoan) return res.status(404).json({ message: "Loan offer not found" });

    res.status(200).json({ message: "Repayment status updated successfully", loan: updatedLoan });
  } catch (error) {
    res.status(500).json({ message: "Error updating repayment status", error: error.message });
  }
});

module.exports = router;
