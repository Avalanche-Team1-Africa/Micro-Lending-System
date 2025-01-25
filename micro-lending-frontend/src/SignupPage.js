import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [role, setRole] = useState('borrower'); // Default role
  const [error, setError] = useState('');
  const navigate = useNavigate();

 const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/api/auth/signup', {
            username,
            email,
            password,
            walletAddress,
            role,
        });

        const { token } = response.data;

        // Store JWT token
        localStorage.setItem('token', token);

        // Decode token to get user role
        const decoded = jwtDecode(token);
        const userRole = decoded.role;  // Make sure the role is included

        // Redirect based on role
        if (userRole === 'borrower') {
            navigate('/BorrowerDashboardPage');
        } else if (userRole === 'lender') {
            navigate('/LenderDashboardPage');
        }
    } catch (err) {
        setError(err.response?.data?.message || 'Signup failed');
    }
};
 

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f8ff',
      color: '#333',
      padding: '40px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
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
    select: {
      width: '100%',
      padding: '15px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      backgroundColor: '#fff',
    },
    button: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontWeight: 'bold',
      fontSize: '16px',
      cursor: 'pointer',
    },
    errorMessage: {
      color: 'red',
      fontSize: '14px',
      marginBottom: '10px',
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
        {error && <div style={styles.errorMessage}>{error}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
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
        <input
          type="text"
          placeholder="Wallet Address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          required
          style={styles.input}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.select}>
          <option value="borrower">Borrower</option>
          <option value="lender">Lender</option>
        </select>
        <button type="submit" style={styles.button}>Sign up</button>
      </form>
      <Link to="/LoginPage" style={styles.link}>Already have an account? Login</Link>
    </div>
  );
};

export default SignupPage;

