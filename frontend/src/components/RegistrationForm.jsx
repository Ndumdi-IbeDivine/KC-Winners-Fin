import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const RegistrationForm = () => {
  const navigate = useNavigate();

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
      console.log('Submitting registration data...', data);
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, 
        data,
        { withCredentials: true }
      );
      setMessage('Registration successful!');
      console.log(res.data);
      navigate('/account');
    } catch (err) {
      setMessage('Registration failed.');
      console.error('Error Submitting Registration', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      
      <div className="w-full max-w-5xl bg-yellow-100 shadow-2xl rounded-2xl p-6 sm:p-10">

        <h1 className="text-3xl font-bold text-center mb-4 text-green-900">
          KC-WINNERS CONTRIBUTION REGISTRATION
        </h1>

        {/* 🔷 Instructions */}
        <div className="bg-blue-50 border border-blue-300 p-4 rounded mb-8 text-sm text-gray-700 whitespace-pre-wrap">
          Welcome to KCWINNERS Wealth Solution Initiative — a division of KCWINNERS Global Industries Limited.

          📝 To register:
          - Pay ₦3,000 Registration Fee 
          - Contribute ₦2,000 weekly for 30 weeks (7 months) — every Thursday
          - Defaulting attracts double payment
          - Pay ₦5,000 Clearance Fee
          - Receive ₦100,000 + 10% in foodstuff at end

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
        <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl p-6 sm:p-10 relative overflow-hidden" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2390ee90' fill-opacity='0.1'%3E%3Cpath d='M10 0a2 2 0 012 2v1a2 2 0 11-4 0V2a2 2 0 012-2zm0 20a2 2 0 01-2-2v-1a2 2 0 114 0v1a2 2 0 01-2 2zM0 10a2 2 0 012-2h1a2 2 0 110 4H2a2 2 0 01-2-2zm20 0a2 2 0 01-2 2h-1a2 2 0 110-4h1a2 2 0 012 2zM4.22 4.22a2 2 0 012.83 0l.7.7a2 2 0 11-2.83 2.83l-.7-.7a2 2 0 010-2.83zm11.31 11.31a2 2 0 01-2.83 0l-.7-.7a2 2 0 112.83-2.83l.7.7a2 2 0 010 2.83zM4.22 15.78a2 2 0 010-2.83l.7-.7a2 2 0 112.83 2.83l-.7.7a2 2 0 01-2.83 0zm11.31-11.31a2 2 0 010 2.83l-.7.7a2 2 0 11-2.83-2.83l.7-.7a2 2 0 012.83 0z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '20px 20px'
        }}>
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

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit" 
                disabled={loading} 
                className="w-full bg-green-600 hover:bg-black text-white font-bold py-3 px-6 rounded mt-4 transition duration-200">
                {loading ? 'Submitting...' : 'Register Now'}
              </button>
              {message && <p className="mt-3 text-red-600">{message}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
