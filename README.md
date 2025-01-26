# Micro-Lending-System
Team 20


Description
The Micro-Lending System is a decentralized peer-to-peer lending platform built on the Avalanche C-Chain. It enables borrowers to request loans and lenders to fund them, with smart contracts enforcing the agreed repayment terms. The system automates penalties for late payments and rewards for timely repayments, ensuring trust and security without intermediaries.


Features
	Loan Requests: Borrowers can submit loan requests with specified repayment terms, interest rates, and loan amounts.
	Smart Contract Enforcement: Loan agreements are governed by smart contracts, ensuring compliance with repayment deadlines.
	Automated Penalties & Rewards: The system applies penalties for late payments and rewards users for responsible financial behavior.


Tech Stack Used
•	Language: Solidity, JavaScript
•	Framework: Avalanche, React, Node.js, Express
•	Tools: Hardhat, Web3.js, Metamask, Axios, React-router-dom

Setup Instructions
Clone the repository:
git clone [repository-url]
cd micro-lending-system

Install dependencies:
npm install

Compile the smart contracts:
npx hardhat compile

Configure the Avalanche network
Edit hardhat.config.js and add your Avalanche network details under the networks section.

Deploy smart contracts to Avalanche:
npx hardhat run scripts/deploy.js --network avalanche

Run the application locally:
npm start

Team Members
•	Mark Andrew Kamau - Smart Contract Developer
•	Rita Njoki - Frontend Developer
•	Mark Andrew Kamau - Backend Developer
•	Rita Njoki - Integration
•	Mark Andrew Kamau - Integration


Milestones
Waitlist Landing Page Integration

Objective:
Add a waitlist landing page to gather potential user interest, build anticipation, and collect early feedback.
Tasks:
•	Design Landing Page: Form with fields for name, email, and interest level.
•	Backend Integration: Store form submissions in a database.
•	Launch Page: Make the page public and link it from social media or newsletters.

Avalanche Checkpoints
1.	Using Avalanche for Transactions: The project connects to Avalanche’s C-Chain to process lending transactions.
2.	Deploying Smart Contracts: The lending contracts are deployed on Avalanche C-Chain, handling loan issuance, repayments, and penalties securely.
3.	Leveraging Avalanche's Speed & Low Fees: The platform benefits from Avalanche’s fast transactions and low gas fees, making lending affordable and efficient.


