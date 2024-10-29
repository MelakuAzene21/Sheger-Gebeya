import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCurrentUserQuery, useLogoutMutation } from '../features/api/authApi';
import SideBar from '../pages/SideBar';

const Navbar = ({ setCategory }) => {
    const { cartItems } = useSelector((state) => state.cart);
    const user = useSelector((state) => state.auth.user);
    const { error, isLoading } = useGetCurrentUserQuery();
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const distinctItemsCount = cartItems.length;


    useEffect(() => {
        if (error) {
            console.log('Error fetching user:', error);
        }
    }, [error]);

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            navigate('/');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <nav className="bg-gray-950 shadow-md p-4 flex flex-col md:flex-row justify-between items-center fixed top-0 w-full z-50 text-white">
            <div className="flex items-center space-x-4">
                <SideBar />
                <Link to="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition duration-300">
                    E-Market
                </Link>
            </div>

            {/* <div className="text-3xl font-serif font-bold italic bg-gradient-to-r text-yellow-300 p-4 rounded-lg shadow-lg">
                ሸገር ገበያ
            </div> */}
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="relative">
                    <Link to="/cart" className="text-3xl hover:text-yellow-400 transition duration-300">
                        🛒
                    </Link>
                    {distinctItemsCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {distinctItemsCount}
                        </span>
                    )}
                </div>

                {user ? (
                    <>
                        <span className="mr-4 text-blue-400">Welcome, {user.name || user.email}!</span>
                        <button
                            onClick={handleLogout}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900 mx-2 transition duration-300">
                            Login
                        </Link>
                        <Link to="/signup" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900 transition duration-300">
                            Signup
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
