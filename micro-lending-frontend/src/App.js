import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import DashboardPage from './DashboardPage';
import NotFoundPage from './NotFoundPage'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

         {/* Authentication Pages */}
         <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SignupPage" element={<SignupPage />} />

        {/* User Dashboard */}
        <Route path="/DashboardPage" element={<DashboardPage />} />

        {/* 404 Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />



      </Routes>
    </Router>
  );
};

export default App;