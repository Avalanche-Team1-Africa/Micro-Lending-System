// NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // Full viewport height
      textAlign: 'center',
      backgroundColor: '#f8f9fa', // Light background color
    },
    heading: {
      fontSize: '5rem',
      color: '#dc3545', // Bootstrap danger color
    },
    subheading: {
      fontSize: '2rem',
      margin: '10px 0',
    },
    paragraph: {
      fontSize: '1.2rem',
      marginBottom: '20px',
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
      margin: '20px 0',
    },
    homeButton: {
      padding: '10px 20px',
      fontSize: '1rem',
      color: 'white',
      backgroundColor: '#007bff', // Bootstrap primary color
      border: 'none',
      borderRadius: '5px',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    homeButtonHover: {
      backgroundColor: '#0056b3', // Darker shade on hover
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <h2 style={styles.subheading}>Oops! Page Not Found</h2>
      <p style={styles.paragraph}>The page you are looking for does not exist.</p>
      <img
        src="https://via.placeholder.com/400"
        alt="Not Found"
        style={styles.image}
      />
      <Link to="/" style={styles.homeButton}>Go to Home</Link>
    </div>
  );
};

export default NotFoundPage;