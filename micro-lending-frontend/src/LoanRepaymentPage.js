import React, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import LoanRepayment from "./LoanRepayment.json"; 

const LoanRepaymentPage = () => {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [amount, setamount] = useState("");
  const [repaymentStatus, setRepaymentStatus] = useState("");

  const userId = localStorage.getItem("userId");

  const contractAddress = "0xD76e1EbC8f2D2Affc0a9B9567034F489a9Aa6940";

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

  const handleRepayment = async (loanId) => {
    if (!amount || isNaN(amount)) {
      setRepaymentStatus("Please enter a valid amount.");
      return;
    }

    try {
      const provider = new ethers.providers.JsonRpcProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, LoanRepayment, signer);

      const tx = await contract.payLoan(loanId, {
        value: ethers.utils.parseEther(amount),
      });

      await tx.wait();

      setRepaymentStatus("Repayment successful!");
      setamount(""); 
    } catch (error) {
      console.error("Error making repayment:", error);
      setRepaymentStatus("Error making repayment. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Loan Repayment</h2>

      {isLoading ? (
        <p>Loading loans...</p>
      ) : loans.length > 0 ? (
        <div>
          {loans.map((loan) => (
            <div key={loan.loanId} style={styles.loanItem}>
              <p><strong>Lender Address:</strong> {loan.lenderAddress}</p>
              <p><strong>Loan Amount:</strong> {loan.amount} AVAX</p>
              <p><strong>Status:</strong> {loan.status}</p>
              <button
                onClick={() => setSelectedLoan(loan)}
                style={styles.repaymentButton}
              >
                Repay Loan
              </button>
            </div>
          ))}

          {selectedLoan && (
            <div style={styles.formContainer}>
              <h3>Repay Loan: {selectedLoan.loanId}</h3>
              <div>
                <label>Amount to repay (in AVAX):</label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setamount(e.target.value)}
                  style={styles.input}
                />
              </div>
              <button
                onClick={() => handleRepayment(selectedLoan.loanId)}
                style={styles.submitButton}
              >
                Submit Repayment
              </button>
              {repaymentStatus && <p>{repaymentStatus}</p>}
            </div>
          )}
        </div>
      ) : (
        <p>No loans found.</p>
      )}
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
  loanItem: {
    padding: "15px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  repaymentButton: {
    padding: "10px 15px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  formContainer: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding: "10px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "10px",
  },
  submitButton: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default LoanRepaymentPage;

