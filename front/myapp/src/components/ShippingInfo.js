import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../features/api/orderApi';
import axios from 'axios';
import { emptyCart } from '../features/cart/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import { useGetCurrentUserQuery } from '../features/api/authApi';
import Title from '../Layout/Title';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners'; // Import the spinner
import Skeleton from 'react-loading-skeleton';
import { Navigate } from 'react-router-dom';
import '../Overlay.css'; // Import the overlay CSS file

const ShippingInfo = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { shippingAddress } = useSelector((state) => state.order);
    const [loading, setLoading] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // state to control overlay visibility
    const [paymentUrl, setPaymentUrl] = useState('');
    const { data: userDetails } = useGetCurrentUserQuery();

    const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation();
    const [paymentMethod, setPaymentMethod] = useState('Chapa');

    const dispatch = useDispatch();
    const transactionRef = uuidv4();
    // Calculate totals
    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const shippingPrice = totalPrice > 100 ? 0 : 10;
    const taxPrice = totalPrice * 0.15;
    const total = totalPrice + shippingPrice + taxPrice;

    const BASE_URL =
        process.env.NODE_ENV === 'production'
            ? 'https://e-market-fnu1.onrender.com'
            :'http://localhost:5000';

    const handlePayment = async () => {
        // Check if the cart is empty
        if (cartItems.length === 0) {
            toast.error('Your cart is empty. Please add items to the cart before proceeding.');
            return;
        }

        setLoading(true);
        setShowOverlay(true); // Show the overlay

        const orderData = {
            userId: userDetails._id,
            items: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            totalPrice: totalPrice,
            tx_ref: transactionRef
        };

        try {
            // Step 1: Create the order
            const result = await createOrder(orderData).unwrap();
            console.log('Order Creation Result:', result);

            // Only proceed if order creation is successful
            if (result) {
                const paymentData = {
                    amount: total,
                    currency: 'ETB',
                    email: userDetails.email,
                    firstName: userDetails.name,
                    lastName: userDetails.name,
                    tx_ref: transactionRef,
                };

                const response = await axios.post(`${BASE_URL}/payment/initialize`,paymentData, {
                    withCredentials: true,
                });
                if (response.data && response.data.payment_url) {
                    setPaymentUrl(response.data.payment_url);
                    console.log('Redirecting to payment URL:', response.data.payment_url);
                    window.location.href = response.data.payment_url;

                    // Empty the cart after redirecting to the payment page
                    dispatch(emptyCart());
                } else {
                    throw new Error('Payment URL not received');
                }
            }
        } catch (error) {
            console.error('Error initializing payment', error);
            toast.error('Error initializing payment. Please try again.');
        } finally {
            setLoading(false);
            setShowOverlay(false); // Hide the overlay after payment initialization
        }
    };

    return (
        <div className="container mx-auto  flex items-center justify-center min-h-screen bg-gray-100">
            <Title title={"Shipping Info"} />

            {/* Full-page overlay */}
            {showOverlay && (
                <div className="overlay">
                    <ClipLoader size={50} color="#ffffff" /> {/* Spinner inside the overlay */}
                </div>
            )}

            <div className="flex flex-col lg:flex-row sm:mt-12 lg:mt-4">
                {/* Shipping Info */}
                {userDetails ? (
                    <div className="lg:w-full bg-white p-6 rounded-lg shadow-lg  ">
                        <h2 className="text-2xl font-bold mb-4">Shipping Info</h2>
                        <p><strong>Name:</strong> {userDetails.name}</p>
                        <p><strong>Phone Number:</strong> {shippingAddress.phoneNumber}</p>
                        <p><strong>Email:</strong> {userDetails.email}</p>
                        <p><strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.zipCode}</p>
                        <h3 className="text-xl font-semibold mt-6">Items in Cart</h3>
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item._id} className="flex justify-between mb-4">
                                    <div className="flex">
                                        <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                                        <p>{item.name}</p>
                                    </div>
                                    <p>{item.quantity} x ${item.price} = ${item.quantity * item.price}</p>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <p>User details not available</p>
                )}

                {/* Order Summary */}
                <div className="lg:w-3/5  lg:ml-8 mt-8 lg:mt-0 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <p>Total Price: ${totalPrice.toFixed(2)}</p>
                    <p>Shipping Price: ${shippingPrice.toFixed(2)}</p>
                    <p>Tax: ${taxPrice.toFixed(2)}</p>
                    <p><strong>Total: ${total.toFixed(2)}</strong></p>

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block"
                    >
                        {loading ? 'Processing...' : 'Proceed to Payment'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShippingInfo;






