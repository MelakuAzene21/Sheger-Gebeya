import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaCar, FaProductHunt, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux'; // For accessing the user role
import { useEffect } from 'react';
import Title from '../Layout/Title';
const AdminJobs = () => {
   
    const handleMenuItemClick = () => {
        console.log('Menu item clicked');
    };
    const user2 = useSelector((state) => state.auth.user); // Adjust based on your Redux state structure
  const navigate=useNavigate();
    // Redirect to /user if the role is not admin
    useEffect(() => {
        if (user2?.role === 'user') {
            navigate('/');
        }
    }, [user2, navigate]);
    return (
      
        <div className="bg-gray-800 min-h-screen flex justify-center items-center">
           
            {user2?.role === 'admin' && (
            
       
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
                   
                <div className="bg-blue-500 text-white text-center py-4 rounded-t-lg">
                        <Title title={"Admin Home Page"} />
                     <h1 className="text-2xl font-bold">Admin Panel</h1>
                    <p className="text-sm">Manage your E-commerce platform effectively</p>
                </div>
                <ul className="divide-y divide-gray-300">
                    <li className="p-4 hover:bg-gray-100 flex items-center cursor-pointer">
                        <FaHome className="mr-3 text-blue-500" />
                        <Link to="/dashboard" className="font-medium text-gray-700 hover:text-blue-500" onClick={handleMenuItemClick}>
                            Reports
                        </Link>
                    </li>
                    <li className="p-4 hover:bg-gray-100 flex items-center cursor-pointer">
                        <FaPlus className="mr-3 text-green-500" />
                        <Link to="/products/add" className="font-medium text-gray-700 hover:text-green-500" onClick={handleMenuItemClick}>
                            Add New Product
                        </Link>
                    </li>
                    <li className="p-4 hover:bg-gray-100 flex items-center cursor-pointer">
                        <FaCar className="mr-3 text-yellow-500" />
                        <Link to="/allOrders" className="font-medium text-gray-700 hover:text-yellow-500" onClick={handleMenuItemClick}>
                            Manage Orders
                        </Link>
                    </li>
                    <li className="p-4 hover:bg-gray-100 flex items-center cursor-pointer">
                        <FaProductHunt className="mr-3 text-red-500" />
                        <Link to="/products" className="font-medium text-gray-700 hover:text-red-500" onClick={handleMenuItemClick}>
                            Manage Product
                        </Link>
                    </li>
                    <li className="p-4 hover:bg-gray-100 flex items-center cursor-pointer">
                        <FaUser className="mr-3 text-purple-500" />
                        <Link to="/users" className="font-medium text-gray-700 hover:text-purple-500" onClick={handleMenuItemClick}>
                            Manage  Users
                        </Link>
                    </li>
                </ul>
            </div>
            )}


            {user2?.role === 'subAdmin' && (


                <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
                    <Title title={"Sub Admin Home Page"} />
                    <div className="bg-blue-500 text-white text-center py-4 rounded-t-lg">
                        <h1 className="text-2xl font-bold">Sub Admin Panel</h1>
                        <p className="text-sm text-red-500 font-serif font-bold">You can only add ,edit and delete Your own product</p>
                    </div>
                    <ul className="divide-y divide-gray-300">
                        <li className="p-4 hover:bg-gray-100 flex items-center cursor-pointer">
                            <FaHome className="mr-3 text-blue-500" />
                            <Link to="/dashboard" className="font-medium text-gray-700 hover:text-blue-500" onClick={handleMenuItemClick}>
                                Report
                            </Link>
                        </li>
                        <li className="p-4 hover:bg-gray-100 flex items-center cursor-pointer">
                            <FaCar className="mr-3 text-yellow-500" />
                            <Link to="/allOrders" className="font-medium text-gray-700 hover:text-yellow-500" onClick={handleMenuItemClick}>
                                Manage Orders
                            </Link>
                        </li>
                        <li className="p-4 hover:bg-gray-100 flex items-center cursor-pointer">
                            <FaPlus className="mr-3 text-green-500" />
                            <Link to="/products/add" className="font-medium text-gray-700 hover:text-green-500" onClick={handleMenuItemClick}>
                                Add New Product
                            </Link>
                        </li>
                        
                        <li className="p-4 hover:bg-gray-100 flex items-center cursor-pointer">
                            <FaProductHunt className="mr-3 text-red-500" />
                            <Link to="/products" className="font-medium text-gray-700 hover:text-red-500" onClick={handleMenuItemClick}>
                                Manage Product
                            </Link>
                        </li>
                       
                    </ul>
                </div>
            )}

        </div>
    );
};

export default AdminJobs;
