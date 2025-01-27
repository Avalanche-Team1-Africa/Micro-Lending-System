import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BorrowerDashboardPage = () => {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const walletAddress = localStorage.getItem("walletAddress"); // Assuming the user's ID is available in localStorage

  useEffect(() => {
    const fetchLoansByBorrower = async () => {
      if (!walletAddress) {
        setError("");
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await axios.get(`/api/borrower/fetchLoansByBorrower/${walletAddress}`);
        setLoans(response.data);
      } catch (error) {
        console.error("Error fetching loans:", error);
        setError("An error occurred while fetching your loans.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoansByBorrower();
  }, [walletAddress]);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>My Dashboard</h2>

      {/* Display error if any */}
      {error && <p style={styles.errorMessage}>{error}</p>}

      <section style={styles.section}>
        <h3 style={styles.loanHeader}>My Loans</h3>
        {isLoading ? (
          <p style={styles.loadingMessage}>Loading your loans...</p>
        ) : loans.length > 0 ? (
          <ul style={styles.loanList}>
            {loans.map((loan) => (
              <li key={loan._id} style={styles.loanId}>
                <p style={styles.loanText}><strong>Lender Address:</strong> {loan.lender}</p>
                <p style={styles.loanText}><strong>Loan Amount:</strong> {loan.amount} </p>
                <p style={styles.loanText}><strong>Lender Address:</strong> {loan.lender}</p>
                <p style={styles.loanText}><strong>Interest Rate:</strong> {loan.interestRate}</p>
                <p style={styles.loanText}><strong>Repayment Deadline:</strong> {new Date(loan.repaymentDeadline).toLocaleString()}</p> 
                <p style={styles.loanText}><strong>Status:</strong> {loan.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noLoansMessage}>No loans found.</p>
        )}
      </section>

      <Link to="/BorrowerPage" style={styles.newLoanLink}>
        Submit a New Loan Request
      </Link>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    fontSize: "2rem",
    color: "#343a40",
    textAlign: "center",
  },
  errorMessage: {
    color: "red",
    fontSize: "16px",
    textAlign: "center",
    marginBottom: "20px",
  },
  section: {
    width: "80%",
    maxWidth: "900px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  },
  loanHeader: {
    fontSize: "1.5rem",
    color: "#007bff",
    marginBottom: "20px",
    textAlign: "center",
  },
  loanList: {
    listStyleType: "none",
    padding: "0",
  },
  loanItem: {
    padding: "15px",
    borderBottom: "1px solid #ddd",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  loanText: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "8px",
  },
  loadingMessage: {
    color: "#007bff",
    fontSize: "18px",
    textAlign: "center",
  },
  noLoansMessage: {
    fontSize: "18px",
    color: "#6c757d",
    textAlign: "center",
  },
  newLoanLink: {
    display: "block",
    textAlign: "center",
    fontSize: "18px",
    color: "#007bff",
    marginTop: "30px",
    textDecoration: "none",
  },
};

export default BorrowerDashboardPage;

