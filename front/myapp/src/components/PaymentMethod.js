import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';  // For accessing cart and shipping data
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../features/api/orderApi';  // Order creation hook
import { useGetCurrentUserQuery } from '../features/api/authApi';
import { emptyCart } from '../features/cart/cartSlice';
import toast from 'react-hot-toast';
const PaymentMethod = () => {
    const [paymentMethod, setPaymentMethod] = useState('CBE');
    const { cartItems } = useSelector((state) => state.cart);
    const { shippingAddress } = useSelector((state) => state.order);
    const { data: userDetails,  } = useGetCurrentUserQuery();
    const navigate = useNavigate();
    const [createOrder, { isLoading,  isError, error }] = useCreateOrderMutation();
    const dispatch=useDispatch()

    const handlePaymentSelection = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleContinue = async () => {
      
        const orderData = {
            userId: userDetails._id,
            items: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            totalPrice: cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0),
        };

        console.log('Order Data:', orderData);
    
        try {
            const result = await createOrder(orderData).unwrap();
            console.log('Order Creation Result:', result);
            dispatch(emptyCart());
            navigate('/orders');
        } catch (err) {
            console.error('Order creation failed:', err);
            toast.error(`${err.message}`);
        }

    };
    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>
            <div className="mb-4">
                <input type="radio" name="paymentMethod" value="CBE" checked={paymentMethod === 'CBE'} onChange={handlePaymentSelection} />
                <label className="ml-2">CBE</label>
            </div>
            <div className="mb-4">
                <input type="radio" name="paymentMethod" value="TeleBirr" checked={paymentMethod === 'TeleBirr'} onChange={handlePaymentSelection} />
                <label className="ml-2">TeleBirr</label>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleContinue} disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Continue'}
            </button>
            {isError && <p className="text-red-500 mt-4">No item In the Cart: {error.message}</p>}
        </div>
    );
};
export default PaymentMethod





// import React, { useState } from 'react';

// export default function Notification() {
//     const [isVisible, setIsVisible] = useState(true);

//     return (
//         isVisible && (
//             <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black  w-1/2  h-96  px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
//                 <span>⚠️</span>
//                 <span>We can't accept online orders right now. Please contact us to complete your purchase.</span>
//                 <button
//                     onClick={() => setIsVisible(false)}
//                     className="ml-4 text-black text-3xl font-extrabold"
//                 >
//                     ✕
//                 </button>
//             </div>
//         )
//     );
// }







// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useCreateOrderMutation } from '../features/api/orderApi';
// import { useGetCurrentUserQuery } from '../features/api/authApi';
// import { emptyCart } from '../features/cart/cartSlice';
// import Title from '../Layout/Title';

// const PaymentMethod = () => {
//     const [paymentMethod, setPaymentMethod] = useState('TeleBirr');
//     const { cartItems } = useSelector((state) => state.cart);
//     const { shippingAddress } = useSelector((state) => state.order);
//     const { data: userDetails } = useGetCurrentUserQuery();
//     const navigate = useNavigate();
//     const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation();
//     const dispatch = useDispatch();

//     const handleContinue = async () => {
//         const orderData = {
//             userId: userDetails._id,
//             items: cartItems,
//             shippingAddress: shippingAddress,
//             paymentMethod: paymentMethod,
//             totalPrice: cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0), 
//                };

//         try {
//             const result = await createOrder(orderData).unwrap();
//             if (result) {
//                 dispatch(emptyCart());
//                 navigate(`/orders/${result.order._id}`); // Redirect to order confirmation
//             }
//         } catch (error) {
//             console.error('Failed to create order: ', error);
//         }
//     };

//     return (
//         <div className="payment-method">
//             <Title title={"Payment Methods"}/>
//             <h2>Select Payment Method</h2>
//             <div>
//                 <input
//                     type="radio"
//                     id="telebirr"
//                     name="paymentMethod"
//                     value="TeleBirr"
//                     checked={paymentMethod === 'TeleBirr'}
//                     onChange={() => setPaymentMethod('TeleBirr')}
//                 />
//                 <label htmlFor="telebirr">TeleBirr</label>
//             </div>
//             <button onClick={handleContinue} disabled={isLoading}>
//                 Continue to Payment
//             </button>
//             {isError && <div className="error">{error}</div>}
//         </div>
//     );
// };

// export default PaymentMethod;
