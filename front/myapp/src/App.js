
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute.js';
import ProductDetails from './components/ProductDetails.js'
import Navbar from './components/Navbar.js';
import ProductsPage from './ProductsPage.js';
import NotFound from './components/NotFound'
import Cart from './components/Carts.js'
import ReviewsPage from './pages/ReviewsPage.js'
import { Toaster } from 'react-hot-toast';
import ShippingForm from './components/ShippingForm.js';
import ShippingInfo from './components/ShippingInfo.js';
import PaymentMethod from './components/PaymentMethod.js';
import OrdersTable from './components/OrdersTable.js';
import OrderDetails from './components/OrderDetails.js';
import { setUser } from './features/api/authSlice.js';
import { useGetCurrentUserQuery } from './features/api/authApi.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
 import Dashboard from './AdminPage/Dashboard.js';
import Profile from './UserPage/Profile.js';
import GetAllUser from './AdminPage/GetAllUser.js';
import UpdateProfile from './UserPage/UpdateProfile.js';
import UpdatePassword from './UserPage/UpdatePassword.js';
import Products from './AdminPage/Products.js';
import AddProduct from './AdminPage/AddProduct.js';
import GetAllOrders  from './AdminPage/GetAllOrders';
import GetReviews from './pages/GetReviews.js';
import ReviewsDetail from './pages/ReviewsDetail.js'
import Footer from './Layout/Footer.js';
import OrderConfirmation from './Order/OrderConfirmation.js';
import ForgotPassword from './AuthPage/ForgotPassword.js';
import ResetPassword from './AuthPage/ResetPassword.js';
import About from './Layout/About.js'
import Contact from './Layout/Contact.js';
import FAQ from './Layout/FAQ.js'
import ShippingAndReturn from './Layout/ShippingAndReturn.js'
import TermsAndConditions from './Layout/TermsAndConditions.js'
import PaymentMethod2 from './Layout/PaymentMethod.js';
import CustomerMessage from './Layout/CustomerMessage.js'
import WishlistPage from './Layout/WishlistPage.js';
import Payment from './Payment/PaymentPage.js'
import Success from './Payment/Success.js';
import ThankYou from './Payment/ThankYou.js';
function App() {
  const dispatch=useDispatch();
  const {data:user}=useGetCurrentUserQuery();
  
  useEffect(()=>{
    if(user){
      dispatch(setUser(user))
    }
  },[user,dispatch]);


  
   return (
    <Router>
       <div className="bg-gray-800 " >
      <Navbar />
         <Toaster position="top-center" reverseOrder={false} />
        
         <div className='mt-16 flex flex-col min-h-screen  ' >
               
        <Routes >
          <Route path='/' element={<ProductsPage  className="w-full"  />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cart" element={<ProtectedRoute component={Cart} />} />
             <Route path="/wishlist" element={<ProtectedRoute component={WishlistPage} />} />

             <Route path='/dashboard' element={<ProtectedRoute component={Dashboard} />} />

           <Route path='/reviews/:id' element={<ProtectedRoute component={ReviewsPage}/>}/>
             <Route path="/reviewProduct/:productId" element={<GetReviews />} />
            
             <Route path="/reviewProduct/:productId" element={<ReviewsDetail />} />
             <Route path="/forgot-password" element={<ForgotPassword />} />
             <Route path="/about" element={<About />} />
             <Route path="/contact" element={<Contact />} />
             <Route path="/faq" element={<FAQ />} />
             <Route path='/policy/shipping-returns' element={<ShippingAndReturn/>}/>
             <Route path='/policy/terms-conditions' element={<TermsAndConditions />} />
             <Route path='/policy/payment-methods' element={<PaymentMethod2 />} />
             <Route path='/support/question' element={<CustomerMessage />} />

             <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path='/ShippingForm' element={<ProtectedRoute component={ShippingForm} />
          } />
          <Route path='/shipping-info' element={<ProtectedRoute component={ShippingInfo} />
          } />

             <Route path='/chapa-payment' element={<ProtectedRoute component={Payment} />
             } />
          <Route path='/payment' element={<ProtectedRoute component={PaymentMethod} />
          } />


             <Route path='/success' element={<Success />} />
             } />
            <Route path='/thank-you' element={<ThankYou />
             } />

             <Route path='/profile' element={<ProtectedRoute component={Profile} />
             } />

             <Route path='/users' element={<ProtectedRoute component={GetAllUser}  />
             } />

             <Route path='/products' element={<ProtectedRoute component={Products} />
             } />

             <Route path='/products/add' element={<ProtectedRoute component={AddProduct} />
             } />

             <Route path='/allOrders' element={<ProtectedRoute component={GetAllOrders} />
             } />
          
          {/* Route for the orders table */}
          <Route path="/orders" element={<ProtectedRoute component={OrdersTable} />} />
             <Route path="/updateProfile" element={<ProtectedRoute component={UpdateProfile} />} />
             <Route path="/updatePassword" element={<ProtectedRoute component={UpdatePassword} />} />

          {/* Route for viewing details of a specific order */}
          <Route path="/order/:id" element={<ProtectedRoute component={OrderDetails} />} />
             <Route path="/orders/:id" element={<ProtectedRoute component={OrderConfirmation} />} />

        </Routes>
            
      </div>
      <Footer/>
  </div>
    </Router>
    
  );
}

export default App;

