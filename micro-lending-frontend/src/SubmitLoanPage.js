// SubmitLoanPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SubmitLoanPage = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [repaymentTerms, setRepaymentTerms] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [collateral, setCollateral] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle loan submission logic here
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
    },
    form: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      width: '400px',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      padding: '15px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    link: {
      marginTop: '15px',
      textDecoration: 'none',
      color: '#007bff',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Submit Loan Request</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="number"
          placeholder="Loan Amount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
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
          placeholder="Purpose of the Loan"
          value={loanPurpose}
          onChange={(e) => setLoanPurpose(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Collateral (if applicable)"
          value={collateral}
          onChange={(e) => setCollateral(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Submit Request</button>
      </form>
      <Link to="/dashboard" style={styles.link}>Back to Dashboard</Link>
    </div>
  );
};

export default SubmitLoanPage;