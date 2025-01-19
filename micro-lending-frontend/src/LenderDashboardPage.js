import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LenderDashboardPage = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const myAddress = "0xYourCChainAddress"; // Assume this comes from user authentication

  useEffect(() => {
    const fetchLoanRequests = async () => {
      try {
        const response = await axios.get(`/api/lender/loan-requests/${myAddress}`);
        setLoanRequests(response.data);
      } catch (error) {
        console.error("Error fetching loan requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoanRequests();
  }, [myAddress]);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Lender Dashboard</h2>
      <section style={styles.section}>
        <h3 style={styles.loanHeader}>Loan Requests</h3>
        {isLoading ? (
          <p style={styles.loadingMessage}>Loading loan requests...</p>
        ) : loanRequests.length > 0 ? (
          <ul style={styles.loanList}>
            {loanRequests.map((loan) => (
              <li key={loan._id} style={styles.loanItem}>
                <p style={styles.loanText}><strong>Borrower Address:</strong> {loan.borrowerAddress}</p>
                <p style={styles.loanText}><strong>Loan Amount:</strong> {loan.loanAmount}</p>
                <p style={styles.loanText}><strong>Interest Rate:</strong> {loan.interestRate}%</p>
                <p style={styles.loanText}><strong>Repayment Terms:</strong> {loan.repaymentTerms}</p>
                <button style={styles.offerButton}>Make an Offer</button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noLoansMessage}>No loan requests found.</p>
        )}
      </section>
      <Link to="/LenderPage" style={styles.newLoanLink}>
        Give a Loan Offer
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
    display: "flex",
    flexDirection: "column",
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
  offerButton: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
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

export default LenderDashboardPage;
