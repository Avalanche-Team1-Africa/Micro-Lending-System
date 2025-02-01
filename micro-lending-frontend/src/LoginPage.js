import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode} from 'jwt-decode';
import { json } from 'body-parser';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
 console.log( "Sending request with: ", {email, password});
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', JSON.stringify ({
        email,
        password }),
      {
        headers: {
          'Content-Type' : 'application/json'
        }
    
      }  );

      const { token, user } = response.data;

      if (!token || !user?._id) {
        setError("Invalid response from server");
        return;
      }

      // Store token in local storage
      localStorage.setItem('token', token);
      localStorage.setItem("userId", user._id); // Store user ID after successful login

      // Decode the token to get the user role
      const decoded = jwtDecode(token);
      const userRole = decoded.role;

      // Redirect based on user role
      if (userRole === 'borrower') {
        navigate("/BorrowerDashboardPage");
      } else if (userRole === 'lender') {
        navigate("/LenderDashboardPage");
      } else {
        setError('Unauthorized access');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f8ff',
      color: '#333',
      padding: '60px',
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
      width: '95%',
      padding: '15px',
      margin: '15px 0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
    },
    button: {
      width: '95%',
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
      <h2 style={{ fontSize: '2rem' }}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        {error && <div style={styles.errorMessage}>{error}</div>}
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
      <Link to="/SignupPage" style={styles.link}>Don't have an account? Signup</Link>
    </div>
  );
};

export default LoginPage;
