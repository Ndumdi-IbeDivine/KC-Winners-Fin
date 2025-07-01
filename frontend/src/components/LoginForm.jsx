import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URI;
  const navigate  = useNavigate();

  const [phone, setPhone]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/auth/login`,
        { phone, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Store token
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      setSuccess('Login successful! Redirecting…');
      setTimeout(() => navigate('/account'), 1500);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        err.message ||
        'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-yellow-200 shadow-2xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-900">
          KCWINNERS LOGIN
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              type="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-black text-white font-bold py-2 rounded transition"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>

          {success && <p className="text-green-700 mt-2">{success}</p>}
          {error   && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;