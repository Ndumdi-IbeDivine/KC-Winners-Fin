import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import UserContributionsModal from './UserContributionModal';

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
  const BASE_URL = import.meta.env.VITE_APP_BASE_URI;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContribModal, setShowContribModal] = useState(false);
  const [activeUserId, setActiveUserId] = useState(null);

  const openContribModal = (id) => {
  setActiveUserId(id);
  setShowContribModal(true);
  };  


  useEffect(() => {

    const fetchUser = async () => {

      const token = localStorage.getItem('token');
      console.log(token);
      

      if(!token) {
        navigate('/login');
        return
      }

      try {
        const res = await axios.get(`${BASE_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data.data);
      } catch (error) {
        console.error('Error loading profile:', error);
        alert('Session expired, please log in again');
        localStorage.removeItem('token');
        navigate('/login')
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [BASE_URL, navigate]);
  

  const handleWithdraw = () => {
    //  Trigger withdrawal action
    navigate('/withdraw'); 
  };

  if (loading) return <div classname="p-8 text-center">Loading...</div>
  if (!user) return <p className="p-4 text-red-600">Couldn’t load profile</p>;

  return (
    <>
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <Navbar />
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Welcome, {user.fullName || user.name}</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Profile Details</h2>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Contribution Accounts</h2>
          <div className="space-y-4">
            {user.contributions?.length ? (
              user.contributions.map(c => (
              <div key={c._id} className="border p-4 rounded-md bg-gray-50">
                <p><strong>Account #{c._id.slice(-4)}</strong></p>
                <p>Status: {c.status}</p>
                <p>Balance: ₦{c.balance}</p>
                
                <div className="mt-3">
                  <button
                    onClick={() => openContribModal(c.id)}
                    className="rounded-md bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
            ) : (
            <p>No contributions yet.</p>
            )}
          </div>
        </div>

        {user.contributions?.length ? (
          user.contributions.map(c => (
            <div key={c._id} className="border p-4 mb-3 rounded">
              <p><strong>Account #{c._id.slice(-4)}</strong></p>
              <p>Status: {c.status}</p>
              <p>Balance: ₦{c.balance}</p>
            </div>
          ))
        ) : (
          <p>No contributions yet.</p>
        )}

        <button
          onClick={() => {
            setShowContribModal(true);
            setActiveUserId(user.id); // or user._id if that's your format
          }}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Contribution
        </button>


        <button
          onClick={handleWithdraw}
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 mt-6"
        >
          Withdraw
        </button>
      </div>
    </div>

    <UserContributionsModal
    userId={activeUserId}
    isOpen={showContribModal}
    onClose={() => setShowContribModal(false)}
    />
   </>

  );
};

export default UserProfile;