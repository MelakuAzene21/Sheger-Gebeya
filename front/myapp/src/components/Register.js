import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const BASE_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://e-market-fnu1.onrender.com'
      : process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${BASE_URL}/api/auth/register`, {
                name, email, password
            }, {
                withCredentials: true, // Include credentials in requests
            });
            document.cookie = `token=${data.token}; path=/`;
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={submitHandler} className="bg-gray-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Register</h2>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
