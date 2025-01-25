import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BorrowerNotificationPage = () => {
  const [loans, setLoans] = useState([]);
  const [paidLoans, setPaidLoans] = useState([]);

  const userId = localStorage.getItem('userId'); // Assume borrower ID is in localStorage

  useEffect(() => {
    // Fetch loans lent to borrower
    const fetchLoans = async () => {
      try {
        const response = await axios.get(`/api/borrower/loans/${userId}`);
        setLoans(response.data);
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };

    // Fetch loans that the borrower has paid
    const fetchPaidLoans = async () => {
      try {
        const response = await axios.get(`/api/borrower/paid-loans/${userId}`);
        setPaidLoans(response.data);
      } catch (error) {
        console.error('Error fetching paid loans:', error);
      }
    };

    fetchLoans();
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
      <h2>Borrower Notifications</h2>

      <h3>Loans Lent to You</h3>
      {loans.length > 0 ? (
        loans.map((loan, index) => (
          <div key={index} style={styles.card}>
            <p style={styles.title}>Loan from: {loan.lenderAddress}</p>
            <p style={styles.detail}>Amount: {loan.amount} AVAX</p>
            <p style={styles.detail}>Repayment Terms: {loan.repaymentTerms}</p>
            <p style={styles.detail}>Interest Rate: {loan.interestRate}</p>
            <p style={styles.detail}>Status: {loan.status}</p>
          </div>
        ))
      ) : (
        <p>No loans found.</p>
      )}

      <h3>Loans Paid</h3>
      {paidLoans.length > 0 ? (
        paidLoans.map((loan, index) => (
          <div key={index} style={styles.card}>
            <p style={styles.title}>Paid Loan to: {loan.lenderAddress}</p>
            <p style={styles.detail}>Amount: {loan.amount} AVAX</p>
            <p style={styles.detail}>Paid Date: {loan.paidDate}</p>
            <p style={styles.detail}>Status: Paid</p>
          </div>
        ))
      ) : (
        <p>No paid loans found.</p>
      )}
    </div>
  );
};

export default BorrowerNotificationPage;
