const express = require('express');
const path=require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userCredentialRoute = require('./routes/userCredentialRoutes');
//const userCredentialRoute=require('./routes/userCredentialRoutes')
const cors = require('cors');
const productRoutes=require('./routes/product')
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const messageRoutes = require('./routes/messageRoutes');
const favoritesRoutes = require('./routes/favorites');
const paymentRoutes = require('./routes/Payment');
const userRoleController = require('./controllers/userRoleController')
// const { protect } = require('../middleware/authMiddleware');
// const { createNote, getNotes, updateNote, deleteNote } = require('../controllers/noteController');
 
dotenv.config(); 
connectDB();
  
const app = express();
// Set up dynamic CORS
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? 'https://e-market-hbf7.onrender.com'
        : 'http://localhost:3000',
    credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));

// Stripe webhook must be defined BEFORE express.json so we can use raw body
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '');
const Order = require('./models/orderModel');

app.post('/payment/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    try {
        const sig = req.headers['stripe-signature'];
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        if (!endpointSecret) {
            return res.status(500).send('Missing STRIPE_WEBHOOK_SECRET');
        }

        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        } catch (err) {
            console.error('Stripe webhook signature verification failed:', err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const txRef = session.metadata && session.metadata.tx_ref ? session.metadata.tx_ref : null;

            if (txRef) {
                const order = await Order.findOne({ tx_ref: txRef });
                if (order) {
                    order.isPaid = true;
                    order.paidAt = new Date();
                    order.paymentResult = {
                        id: session.payment_intent || session.id,
                        status: 'completed',
                        update_time: new Date().toISOString(),
                        email_address: session.customer_details && session.customer_details.email ? session.customer_details.email : session.customer_email,
                    };
                    await order.save();
                } else {
                    console.warn('Order not found for tx_ref:', txRef);
                }
            } else {
                console.warn('No tx_ref in session metadata');
            }
        }

        res.status(200).send('Received');
    } catch (error) {
        console.error('Stripe webhook handler error:', error);
        res.status(500).send('Server error');
    }
});

app.use(express.json());
app.use(cookieParser());  
app.use('/api/auth', authRoutes); 
app.use('/api/messages', messageRoutes);
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes)
app.use('/api/users',userCredentialRoute)
app.use('/api/role', userRoleController)

app.use('/api/favorites', favoritesRoutes);
app.use('/payment', paymentRoutes);
app.use('/uploads',express.static(path.join(__dirname,"uploads")))
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 