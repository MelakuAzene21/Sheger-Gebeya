import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';  // Import uuid

const PaymentButton = () => {
    const [loading, setLoading] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState('');

    const handlePayment = async () => {
        setLoading(true);
        try {
            // Generate a unique transaction reference
            const transactionRef = uuidv4();
            const paymentData = {
                amount: 2900, // Example amount
                currency: 'ETB',
                email: 'melakuazene623@gmail.com',
                firstName: 'Melaku',
                lastName: 'Azene',
                tx_ref: transactionRef,
            };

            // Make sure paymentData is valid
            if (!paymentData.email || !paymentData.email.includes('@')) {
                throw new Error('Invalid email format');
            }

            const response = await axios.post('http://localhost:5000/payment/initialize', paymentData);
            setPaymentUrl(response.data.payment_url);
            window.location.href = response.data.payment_url; // Redirect to Chapa payment page
        } catch (error) {
            console.error('Error initializing payment', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div >
            <button onClick={handlePayment} disabled={loading} className='mt-28 ml-28 h-10 rounded-lg bg-green-500 text-white font bold '>
                {loading ? 'Processing...' : 'Pay with Chapa'}
            </button>

            {paymentUrl && (
                <a href={paymentUrl} target="_blank" rel="noopener noreferrer">Complete Payment</a>
            )}
        </div>
    );
};

export default PaymentButton;
