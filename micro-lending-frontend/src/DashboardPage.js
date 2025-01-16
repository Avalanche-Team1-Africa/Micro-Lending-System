// DashboardPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  // Sample data for demonstration purposes
  const totalAmountLent = 5000; // Example value
  const totalAmountBorrowed = 3000; // Example value
  const repaymentStatus = "On Track"; // Example status

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f8ff', // Light blue background
      minHeight: '100vh',
    },
    nav: {
      width: '250px',
      padding: '20px',
      borderRight: '1px solid #ccc',
      backgroundColor: 'white',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    },
    navTitle: {
      fontSize: '1.5rem',
      marginBottom: '20px',
    },
    navLink: {
      display: 'block',
      margin: '10px 0',
      textDecoration: 'none',
      color: '#007bff', // Bootstrap primary color
      fontWeight: 'bold',
    },
    main: {
      padding: '20px',
      flex: 1,
      backgroundColor: 'white',
    },
    section: {
      marginBottom: '20px',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    button: {
      padding: '10px 20px',
      margin: '10px 0',
      backgroundColor: '#007bff', // Bootstrap primary color
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    buttonLink: {
      textDecoration: 'none',
      color: 'white',
    },
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <h3 style={styles.navTitle}>Dashboard Menu</h3>
        <Link to="/submit-loan" style={styles.navLink}>Submit Loan Request</Link>
        <Link to="/my-loans" style={styles.navLink}>View My Loans</Link>
        <Link to="/profile" style={styles.navLink}>Profile</Link>
        <Link to="/notifications" style={styles.navLink}>Notifications</Link>
      </nav>
      <main style={styles.main}>
        <h2>Dashboard Overview</h2>
        <section style={styles.section}>
          <h3>Overview</h3>
          <p>Total Amount Lent: ${totalAmountLent}</p>
          <p>Total Amount Borrowed: ${totalAmountBorrowed}</p>
          <p>Repayment Status: {repaymentStatus}</p>
        </section>
        <section style={styles.section}>
          <h3>Quick Actions</h3>
          <button style={styles.button}>
            <Link to="/submit-loan" style={styles.buttonLink}>Submit New Loan</Link>
          </button>
          <button style={styles.button}>
            <Link to="/my-loans" style={styles.buttonLink}>View My Loans</Link>
          </button>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;