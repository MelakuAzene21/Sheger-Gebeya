import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeItemFromCart } from '../features/cart/cartSlice';
import { FaShoppingCart } from 'react-icons/fa'; // Importing a cart icon from react-icons
import { Link } from 'react-router-dom';
import Title from '../Layout/Title';

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // Calculate total quantity and total price
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const handleIncrement = (item) => {
        if (item.quantity < item.Stock) {
            dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }));
        }
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }));
        }
    };

    const handleRemove = (id) => {
        dispatch(removeItemFromCart(id));
    };

    if (cartItems.length === 0) {
return(
    <div className='flex flex-col items-center justify-center h-screen text-center p-4'>
        <div className='bg-gray-100 p-6 rounded-lg shadow-lg'>
            <FaShoppingCart className='text-6xl text-gray-400 mb-4' />
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>Your Cart is Empty</h1>
            <p className='text-lg text-gray-600 mb-4'>It looks like you haven't added anything to your cart yet.</p>
            <Link to={'/'} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300'>
                Continue Shopping
            </Link >
        </div>
    </div>
)
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Title title={"Cart"}/>
            {/* Main Container for Cart and Order Summary */}
            <div className="flex flex-col lg:flex-row justify-between">
                {/* Cart Items Section */}
                <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>
                    {cartItems.map((item) => (
                        <div key={item._id} className="flex items-center justify-between mb-6 p-4 border-b border-gray-200">
                            <div className="flex items-center">
                                <img src={`http://localhost:5000${item.images[0]}`} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-6" />
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                                    <p className="text-sm text-gray-600">Price: ${item.price}</p>
                                    <div className="mt-2 flex items-center">
                                        <button
                                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l focus:outline-none"
                                            onClick={() => handleDecrement(item)}
                                        >
                                            -
                                        </button>
                                        <span className="mx-3 text-lg">{item.quantity}</span>
                                        <button
                                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r focus:outline-none"
                                            onClick={() => handleIncrement(item)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                                    onClick={() => handleRemove(item._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary Section */}
                <div className="w-full lg:w-1/3 lg:ml-8 mt-8 lg:mt-0">
                    <div className="bg-white rounded-lg shadow-lg p-6 lg:sticky lg:top-16">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
                        <div className="mb-4">
                            <div className="flex justify-between mb-2 text-gray-700">
                                <span>Total Items:</span>
                                <span>{totalQuantity}</span>
                            </div>
                            <div className="flex justify-between mb-2 text-gray-700">
                                <span>Total Price:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <Link  to={'/ShippingForm'}   className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
