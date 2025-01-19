import React, { useState } from "react";
import { Link } from "react-router-dom";

const LenderPage = () => {
  const [lenderAddress, setLenderAddress] = useState("");
  const [borrowerAddress, setBorrowerAddress] = useState("");
  const [amountLent, setAmountLent] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [repaymentTerms, setRepaymentTerms] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare loan offer object
    const loanOffer = {
      lenderAddress,
      borrowerAddress,
      amountLent,
      interestRate,
      repaymentTerms,
    };

    // Simulate sending loan offer (to be replaced with actual backend/API logic)
    console.log("Loan offer submitted:", loanOffer);
    alert("Loan offer sent successfully!");
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f0f8ff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "30px",
    },
    form: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
      width: "400px",
      textAlign: "center",
    },
    input: {
      width: "90%",
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    button: {
      width: "95%",
      padding: "15px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "15px",
    },
    link: {
      marginTop: "15px",
      textDecoration: "none",
      color: "#007bff",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Provide Loan Offer</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Your C-Chain Address"
          value={lenderAddress}
          onChange={(e) => setLenderAddress(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Borrower's C-Chain Address"
          value={borrowerAddress}
          onChange={(e) => setBorrowerAddress(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Loan Amount (in tokens)"
          value={amountLent}
          onChange={(e) => setAmountLent(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Interest Rate (%)"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Repayment Terms (e.g., 12 months)"
          value={repaymentTerms}
          onChange={(e) => setRepaymentTerms(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Offer Loan
        </button>
      </form>
      <Link to="/LenderDashboardPage" style={styles.link}>
        Back to Dashboard
      </Link>
    </div>
  );
};

export default LenderPage;
