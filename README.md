
# Micro-Lending System

The **Micro-Lending System** is a decentralized peer-to-peer lending platform built on the **Avalanche C-Chain**. It enables borrowers to request loans and lenders to fund them, with **smart contracts** enforcing agreed repayment terms.

The system automates penalties for late payments and rewards timely repayments, ensuring **trust and security** without intermediaries.


---


## 🔎 Features

- **Loan Requests:** Borrowers can submit loan requests with specified repayment terms, interest rates, and loan amounts.
- **Smart Contract Enforcement:** Loan agreements are governed by smart contracts, ensuring compliance with repayment deadlines.
- **Automated Penalties & Rewards:** The system applies penalties for late payments and rewards responsible financial behavior.
- **User Ratings & Reviews:** Borrowers and lenders can be rated and reviewed based on their transaction history.
- **Lending & Repayment:** Lenders can fund loan requests, and borrowers can repay loans under agreed terms.

---


## 🛠 Tech Stack

**Languages:**  
# ![Solidity](https://img.shields.io/badge/Solidity-363636?style=flat&logo=solidity&logoColor=white)  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) #

**Frameworks:**  
# ![Avalanche](https://img.shields.io/badge/Avalanche-E84142?style=flat&logo=avalanche&logoColor=white)  ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)  ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)  ![Express](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white) #  

**Tools:**  
# ![Hardhat](https://img.shields.io/badge/Hardhat-FFA500?style=flat&logo=hardhat&logoColor=black)  ![Web3.js](https://img.shields.io/badge/Web3.js-F16822?style=flat&logo=ethereum&logoColor=white)   ![Metamask](https://img.shields.io/badge/Metamask-F6851B?style=flat&logo=metamask&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white) #

---


## 📌 Setup Instructions

#### ⯍ Clone the Repository
```sh
$ git clone https://github.com/Avalanche-Team1-DAO-Kenya/Micro-Lending-System
```
```sh
$ cd micro-lending-system
```

#### ⯍ Install Dependencies
```sh
$ npm install
```

#### ⯍ Compile Smart Contracts
```sh
$ cd smart-contracts
$ npx hardhat compile
```

#### ⯍ Configure Avalanche Network
- Edit the `.env` file in both the **backend** and **smart contracts** folders.
- Add your **Avalanche network details** and **private key** (from your Metamask connected to Core Wallet).

#### ⯍ Deploy Smart Contracts to Fuji Testnet
```sh
$ npx hardhat run scripts/deploy.js --network fuji
```
- Copy the deployed contract addresses from the terminal.
- Update the **blockchainService.js** file in the **backend** folder.
- Update the **config.js** file in the **frontend** folder.

#### ⯍ Run the Application
- Open two terminal windows.
                                                                           
                                                                           
                                                                           
                                                                           
                                                                                                                                                     
**Frontend:**
```sh
$ cd micro-lending-frontend
$ npm start
```

**Backend:**
```sh
$ cd micro-lending-backend
$ node app.js
```

### ⯍ Ensure Sufficient AVAX Balance
- Make sure your **Core Wallet** has enough AVAX to cover transactions.

---



## 👥 Team Members

| Name | Role |
|------|------|
| Mark Andrew Kamau | Smart Contract Developer |
| Rita Njoki | Frontend Developer |
| Mark Andrew Kamau | Backend Developer |
| Rita Njoki | Integration |


---



## 🧨Milestones

Waitlist Landing Page Integration
Smart Contract Integration with Frontend & Backend



### 🎖 Objective
**Add a waitlist landing page** to gather potential user interest, build anticipation, and collect early feedback.

#### Tasks:
- **Design Landing Page:** Create a form with fields for name, email, and interest level.
- **Backend Integration:** Store **LoanRequest** submissions and fetch loan details from MongoDB.
- **Launch Page:** Make the page public and share it via social media and newsletters.
- **User Reviews & Ratings:** Add borrower and lender ratings to the landing page and dashboard.
- **Loan Enforcement:** Implement **automatic deductions** from wallets for overdue loans.

---



## ⛓️ Avalanche Checkpoints

- ✅ **Using Avalanche for Transactions:** The platform connects to **Avalanche’s C-Chain** to process lending transactions.
- ✅ **Deploying Smart Contracts:** Lending contracts handle **loan issuance, repayments, and penalties** securely on Avalanche.
- ✅ **Leveraging Avalanche’s Speed & Low Fees:** Fast transactions and low gas fees ensure affordable lending.

---

### 📢 Connect with Us
For updates and support, follow us on [Twitter](#), [LinkedIn](#), or join our [Telegram Group](#). 🚀

