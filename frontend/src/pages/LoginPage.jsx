import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
console.log('Registration page rendered');
    
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <LoginForm />
    </div>
  );
};

export default LoginPage;