import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loanRequestContract, loanRepaymentContract } from "./config";
import { BrowserProvider, Contract, parseEther } from "ethers";

const LenderPage = () => {
  const [lenderAddress, setLenderAddress] = useState("");
  const [borrowerAddress, setBorrowerAddress] = useState("");
  const [amountLent, setAmountLent] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [repaymentTerms, setRepaymentTerms] = useState("");
  const [loanId, setLoanId] = useState("");
  const [loanCreated, setLoanCreated] = useState(false);

  const handleCreateLoan = async (e) => {
    e.preventDefault();

    if (!lenderAddress || !borrowerAddress || !amountLent || !interestRate || !repaymentTerms) {
      alert("Please fill all fields.");
      return;
    }

    if (!window.ethereum) {
      alert("MetaMask is not installed.");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new Contract(loanRequestContract.address, loanRequestContract.abi, signer);

      // Send transaction to blockchain
      const tx = await contract.createLoanRequest(
        parseEther(amountLent.toString()), // Convert to Wei
        interestRate,
        repaymentTerms
      );

      await tx.wait();

      // Retrieve loan ID from contract (assuming loanCount exists)
      const loanCount = await contract.loanCount();
      setLoanId(loanCount.toString());

      setLoanCreated(true);
      alert("Loan created successfully!");
    } catch (error) {
      console.error("Error creating loan:", error);
      alert("Failed to create loan.");
    }
  };

  const handleFundLoan = async (e) => {
    e.preventDefault();

    if (!loanId) {
      alert("Create a loan first.");
      return;
    }

    if (!window.ethereum) {
      alert("MetaMask is not installed.");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new Contract(loanRepaymentContract.address, loanRepaymentContract.abi, signer);

      const tx = await contract.fundLoan(loanId, {
        value: parseEther(amountLent.toString()), // Send amount as value
      });

      await tx.wait();
      alert("Loan funded successfully!");
    } catch (error) {
      console.error("Error funding loan:", error);
      alert("Failed to fund loan.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f0f8ff", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "30px" }}>
      <h2>{loanCreated ? "Fund Loan" : "Provide Loan Offer"}</h2>
      <form onSubmit={loanCreated ? handleFundLoan : handleCreateLoan} style={{ backgroundColor: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", width: "400px", textAlign: "center" }}>
        <input type="text" placeholder="Your C-Chain Address" value={lenderAddress} onChange={(e) => setLenderAddress(e.target.value)} required style={{ width: "90%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }} />
        <input type="text" placeholder="Borrower's C-Chain Address" value={borrowerAddress} onChange={(e) => setBorrowerAddress(e.target.value)} required style={{ width: "90%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }} />
        <input type="number" placeholder="Loan Amount (in tokens)" value={amountLent} onChange={(e) => setAmountLent(e.target.value)} required style={{ width: "90%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }} />
        <input type="number" placeholder="Interest Rate (%)" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} required style={{ width: "90%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }} />
        <input type="text" placeholder="Repayment Terms (e.g., 12 months)" value={repaymentTerms} onChange={(e) => setRepaymentTerms(e.target.value)} required style={{ width: "90%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }} />

        {!loanCreated && <button type="submit" style={{ width: "95%", padding: "15px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer", marginTop: "15px" }}>Create Loan</button>}
        {loanCreated && (
          <>
            <button type="submit" style={{ width: "95%", padding: "15px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer", marginTop: "15px" }}>Fund Loan</button>
            <p>Loan ID: {loanId}</p>
          </>
        )}
      </form>
      <Link to="/LenderDashboardPage" style={{ marginTop: "15px", textDecoration: "none", color: "#007bff" }}>Back to Dashboard</Link>
    </div>
  );
};

export default LenderPage;


