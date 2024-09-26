import React from 'react';
import { useParams } from 'react-router-dom';

const OrderConfirmation = () => {
    const { id } = useParams();

    return (
        <div>
            <h2>Order Confirmation</h2>
            <p>Your order ID is: {id}</p>
            <p>Thank you for your purchase!</p>
        </div>
    );
};

export default OrderConfirmation;
