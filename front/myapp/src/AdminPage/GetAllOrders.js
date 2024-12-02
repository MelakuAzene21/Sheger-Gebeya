import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Title from '../Layout/Title';

const GetAllOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders', // Replace with your API endpoint
                    { withCredentials: true }
                );
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    const handleEdit = async (orderId) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/orders/${orderId}/deliver`,
                {},
                { withCredentials: true }
            );

            if (response.status === 200) {
                toast.success('Order marked as delivered');
                // Update the order in the state
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, isDelivered: true, deliveredAt: response.data.deliveredAt } : order
                    )
                );
            }
        } catch (error) {
            console.error('Error updating delivery status:', error);
            toast.error('Failed to update delivery status');
        }
    };


    const handleDelete = async (orderId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/orders/${orderId}`,
                { withCredentials: true }
            );
            if (response.status === 200) {
                toast.success('Order deleted successfully');
                setOrders(orders.filter((order) => order._id !== orderId)); // Remove the deleted order from the state
            }
        } catch (error) {
            toast.error('Error deleting order:', error);
        }
    };

    return (
        <div className="px-0 py-6"> {/* Removed container class to eliminate padding */}
            <h1 className="text-2xl font-bold mb-4 text-white text-center">There are {orders.length} Orders</h1>
  <Title title={"All Orders"}/>
            {/* Table now spans the full width */}
            <div className="w-full max-h-[500px] overflow-y-auto">
                <table className="min-w-full  divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Items</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Shipping Address</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.user ? order.user.name : 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <tbody>
                                            {order.orderItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-2 text-sm text-gray-500">{item.name}</td>
                                                    <td className="px-6 py-2 text-sm text-gray-500">{item.qty}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.zipCode}, {order.shippingAddress.country}
                                </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={order.isPaid ? 'text-green-600 font-mono font-extrabold' : 'text-red-600'}>
                                        {order.isPaid ? 'Paid' : 'Not Paid'}
                                    </span>
                                </td>


                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={order.isDelivered ? 'text-green-600' : 'text-red-600'}>
                                        {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                                    </span>
                                </td>



                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleEdit(order._id)}
                                        className="text-blue-500 hover:text-blue-700 mr-2"
                                    >
                                        Mark Delivered
                                    </button>
                                    <button
                                        onClick={() => handleDelete(order._id)}
                                        className="text-red-500 hover:text-red-700 "
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GetAllOrders;
