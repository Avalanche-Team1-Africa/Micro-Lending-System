const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LoanRequest Contract", function () {
  let loanRequest;
  let lender, borrower;

  beforeEach(async function () {
    const LoanRequestFactory = await ethers.getContractFactory("LoanRequest"); // ✅ Renamed to avoid conflict
    [lender, borrower] = await ethers.getSigners();
    loanRequest = await LoanRequestFactory.deploy(); // ✅ Now correctly assigning deployed contract
    await loanRequest.waitForDeployment();

    await lender.sendTransaction({
      to: borrower.address,
      value: ethers.parseEther("0.1") // Adjust amount if needed
  });

  });

  it("should create a loan request with proper details", async function () {
    const amount = ethers.parseEther("10"); // ✅ For Ethers v6, use `ethers.utils.parseEther("10")` for v5
    const interestRate = 5;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const repaymentDeadline = currentTimestamp + 30 * 24 * 60 * 60; // 30 days from now

    await loanRequest.connect(borrower).createLoanRequest(
      amount,
      interestRate,
      repaymentDeadline
    );

    const loan = await loanRequest.loans(1);

    expect(loan.amount).to.equal(amount);
    expect(loan.interestRate).to.equal(interestRate);
    expect(loan.repaymentDeadline).to.equal(repaymentDeadline);
    expect(loan.borrower).to.equal(borrower.address); // ✅ Fix: Compare to borrower.address
    expect(loan.status).to.equal(0); // Pending
  });

  it("should return correct loan status", async function () {
    const amount = ethers.parseEther("10");
    const interestRate = 5;
    const repaymentDeadline = Math.floor(Date.now() / 1000) + 86400;

    await loanRequest.connect(borrower).createLoanRequest(
      amount,
      interestRate,
      repaymentDeadline
    );

    const status = await loanRequest.getLoanStatus(1);
    expect(status).to.equal("Pending");
  });
});
