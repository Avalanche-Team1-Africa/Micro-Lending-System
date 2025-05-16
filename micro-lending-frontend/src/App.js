import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import './index.css'; // Import your CSS file here
import './App.css'; // Import your CSS file here


import BorrowerNotificationPage from './BorrowerNotificationPage';
import LenderNotificationPage from './LenderNotificationPage';
import LenderDashboardPage from './LenderDashboardPage';
import BorrowerDashboardPage from './BorrowerDashboardPage';
import BorrowerPage from './BorrowerPage';
import LenderPage from './LenderPage';
import LoanRepaymentPage from './LoanRepaymentPage';
import ProfilePage from './ProfilePage';
import NotFoundPage from './NotFoundPage';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
<Route path="/BorrowerPage" element={<BorrowerPage/>} />
<Route path="LenderPage" element={<LenderPage />} />
         {/* Authentication Pages */}
         <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SignupPage" element={<SignupPage />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        {/* User Dashboard */}
        <Route path="/BorrowerNotificationPage" element={<BorrowerNotificationPage />} />
        <Route path="/LenderNotificationPage" element={<LenderNotificationPage/>} />
        
        

<Route path="/LenderDashboardPage" element={<LenderDashboardPage />} />
<Route path="/BorrowerDashboardPage" element={<BorrowerDashboardPage />} />
<Route path="/LoanRepaymentPage" element={<LoanRepaymentPage />} />

<Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;