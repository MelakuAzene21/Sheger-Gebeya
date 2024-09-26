// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';  // For accessing cart and shipping data
// import { useNavigate } from 'react-router-dom';
// import { useCreateOrderMutation } from '../features/api/orderApi';  // Order creation hook
// import { useGetCurrentUserQuery } from '../features/api/authApi';
// import { emptyCart } from '../features/cart/cartSlice';
// const PaymentMethod = () => {
//     const [paymentMethod, setPaymentMethod] = useState('Credit Card');
//     const { cartItems } = useSelector((state) => state.cart);
//     const { shippingAddress } = useSelector((state) => state.order);
//     const { data: userDetails,  } = useGetCurrentUserQuery();
//     const navigate = useNavigate();
//     const [createOrder, { isLoading,  isError, error }] = useCreateOrderMutation();
//     const dispatch=useDispatch()
//     console.log('User Details:', userDetails);


//     const handlePaymentSelection = (e) => {
//         setPaymentMethod(e.target.value);
//     };

//     const handleContinue = async () => {
      

//         const orderData = {
//             userId: userDetails._id,
//             items: cartItems,
//             shippingAddress: shippingAddress,
//             paymentMethod: paymentMethod,
//             totalPrice: cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0),
//         };

//         console.log('Order Data:', orderData);
        

//         try {
//             const result = await createOrder(orderData).unwrap();
//             console.log('Order Creation Result:', result);
               
//             dispatch(emptyCart());
//                 navigate('/orders');
            
//         } catch (error) {
//             console.error('Order creation failed:', error);
//         }
//     };

  

//     return (
//         <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>
//             <div className="mb-4">
//                 <input type="radio" name="paymentMethod" value="Credit Card" checked={paymentMethod === 'Credit Card'} onChange={handlePaymentSelection} />
//                 <label className="ml-2">Credit Card</label>
//             </div>
//             <div className="mb-4">
//                 <input type="radio" name="paymentMethod" value="PayPal" checked={paymentMethod === 'PayPal'} onChange={handlePaymentSelection} />
//                 <label className="ml-2">PayPal</label>
//             </div>
//             <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleContinue} disabled={isLoading}>
//                 {isLoading ? 'Processing...' : 'Continue'}
//             </button>
//             {isError && <p className="text-red-500 mt-4">No item In the Cart: {error.message}</p>}
//         </div>
//     );
// };
// export default PaymentMethod

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../features/api/orderApi';
import { useGetCurrentUserQuery } from '../features/api/authApi';
import { emptyCart } from '../features/cart/cartSlice';
import Title from '../Layout/Title';

const PaymentMethod = () => {
    const [paymentMethod, setPaymentMethod] = useState('TeleBirr');
    const { cartItems } = useSelector((state) => state.cart);
    const { shippingAddress } = useSelector((state) => state.order);
    const { data: userDetails } = useGetCurrentUserQuery();
    const navigate = useNavigate();
    const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation();
    const dispatch = useDispatch();

    const handleContinue = async () => {
        const orderData = {
            userId: userDetails._id,
            items: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            totalPrice: cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0), 
               };

        try {
            const result = await createOrder(orderData).unwrap();
            if (result) {
                dispatch(emptyCart());
                navigate(`/orders/${result.order._id}`); // Redirect to order confirmation
            }
        } catch (error) {
            console.error('Failed to create order: ', error);
        }
    };

    return (
        <div className="payment-method">
            <Title title={"Payment Methods"}/>
            <h2>Select Payment Method</h2>
            <div>
                <input
                    type="radio"
                    id="telebirr"
                    name="paymentMethod"
                    value="TeleBirr"
                    checked={paymentMethod === 'TeleBirr'}
                    onChange={() => setPaymentMethod('TeleBirr')}
                />
                <label htmlFor="telebirr">TeleBirr</label>
            </div>
            <button onClick={handleContinue} disabled={isLoading}>
                Continue to Payment
            </button>
            {isError && <div className="error">{error}</div>}
        </div>
    );
};

export default PaymentMethod;
