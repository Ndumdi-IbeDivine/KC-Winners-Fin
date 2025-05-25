import React from 'react';
import RegistrationForm from '../components/RegistrationForm';

const RegisterPage = () => {
console.log('Registration page rendered');
    
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <RegistrationForm />
    </div>
  );
};

export default RegisterPage;
