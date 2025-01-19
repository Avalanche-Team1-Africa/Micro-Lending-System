import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BorrowerDashboardPage = () => {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userId = "yourUserId"; // Assume the user's ID is available in user context or state

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(`/api/borrower/my-loans/${userId}`);
        setLoans(response.data);
      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchLoans();
    }
  }, [userId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>My Dashboard</h2>
      <section style={styles.section}>
        <h3 style={styles.loanHeader}>My Loans</h3>
        {isLoading ? (
          <p style={styles.loadingMessage}>Loading your loans...</p>
        ) : loans.length > 0 ? (
          <ul style={styles.loanList}>
            {loans.map((loan) => (
              <li key={loan._id} style={styles.loanItem}>
                <p style={styles.loanText}><strong>Lender Address:</strong> {loan.lenderAddress}</p>
                <p style={styles.loanText}><strong>Loan Amount:</strong> {loan.loanAmount}</p>
                <p style={styles.loanText}><strong>Interest Rate:</strong> {loan.interestRate}%</p>
                <p style={styles.loanText}><strong>Repayment Terms:</strong> {loan.repaymentTerms}</p>
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

