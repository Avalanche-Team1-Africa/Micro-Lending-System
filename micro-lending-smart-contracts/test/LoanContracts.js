import { expect } from "chai";
const ethers = "hardhat";

describe("Loan Contracts", function () {
  let LoanRequest, loanRequest;
  let owner, borrower, lender, otherAccount;

  beforeEach(async function () {
    // Deploy the PenaltyRewardLogic contract (inherits all logic)
    LoanRequest = await ethers.getContractFactory("PenaltyRewardLogic");
    [owner, borrower, lender, otherAccount] = await ethers.getSigners();
    loanRequest = await LoanRequest.deploy();
    await loanRequest.deployed();
  });

  it("should create a loan request with proper details", async function () {
    const loanAmount = ethers.utils.parseEther("10");
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
    expect(loan.isFunded).to.be.false;
    expect(loan.isRepaid).to.be.false;
  });

  it("should allow lenders to fund a loan and update status", async function () {
    const loanAmount = ethers.utils.parseEther("10");
    await loanRequest.connect(borrower).createLoanRequest(
      loanAmount,
      5,
      Math.floor(Date.now() / 1000) + 86400
    );

    await loanRequest.connect(lender).lendFunds(1, {
      value: loanAmount,
    });

    const loan = await loanRequest.loans(1);
    expect(loan.isFunded).to.be.true;
    expect(loan.lender).to.equal(lender.address);
    expect(loan.status).to.equal(1); // Approved
  });

  it("should allow borrowers to repay funded loans", async function () {
    const loanAmount = ethers.utils.parseEther("10");
    const interestRate = 5; // 5% interest
    const repaymentAmount = ethers.utils.parseEther("10.5");

    await loanRequest.connect(borrower).createLoanRequest(
      loanAmount,
      interestRate,
      Math.floor(Date.now() / 1000) + 86400
    );

    await loanRequest.connect(lender).lendFunds(1, {
      value: loanAmount,
    });

    await loanRequest.connect(borrower).repayLoan(1, {
      value: repaymentAmount,
    });

    const loan = await loanRequest.loans(1);
    expect(loan.isRepaid).to.be.true;
    expect(loan.status).to.equal(2); // Repaid
  });

  it("should enforce penalties for overdue loans", async function () {
    const loanAmount = ethers.utils.parseEther("10");

    await loanRequest.connect(borrower).createLoanRequest(
      loanAmount,
      5,
      Math.floor(Date.now() / 1000) - 86400 // Deadline in the past
    );

    await loanRequest.connect(lender).lendFunds(1, {
      value: loanAmount,
    });

    await loanRequest.enforcePenalty(1);

    const loan = await loanRequest.loans(1);
    expect(loan.status).to.equal(3); // Defaulted
  });

  it("should reward lenders for loans repaid on time", async function () {
    const loanAmount = ethers.utils.parseEther("10");
    const repaymentAmount = ethers.utils.parseEther("10.5");

    await loanRequest.connect(borrower).createLoanRequest(
      loanAmount,
      5,
      Math.floor(Date.now() / 1000) + 86400
    );

    await loanRequest.connect(lender).lendFunds(1, {
      value: loanAmount,
    });

    await loanRequest.connect(borrower).repayLoan(1, {
      value: repaymentAmount,
    });

    const initialBalance = await ethers.provider.getBalance(lender.address);

    await loanRequest.rewardLender(1);

    const finalBalance = await ethers.provider.getBalance(lender.address);
    expect(finalBalance).to.be.gt(initialBalance); // Reward applied
  });
});