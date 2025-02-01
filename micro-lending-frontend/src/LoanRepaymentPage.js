import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loanRequestContract, loanRepaymentContract } from "./config";
import { ethers } from "ethers";
import axios from "axios";

const LoanRepaymentPage = () => {
  const [lender, setLender] = useState("");
  const [borrower, setBorrower] = useState("");
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [repaymentDeadline, setRepaymentDeadline] = useState("");
  const [loanId, setLoanId] = useState("");
  const [loanCreated, setLoanCreated] = useState(false);
const navigate = useNavigate();

  const LoanRequest = async (e) => {
    e.preventDefault();
    if (!lender || !borrower || !amount || !interestRate || !repaymentDeadline) {
      alert("Please fill all fields.");
      return;
    }
    if (!window.ethereum) {
      alert("MetaMask is not installed.");
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(loanRequestContract.address, loanRequestContract.abi, signer);
      const loanAmountWei = ethers.utils.parseEther(amount.toString());
      const tx = await contract.createLoanRequest(loanAmountWei, interestRate, repaymentDeadline);
      await tx.wait();
      const loanCount = await contract.loanCount();
      setLoanId(loanCount.toString());
      setLoanCreated(true);
      await axios.post("http://localhost:3000/api/loans/createLoan", {
        loanId,
        lender,
        borrower,
        amount,
        interestRate,
        repaymentDeadline,
      });
      alert("Loan repayment request has been saved!");
    } catch (error) {
      console.error("Error creating loan:", error);
      alert(`Failed to create loan: ${error.reason || error.message}`);
    }
  };
  const repayLoan = async (e) => {
    e.preventDefault();

    if (!loanId || !amount) {
        alert("Please provide loan ID and amount.");
        return;
    }

    try {
      // Ensure MetaMask is connected
      await window.ethereum.request({ method: "eth_requestAccounts" });
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(loanRepaymentContract.address, loanRepaymentContract.abi, signer);
  
      // Fetch loan details
      const loan = await contract.loans(loanId);
      const principalAmountWei = loan[0]; // Loan amount in Wei
      const interestRate = loan[1]; // Interest rate (assumed to be in percentage)
  
      console.log("Loan Details:", { principalAmountWei, interestRate });
  
      // Calculate the total amount with simple interest
      const interestAmountWei = principalAmountWei.mul(interestRate).div(100);
      const totalFundingAmountWei = principalAmountWei.add(interestAmountWei);
  
      console.log("Total Funding Amount (Including Interest):", ethers.utils.formatEther(totalFundingAmountWei));
  
      // Convert user input to Wei
      const userAmountWei = ethers.utils.parseUnits(amount.toString(), "ether");
  
      // Ensure user is funding at least the required amount
      if (userAmountWei.lt(totalFundingAmountWei)) {
          alert(`Funding amount must be at least ${ethers.utils.formatEther(totalFundingAmountWei)} AVAX (including interest).`);
          return;
      }
  
      // Execute lending transaction
      const tx = await contract.lendFunds(loanId, { value: userAmountWei });
      await tx.wait();
  
      alert("Loan repayed successfully!");
      setTimeout(() => navigate("/BorrowerDashboardPage"), 3000);
  } catch (error) {
      console.error("Error funding loan:", error);
      alert(`Failed to fund loan: ${error.reason || error.message}`);
  }
  
};
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f0f8ff", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "30px" }}>
      <h2>{loanCreated ? "Repay Loan" : "Loan Details"}</h2>
      <form onSubmit={loanCreated ? repayLoan : LoanRequest} style={{ backgroundColor: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", width: "400px", textAlign: "center" }}>
        <input type="text" placeholder="Lender's C-Chain Address" value={lender} onChange={(e) => setLender(e.target.value)} required style={{ width: "90%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }} />
        <input type="text" placeholder="My C-Chain Address" value={borrower} onChange={(e) => setBorrower(e.target.value)} required style={{ width: "90%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }} />
        <input type="number" placeholder="Loan Amount (in AVAX)" value={amount} onChange={(e) => setAmount(e.target.value)} required style={{ width: "90%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }} />
        <input type="number" placeholder="Interest Rate (%)" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} required={!loanCreated} style={{ width: "90%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }} />
        <input type="text" placeholder="Repayment Deadline (e.g., 12 months)" value={repaymentDeadline} onChange={(e) => setRepaymentDeadline(e.target.value)} required={!loanCreated} style={{ width: "90%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }} />
        {!loanCreated && <button type="submit" style={{ width: "95%", padding: "15px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer", marginTop: "15px" }}>Create Loan</button>}
        {loanCreated && <button type="submit" style={{ width: "95%", padding: "15px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer", marginTop: "15px" }}>Repay Loan</button>}
        {loanCreated && <p>Loan ID: {loanId}</p>}
      </form>
      <Link to="/BorrowerDashboardPage" style={{ marginTop: "15px", textDecoration: "none", color: "#007bff" }}>Back to Dashboard</Link>
    </div>
  );
};

export default LoanRepaymentPage;



