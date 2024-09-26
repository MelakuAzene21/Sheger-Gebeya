import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery } from '../features/api/orderApi';
import { useGetCurrentUserQuery } from '../features/api/authApi'; // Assume this endpoint exists
import Title from '../Layout/Title';
const OrderDetails = () => {
    const { id } = useParams();
    const { data: order, isLoading: orderLoading, isError: orderError, error: orderErrorMessage } = useGetOrderDetailsQuery(id);
    const { data: user, isLoading: userLoading, isError: userError, error: userErrorMessage } = useGetCurrentUserQuery(order?.user); // Fetch user by ID

    if (orderLoading || userLoading) return <p className="text-center text-lg font-semibold text-blue-500">Loading...</p>;
    if (orderError) return <p className="text-center text-lg font-semibold text-red-500">Error: {orderErrorMessage.message}</p>;
    if (userError) return <p className="text-center text-lg font-semibold text-red-500">Error: {userErrorMessage.message}</p>;

    if (!order || !user) return <p className="text-center text-lg font-semibold text-gray-600">No order details found.</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <Title title={"Order Details"}/>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Order Details</h2>

            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Info</h3>
                    <p className="text-gray-600"><span className="font-semibold">Order ID:</span> {order._id}</p>
                    <p className="text-gray-600"><span className="font-semibold">Status:</span> {order.isDelivered ? 'Delivered' : 'Not Delivered'}</p>
                    <p className="text-gray-600"><span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
 
                {/* Shipping Info */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Shipping Info</h3>
                    <p className="text-gray-600"><span className="font-semibold">Name:</span> {user.name}</p> {/* Display fetched user name */}
                    <p className="text-gray-600"><span className="font-semibold">Phone:</span>  {order.shippingAddress.phoneNumber}</p>
                    <p className="text-gray-600"><span className="font-semibold">Address:</span> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                    <p className="text-gray-600"><span className="font-semibold">Country:</span> {order.shippingAddress.country}</p>
                </div>
            </div>

            {/* Payment Info */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Payment Info</h3>
                <p className="text-gray-600"><span className="font-semibold">Payment Status:</span> {order.isPaid ? 'Paid' : 'Not Paid'}</p>
                <p className="text-gray-600"><span className="font-semibold">Amount Paid:</span> ${order.totalPrice}</p>
                <p className="text-gray-600"><span className="font-semibold">Payment Method:</span> {order.paymentMethod}</p>
            </div>

            {/* Order Items */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Items</h3>
                <div className="divide-y divide-gray-200">
                    {order.orderItems.map((item) => (
                        <div key={item.product} className="flex items-center justify-between py-4">
                            <div className="flex items-center space-x-4">
                                <img src={`http://localhost:5000${item.images[0]}`} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                <div>
                                    <p className="text-gray-700 font-semibold">{item.name}</p>
                                    <p className="text-gray-500">${item.price} x {item.qty}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 font-semibold">${item.price * item.qty}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
