// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("PenaltyReward Contract", function () {
//   let penaltyReward;
//   let owner, borrower, lender;

//   beforeEach(async function () {
//     const PenaltyReward = await ethers.getContractFactory("PenaltyReward");
//     [owner, borrower, lender] = await ethers.getSigners();
//     penaltyReward = await PenaltyReward.deploy();
//   });

//   it("should enforce penalties for overdue loans", async function () {
//     const loanAmount = ethers.parseEther("10");

//     await penaltyReward.connect(borrower).createLoanRequest(
//       loanAmount,
//       5,
//       Math.floor(Date.now() / 1000) - 86400 // Deadline in the past
//     );

//     await penaltyReward.connect(lender).lendFunds(1, {
//       value: loanAmount,
//     });

//     await penaltyReward.enforcePenalty(1);

//     const loan = await penaltyReward.loans(1);
//     expect(loan.status).to.equal(3); // Defaulted
//   });

//   it("should reward lenders for loans repaid on time", async function () {
//     const loanAmount = ethers.parseEther("10");
//     const repaymentAmount = ethers.parseEther("10.5");

//     await penaltyReward.connect(borrower).createLoanRequest(
//       loanAmount,
//       5,
//       Math.floor(Date.now() / 1000) + 86400
//     );

//     await penaltyReward.connect(lender).lendFunds(1, {
//       value: loanAmount,
//     });

//     await penaltyReward.connect(borrower).repayLoan(1, {
//       value: repaymentAmount,
//     });

//     const initialBalance = await ethers.provider.getBalance(lender.address);

//     await penaltyReward.rewardLender(1);

//     const finalBalance = await ethers.provider.getBalance(lender.address);
//     expect(finalBalance).to.be.gt(initialBalance); // Reward applied
//   });
// });
