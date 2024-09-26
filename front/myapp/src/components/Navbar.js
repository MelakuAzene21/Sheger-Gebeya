import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCurrentUserQuery, useLogoutMutation } from '../features/api/authApi';
import SideBar from '../pages/SideBar';
const Navbar = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const user = useSelector((state) => state.auth.user); // Listen to Redux state for the user
    const { error, isLoading } = useGetCurrentUserQuery(); // Fetch current user info
    const [logout] = useLogoutMutation(); // Logout mutation
    const navigate = useNavigate();
    const distinctItemsCount = cartItems.length;
    
    useEffect(() => {
        if (error) {
            console.log('Error fetching user:', error);
        }
    }, [error]);

    const handleLogout = async () => {
        try {
            await logout().unwrap(); // Logout from the backend
            navigate('/'); // Redirect to home page
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };


    if (isLoading) {
        return <div>Loading...</div>; // Show loading while fetching user data
    }

    return (
        <nav className="bg-gray-950 shadow-md p-2 flex justify-between items-center fixed top-0 w-full z-50">
            <div className="flex items-center">
                {/* <Link to="/" className="text-2xl font-bold text-blue-500">E-Market</Link> */}
               
                <SideBar/>
            </div>

            <div className="bg-gradient-to-r text-white font-serif font-bold  italic p-4 rounded-lg shadow-lg">
                ሸገር ገበያ
            </div>


            <div className="flex items-center space-x-4">
                <div className="relative text-2xl">
                    <Link to="/cart" className="text-3xl text-black"> 🛒</Link>
                    {distinctItemsCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {distinctItemsCount}
                        </span>
                    )}
                </div>

                {user ? (
                    <>
                        <span className="mr-4 text-blue-500">Welcome, {user.name || user.email}!</span>
                        <button
                            onClick={handleLogout}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900 mx-2">
                            Login
                        </Link>
                         <Link to="/signup" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900">
                            Signup
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
