const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LoanRequest Contract", function () {
  let loanRequest;
  let owner, borrower;

  beforeEach(async function () {
    const LoanRequest = await ethers.getContractFactory("LoanRequest");
    [owner, borrower] = await ethers.getSigners();
    loanRequest = await LoanRequest.deploy();
  });

  it("should create a loan request with proper details", async function () {
    const loanAmount = ethers.parseEther("10");
    const interestRate = 5;
    const repaymentDeadline = Math.floor(Date.now() / 1000) + 86400; // 24 hours from now

    await loanRequest.connect(borrower).createLoanRequest(
      loanAmount,
      interestRate,
      repaymentDeadline
    );

    const loan = await loanRequest.loans(1);

    expect(loan.amount).to.equal(loanAmount);
    expect(loan.interestRate).to.equal(interestRate);
    expect(loan.repaymentDeadline).to.equal(repaymentDeadline);
    expect(loan.borrower).to.equal(borrower.address);
    expect(loan.status).to.equal(0); // Pending
  });

  it("should return correct loan status", async function () {
    const loanAmount = ethers.parseEther("10");
    const interestRate = 5;
    const repaymentDeadline = Math.floor(Date.now() / 1000) + 86400;

    await loanRequest.connect(borrower).createLoanRequest(
      loanAmount,
      interestRate,
      repaymentDeadline
    );

    const status = await loanRequest.getLoanStatus(1);
    expect(status).to.equal("Pending");
  });
});