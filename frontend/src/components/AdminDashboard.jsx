import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your actual backend base URL
  const BASE_URL = import.meta.env.VITE_APP_BASE_URI;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/users`);
        const data = await res.json();
        setUsers(data);

      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users.');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleVerify = async (userId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });

      const data = await res.json();
      alert(data.message || 'User verified');

      // Refresh users in UI
      setUsers(prev =>
        prev.map(u =>
          u._id === userId
            ? {
                ...u,
                regStatus: 'Verified'
              }
            : u
        )
      );
    } catch (err) {
      console.error('Verification failed:', err);
      alert('Failed to verify user');
    }
  };

  const handleRemind = async userId => {
    try {
      const res = await fetch(`${BASE_URL}/remind`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });

      const data = await res.json();
      alert(data.message || 'Reminder sent');
    } catch (err) {
      console.error('Reminder failed:', err);
      alert('Failed to send reminder');
    }
  };

  if (loading) return <div className="p-4">Loading users...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Admin Dashboard</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Reg Status</th>
                <th className="border px-4 py-2">Proof</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i} className="text-sm">
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.regStatus}</td>
                  <td className="border px-4 py-2">
                    {user.proofUrl ? (
                      <a
                        href={user.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Proof
                      </a>
                    ) : (
                      'No proof'
                    )}
                  </td>
                  <td className="border px-4 py-2 flex flex-col gap-1">
                    <button
                      onClick={() => handleVerify(user._id, 'reg')}
                      className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Verify Registration
                    </button>
                    <button
                      onClick={() => handleRemind(user._id)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Remind
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;