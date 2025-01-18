const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LoanRepayment Contract", function () {
  let loanRepayment;
  let owner, borrower, lender;

  beforeEach(async function () {
    const LoanRepayment = await ethers.getContractFactory("LoanRepayment");
    [owner, borrower, lender] = await ethers.getSigners();
    loanRepayment = await LoanRepayment.deploy();
  });

  it("should allow borrowers to repay funded loans", async function () {
    const loanAmount = ethers.parseEther("10");
    const interestRate = 5; // 5% interest
    const repaymentAmount = ethers.parseEther("10.5");

    await loanRepayment.connect(borrower).createLoanRequest(
      loanAmount,
      interestRate,
      Math.floor(Date.now() / 1000) + 86400
    );

    await loanRepayment.connect(lender).lendFunds(1, {
      value: loanAmount,
    });

    await loanRepayment.connect(borrower).repayLoan(1, {
      value: repaymentAmount,
    });

    const loan = await loanRepayment.loans(1);
    expect(loan.isRepaid).to.be.true;
    expect(loan.status).to.equal(2); // Repaid
  });
});