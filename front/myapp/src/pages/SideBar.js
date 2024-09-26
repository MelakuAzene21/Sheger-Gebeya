import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUser, FaPlus, FaCar, FaProductHunt, FaEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux'; // For accessing the user role

const SideBar = ({ onMenuItemClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Get the logged-in user's role (assuming it's stored in the Redux store)
    const user = useSelector((state) => state.auth.user); // Adjust based on your Redux state structure

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleMenuItemClick = () => {
        setIsOpen(false);
        if (onMenuItemClick) {
            onMenuItemClick(); // Trigger the parent event
        }
    };

    return (
        <div className="flex">
            {/* Sidebar Toggle Button */}
            <button className="text-3xl p-2 text-white" onClick={toggleSidebar}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Sidebar */}
            <div className={`h-screen bg-gray-800 text-white transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-full"} w-64 fixed left-0 top-0 z-50`}>
                <div className="p-4">
                    <Link className="text-2xl font-bold" to="/" onClick={handleMenuItemClick}>E-Market</Link>
                </div>

                <ul className="mt-4">
                    {/* Show these only for Admins */}
                    {user?.role === 'admin' && (
                        <>
                            <li className="p-4 hover:bg-gray-700 flex items-center">
                                <FaHome className="mr-3" />
                                <Link to="/dashboard" onClick={handleMenuItemClick}>Dashboard</Link>
                            </li>
                            <li className="p-4 hover:bg-gray-700 flex items-center">
                                <FaPlus className="mr-3" />
                                <Link to="/products/add" onClick={handleMenuItemClick}>Add New Product</Link>
                            </li>
                            <li className="p-4 hover:bg-gray-700 flex items-center">
                                <FaCar className="mr-3" />
                                <Link to="/allOrders" onClick={handleMenuItemClick}>All User Orders</Link>
                            </li>
                            <li className="p-4 hover:bg-gray-700 flex items-center">
                                <FaProductHunt className="mr-3" />
                                <Link to="/products" onClick={handleMenuItemClick}>Show Product</Link>
                            </li>
                            <li className="p-4 hover:bg-gray-700 flex items-center">
                                <FaUser className="mr-3" />
                                <Link to="/users" onClick={handleMenuItemClick}>Show Users</Link>
                            </li>
                        </>
                    )}

                    {/* Show these only for Users */}
                    {user?.role === 'user' && (
                        <>
                            <li className="p-4 hover:bg-gray-700 flex items-center">
                                <FaCar className="mr-3" />
                                <Link to="/orders" onClick={handleMenuItemClick}>Your Order</Link>
                            </li>
                        </>
                    )}

                    {/* Common links for both Admins and Users */}
                    <li className="p-4 hover:bg-gray-700 flex items-center">
                        <FaUser className="mr-3" />
                        <Link to="/profile" onClick={handleMenuItemClick}>Profile</Link>
                    </li>
                    <li className="p-4 hover:bg-gray-700 flex items-center">
                        <FaEdit className="mr-3" />
                        <Link to="/updateProfile" onClick={handleMenuItemClick}>Update Your Profile</Link>
                    </li>
                    <li className="p-4 hover:bg-gray-700 flex items-center">
                        <FaEdit className="mr-3" />
                        <Link to="/updatePassword" onClick={handleMenuItemClick}>Update Your Password</Link>
                    </li>
                </ul>
            </div>

            {/* Overlay when sidebar is open */}
            {isOpen && (
                <div className="fixed inset-0 bg-black opacity-50" onClick={toggleSidebar}></div>
            )}
        </div>
    );
};

export default SideBar;
