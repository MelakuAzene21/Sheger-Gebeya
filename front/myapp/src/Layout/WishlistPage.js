import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Title from './Title'
const WishlistPage = () => {
    const user = useSelector((state) => state.auth.user);
    const [wishlistItems, setWishlistItems] = useState([]);

    const baseUrl =
        process.env.NODE_ENV === 'production'
            ? 'https://e-market-fnu1.onrender.com'
            : process.env.REACT_APP_API_URL || 'http://localhost:5000';


    // Fetch wishlist items when the component mounts
    useEffect(() => {
        const fetchFavorites = async () => {
            if (user) {
                try {
                    const response = await fetch(`${baseUrl}/api/favorites/${user._id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setWishlistItems(data);
                    } else {
                        setWishlistItems([]);
                    }
                } catch (error) {
                    console.error('Failed to fetch wishlist items', error);
                }
            }
        };
        fetchFavorites();
    }, [user]);

    // Remove item from wishlist
    const removeFromWishlist = async (itemId) => {
        if (user) {
            try {
                const response = await fetch(`${baseUrl}/api/favorites/${user._id}/${itemId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    // Filter out the removed item from the state
                    setWishlistItems((prevItems) => prevItems.filter(item => item.itemId._id !== itemId));
                } else {
                    console.error('Failed to remove item from favorites');
                }
            } catch (error) {
                console.error('Error removing item from favorites:', error);
            }
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white">
            <h1 className="text-2xl font-bold text-center mb-6">Your Wishlist</h1>
           <Title title='Your Wish List'/>
            {wishlistItems.length > 0 ? (
                <div className="flex flex-col space-y-4">
                    {wishlistItems.map((item) => (
                        <div key={item._id} className="flex items-center border rounded-lg shadow-md p-4">
                            <img
                                src={`${baseUrl}${item.itemId.images[0]}`}
                                alt={item.itemId.name}
                                className="w-24 h-24 object-cover rounded mr-4"
                            />
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{item.itemId.name}</h2>
                                <p className="text-gray-600">Price: {item.itemId.price} ETB</p>
                                <Link
                                    to={`/products/${item.itemId._id}`}
                                    className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
                                >
                                    View Product
                                </Link>
                            </div>
                            <button
                                onClick={() => removeFromWishlist(item.itemId._id)}
                                className="text-red-500 hover:text-red-700 ml-4 p-2 bg-gray-200 rounded"
                            >
                                Remove from Favorites
                            </button>
                        </div>
                    ))}
                </div>
            ) : (<>
<p className="text-center text-gray-600">
    You have no favorite items yet.
</p>
<p className="text-center text-gray-500 mb-4">
    Explore our collection and add items to your wishlist!
</p>
<div className="text-center">
    <Link 
        to="/" 
        className="inline-block px-6 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
    >
        Browse Products
    </Link>
</div>
                </>      
            )}
        </div>
    );
};

export default WishlistPage;
