import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingContributions, setPendingContributions] = useState([]);
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_APP_BASE_URI;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [regRes, contRes, withdrawRes] = await Promise.all([
          fetch(`${BASE_URL}/api/admin/registrations/pending`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${BASE_URL}/api/admin/contributions/pending`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${BASE_URL}/api/admin/withdrawals/pending`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const regData = await regRes.json();
        const contData = await contRes.json();
        const withdrawData = await withdrawRes.json();

        setPendingUsers(regData || []);
        setPendingContributions(contData || []);
        setPendingWithdrawals(withdrawData || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const handleVerifyUser = async (userId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/registrations/${userId}/verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      alert(data.message || 'User verified');
      setPendingUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error('Error verifying user:', err);
      alert('Failed to verify user');
    }
  };

  const handleVerifyContribution = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/contributions/${id}/verify`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      alert(data.message || 'Contribution verified');
      setPendingContributions((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error('Error verifying contribution:', err);
      alert('Failed to verify contribution');
    }
  };

  const handleVerifyWithdrawal = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/withdrawals/${id}/clear`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      alert(data.message || 'Withdrawal verified');
      setPendingWithdrawals((prev) => prev.filter((w) => w._id !== id));
    } catch (err) {
      console.error('Error verifying withdrawal:', err);
      alert('Failed to verify withdrawal');
    }
  };

  if (loading) return <div className="p-4">Loading admin data...</div>;

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Pending Users */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Pending Registrations</h2>
        {pendingUsers.length === 0 ? (
          <p>No pending users</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Proof</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user.fullName}</td>
                  <td className="border px-4 py-2">{user.phone}</td>
                  <td className="border px-4 py-2">
                    <a
                      href={user.proofOfPaymentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Proof
                    </a>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleVerifyUser(user._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Verify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pending Contributions */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Pending Contributions</h2>
        {pendingContributions.length === 0 ? (
          <p>No pending contributions</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Proof</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingContributions.map((c) => (
                <tr key={c._id}>
                  <td className="border px-4 py-2">{c.user?.fullName || 'N/A'}</td>
                  <td className="border px-4 py-2">₦{c.amount}</td>
                  <td className="border px-4 py-2">
                    <a
                      href={c.proofUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Proof
                    </a>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleVerifyContribution(c._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Verify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pending Withdrawals */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Pending Withdrawals</h2>
        {pendingWithdrawals.length === 0 ? (
          <p>No pending withdrawals</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Proof</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingWithdrawals.map((w) => (
                <tr key={w._id}>
                  <td className="border px-4 py-2">{w.user?.fullName || 'N/A'}</td>
                  <td className="border px-4 py-2">
                    <a
                      href={w.clearanceProofUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Proof
                    </a>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleVerifyWithdrawal(w._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Verify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;