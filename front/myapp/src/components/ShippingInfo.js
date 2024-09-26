import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useGetCurrentUserQuery } from '../features/api/authApi';  // Fetch user details hook
import Title from '../Layout/Title';
//  import { useCreateOrderMutation } from '../features/api/orderApi';  // Order creation hook
const ShippingInfo = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { shippingAddress } = useSelector((state) => state.order);
     
     //line

        const { data: userDetails} = useGetCurrentUserQuery();
        // const [createOrder, { isLoading }] = useCreateOrderMutation();
    
        // const handlePlaceOrder = async () => {
        //     if (userDetails) {
        //         try {
        //             await createOrder({
        //                 userId: userDetails.id,  // Use the logged-in user's ID or name
        //                 items: cartItems,  // Your cart items
        //                 shippingAddress: userDetails.address,  // If you have this in the user details
        //             });
        //             console.log('Order placed successfully');
        //         } catch (error) {
        //             console.error('Order failed', error);
        //         }
        //     }
        // };

//line

    // Calculate totals
    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const shippingPrice = totalPrice > 100 ? 0 : 10;  // Example logic
    const taxPrice = totalPrice * 0.15;  // 15% tax
    const total = totalPrice + shippingPrice + taxPrice;

    return (
        <div className="container mx-auto p-6">
            <Title title={"Shipping Info"}/>
            <div className="flex flex-col lg:flex-row">
                {/* Shipping Info */}

               
                {userDetails ? (
                                <>
                                    
                        <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-4">Shipping Info</h2>
                            <p><strong>Name:</strong> {userDetails.name}</p>
                            <p><strong>Phone Number:</strong> {shippingAddress.phoneNumber}</p>
                            <p><strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.zipCode}, {shippingAddress.country}</p>
                            <h3 className="text-xl font-semibold mt-6">Items in Cart</h3>
                            {cartItems.length === 0 ? (
                                <p>Your cart is empty</p>
                            ) : (cartItems.map((item) => (
                                <div key={item._id} className="flex justify-between mb-4">
                                    <div className="flex">
                                        <img src={`http://localhost:5000${item.images[0]}`} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                                        <p>{item.name}</p>
                                    </div>
                                    <p>{item.quantity} x ${item.price} = ${item.quantity * item.price}</p>
                                </div>
                            )))}
                        </div>
                                </>
                            ) : (
                                <p>User details not available</p>
                            )}



                {/* Order Summary */}
                <div className="lg:w-1/3 lg:ml-8 mt-8 lg:mt-0 bg-white p-6 rounded-lg shadow-lg">
               
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <p>Total Price: ${totalPrice.toFixed(2)}</p>
                    <p>Shipping Price: ${shippingPrice.toFixed(2)}</p>
                    <p>Tax: ${taxPrice.toFixed(2)}</p>
                    <p><strong>Total: ${total.toFixed(2)}</strong></p>

                    <Link to="/payment" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block">Proceed to Payment</Link>
                </div>
            </div>
        </div>
    );
};

export default ShippingInfo;











// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';

// import { useGetCurrentUserQuery } from '../features/api/authApi';  // Fetch user details hook
// import { useCreateOrderMutation } from '../features/api/orderApi';  // Order creation hook
// import { useGetAuthToken } from '../features/api/authApi';  // Import the selector for getting token

// const ShippingInfo = () => {
//     const { cartItems } = useSelector((state) => state.cart);
//     const { shippingAddress } = useSelector((state) => state.order);
//     const { token } = useSelector((state) => state.auth);  // Get token from Redux state

//     // Fetching current user details
//     const { data: userDetails, isLoading: isUserLoading } = useGetCurrentUserQuery();

//     // Mutation for creating an order
//     const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();

//     const navigate = useNavigate();

//     // Calculate totals
//     const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
//     const shippingPrice = totalPrice > 100 ? 0 : 10;  // Example logic
//     const taxPrice = totalPrice * 0.15;  // 15% tax
//     const total = totalPrice + shippingPrice + taxPrice;

//     // Handle order creation
//     const handlePlaceOrder = async () => {
//         if (userDetails && shippingAddress) {
//             try {
//                 // Create the order object
//                 const orderData = {
//                     userId: userDetails.id,  // Assuming the userDetails contains the user's ID
//                     items: cartItems,  // Your cart items
//                     shippingAddress,  // The shipping address from state
//                     totalPrice,
//                     shippingPrice,
//                     taxPrice,
//                     total,
//                 };

//                 // Call the mutation to create the order with Authorization header
//                 await createOrder({
//                     orderData,
//                     headers: {
//                         Authorization: `Bearer ${token}`,  // Pass the token from Redux state
//                     },
//                 }).unwrap();

//                 console.log('Order placed successfully');

//                 // Redirect to a confirmation page or success message
//                 navigate('/order-confirmation');  // Adjust this path according to your app's routing
//             } catch (error) {
//                 console.error('Order failed', error);
//             }
//         } else {
//             console.log('User or shipping details are missing');
//         }
//     };

//     return (
//         <div className="container mx-auto p-6">
//             <div className="flex flex-col lg:flex-row">
//                 {/* Shipping Info */}
//                 {userDetails ? (
//                     <>
//                         <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold mb-4">Shipping Info</h2>
//                             <p><strong>Name:</strong> {userDetails.name}</p>
//                             <p><strong>Phone Number:</strong> {shippingAddress.phoneNumber}</p>
//                             <p><strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.zipCode}, {shippingAddress.country}</p>
//                             <h3 className="text-xl font-semibold mt-6">Items in Cart</h3>
//                             {cartItems.length === 0 ? (
//                                 <p>Your cart is empty</p>
//                             ) : (cartItems.map((item) => (
//                                 <div key={item._id} className="flex justify-between mb-4">
//                                     <div className="flex">
//                                         <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
//                                         <p>{item.name}</p>
//                                     </div>
//                                     <p>{item.quantity} x ${item.price} = ${item.quantity * item.price}</p>
//                                 </div>
//                             )))}
//                         </div>
//                     </>
//                 ) : (
//                     <p>Loading user details...</p>
//                 )}

//                 {/* Order Summary */}
//                 <div className="lg:w-1/3 lg:ml-8 mt-8 lg:mt-0 bg-white p-6 rounded-lg shadow-lg">
//                     <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//                     <p>Total Price: ${totalPrice.toFixed(2)}</p>
//                     <p>Shipping Price: ${shippingPrice.toFixed(2)}</p>
//                     <p>Tax: ${taxPrice.toFixed(2)}</p>
//                     <p><strong>Total: ${total.toFixed(2)}</strong></p>

//                     {/* Place Order Button */}
//                     <button
//                         className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block ${isCreatingOrder ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         onClick={handlePlaceOrder}
//                         disabled={isCreatingOrder}
//                     >
//                         {isCreatingOrder ? 'Placing Order...' : 'Place Order'}
//                     </button>

//                     <Link to="/payment" className="bg-green-500 text-white px-4 py-2 rounded mt-4 inline-block">Proceed to Payment</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ShippingInfo;
