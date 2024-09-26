import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Title from '../Layout/Title';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
            setMessage('Password has been reset successfully.');
            navigate('/login');
        } catch (error) {
            setMessage('Error: Invalid or expired token.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-green-500">
            <Title title={"Reset Password"} />
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Reset Password</h2>
                {message && <p className="text-red-500 text-center mb-4">{message}</p>}
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                    required
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
