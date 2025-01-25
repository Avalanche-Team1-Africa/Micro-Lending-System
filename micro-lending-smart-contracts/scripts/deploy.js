const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    // Deploy LoanRequest contract
    const LoanRequest = await hre.ethers.getContractFactory("LoanRequest");
    const loanRequest = await LoanRequest.deploy();
    await loanRequest.waitForDeployment(); // Updated method for ethers.js 6.x
    console.log("LoanRequest deployed to:", loanRequest.target); // Use `.target` for contract address

    // Deploy LenderFunding contract
    const LenderFunding = await hre.ethers.getContractFactory("LenderFunding");
    const lenderFunding = await LenderFunding.deploy();
    await lenderFunding.waitForDeployment();
    console.log("LenderFunding deployed to:", lenderFunding.target);

    // Deploy LoanRepayment contract
    const LoanRepayment = await hre.ethers.getContractFactory("LoanRepayment");
    const loanRepayment = await LoanRepayment.deploy();
    await loanRepayment.waitForDeployment();
    console.log("LoanRepayment deployed to:", loanRepayment.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});