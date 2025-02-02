# Micro-Lending-System

The Micro-Lending System is a decentralized peer-to-peer lending platform built on the Avalanche C-Chain. 
It enables borrowers to request loans and lenders to fund them, with smart contracts enforcing the agreed repayment terms. 
The system automates penalties for late payments and rewards for timely repayments, ensuring trust and security without intermediaries.


# Features

* Loan Requests: Borrowers can submit loan requests with specified repayment terms, interest rates, and loan amounts.
* Smart Contract Enforcement: Loan agreements are governed by smart contracts, ensuring compliance with repayment deadlines.
* Automated Penalties & Rewards: The system applies penalties for late payments and rewards users for responsible financial behavior.
* User reviews,from the borrowerd being rated and the lenders being rated and recommendations.
* Lender can fund a loan request and a Borrower is able to pay the loan they have been funded with terms agreed between them and the lender.

# Tech Stack Used

* Language: Solidity, JavaScript
* Framework: Avalanche, React, Node.js, Express
* Tools: Hardhat, Web3.js, Metamask, Axios, React-router-dom


# Setup Instructions

* Clone the repository: git clone [https://github.com/Avalanche-Team1-DAO-Kenya/Micro-Lending-System]
* Navigate to the folder where you saved the file: cd micro-lending-system

* Install dependencies: npm install
* Navigate to the smart contracts folder
* Compile the smart contracts: npx hardhat compile

* Configure the Avalanche network: Edit the .env file and add your Avalanche network details under the networks section and your privete key.( navigate to your browser click the metamask extension and copy your address but make sure your Metamask is connected to your core wallet.).Post that key to the field written PRIVATE_KEY.Also change the details in the .env file on the backend folder.

* Deply the smart contracts on the Avalanche Fuji TestNet network: npx hardhat run scripts/deploy.js --network fuji
* Navigate to the blockchainService file on the micro-lending backend folder. Replace those addresses with the ones ont the terminal where your contracts have been deployed to.
* Do the same for the config.js file in the front-end folder under the src directory.9replace the addresses with the ones on the terminal.

* Split the terminal onto two.

* Make sure you've installed all the dependancies on each folder.(microlending-frontend,micro-lending backend and micro-lending smart contracts)

* The first terminal navigate to the micro-lending frontend folder.

* The second terminal naviagate to the mirco-lending backend folder.

* On the first terminal run npm start.

* On the second terminal run node app.js.

* Make sure you have enough Avax on your core wallet.

# Team Members

* Mark Andrew Kamau - Smart Contract Developer
* Rita Njoki - Frontend Developer
* Mark Andrew Kamau - Backend Developer
* Rita Njoki - Integration
* Mark Andrew Kamau - Integration


# Milestones

* Waitlist Landing Page Integration
* Smart Contract Intergration with frontend and backend.

# Objective:

Add a waitlist landing page to gather potential user interest, build anticipation, and collect early feedback.
Tasks:
* Design Landing Page: Form with fields for name, email, and interest level.

* Backend Integration: Store LoanRequest submissions and fetch loan information from MongoDB.

* Launch Page: Make the page public and link it from social media or newsletters.

* Add user reviews and ratings on the Landing Page and user's Dashboard Page.

* Enforcing deduction from wallets due to extremely late payments for borrowers with overstayed loans.


# Avalanche Checkpoints
*	Using Avalanche for Transactions: The project connects to Avalanche’s C-Chain to process lending transactions.

*	Deploying Smart Contracts: The lending contracts are deployed on Avalanche C-Chain, handling loan issuance, repayments, and penalties securely.

*	Leveraging Avalanche's Speed & Low Fees: The platform benefits from Avalanche’s fast transactions and low gas fees, making lending affordable and efficient.


