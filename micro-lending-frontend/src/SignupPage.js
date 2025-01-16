// SignupPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  // Inline styles
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f8ff', // Light blue background
      color: '#333',
      padding: '20px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
      backgroundColor: 'white',
      padding: '90px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      width: '400px',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      padding: '15px',
      margin: '15px 0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
    },
    button: {
      width: '130px',
      padding: '14px',
      backgroundColor: '#007bff', // Bootstrap primary color
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontWeight: 'bold',
      fontSize: '16px',
      cursor: 'pointer',
    },
    link: {
      marginTop: '15px',
      textDecoration: 'none',
      color: '#007bff',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ fontSize: '2rem' }}>Sign up</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Sign up</button>
      </form>
      <Link to="/LoginPage" style={styles.link}>Already have an account?   Login</Link>
    </div>
  );
};

export default SignupPage;