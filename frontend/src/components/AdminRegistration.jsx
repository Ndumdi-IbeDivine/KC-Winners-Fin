import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegisterForm = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const BASE_URL = import.meta.env.VITE_APP_BASE_URI;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/api/admin/register`, formData);

      localStorage.setItem('adminToken', res.data.token);

      setMessage('Registration successful! You are now logged in.');

        setTimeout(() => {
        navigate('/admin/account');
      }, 2000);

    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 shadow bg-white rounded-md space-y-4">
      <h2 className="text-xl font-bold text-center text-gray-700">Admin Registration</h2>

      <div>
        <label className="block text-gray-600">Full Name</label>
        <input
          type="text"
          name="name"
          required
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
        />
      </div>

      <div>
        <label className="block text-gray-600">Password</label>
        <input
          type="password"
          name="password"
          required
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
      >
        {loading ? 'Registering...' : 'Register as Admin'}
      </button>

      {message && <p className="text-center text-sm mt-2 text-red-600">{message}</p>}
    </form>
  );
};

export default AdminRegisterForm;
