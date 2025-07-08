import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const RegistrationForm = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URI;
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

  const resetForm = () => {
    setFormData({
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
    setRegistrationProof(null);
  };

  const [registrationProof, setRegistrationProof] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value 
    });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRegistrationProof(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const submissionData = new FormData();
      // append all fields
      submissionData.append('fullName', formData.fullName);
      submissionData.append('phone', formData.phone);
      submissionData.append('password', formData.password);
      submissionData.append('sex', formData.sex);
      submissionData.append('address', formData.address);
      submissionData.append('bankName', formData.bankName);
      submissionData.append('accountNumber', formData.accountNumber);
      submissionData.append('nextOfKin', formData.nextOfKin);
      submissionData.append('nextOfKinPhone', formData.nextOfKinPhone);
      submissionData.append('nextOfKinAddress', formData.nextOfKinAddress);
      submissionData.append('numberOfAccounts', formData.numberOfAccounts);
      submissionData.append('depositorName', formData.depositorName);
      if (registrationProof) {
        submissionData.append('registrationProof', registrationProof);
      }

      const res = await axios.post(`${BASE_URL}/api/auth/register`, submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const data = await res.data;

      if (!res.status === 200) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccess("Registration submitted successfully. Awaiting admin verification.");

      resetForm(); // reset fields

      setTimeout(() => {
        navigate('/login');
      }, 2500);


    } catch (err) {
      setError(err.message);
    } finally {
    setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      
      <div className="w-full max-w-5xl bg-yellow-200 shadow-2xl rounded-2xl p-6 sm:p-10">

        <h1 className="text-3xl font-bold text-center mb-4 text-green-900">
          KCWINNERS WEALTH SOLUTION INITIATIVE REGISTRATION
        </h1>

        {/* 🔷 Instructions */}
        <div className="bg-blue-50 border border-blue-300 p-4 rounded mb-8 text-sm text-gray-700 whitespace-pre-wrap">
          Welcome to KCWINNERS Wealth Solution Initiative — a division of KCWINNERS Global Industries Limited.

          <br />
          This is a new contibution scheme that allows members to contribute N2,000 on or before Thursdays of every week

          <br />
          <br />
          📝 TO REGISTER:
          - Pay ₦3,000 Registration Fee
          - Upload payment receipt in registration form 
          <br />
          📌 PAYMENT INFO:
          Bank: FIDELITY BANK
          Account No: 5600472456
          Name: KCWINNERS GLOBAL INDUSTRIALS LIMITED

          <br />
          <br />
          ❗TERMS AND CONDITION
          <br />
          - Contribution of ₦2,000 weekly for 30 weeks(7 months) — on or before every Thursday
          <br />
          - Defaulting of contribution payment attracts double payment of total amount owed
          <br />
          - NO transfer of funds from one person, one member to a registered account
          <br />
          - Every member is expected to have a referral within 3 months from start date, in the case of no referaal Member(s) will collect the ₦60,000 savings without incentives
          <br />
          - For 50 account and above, Members are expected to complete their payment in four(4) parts
          <br />
          - Every default payment and clearance fee of ₦2,000 must be payed before any settlement
          <br />
          - Receive ₦100,000 in return for the ₦60,000 contribution + 20% incentive in foodstuffs at the end of contribution
          <br />
          - In case of death/unforseen circumstances, the Next of KIn is expected to complete savings and pay all outstanding defaults to the said period as stated above. NOTE: A grace period of one month(4 weeks) would be given too report the situation to the organization
          <br />
          <p><strong>⚠️ NOTE: THERE IS NO REFUND OF MONEY IN THE CASE OF BREACH OF CONTRACT</strong></p>


          <br />
          <br />
          📤 Upload:
          - Proof of ₦3,000 registration payment
          - If account holder name isn’t visible(if you used POS), include depositor name
          <br />
          - One user can have multiple contribution accounts

          <br />
          <br />
          <p className="text-300 font-bold text-center mb-4 text-green-900">REGISTER BELOW</p>
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
              <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} required className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none"/>
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit" 
                disabled={loading} 
                className="w-full bg-green-600 hover:bg-black text-white font-bold py-3 px-6 rounded mt-4 transition duration-200">
                {loading ? 'Submitting...' : 'Register Now'}
              </button>
              {success && <div className="text-green-600 mt-2">{success}</div>}
              {error && <div className="text-red-600 mt-2">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
