const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const Order = require('../models/orderModel');
// Load environment variables
dotenv.config();
// Determine the base URL based on the environment
const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://e-market-hbf7.onrender.com'
    : 'http://localhost:3000';
const router = express.Router();

router.post('/initialize', async (req, res) => {
    try {
        const { amount, currency, email, firstName, lastName, tx_ref } = req.body;

        if (!email || !email.includes('@')) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const paymentData = {
            amount,
            currency,
            email,
            first_name: firstName,
            last_name: lastName,
            tx_ref,
            // callback_url: 'http://localhost:5000/payment/callback',
            callback_url: `https://3508-213-55-102-49.ngrok-free.app/payment/callback?tx_ref=${tx_ref}`,
            return_url: `${baseUrl}/thank-you?tx_ref=${tx_ref}`, // Dynamically set return_url
            customization: {
                "title": "Purchase good"
                
            }
        };

        const chapaResponse = await axios({
            method: 'post',
            url: 'https://api.chapa.co/v1/transaction/initialize',
            headers: {
                Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
                'Content-Type': 'application/json'
            },
            data: paymentData
        });
        // res.json(chapaResponse.data)
        return res.status(200).json({ payment_url: chapaResponse.data.data.checkout_url });
    } catch (error) {
        console.error('Error initializing payment:', error.response ? error.response.data : error.message);
        res.status(500).json({
            message: 'Error initializing payment',
            error: error.response ? error.response.data : error.message
        });
    }
}); 




router.post('/callback', async (req, res) => {
    try {
        const chapaData = req.body;
        console.log('Received Chapa callback:', chapaData);

        // You can check the transaction status here (e.g., 'success', 'failed')
        if (chapaData.status === 'success') {
            // Find the order in the database using chapaData.orderId (assuming chapaData contains this)
            const order = await Order.findById(chapaData.orderId);

            if (order) {
                // Update payment details
                order.isPaid = true; // Mark the order as paid
                order.paidAt = Date.now(); // Set the paid time
                order.paymentResult = {
                    id: chapaData.paymentId,  // Assuming chapaData has the paymentId
                    status: chapaData.status,
                    update_time: chapaData.updateTime, // Assuming chapaData has the updateTime
                    email_address: chapaData.email,  // Assuming chapaData has the payer's email
                };

                // Save the updated order
                const updatedOrder = await order.save();

                // Respond back to the frontend with success
                return res.status(200).json({ message: 'Transaction processed successfully', order: updatedOrder });
            } else {
                return res.status(404).json({ message: 'Order not found' });
            }
        } else {
            // Handle failed transaction case
            console.log('Transaction failed:', chapaData);
            return res.status(400).json({ message: 'Transaction failed' });
        }
    } catch (error) {
        console.error('Error in payment callback:', error);
        return res.status(500).json({ message: 'Error processing callback', error });
    }
});



// router.get('/verify-transaction/:tx_ref', async (req, res) => {
//     try {
//         const txRef = req.params.tx_ref;  // Get tx_ref from the route parameter
//         const url = `https://api.chapa.co/v1/transaction/verify/${txRef}`;

//         const response = await axios.get(url, {
//             headers: {
//                 Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
//             }
//         });

//         res.status(response.status).json(response.data);
//     } catch (error) {
//         console.error('Error verifying transaction:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error verifying transaction',
//             error: error.response ? error.response.data : error.message
//         });
//     }
// });



  

// Verify transaction and update order status
router.get('/verify-transaction/:tx_ref', async (req, res) => {
    try {
        const txRef = req.params.tx_ref; // Get tx_ref from the route parameter
        const url = `https://api.chapa.co/v1/transaction/verify/${txRef}`;

        // Make a request to verify the transaction with Chapa API
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
            }
        });
        if (response.status === 200 && response.data.status === 'success') {
            const { tx_ref, status } = response.data.data;  // Extracting transaction details from Chapa response

            // Check if the payment status is "success"
            if (status === 'success' && tx_ref) {
                // Find  the order in the database using the tx_ref
                const order = await Order.findOne({ tx_ref: tx_ref });

                // Check if the order exists and its payment status is "pending"
                if (order && order.paymentResult && order.paymentResult.status === 'pending') {
                    // Update the paymentResult status to "completed"
                    order.paymentResult.status = 'completed';
                    order.isPaid = true; // Optionally update the isPaid field if needed
                    order.paymentResult.updatedAt = new Date(); // Update the timestamp for paymentResult

                    await order.save();  // Save the updated order status

                    // Send a response indicating the order was successfully updated
                    return res.status(200).json({
                        success: true,
                        message: 'Transaction verified and order payment status updated successfully.',
                        order
                    });
                } else if (!order) {
                    // If order doesn't exist, return an error response
                    return res.status(404).json({
                        success: false,
                        message: 'Order not found'
                    });
                } else if (order.paymentResult.status !== 'pending') {
                    // If the order payment status is already updated, return an acknowledgment
                    return res.status(200).json({
                        success: true,
                        message: 'Payment already processed for this order.'
                    });
                }
            }
        }

        // If the transaction verification failed, return an error
        res.status(400).json({
            success: false,
            message: 'Transaction verification failed or invalid transaction reference.'
        });
    } catch (error) {
        console.error('Error verifying transaction:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying transaction',
            error: error.response ? error.response.data : error.message
        });
    }
});






 



// // POST request to handle callback after payment
// router.post('/callback', async (req, res) => {
//     const { tx_ref, status } = req.body;

//     // Process the transaction based on status
//     if (status === 'success') {
//         // Update the order/payment status in your database
//         // Optionally render a success page here or redirect to a success URL
//         res.json({ message: 'Payment was successful', tx_ref });
//     } else {
//         res.status(400).json({ message: 'Payment failed or was cancelled', tx_ref });
//     }
// });

// // POST request to handle webhook notifications
// router.post('/webhook', async (req, res) => {
//     const { tx_ref, status } = req.body;

//     // Verify the webhook signature (you can verify it using a secret)
//     // Update the order/payment status in the database
//     if (status === 'success') {
//         // Handle successful payment (e.g., update your order database)
//         res.json({ message: 'Webhook: Payment confirmed', tx_ref });
//     } else {
//         // Handle failed or pending payment
//         res.status(400).json({ message: 'Webhook: Payment failed or pending', tx_ref });
//     }
// });

module.exports = router;
