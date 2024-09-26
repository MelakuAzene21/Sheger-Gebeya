import React, { useState } from 'react';
import { useSignupMutation } from '../features/api/authApi';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';
import Title from '../Layout/Title';

const Signup = () => {
    const [signup] = useSignupMutation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({}); // State for storing validation errors

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required.';
        }

        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Set errors if validation fails
            return;
        }

        try {
            await signup(formData).unwrap(); // Call the signup mutation
            navigate('/login'); // Redirect to login on success
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-green-500">
            <Title title={"Register Pages"}/>
            <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4">Signup</h2>

                {/* Display validation errors */}
                {errors.name && <p className="text-red-500 mb-2">{errors.name}</p>}
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mb-2 p-2 w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                    placeholder="Name"
                    required
                />

                {errors.email && <p className="text-red-500 mb-2">{errors.email}</p>}
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mb-2 p-2 w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                    placeholder="Email"
                    required
                />

                {errors.password && <p className="text-red-500 mb-2">{errors.password}</p>}
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`mb-4 p-2 w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
                    placeholder="Password"
                    required
                />

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Signup
                </button>

                <p className="font-bold">Already Have Account?
                    <Link to="/login" className="text-blue-500 font-serif">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
