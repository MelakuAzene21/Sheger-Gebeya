// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useGetCurrentUserQuery, useLogoutMutation } from '../features/api/authApi';
// import SideBar from '../pages/SideBar';

// const Navbar = () => {
//     const { cartItems } = useSelector((state) => state.cart);
//     const user = useSelector((state) => state.auth.user);
//     const { error, isLoading } = useGetCurrentUserQuery();
//     const [logout] = useLogoutMutation();
//     const navigate = useNavigate();
//     const distinctItemsCount = cartItems.length;
//     const [wishlistCount, setWishlistCount] = useState(0);

 

//     // Fetch wishlist count when component mounts or when user changes
//     useEffect(() => {
//         const fetchWishlistCount = async () => {
//             if (user) {
//                 try {
//                     const response = await fetch(`http://localhost:5000/api/favorites/${user._id}`);
//                     if (response.ok) {
//                         const data = await response.json();
//                         setWishlistCount(data.length); // Set the count of items
//                     } else {
//                         setWishlistCount(0); // Set to 0 if there is an error
//                     }
//                 } catch (error) {
//                     console.error('Failed to fetch wishlist count', error);
//                 }
//             }
//         };
//         fetchWishlistCount();
//     }, [user])

//     useEffect(() => {
//         if (error) {
//             console.log('Error fetching user:', error);
//         }
//     }, [error]);

//     const handleLogout = async () => {
//         try {
//             await logout().unwrap();
//             navigate('/');
//         } catch (err) {
//             console.error('Logout failed:', err);
//         }
//     };

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <nav className="bg-gray-950 shadow-md p-4 flex flex-col md:flex-row justify-between items-center fixed top-0 w-full z-50 text-white">
//             {user?.role === 'user' && (
               
//             <div className="flex items-center space-x-4">
               
//                 <SideBar />
//                 <Link to="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition duration-300">
//                     E-Market
//                 </Link>
//             </div>
//             )}
//             {/* <div className="text-3xl font-serif font-bold italic bg-gradient-to-r text-yellow-300 p-4 rounded-lg shadow-lg">
//                 ሸገር ገበያ
//             </div> */}
//             <div className="flex items-center space-x-4 mt-4 md:mt-0">
               
//                 <div className="relative">
                    
//                     <Link to="/cart" className="text-3xl hover:text-yellow-400 transition duration-300"  title='Your Cart'>
//                         🛒
                       
//                     </Link>
//                     {distinctItemsCount > 0 && (
//                         <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                             {distinctItemsCount}
//                         </span>
//                     )}
//                 </div>

//                 <div className="relative">
//                     <button
//                     title='WishList'
//                         onClick={() => navigate('/wishlist')}
//                         className="text-3xl hover:text-yellow-400 transition duration-300"
//                     >
//                         ❤️
//                     </button>
//                     {wishlistCount > 0 && (
//                         <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
//                             {wishlistCount}
//                         </span>
//                     )}
//                 </div>
               
              

//                 {user ? (
//                     <>
//                         <span className="mr-4 flex items-center text-blue-400">
//                             <Link to="/profile" title=  {user.name} className="flex items-center space-x-2">
//                                 {/* User profile image or default icon */}
//                                 {user.image ? (
//                                     <img
//                                         src={user.image}
//                                         alt="User profile"
//                                         className="w-8 h-8 rounded-full" // Adjust size as needed
//                                     />
//                                 ) : (
//                                     // Default SVG icon
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="w-8 h-8 rounded-full bg-gray-200 text-gray-500"
//                                         fill="currentColor"
//                                         viewBox="0 0 24 24">
//                                         <path d="M12 12c2.75 0 5-2.25 5-5s-2.25-5-5-5-5 2.25-5 5 2.25 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
//                                     </svg>
//                                 )}

//                                 {/* User name or email */}
//                                 {/* <span>{user.name || user.email}</span> */}
//                             </Link>
//                         </span>

//                         <button
//                             onClick={handleLogout}
//                             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
//                         >
//                             Logout
//                         </button>
//                     </>
//                 ) : (
//                     <>
//                         <Link to="/login" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900 mx-2 transition duration-300">
//                             Login
//                         </Link>
//                         <Link to="/signup" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900 transition duration-300">
//                             Signup
//                         </Link>
//                     </>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Navbar;





import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCurrentUserQuery, useLogoutMutation } from '../features/api/authApi';
import SideBar from '../pages/SideBar';

const Navbar = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const user = useSelector((state) => state.auth.user);
    const { error, isLoading } = useGetCurrentUserQuery();
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const distinctItemsCount = cartItems.length;
    const [wishlistCount, setWishlistCount] = useState(0);

    // Fetch wishlist count when component mounts or when user changes
    useEffect(() => {
        const fetchWishlistCount = async () => {
            if (user) {
                try {
                    const response = await fetch(`http://localhost:5000/api/favorites/${user._id}`);
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
            {/* Show E-Market, SideBar, Cart, and Wishlist only if the user's role is 'user' */}
            <SideBar />
            {user?.role === 'user' && (
                <div className="flex items-center space-x-4">
                   
                    <Link to="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition duration-300">
                        E-Market
                    </Link>
                </div>
            )}

            <div className="flex items-center space-x-4 mt-4 md:mt-0">
                {user?.role === 'user' && (
                    <>
                        <div className="relative">
                            <Link to="/cart" className="text-3xl hover:text-yellow-400 transition duration-300" title="Your Cart">
                                🛒
                            </Link>
                            {distinctItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {distinctItemsCount}
                                </span>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                title="WishList"
                                onClick={() => navigate('/wishlist')}
                                className="text-3xl hover:text-yellow-400 transition duration-300"
                            >
                                ❤️
                            </button>
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                        </div>
                    </>
                )}

                {user ? (
                    <>
                        <span className="mr-4 flex items-center text-blue-400">
                            <Link to="/profile" title={user.name} className="flex items-center space-x-2">
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt="User profile"
                                        className="w-8 h-8 rounded-full" // Adjust size as needed
                                    />
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-8 h-8 rounded-full bg-gray-200 text-gray-500"
                                        fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path d="M12 12c2.75 0 5-2.25 5-5s-2.25-5-5-5-5 2.25-5 5 2.25 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
                                    </svg>
                                )}
                            </Link>
                        </span>

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







// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { useGetCurrentUserQuery, useLogoutMutation } from '../features/api/authApi';
// import SideBar from '../pages/SideBar';

// const Navbar = () => {
//     const { cartItems } = useSelector((state) => state.cart);
//     const user = useSelector((state) => state.auth.user);
//     const { error, isLoading } = useGetCurrentUserQuery();
//     const [logout] = useLogoutMutation();
//     const navigate = useNavigate();
//     const [wishlistItems, setWishlistItems] = useState([]);
//     const [showWishlist, setShowWishlist] = useState(false);
//     const distinctItemsCount = cartItems.length;

//     // Fetch and update favorite items on load
//     useEffect(() => {
//         const fetchFavorites = async () => {
//             if (user) {
//                 try {
//                     const response = await fetch(`http://localhost:5000/api/favorites/${user._id}`);
//                     if (response.ok) {
//                         const data = await response.json();
//                         setWishlistItems(data);
//                     } else {
//                         setWishlistItems([]);
//                     }
//                 } catch (error) {
//                     console.error('Failed to fetch wishlist items', error);
//                 }
//             }
//         };
//         fetchFavorites();
//     }, [user]);

//     useEffect(() => {
//         if (error) {
//             console.log('Error fetching user:', error);
//         }
//     }, [error]);

//     const handleLogout = async () => {
//         try {
//             await logout().unwrap();
//             navigate('/');
//         } catch (err) {
//             console.error('Logout failed:', err);
//         }
//     };

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <nav className="bg-gray-950 shadow-md p-4 flex flex-col md:flex-row justify-between items-center fixed top-0 w-full z-50 text-white">
//             <div className="flex items-center space-x-4">
//                 <SideBar />
//                 <Link to="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition duration-300">
//                     E-Market
//                 </Link>
//             </div>

//             <div className="flex items-center space-x-4 mt-4 md:mt-0">
//                 {/* Cart Icon */}
//                 <div className="relative">
//                     <Link to="/cart" className="text-3xl hover:text-yellow-400 transition duration-300">
//                         🛒
//                     </Link>
//                     {distinctItemsCount > 0 && (
//                         <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                             {distinctItemsCount}
//                         </span>
//                     )}
//                 </div>

//                 {/* Wishlist Icon */}
//                 <div className="relative">
//                     <button onClick={() => setShowWishlist(!showWishlist)} className="text-3xl hover:text-yellow-400 transition duration-300">
//                         ❤️
//                     </button>
//                 </div>

//                 {user ? (
//                     <>
//                         <span className="mr-4 text-blue-400">Welcome, {user.name || user.email}!</span>
//                         <button
//                             onClick={handleLogout}
//                             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
//                         >
//                             Logout
//                         </button>
//                     </>
//                 ) : (
//                     <>
//                         <Link to="/login" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900 mx-2 transition duration-300">
//                             Login
//                         </Link>
//                         <Link to="/signup" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900 transition duration-300">
//                             Signup
//                         </Link>
//                     </>
//                 )}
//             </div>

//             {/* Wishlist Modal */}
//             {showWishlist && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
//                         <button
//                             onClick={() => setShowWishlist(false)}
//                             className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//                         >
//                             ✕
//                         </button>
//                         <h2 className="text-lg font-bold mb-4">Your Wishlist</h2>
//                         {wishlistItems.length > 0 ? (
//                             <div className="space-y-4">
//                                 {wishlistItems.map((item) => (
//                                     <div key={item._id} className="flex items-center space-x-4">
//                                         <img src={item.itemId.images[0]} alt={item.itemId.name} className="w-16 h-16 object-cover rounded" />
//                                         <div>
//                                             <h3 className="text-md text-gr font-semibold">{item.itemId.name}</h3>
//                                             <p className="text-sm text-gray-600">${item.itemId.price}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <p className="text-gray-600">You have no favorite items yet.</p>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </nav>
//     );
// };

// export default Navbar;
