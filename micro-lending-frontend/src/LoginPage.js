// LoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  // Inline styles
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f8ff', // Light blue background
      color: '#333',
      padding: '40px', // Increased padding
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
      backgroundColor: 'white',
      padding: '90px', // Increased padding
      borderRadius: '12px', // Slightly larger border radius
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // More pronounced shadow
      width: '400px', // Increased width
      textAlign: 'center',
    },
    input: {
      width: '100%',
      padding: '15px', // Increased padding
      margin: '15px 0', // Increased margin
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px', // Increased font size
    },
    button: {
      width: '130px',
      padding: '14px', // Increased padding
      backgroundColor: '#007bff', // Bootstrap primary color
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontWeight: 'bold',
      fontSize: '16px', // Increased font size
      cursor: 'pointer',
    },
    link: {
      marginTop: '15px',
      textDecoration: 'none',
      color: '#007bff',
      fontSize: '16px', // Increased font size
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ fontSize: '2rem' }}>Login</h2> {/* Increased font size */}
      <form onSubmit={handleLogin} style={styles.form}>
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
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <Link to="/signup" style={styles.link}>Don't have an account? Signup</Link>
    </div>
  );
};

export default LoginPage;