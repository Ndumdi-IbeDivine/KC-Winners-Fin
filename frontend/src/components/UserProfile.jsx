import React from 'react';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data (if stored in localStorage or cookies)
    localStorage.removeItem('userToken');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-10 bg-green-700 text-white px-6 py-4 shadow-md flex items-center justify-between">
      {/* Left: Logo and Name */}
      <div className="flex items-center space-x-3">
        {/* <img src={logo} alt="KC Winners Logo" className="h-10 w-10 object-contain rounded-full" /> */}
        <span className="text-xl sm:text-2xl font-bold">KC WINNERS</span>
      </div>

      {/* Right: Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded transition duration-200"
      >
        Logout
      </button>
    </nav>
  );
};

const UserProfile = () => {
  const navigate = useNavigate();

    // Placeholder data – replace with real user data from props/context later
  const user = {
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    phone: '08012345678',
    contributions: [
      { id: 1, status: 'Active', balance: '₦10,000' },
      { id: 2, status: 'Pending', balance: '₦4,000' },
    ],
  };

  const handleWithdraw = () => {
    //  Trigger withdrawal action
    navigate('/withdraw'); 
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <Navbar />
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Welcome, {user.name}</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Account Details</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Contribution Accounts</h2>
          <div className="space-y-2">
            {user.contributions.map((c) => (
              <div key={c.id} className="border p-3 rounded-md bg-gray-50">
                <p><strong>Account #{c.id}</strong></p>
                <p>Status: <span className="font-medium">{c.status}</span></p>
                <p>Balance: <span className="font-medium">{c.balance}</span></p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleWithdraw}
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default UserProfile;