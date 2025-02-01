import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BorrowerDashboardPage = () => {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId"); 

  useEffect(() => {
    console.log("User ID from localStorage:", userId);
      if (!userId) {
        setError("User ID not found.");
        setIsLoading(false);
        return;
      }
      const fetchLoanRequests = async () => {
        try {
            console.log(`Fetching loan requests for user: ${userId}`); 
            const borrower = "0x20301285102F899Ec34B48B8e5F55eE4785382B8";
            const response = await axios.get(`http://localhost:3000/api/loans/fetchLoanRequests/${borrower}`);
            
            console.log("Response from backend:", response.data); 
            
            setLoans(response.data);
        } catch (error) {
            console.error("Error fetching loans:", error);
            setError("Failed to fetch loans.");
        } finally {
            setIsLoading(false);
        }
    };
    fetchLoanRequests();
  }, [userId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>My Dashboard</h2>
      
      {/* Display error if any */}
      {error && <p style={styles.errorMessage}>{error}</p>}

      <section style={styles.section}>
        <h3 style={styles.loanHeader}>My Dashboard</h3>
        <h4 style={{ ...styles.loanText, textAlign: 'center' }}>role: borrower </h4>

        {isLoading ? (
          <p style={styles.loadingMessage}>Loading your loans...</p>
        ) : loans.length > 0 ? (
          <ul style={styles.loanList}>
            {loans.map((loan) => (
              <li key={loan._id} style={styles.loanItem}>
                <p style={styles.loanText}><strong>Lender Address:</strong> {loan.lender}</p>
                <p style={styles.loanText}><strong>Loan Amount:</strong> {loan.amount} </p>
                <p style={styles.loanText}><strong>My Address:</strong> {loan.borrower}</p>
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
      <div style={styles.linkContainer}>
  <Link to="/BorrowerPage" style={styles.link}>
    Submit a New Loan Request
  </Link>
  <Link to="/LoanRepaymentPage" style={styles.link}>
    Repay Loan
  </Link>
  <Link to="/" style={styles.link}>
    Logout
  </Link>
</div>  
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
    marginBottom: "15px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
    borderLeft: "5px solid #007bff", 
},

  loanText: {
    fontSize: "16px",
    color: "#333",
    margin: "5px 0",
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
  linkContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px", // Adds spacing between links
    marginTop: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "10px 15px",
    border: "2px solid #007bff",
    borderRadius: "5px",
    transition: "0.3s",
  },
};

export default BorrowerDashboardPage;

