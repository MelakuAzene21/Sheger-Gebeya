import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCurrentUserQuery, useLogoutMutation } from '../features/api/authApi';
import SideBar from '../pages/SideBar';
import { useDispatch } from 'react-redux';
import logout from '../features/api/authSlice'
const Navbar = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const user = useSelector((state) => state.auth.user);
    const { error, isLoading } = useGetCurrentUserQuery();
    const [logoutUser] = useLogoutMutation();
    const navigate = useNavigate();
    const distinctItemsCount = cartItems.length;
    const [wishlistCount, setWishlistCount] = useState(0);
    const dispatch=useDispatch();
    const BASE_URL =
        process.env.NODE_ENV === 'production'
            ? 'https://e-market-fnu1.onrender.com'
            : process.env.REACT_APP_API_URL || 'http://localhost:5000';
    // Fetch wishlist count when component mounts or when user changes
    useEffect(() => {
        const fetchWishlistCount = async () => {
            if (user) {
                try {
                    const response = await fetch(`${BASE_URL}/api/favorites/${user._id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setWishlistCount(data.length); // Set the count of items
                    } else {
                        setWishlistCount(0); // Set to 0 if there is an error
                    }
                } catch (error) {
                    console.error('Failed to fetch wishlist count', error);
                }
            }
        };
        fetchWishlistCount();
    }, [user]);
  
    useEffect(() => {
        if (error) {
            console.log('Error fetching user:', error);
        }
    }, [error]);

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout()); // Reset Redux state

            navigate('/');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <nav className="bg-gray-950 shadow-md p-2 flex flex-col md:flex-row justify-between items-center fixed top-0 w-full z-50 text-white">
            {/* Brand and Sidebar */}
            <div className="flex items-center justify-between w-full md:w-auto">
                <SideBar />               
            </div>

            {/* Cart, Wishlist, and Profile */}
              <div className="flex flex-wrap items-center  md:space-y-0 md:space-x-6 w-full md:w-auto justify-center md:justify-end">
                {user?.role === 'user' && (
                    <>
                        {/* Cart Icon */}
                        <div className="relative">
                            <Link to="/cart" className="text-2xl md:text-3xl hover:text-yellow-400 transition duration-300" title="Your Cart">
                                🛒
                            </Link>
                            {distinctItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {distinctItemsCount}
                                </span>
                            )}
                        </div>

                        {/* Wishlist Icon */}
                        <div className="relative">
                            <button
                                title="Wishlist"
                                onClick={() => navigate('/wishlist')}
                                className="text-2xl md:text-3xl hover:text-yellow-400 transition duration-300"
                            >
                                ❤️
                            </button>
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {wishlistCount}
                                </span>
                            )}
                        </div>
                    </>
                )}

                {/* User Profile and Logout */}
                {user ? (
                    <div className="flex items-center space-x-4">
                        <Link to="/profile" className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition duration-300">
                            {user.image ? (
                                <img
                                    src={user.image}
                                    alt="User profile"
                                    className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                                />
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 text-gray-500 rounded-full"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 12c2.75 0 5-2.25 5-5s-2.25-5-5-5-5 2.25-5 5 2.25 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
                                </svg>
                            )}
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex space-x-4">
                        <Link to="/login" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900 transition duration-300">
                            Login
                        </Link>
                        <Link to="/signup" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900 transition duration-300">
                            Signup
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );

};

export default Navbar;



