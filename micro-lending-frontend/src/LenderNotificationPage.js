import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LenderNotificationPage = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [lentLoans, setLentLoans] = useState([]);
  const [paidLoans, setPaidLoans] = useState([]);

  const userId = localStorage.getItem('userId'); // Assume lender ID is in localStorage

  useEffect(() => {
    // Fetch loan requests from borrowers
    const fetchLoanRequests = async () => {
      try {
        const response = await axios.get(`/api/lender/loan-requests/${userId}`);
        setLoanRequests(response.data);
      } catch (error) {
        console.error('Error fetching loan requests:', error);
      }
    };

    // Fetch loans successfully lent by the lender
    const fetchLentLoans = async () => {
      try {
        const response = await axios.get(`/api/lender/lent-loans/${userId}`);
        setLentLoans(response.data);
      } catch (error) {
        console.error('Error fetching lent loans:', error);
      }
    };

    // Fetch loans that have been paid
    const fetchPaidLoans = async () => {
      try {
        const response = await axios.get(`/api/lender/paid-loans/${userId}`);
        setPaidLoans(response.data);
      } catch (error) {
        console.error('Error fetching paid loans:', error);
      }
    };

    fetchLoanRequests();
    fetchLentLoans();
    fetchPaidLoans();
  }, [userId]);

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh',
      padding: '30px',
    },
    card: {
      backgroundColor: 'white',
      padding: '20px',
      marginBottom: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    detail: {
      margin: '5px 0',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Lender Notifications</h2>

      <h3>Loan Requests from Borrowers</h3>
      {loanRequests.length > 0 ? (
        loanRequests.map((request, index) => (
          <div key={index} style={styles.card}>
            <p style={styles.title}>Loan Request from: {request.borrowerAddress}</p>
            <p style={styles.detail}>Amount: {request.loanAmount} AVAX</p>
            <p style={styles.detail}>Repayment Terms: {request.repaymentTerms}</p>
            <p style={styles.detail}>Interest Rate: {request.interestRate}</p>
            <p style={styles.detail}>Purpose: {request.loanPurpose}</p>
          </div>
        ))
      ) : (
        <p>No loan requests found.</p>
      )}

      <h3>Loans Lent to Borrowers</h3>
      {lentLoans.length > 0 ? (
        lentLoans.map((loan, index) => (
          <div key={index} style={styles.card}>
            <p style={styles.title}>Loan to: {loan.borrowerAddress}</p>
            <p style={styles.detail}>Amount: {loan.loanAmount} AVAX</p>
            <p style={styles.detail}>Repayment Terms: {loan.repaymentTerms}</p>
            <p style={styles.detail}>Interest Rate: {loan.interestRate}</p>
            <p style={styles.detail}>Status: {loan.status}</p>
          </div>
        ))
      ) : (
        <p>No loans lent yet.</p>
      )}

      <h3>Loans Paid by Borrowers</h3>
      {paidLoans.length > 0 ? (
        paidLoans.map((loan, index) => (
          <div key={index} style={styles.card}>
            <p style={styles.title}>Loan Paid by: {loan.borrowerAddress}</p>
            <p style={styles.detail}>Amount: {loan.amount} AVAX</p>
            <p style={styles.detail}>Paid Date: {loan.paidDate}</p>
            <p style={styles.detail}>Status: Paid</p>
          </div>
        ))
      ) : (
        <p>No loans paid yet.</p>
      )}
    </div>
  );
};

export default LenderNotificationPage;
