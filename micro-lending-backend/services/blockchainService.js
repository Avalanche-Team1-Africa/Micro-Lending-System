const { ethers } = require("ethers");
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');

const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);


const loanRequestAddress = "0x1c8E3dE55cBe2b10f56a4cd79CA660d77Cd79606";
const lenderFundingAddress = "0x15A0Eb9CaF66A4BD976e75ce1ce896Fdbb2858B3";
const loanRepaymentAddress = "0xBa1240AE40ba7C98aAfb24358a8C61A40A2c636B";

const loanRequestABI = [
    "function createLoanRequest(uint256 amount, uint256 interestRate, uint256 repaymentDeadline) public",
    "function getLoanStatus(uint256 loanId) public view returns (string memory)"
];

const lenderFundingABI = [
    "function lendFunds(uint256 loanId) public payable"
];

const loanRepaymentABI = [
    "function repayLoan(uint256 loanId) public payable",
    "function getLoan(uint256 loanId) public view returns (uint256 amount, uint256 interestRate, address lender, address borrower, bool isFunded, bool isRepaid, uint8 status)"
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