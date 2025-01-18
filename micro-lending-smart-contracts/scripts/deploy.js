const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    // Deploy LoanRequest contract
    const LoanRequest = await ethers.getContractFactory("LoanRequest");
    const loanRequest = await LoanRequest.deploy();
    await loanRequest.deployed();
    console.log("LoanRequest deployed to:", loanRequest.address);

    // Deploy LenderFunding contract
    const LenderFunding = await ethers.getContractFactory("LenderFunding");
    const lenderFunding = await LenderFunding.deploy();
    await lenderFunding.deployed();
    console.log("LenderFunding deployed to:", lenderFunding.address);

    // Deploy LoanRepayment contract
    const LoanRepayment = await ethers.getContractFactory("LoanRepayment");
    const loanRepayment = await LoanRepayment.deploy();
    await loanRepayment.deployed();
    console.log("LoanRepayment deployed to:", loanRepayment.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
