// LoanDetailsPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LoanDetailsPage = () => {
  // Sample data for demonstration purposes
  const loanDetails = {
    amount: 3000,
    terms: '12 months',
    borrower: 'Alice Johnson',
    repaymentSchedule: [
      { dueDate: '2023-10-01', amount: 250 },
      { dueDate: '2023-11-01', amount: 250 },
      { dueDate: '2023-12-01', amount: 250 },
    ],
    status: 'Active',
    penalties: 'No penalties applied.',
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh',
      padding: '40px',
    },
    section: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    link: {
      textDecoration: 'none',
      color: '#007bff',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Loan Details</h2>
      <section style={styles.section}>
        <h3>Loan Information</h3>
        <p>Amount: ${loanDetails.amount}</p>
        <p>Terms: {loanDetails.terms}</p>
        <p>Borrower: {loanDetails.borrower}</p>
        <p>Status: {loanDetails.status}</p>
      </section>
      <section style={styles.section}>
        <h3>Repayment Schedule</h3>
        <ul>
          {loanDetails.repaymentSchedule.map((payment, index) => (
            <li key={index}>
              Due Date: {payment.dueDate}, Amount: ${payment.amount}
            </li>
          ))}
        </ul>
      </section>
      <section style={styles.section}>
        <h3>Penalties/Rewards</h3>
        <p>{loanDetails.penalties}</p>
      </section>
      <button style={styles.button}>Make Payment</button>
      <Link to="/my-loans" style={styles.link}>Back to My Loans</Link>
    </div>
  );
};

export default LoanDetailsPage;