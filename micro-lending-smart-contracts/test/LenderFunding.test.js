const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LenderFunding Contract", function () {
  let lenderFunding;
  let owner, borrower, lender;

  beforeEach(async function () {
    const LenderFunding = await ethers.getContractFactory("LenderFunding");
    [owner, borrower, lender] = await ethers.getSigners();
    lenderFunding = await LenderFunding.deploy();
  });

  it("should allow lenders to fund a loan and update status", async function () {
    const loanAmount = ethers.parseEther("10");

    await lenderFunding.connect(borrower).createLoanRequest(
      loanAmount,
      5,
      Math.floor(Date.now() / 1000) + 86400
    );

    await lenderFunding.connect(lender).lendFunds(1, {
      value: loanAmount,
    });

    const loan = await lenderFunding.loans(1);
    expect(loan.isFunded).to.be.true;
    expect(loan.lender).to.equal(lender.address);
    expect(loan.status).to.equal(1); // Approved
  });
});