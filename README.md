# 🛒 MERN E-Commerce Platform

A comprehensive full-stack eCommerce web application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. This platform provides a complete online shopping experience with features for customers, sub-admins, and administrators.

## ✨ Features

### 🛍️ Customer Features
- **User Authentication & Authorization**
  - User registration and login with JWT
  - Password reset functionality
  - Protected routes and role-based access
- **Product Management**
  - Browse products with advanced filtering and search
  - Product reviews and ratings system
  - Wishlist functionality
  - Detailed product specifications
- **Shopping Experience**
  - Shopping cart management
  - Secure checkout with Chapa payment integration
  - Order tracking and history
  - Real-time order status updates
- **User Profile**
  - Profile management and updates
  - Order history and tracking
  - Address management

### 👨‍💼 Sub-Admin Features
- **Product Management**
  - Add, edit, and delete products
  - Upload product images via Cloudinary
  - Manage inventory and stock levels
  - View sales analytics for their products
- **Order Management**
  - View and manage orders for their products
  - Update order status and tracking

### 🔧 Admin Features
- **Dashboard Analytics**
  - Sales charts and revenue tracking
  - Order statistics and user analytics
  - Comprehensive system overview
- **System Management**
  - Complete user management (admin, sub-admin, user roles)
  - System-wide product and order oversight
  - Customer support and message management

## 🛠️ Tech Stack
- **Frontend**: React.js 18, Redux Toolkit, React Router DOM, Tailwind CSS, Material-UI
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, Bcrypt.js
- **Payment**: Chapa Payment Gateway
- **Storage**: Cloudinary (Image hosting)
- **Email**: Nodemailer with SMTP
- **Deployment**: Heroku (Backend), Vercel (Frontend), MongoDB Atlas

## 📁 Project Structure

```
Ecommerce-MERN/
├── back/                          # Backend server
│   ├── config/                    # Database configuration
│   ├── controllers/               # Route controllers
│   ├── middleware/                # Custom middleware
│   ├── models/                    # MongoDB schemas
│   ├── routes/                    # API routes
│   ├── utils/                     # Utility functions
│   ├── uploads/                   # File uploads
│   ├── package.json
│   └── server.js                  # Main server file
├── front/                         # Frontend application
│   └── myapp/                     # React application
│       ├── public/                # Static files
│       ├── src/                   # Source code
│       │   ├── AdminPage/         # Admin components
│       │   ├── AuthPage/          # Authentication pages
│       │   ├── components/        # Reusable components
│       │   ├── features/          # Redux store
│       │   ├── Layout/            # Layout components
│       │   ├── pages/             # Page components
│       │   ├── Payment/           # Payment components
│       │   ├── UserPage/          # User profile pages
│       │   └── App.js             # Main app component
│       └── package.json
├── .gitignore
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm  package manager

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/MelakuAzene21/MERN-Ecommerce.git
   cd MERN-Ecommerce
   ```

2. **Install backend dependencies**
   ```bash
   cd back
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the `back/` directory:
   ```env
   # Database
   MONGO_URI=your_mongodb_connection_string
   
   # JWT
   JWT_SECRET=your_jwt_secret_key
   
   # Payment Gateway
   CHAPA_SECRET_KEY=your_chapa_secret_key
   
   # Cloud Storage
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # Email Configuration
   SMTP_HOST=your_smtp_host
   SMTP_PORT=your_smtp_port
   SMTP_EMAIL=your_smtp_email
   SMTP_PASSWORD=your_smtp_password
   SMTP_FROM_NAME=your_from_name
   SMTP_FROM_EMAIL=your_from_email
   
   # Environment
   NODE_ENV=development
   PORT=5000
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../front/myapp
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the `front/myapp/` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start the frontend development server**
   ```bash
   npm start
   ```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password/:token` - Password reset

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin/Sub-admin)
- `PUT /api/products/:id` - Update product (Admin/Sub-admin)
- `DELETE /api/products/:id` - Delete product (Admin/Sub-admin)

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/pay` - Update payment status

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/password` - Update password

### Payment
- `POST /payment/initialize` - Initialize payment
- `POST /payment/verify` - Verify payment

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `CHAPA_SECRET_KEY` | Chapa payment API key | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `SMTP_HOST` | SMTP server host | Yes |
| `SMTP_PORT` | SMTP server port | Yes |
| `SMTP_EMAIL` | SMTP email address | Yes |
| `SMTP_PASSWORD` | SMTP password | Yes |
| `NODE_ENV` | Environment (development/production) | No |
| `PORT` | Server port (default: 5000) | No |

### Frontend (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_API_URL` | Backend API URL | Yes |

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create a Heroku account and install Heroku CLI
2. Initialize git repository and add Heroku remote
3. Set environment variables in Heroku dashboard
4. Deploy using `git push heroku main`

### Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Database Deployment (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Create a new cluster
3. Get connection string and add to environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Melaku Azene**
- GitHub: [@MelakuAzene21](https://github.com/MelakuAzene21)

## 🙏 Acknowledgments

- React.js community for the amazing framework
- MongoDB team for the robust database
- Express.js for the flexible web framework
- All contributors and users of this project

## 📞 Support

For support, email support@example.com or create an issue in the repository.

---

**Note**: Make sure to replace placeholder values (API keys, URLs, etc.) with your actual credentials before deploying.
