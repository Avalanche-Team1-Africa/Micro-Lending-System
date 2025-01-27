const { ethers } = require("ethers");
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');

const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);


const loanRequestAddress = "0x8110Ae08974B018A8091C6fbF8de02e0618FDbf5";
const lenderFundingAddress = "0x9603f537E72a37Fa4e4195fa1c3c370E0B3C6E74";
const loanRepaymentAddress = "0xbB73CBc62aB3B9d892F6091023CcF72832bFc5E8";

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