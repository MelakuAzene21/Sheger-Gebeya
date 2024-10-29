
// import React, { useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { useGetProductByIdQuery } from '../features/api/authApi';
// import { addItemToCart } from '../features/cart/cartSlice';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import ReviewsDetail from '../pages/ReviewsDetail.js';

// const ProductDetails = () => {
//     const { id } = useParams();
//     const { data: product, error, isLoading } = useGetProductByIdQuery(id);
//     const [quantity, setQuantity] = useState(1);
//     const dispatch = useDispatch();

//     const handleAddToCart = async () => {
//         if (product.Stock < 1) {
//             return toast.error('Product is out of stock');
//         }
//         dispatch(addItemToCart({ ...product, quantity }));
//         try {
//             await axios.post(
//                 'http://localhost:5000/api/cart',
//                 { productId: product._id, quantity },
//                 {
//                     withCredentials: true, // Send cookies with request
//                 }
//             );
//             toast.success('Item added to cart Data Base!');
//         } catch (error) {
//             console.error('Error adding to cart:', error.response ? error.response.data : error.message);
//         }
//     };

//     const handleIncrement = () => {
//         if (quantity < product.Stock) {
//             setQuantity(prevQty => prevQty + 1);
//         } else {
//             toast.error('Cannot add more than available stock');
//         }
//     };

//     const handleDecrement = () => {
//         if (quantity > 1) {
//             setQuantity(prevQty => prevQty - 1);
//         }
//     };

//     if (isLoading) return <div className="text-center mt-20">Loading...</div>;
//     if (error) return <div className="text-center text-red-500 mt-20">Error fetching product details.</div>;

//     return (
//         <div className="container mx-auto px-4 py-12">
//             <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
//                 {/* Product Image */}
//                 <div className="md:w-1/2">
//                     <img
//                         src={`http://localhost:5000${product.image}`} 
//                         alt={product.name}
//                         className="w-full h-full object-cover hover:scale-104 transition-transform duration-300"
//                     />
//                 </div>

//                 {/* Product Details */}
//                 <div className="md:w-1/2 p-2">
//                     <h2 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h2>
//                     <p className="text-xl text-blue-600 mb-4">Price: ${product.price}</p>
//                     <p className="text-gray-500 mb-4">Brand: {product.brand}</p>
//                     <p className="text-gray-500 mb-4">Category: {product.category}</p>
//                     <p className="text-gray-500 mb-4">Rating: {product.rating} / 5</p>
//                     <p className="text-gray-500 mb-4">Number of Reviews: {product.numReviews}</p>
//                     <p className="text-gray-700 mb-6">{product.description}</p>

//                     {product.Stock > 0 ? (
//                         <p className="text-green-500 font-semibold mb-4">In Stock</p>
//                     ) : (
//                         <p className="text-red-500 font-semibold mb-4">Out of Stock</p>
//                     )}

//                     {/* Quantity Selector */}
//                     <div className="mt-4 flex items-center space-x-4">
//                         <button
//                             className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-l hover:bg-gray-300 transition"
//                             onClick={handleDecrement}
//                             disabled={quantity === 1}
//                         >
//                             -
//                         </button>
//                         <span className="px-4 py-2 bg-gray-100 text-gray-700 font-bold">{quantity}</span>
//                         <button
//                             className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-r hover:bg-gray-300 transition"
//                             onClick={handleIncrement}
//                             disabled={quantity === product.Stock}
//                         >
//                             +
//                         </button>
//                     </div>

//                     {/* Add to Cart Button */}
//                     <button
//                         onClick={handleAddToCart}
//                         disabled={product.Stock === 0}
//                         className={`mt-6 px-6 py-3 font-bold text-white rounded-lg shadow-lg transition-all ${product.Stock === 0
//                             ? 'bg-gray-400 cursor-not-allowed'
//                             : 'bg-blue-600 hover:bg-blue-700'
//                             }`}
//                     >
//                         Add to Cart
//                     </button>

//                     {/* Link to Reviews Page */}
//                     <Link to={`/reviews/${id}`} className="block mt-6 text-blue-500 underline">
//                         POST your Reviews
//                     </Link>
//                 </div>
//             </div>

//             {/* Display Reviews */}
//             <ReviewsDetail productId={id} />     
//      </div>
//     );
// };
// export default ProductDetails;

import React, { useState,useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetProductByIdQuery } from '../features/api/authApi';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../features/cart/cartSlice';
import toast from 'react-hot-toast';
import ReviewsDetail from '../pages/ReviewsDetail.js';
import Title from '../Layout/Title.js';
import { AiOutlineZoomIn, AiOutlineClose, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Add Heart Icons
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
const ProductDetails = () => {
    const { id } = useParams();
    const { data: product, error, isLoading } = useGetProductByIdQuery(id);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [relatedProductBrand, setRelatedProductsBrand] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState(null);

    const [isFavorite, setIsFavorite] = useState(false); // State for favorite

    const [isFullscreen, setIsFullscreen] = useState(false); // State for fullscreen mode
    const dispatch = useDispatch();
    const handleAddToCart = async () => {
        if (product.Stock < 1) {
            return toast.error('Product is out of stock');
        }
        dispatch(addItemToCart({ ...product, quantity }));
        toast.success('Item added to cart!');
    };

    const handleIncrement = () => {
        if (quantity < product.Stock) {
            setQuantity((prevQty) => prevQty + 1);
        } else {
            toast.error('Cannot add more than available stock');
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prevQty) => prevQty - 1);
        }
    };

    // Toggle fullscreen view
    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };


    // Toggle favorite status
    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev);
        if (!isFavorite) {
            toast.success('Added to favorites!');
            // You can implement the API call here to save to the backend if needed.
        } else {
            toast.success('Removed from favorites!');
            // You can implement the API call here to remove from favorites in the backend if needed.
        }
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}/reviews`, {
                    withCredentials: true
                });
                setReviews(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch reviews');
                setLoading(false);
            }
        };

        fetchReviews();
    }, [id]);



    useEffect(() => {
        // Fetch related products based on the current product's category
        const fetchRelatedProducts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}/related`);
                const data = await response.json();
                setRelatedProducts(data);
            } catch (error) {
                console.error('Error fetching related products:', error);
            }
        };

        const fetchRelatedProductsBrand = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}/brand`);
                const data = await response.json();
                setRelatedProductsBrand(data);
            } catch (error) {
                console.error('Error fetching related products:', error);
            }
        };


        if (product) {
            fetchRelatedProducts();
            fetchRelatedProductsBrand();
        }
    }, [id, product]);

    if (isLoading) return <Skeleton count={10} />
    if (isLoading) return <div className="text-center mt-20">Loading...</div>;
    if (error) return <div className="text-center text-red-500 mt-20">Error fetching product details.</div>;
    if (loading) {
        return <p className="text-center text-gray-500">Loading reviews...</p>;
    }

    if (err) {
        return <p className="text-center text-red-500">{error}</p>;
    }
    return (
        <div className="w-full px-4 py-12">
            <Title title={"Products Details"} />
            <div className="flex flex-col md:flex-row bg-gray-500 shadow-lg rounded-lg overflow-hidden">
                <div className="md:w-1/2 p-4 relative">
                    <img
                        src={`http://localhost:5000${product.images[selectedImageIndex]}`}
                        alt={product.name}
                        className="w-full h-[500px] object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                    />

                    {/* Favorite Icon Button */}
                    <button
                        onClick={toggleFavorite}
                        className="absolute bottom-48 right-4 p-2  rounded-full shadow-md hover:bg-gray-300"
                    >
                        {isFavorite ? (
                            <AiFillHeart className="text-2xl text-red-700 bg-red-300" title='Remove from favorites' />
                        ) : (
                            <AiOutlineHeart className="text-2xl text-white" title='Add to favorites' />
                        )}
                    </button>



                    {/* Zoom Icon Button */}
                    <button
                        onClick={toggleFullscreen}
                        className="absolute bottom-36 right-4 p-2 bg-green-400 rounded-full shadow-md hover:bg-gray-300"
                    >
                        <AiOutlineZoomIn className="text-2xl text-gray-700" title='Zoom in'/>
                    </button>

                    {/* Fullscreen Image Modal */}
                    {isFullscreen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                            {/* Close Button */}
                            <button
                                onClick={() => setIsFullscreen(false)}
                                className="absolute top-4  p-2 bg-white rounded-full shadow-md hover:bg-gray-300"
                            >
                                <AiOutlineClose className="text-2xl text-gray-700" />
                            </button>

                            {/* Left Navigation Button */}
                            {selectedImageIndex > 0 && (
                                <button
                                    onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                                    className="absolute left-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-300"
                                >
                                    <span className="text-2xl text-gray-700">{'<'}</span>
                                </button>
                            )}

                            {/* Display the current image in fullscreen */}
                            <img
                                src={`http://localhost:5000${product.images[selectedImageIndex]}`}
                                alt="Fullscreen"
                                className="w-auto h-full object-contain"
                            />

                            {/* Right Navigation Button */}
                            {selectedImageIndex < product.images.length - 1 && (
                                <button
                                    onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                                    className="absolute right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-300"
                                >
                                    <span className="text-2xl text-gray-700">{'>'}</span>
                                </button>
                            )}
                        </div>
                    )}


                    {/* Image Previews */}
                    <div className="flex space-x-2 mt-4">
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                src={`http://localhost:5000${image}`}
                                alt={`Preview ${index + 1}`}
                                className={`w-20 h-20 object-cover cursor-pointer rounded-md ${index === selectedImageIndex ? 'ring-2 ring-blue-500' : ''}`}
                                onClick={() => setSelectedImageIndex(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Details Section */}
                <div className="md:w-1/2 p-4 space-y-4">
                    <h2 className="text-3xl font-semibold text-white">{product.name}</h2>
                    <p className="text-lg text-white"><span className='text-2xl'>Price</span>: {product.price} ETB</p>
                    <p className="text-white"><span className='text-2xl'>Brand</span>: {product.brand}</p>
                    <p className="text-white"><span className='text-2xl'>Category</span>: {product.category}</p>
                    <p className="text-white"><span className='text-2xl'>Rating</span>: {product.rating} / 5</p>
                    <p className="text-white"><span className='text-2xl'>Number of Reviewers</span>: {product.numReviews}</p>
                    <p className="text-white"><span className='text-2xl'>Description:</span> {product.description}</p>

                    {product.Stock > 0 ? (
                        <p className="text-green-400 font-medium">In Stock</p>
                    ) : (
                        <p className="text-red-500 font-medium">Out of Stock</p>
                    )}

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-4">
                        <button
                            className="px-4 py-2 bg-red-600 text-lg text-gray-700 font-bold rounded-l hover:bg-gray-300 transition"
                            onClick={handleDecrement}
                            disabled={quantity === 1}
                        >
                            -
                        </button>
                        <span className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold">{quantity}</span>
                        <button
                            className="px-4 py-2 bg-green-500 text-gray-900 font-semibold rounded-r hover:bg-gray-300 transition"
                            onClick={handleIncrement}
                            disabled={quantity === product.Stock}
                        >
                            +
                        </button>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={product.Stock === 0}
                        className={`w-28 mt-4 px-6 py-3 font-bold text-white rounded-lg shadow-lg transition-all ${product.Stock === 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-400'
                            }`}
                    >
                        Add to Cart
                    </button>
                    <Link to="/cart" className='bg-blue-600 hover:bg-blue-400 ml-10 px-6 py-6  font-bold text-white rounded-lg shadow-lg transition-all'>
                        Go to Cart
                    </Link>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12 space-y-8">
                <div className="text-center">
                    <Link
                        to={`/reviews/${id}`}
                        className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
                    >
                        POST Your Review
                    </Link>
                </div>
                {/* Conditionally display Reviews section */}
                {reviews.length > 0 && (
                    <>
                        <h3 className="text-2xl font-semibold mb-4 text-gray-400">Reviews</h3>
                        <ReviewsDetail productId={id} />
                      </>

                                                       )}
            </div>


           {/* Specifications Section */}
{product.specifications && product.specifications.length > 0 && (
    <div className="mt-6 p-6 bg-gray-500 rounded-lg shadow-lg mx-auto max-w-md">
        <h3 className="text-2xl font-semibold text-green-400 mb-4 text-center">Specifications</h3>
        <ul className="list-none space-y-2 ">
            {product.specifications.map((spec) => (
                <li key={spec._id} className="text-white">
                    <span className="font-semibold font-serif ">{spec.name}:</span>   <span className="font-normal italic">{spec.value}</span>
                </li>
            ))}
        </ul>
    </div>
)}




            {/* Related Products by Category */}
            {relatedProducts && relatedProducts.length > 0 && (
                <div className="related-products mt-8">
                    <h3 className="text-xl font-semibold text-green-400 mb-4 italic border-l-8 border-spacing-2">
                        Related Category Products
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedProducts.map((relatedProduct) => (
                            <div
                                key={relatedProduct._id}
                                className="bg-white border border-gray-200 rounded-lg shadow-lg"
                            >
                                <img
                                    src={`http://localhost:5000${relatedProduct.images[0]}`}
                                    alt={relatedProduct.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-2">
                                        {relatedProduct.name}
                                    </h2>
                                    <p className="text-gray-700 mb-4">{relatedProduct.description}</p>
                                    <span className="text-yellow-300 line-through mr-2">{relatedProduct.price + 12}</span>
                                    <p className="text-blue-600 mb-4">{relatedProduct.price}  ETB</p>
                                    <Link
                                        to={`/products/${relatedProduct._id}`}
                                        className="block w-full text-center text-white bg-blue-600 rounded-lg py-2 hover:bg-blue-500 transition-all"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Related Products by Brand */}
            {relatedProductBrand && relatedProductBrand.length > 0 && (
                <div className="related-products mt-8">
                    <h3 className="text-xl font-semibold mb-4 italic border-l-8 text-blue-600">
                        Related Brand Products
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedProductBrand.map((relatedProductBrand) => (
                            <div
                                key={relatedProductBrand._id}
                                className="bg-white border border-gray-200 rounded-lg shadow-lg"
                            >
                                <img
                                    src={`http://localhost:5000${relatedProductBrand.images[0]}`}
                                    alt={relatedProductBrand.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-2">
                                        {relatedProductBrand.name}
                                    </h2>
                                    <p className="text-gray-700 mb-4">{relatedProductBrand.description}</p>
                                    <span className="text-yellow-300 line-through mr-2">{relatedProductBrand.price + 12}</span>

                                    <p className="text-blue-600 mb-4">{relatedProductBrand.price}  ETB</p>
                                    <Link
                                        to={`/products/${relatedProductBrand._id}`}
                                        className="block w-full text-center text-white bg-blue-600 rounded-lg py-2 hover:bg-blue-500 transition-all"

                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}





        </div>
    );
};

export default ProductDetails;
