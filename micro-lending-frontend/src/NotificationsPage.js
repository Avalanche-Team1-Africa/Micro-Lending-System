// NotificationsPage.js
import React, { useEffect, useState } from 'react';

const NotificationsPage = () => {
  const [loanRequests, setLoanRequests] = useState([]);

  useEffect(() => {
    // Simulated fetch from backend or blockchain
    const mockRequests = [
      {
        borrowerAddress: '0xBorrower123',
        loanAmount: 100,
        repaymentTerms: '6 months',
        interestRate: '5%',
        loanPurpose: 'Business expansion',
      },
      {
        borrowerAddress: '0xBorrower456',
        loanAmount: 250,
        repaymentTerms: '12 months',
        interestRate: '7%',
        loanPurpose: 'Education',
      },
    ];
    setLoanRequests(mockRequests);
  }, []);

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
      <h2>Notifications</h2>
      {loanRequests.length > 0 ? (
        loanRequests.map((request, index) => (
          <div key={index} style={styles.card}>
            <p style={styles.title}>Loan Request from: {request.borrowerAddress}</p>
            <p style={styles.detail}>Amount: {request.loanAmount} tokens</p>
            <p style={styles.detail}>Repayment Terms: {request.repaymentTerms}</p>
            <p style={styles.detail}>Interest Rate: {request.interestRate}</p>
            <p style={styles.detail}>Purpose: {request.loanPurpose}</p>
          </div>
        ))
      ) : (
        <p>No loan requests available.</p>
      )}
    </div>
  );
};

export default NotificationsPage;