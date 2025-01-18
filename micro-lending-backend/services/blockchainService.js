const { ethers } = require("hardhat");
require('dotenv').config();

const provider = new ethers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');

const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const loanRequestAddress = "";
const lenderFundingAddress = "";
const loanRepaymentAddress = "";
const penaltyRewardAddress = "";

const loanRequestABI = [
    "function createLoanRequest(uint256 amount, uint256 interestRate, uint256 repaymentDeadline) public",
    "function getLoanStatus(uint256 loanId) public view returns (string memory)"
];

const lenderFundingABI = [
    "function lendFunds(uint256 loanId) public payable"
];

const loanRepaymentABI = [
    "function repayLoan(uint256 loanId) public payable"
];

const penaltyRewardABI = [
    "function enforcePenalty(uint256 loanId) public"
];


//Contract Instances
const loanRequestContract = new ethers.Contract(loanRequestAddress, loanRequestABI, signer);
const lenderFundingContract = new ethers.Contract(lenderFundingAddress, lenderFundingABI, signer);
const loanRepaymentContract = new ethers.Contract(loanRepaymentAddress, loanRepaymentABI, signer);
const penaltyRewardContract = new ethers.Contract(penaltyRewardAddress, penaltyRewardABI, signer);

module.exports = {
    loanRequestContract,
    lenderFundingContract,
    loanRepaymentContract,
    penaltyRewardContract
};
