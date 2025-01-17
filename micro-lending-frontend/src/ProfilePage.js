// ProfilePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Handle profile update logic here
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh',
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
      <h2>Profile Page</h2>
      <form onSubmit={handleProfileUpdate} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          style={styles.input}
        />
        <input
          type="file"
          onChange={(e) => setProfilePicture(e.target.files[0])}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Save Changes</button>
      </form>
      <Link to="/dashboard" style={styles.link}>Back to Dashboard</Link>
    </div>
  );
};

export default ProfilePage;