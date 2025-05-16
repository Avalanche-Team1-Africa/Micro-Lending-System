import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import styled, { keyframes } from 'styled-components';
import { fadeIn, zoomIn, slideInUp, bounceIn } from 'react-animations';

// Animation definitions
const fadeInAnimation = keyframes`${fadeIn}`;
const zoomInAnimation = keyframes`${zoomIn}`;
const slideInUpAnimation = keyframes`${slideInUp}`;
const bounceInAnimation = keyframes`${bounceIn}`;

// Styled components
const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow: hidden;
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 450px;
  text-align: center;
  animation: 1s ${zoomInAnimation};
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #4a00e0;
  background: linear-gradient(to right, #4a00e0, #8e2de2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: 1s ${fadeInAnimation};
`;

const InputField = styled.input`
  width: 100%;
  padding: 15px 20px;
  margin: 12px 0;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 4px 20px rgba(74, 0, 224, 0.2);
    transform: scale(1.02);
  }
`;

const SelectField = styled.select`
  width: 100%;
  padding: 15px 20px;
  margin: 12px 0;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  appearance: none;

  &:focus {
    outline: none;
    box-shadow: 0 4px 20px rgba(74, 0, 224, 0.2);
    transform: scale(1.02);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(to right, #4a00e0, #8e2de2);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(74, 0, 224, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(74, 0, 224, 0.4);
  }

  &:active {
    transform: translateY(1px);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
  }

  &:hover::after {
    left: 100%;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4757;
  font-size: 14px;
  margin-bottom: 15px;
  animation: 0.5s ${bounceInAnimation};
`;

const LoginLink = styled(Link)`
  display: inline-block;
  margin-top: 25px;
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  transition: all 0.3s ease;
  position: relative;
  padding-bottom: 5px;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #fff;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 0;
`;

const FloatingElement = styled.div`
  position: absolute;
  display: block;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  bottom: -150px;
  animation: float 15s linear infinite;
  border-radius: 50%;

  &:nth-child(1) {
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
    animation-duration: 20s;
  }

  &:nth-child(2) {
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
  }

  &:nth-child(3) {
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
  }

  &:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
  }

  &:nth-child(5) {
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
  }

  &:nth-child(6) {
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
  }

  &:nth-child(7) {
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
  }

  &:nth-child(8) {
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
  }

  &:nth-child(9) {
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
  }

  &:nth-child(10) {
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
  }

  @keyframes float {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }
    100% {
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
    }
  }
`;

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [role, setRole] = useState('borrower');
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
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      const userRole = decoded.role;

      if (userRole === 'borrower') {
        navigate('/BorrowerDashboardPage');
      } else if (userRole === 'lender') {
        navigate('/LenderDashboardPage');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Container>
      <FloatingElements>
        {[...Array(10)].map((_, i) => (
          <FloatingElement key={i} />
        ))}
      </FloatingElements>
      
      <FormContainer>
        <Title>Create Your Account</Title>
        <form onSubmit={handleSignup}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <InputField
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <InputField
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <InputField
            type="text"
            placeholder="Wallet Address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            required
          />
          <SelectField value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="borrower">Borrower</option>
            <option value="lender">Lender</option>
          </SelectField>
          <SubmitButton type="submit">Sign Up</SubmitButton>
        </form>
        <LoginLink to="/LoginPage">Already have an account? Login</LoginLink>
      </FormContainer>
    </Container>
  );
};

export default SignupPage;