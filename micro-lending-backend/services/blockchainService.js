const { ethers } = require("ethers");
require('dotenv').config();

const provider = new ethers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');

const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const loanRequestAddress = "0x782c1e85b70541FF880A4bE5096Ab3fc1985AfCb";
const lenderFundingAddress = "0x4c4E1d2087C24D81529fD76744D2f1CFE9136c20";
const loanRepaymentAddress = "0xa2F2Aa240cf07125B80A5A165DE0f8c8EB107707";


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


//Contract Instances
const loanRequestContract = new ethers.Contract(loanRequestAddress, loanRequestABI, signer);
const lenderFundingContract = new ethers.Contract(lenderFundingAddress, lenderFundingABI, signer);
const loanRepaymentContract = new ethers.Contract(loanRepaymentAddress, loanRepaymentABI, signer);

module.exports = {
    loanRequestContract,
    lenderFundingContract,
    loanRepaymentContract,
};