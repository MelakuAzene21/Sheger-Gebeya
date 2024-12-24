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
 