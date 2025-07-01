import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<UserProfilePage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;

