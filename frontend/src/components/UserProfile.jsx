import React from 'react';

const UserProfile = () => {
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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
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
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          onClick={() => alert('Implement logout')}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;