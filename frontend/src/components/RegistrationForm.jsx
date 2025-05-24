import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    sex: '',
    address: '',
    nextOfKin: '',
    nextOfKinPhone: '',
    nextOfKinAddress: '',
    bankName: '',
    accountNumber: '',
    numberOfAccounts: '',
    depositorName: '',
  });

  const [registrationProof, setRegistrationProof] = useState(null);
  const [clearanceProof, setClearanceProof] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'registration') setRegistrationProof(file);
    else setClearanceProof(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (registrationProof)
      data.append('registrationProof', registrationProof);
    if (clearanceProof)
      data.append('clearanceProof', clearanceProof);

    try {
      const res = await axios.post('/api/auth/register', data);
      setMessage('✅ Registration successful!');
      console.log(res.data);
    } catch (err) {
      setMessage('❌ Registration failed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-800">
        KCWINNERS Contribution Registration
      </h1>

      {/* 🔷 Instructions */}
      <div className="bg-blue-50 border border-blue-300 p-4 rounded mb-6 text-sm text-gray-700 whitespace-pre-wrap">
        Welcome to KCWINNERS Wealth Solution Initiative — a division of KCWINNERS Global Industries Limited.

        📝 To register:
        - Contribute ₦2,000 weekly for 30 weeks (7 months) — every Thursday
        - Defaulting attracts double payment
        - Receive ₦100,000 + 10% in foodstuff at end
        - Pay ₦3,000 Registration Fee
        - Pay ₦5,000 Clearance Fee

        📌 Payment Info:
        Bank: Fidelity Bank
        Account No: 5600472456
        Name: KCWINNERS GLOBAL INDUSTRIALS LIMITED

        📤 Upload:
        - Proof of ₦3,000 registration payment
        - Proof of ₦5,000 clearance fee payment
        - If account holder name isn’t visible, include depositor name
        - One user can have multiple contribution accounts
      </div>

      {/* 🧾 Form */}
<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

  {/* Full Name */}
  <div>
    <label className="block mb-1 font-medium text-gray-700" htmlFor="fullName">Full Name</label>
    <input
      name="fullName"
      id="fullName"
      onChange={handleChange}
      placeholder="Enter your full name"
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Email */}
  <div>
    <label className="block mb-1 font-medium text-gray-700" htmlFor="email">Email</label>
    <input
      type="email"
      name="email"
      id="email"
      onChange={handleChange}
      placeholder="Enter your email"
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Phone Number */}
  <div>
    <label className="block mb-1 font-medium text-gray-700" htmlFor="phone">Phone Number</label>
    <input
      name="phone"
      id="phone"
      onChange={handleChange}
      placeholder="Enter your phone number"
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Password */}
  <div>
    <label className="block mb-1 font-medium text-gray-700" htmlFor="password">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      onChange={handleChange}
      placeholder="Enter a secure password"
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Sex */}
  <div>
    <label className="block mb-1 font-medium text-gray-700" htmlFor="sex">Sex</label>
    <select
      name="sex"
      id="sex"
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select Sex</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </div>

  {/* Address */}
  <div>
    <label className="block mb-1 font-medium text-gray-700" htmlFor="address">Home Address</label>
    <input
      name="address"
      id="address"
      onChange={handleChange}
      placeholder="Your address"
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Next of Kin */}
  <div>
    <label className="block mb-1 font-medium text-gray-700" htmlFor="nextOfKin">Next of Kin</label>
    <input
      name="nextOfKin"
      id="nextOfKin"
      onChange={handleChange}
      placeholder="Full name of next of kin"
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Next of Kin Phone */}
  <div>
    <label className="block mb-1 font-medium text-gray-700" htmlFor="nextOfKinPhone">Next of Kin Phone</label>
    <input
      name="nextOfKinPhone"
      id="nextOfKinPhone"
      onChange={handleChange}
      placeholder="Phone number of next of kin"
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Next of Kin Address */}
  <div>
    <label className="block mb-1 font-medium text-gray-700" htmlFor="nextOfKinAddress">Next of Kin Address</label>
    <input
      name="nextOfKinAddress"
      id="nextOfKinAddress"
      onChange={handleChange}
      placeholder="Address of next of kin"
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Bank Name */}
  <div>
    <label className="block mb-1 font-medium text-gray-700" htmlFor="bankName">Bank Name</label>
    <input
      name="bankName"
      id="bankName"
      onChange={handleChange}
      placeholder="Your bank name"
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Account Number */}
  <div>
    <label className="block mb-1 font-medium text-gray-700" htmlFor="accountNumber">Account Number</label>
    <input
      name="accountNumber"
      id="accountNumber"
      onChange={handleChange}
      placeholder="Your account number"
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Number of Accounts */}
  <div>
    <label className="block mb-1 font-medium text-gray-700" htmlFor="numberOfAccounts">Number of Contribution Accounts</label>
    <input type="number"
      name="numberOfAccounts"
      id="numberOfAccounts"
      min="1"
      max='10'
      onChange={handleChange}
      placeholder="e.g. 1 or 2" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Depositor Name */}
  <div>
    <label className="block mb-1 font-medium text-gray-700" htmlFor="depositorName">Depositor Name (if not your name)</label>
    <input name="depositorName" 
    id="depositorName" 
    onChange={handleChange} 
    placeholder="Name on payment receipt" 
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
  </div>

  {/* File Uploads */}
  <div className="md:col-span-2">
    <label className="block mb-1 font-medium text-gray-700">Upload Registration Proof</label>
    <input type="file" accept="image/*,application/pdf" onChange={e => handleFileChange(e, 'registration')} required className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none"/>
  </div>

  <div className="md:col-span-2">
    <label className="block mb-1 font-medium text-gray-700">Upload Clearance Fee Proof</label>
    <input
      type="file" 
      accept="image/*,application/pdf" 
      onChange={e => handleFileChange(e, 'clearance')} 
      required 
      className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none"/>
  </div>

  {/* Submit */}
  <div className="md:col-span-2">
    <button
      type="submit" 
      disabled={loading} 
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mt-4 transition">
      {loading ? 'Submitting...' : 'Register Now'}
    </button>
    {message && <p className="mt-3 text-red-600">{message}</p>}
  </div>
</form>

    </div>
  );
};

export default RegistrationForm;
