import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLoginForm = () => {
    const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const BASE_URL = import.meta.env.VITE_APP_BASE_URI;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post(`${BASE_URL}/api/admin/login`, { name, password });
      localStorage.setItem('adminToken', res.data.token);
      setMessage('Login successful!');

        setTimeout(() => {
        navigate('/admin/account');
      }, 2000);

    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Admin Login</h2>
      <input type="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border px-3 py-2" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border px-3 py-2" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Login</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AdminLoginForm;
