import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Title from '../Layout/Title';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const BASE_URL =
        process.env.NODE_ENV === 'production'
            ? 'https://e-market-fnu1.onrender.com'
            : process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/forgot-password`, { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error: Unable to send reset email.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-green-500">
            <Title title={"Forgot Password"} />
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Forgot Password</h2>
                {message && <p className="text-blue-500  text-lg italic text-center mb-4">{message}</p>}
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                    required
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                    Send Reset Link
                </button>
                <div className="text-center mt-4">
                    <p>Remembered your password? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
