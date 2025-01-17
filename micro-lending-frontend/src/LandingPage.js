// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  // Inline styles
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f8ff', // Light blue background
      color: '#333',
      padding: '20px',
      minHeight: '100vh',
    },
    header: {
      backgroundColor: '#007bff', // Bootstrap primary color
      color: 'white',
      padding: '20px',
      textAlign: 'center',
    },
    nav: {
      margin: '10px 0',
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      margin: '0 15px',
      fontWeight: 'bold',
    },
    section: {
      margin: '20px 0',
      padding: '20px',
      borderRadius: '8px',
      backgroundColor: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    footer: {
      textAlign: 'center',
      marginTop: '170px',
      padding: '5px',
      backgroundColor: '#007bff',
      color: 'white',
      position: 'relative',
      bottom: '40',
      width: '100%',
    },
    button: {
      display: 'inline-block',
      padding: '10px 20px',
      marginTop: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '5px',
      fontWeight: 'bold',
    },
    buttonHover: {
      backgroundColor: '#0056b3', // Darker shade on hover
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Micro-Lending System</h1>
        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/LoginPage" style={styles.navLink}>Login</Link>
          <Link to="/SignupPage" style={styles.navLink}>Signup</Link>
        </nav>
      </header>
      <section style={styles.section}>
        <h2>Welcome to Peer-to-Peer Lending</h2>
        <p>Enable peer-to-peer lending with smart contracts.</p>
        <Link to="/SignupPage" style={styles.button}>Get Started</Link>
      </section>
      <section style={styles.section}>
        <h3>Features</h3>
        <ul>
          <li>Submit Loan Requests</li>
          <li>Enforce Repayment Deadlines</li>
          <li>Automatic Penalties or Rewards</li>
        </ul>
      </section>
      <footer style={styles.footer}>
        <p>© 2023 Micro-Lending System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;