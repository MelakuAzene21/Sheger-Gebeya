import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShippingAddress } from '../features/cart/orderSlice';
import { useNavigate } from 'react-router-dom';
import Title from '../Layout/Title';

const ShippingForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        address: '',
        city: '',
        phoneNumber: '',
        zipCode: '',
        country: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress(formData));
        navigate('/shipping-info');  // Redirect to Shipping Info page
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
       <Title title={"Shipping Form"}/>
            <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full mb-4 p-2 border" />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="w-full mb-4 p-2 border" />
            <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required className="w-full mb-4 p-2 border" />
            <input type="text" name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} required className="w-full mb-4 p-2 border" />

            {/* Country dropdown */}
            <select name="country" value={formData.country} onChange={handleChange} required className="w-full mb-4 p-2 border">
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                {/* Add more countries as needed */}
            </select>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Continue</button>
        </form>
    );
};

export default ShippingForm;
