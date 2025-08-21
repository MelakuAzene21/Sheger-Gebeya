// // ProductsPage.js
// import React, { useState, useEffect } from 'react';
// import { useGetProductsQuery } from './services/productsApi';
// import { Link } from 'react-router-dom';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import Carousel from './Layout/Carousel';
// import Title from './Layout/Title';
// import { useDispatch } from 'react-redux';
// import { addItemToCart } from './features/cart/cartSlice';
// import toast from 'react-hot-toast';
// import {  AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Add Heart Icons
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
// import { useGetCurrentUserQuery } from './features/api/authApi';
// import { useParams ,useNavigate} from 'react-router-dom'
// const ProductsPage = () => {
//     const { id } = useParams();
//     const [page, setPage] = useState(1);
//     const [keyword, setKeyword] = useState('');
//     const [category, setCategory] = useState('');
//     const [brand, setBrand] = useState('');
//     const [minPrice, setMinPrice] = useState('');
//     const [maxPrice, setMaxPrice] = useState('');
//     const dispatch = useDispatch();
//     const [quantity] = useState(1);
//     const { data, error, isLoading, refetch } = useGetProductsQuery({
//         page,
//         keyword,
//         category,
//         brand,
//         minPrice,
//         maxPrice,
//     });
//     const categories = ['All', 'Electronics', 'camera', 'Home', 'Wearable', 'Computer','Techono','charger'];
//     // Handle category selection and refetch products
//     const handleCategoryClick = (cat) => {
//         setCategory(cat === 'All' ? '' : cat);
//     };
//     const BASE_URL =
//         process.env.NODE_ENV === 'production'
//             ? 'https://e-market-fnu1.onrender.com'
//             : process.env.REACT_APP_API_URL || 'http://localhost:5000';
//     const { data: user } = useGetCurrentUserQuery(); // Fetch current user info
//     // Track favorite status for each item
//     const [favoriteStatuses, setFavoriteStatuses] = useState({});
//         const navigate = useNavigate();
//     // Refetch products when category changes
//     useEffect(() => {
//         refetch();
//     }, [category, refetch]);

//     // Fetch and update favorite statuses on load
//     useEffect(() => {
//         const fetchFavoriteStatuses = async (userId) => {
//             if (!userId) return;

//             try {
//                 const response = await fetch(`${BASE_URL}/api/favorites/${userId}`);
//                 if (response.ok) {
//                     const favoriteData = await response.json();
//                     // Create a map of favorite statuses by productId
//                     const initialStatuses = {};
//                     favoriteData.forEach((favorite) => {
//                         initialStatuses[favorite.productId] = true;
//                     });
//                     setFavoriteStatuses(initialStatuses);
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch favorite statuses', error);
//             }
//         };

//         if (user) {
//             fetchFavoriteStatuses(user._id);
//         }
//     }, [user]);

//     if (isLoading) return <Skeleton count={20} />;
//     if (error) return <div className="text-center text-red-500">Error fetching products</div>;
//     const handleAddToCart = async (product) => {
//         if (!product) {
//             console.error("Product is undefined");
//             return;
//         }

//         if (product.Stock < 1) {
//             return toast.error('Product is out of stock');
//         }

//         dispatch(addItemToCart({ ...product, quantity }));

//         try {
//             await axios.post(
//                 `${BASE_URL}/api/cart`,
//                 { productId: product._id, quantity },
//                 {
//                     withCredentials: true, // Send cookies with request
//                 }
//             );
//         } catch (error) {
//             console.error('Error adding to cart:', error.response ? error.response.data : error.message);
//         }
//     };


//     // Toggle favorite status for a specific product
//     const toggleFavorite = async (productId) => {
//         if (!user) {
//             navigate('/login');
//             toast.error('You need to log in to manage favorites.');
//             return;
//         }

//         try {
//             const response = await fetch(`${BASE_URL}/api/favorites/${user._id}/${productId}`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ userId: user._id }),
//             });

//             if (response.ok) {
//                 const message = await response.json();
//                 setFavoriteStatuses((prevStatuses) => ({
//                     ...prevStatuses,
//                     [productId]: !prevStatuses[productId], // Toggle the specific product's favorite status
//                 }));
//                 toast.success(message.message);
//             } else {
//                 toast.error('Failed to update favorite status');
//             }
//         } catch (error) {
//             toast.error('Failed to update favorites');
//             console.error('Error updating favorite status:', error);
//         }
//     };

//     const getStars = (rating) => {
//         const fullStars = Math.floor(rating);  // Full stars
//         const halfStar = rating % 1 !== 0;     // Half star if rating is not an integer
//         const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);  // Remaining empty stars

//         const stars = [];

//         // Push full stars (★)
//         for (let i = 0; i < fullStars; i++) {
//             stars.push(<span key={`full-${i}`}>&#9733;</span>); // Full star Unicode
//         }

//         // Push half star (☆ or ⯪)
//         if (halfStar) {
//             stars.push(<span key="half">&#9734;</span>); // Empty star for half-star rating
//         }

//         // Push empty stars (☆)
//         for (let i = 0; i < emptyStars; i++) {
//             stars.push(<span key={`empty-${i}`}>&#9734;</span>); // Empty star Unicode
//         }

//         return stars;
//     };








//     return (
//         <div className="relative w-full min-h-screen bg-gray-800 text-white overflow-hidden">
//             {/* <div className="absolute inset-0 z-0 opacity-30"> */}
//                 <Carousel />
//             {/* </div> */}
//             <div className="relative px-3  ">
//                 <Title title="Our Products" />
//                 {/* Category Navigation */}
//                 <div className="flex gap-4 justify-center mb-5">
//                     {categories.map((cat) => (
//                         <button
//                             key={cat}
//                             onClick={() => handleCategoryClick(cat)}
//                             className={`px-4 py-2 rounded-lg ${category === cat ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
//                                 } hover:bg-blue-400 transition duration-300`}
//                         >
//                             {cat}
//                         </button>
//                     ))}
//                 </div>
//                    {/* Search and Filter Section */}
//                 <div className="mb-5 p-4 bg-gray-700 rounded-lg shadow-lg backdrop-blur-sm flex flex-col lg:flex-row items-center gap-4">
//                     <input
//                         type="text"
//                         placeholder="Search products..."
//                         className="p-3 w-auto rounded-lg bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={keyword}
//                         onChange={(e) => setKeyword(e.target.value)}
//                     />
//                     {/* Filters */}
//                              <div className="mb-2 flex flex-wrap gap-4 px-4">
//                                  <select
//                                      value={category}
//                                      onChange={(e) => setCategory(e.target.value)}
//                                      className="text-black p-2 border border-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                      style={{ height: '40px' }} // Decreased height
//                                  >
//                                      <option value="">All Categories</option>
//                                      <option value="Electronics">Electronics</option>
//                                      <option value="camera">Camera</option>
//                                      <option value="Computer">Compuetr</option>
//                                      <option value="Home">Home</option>
//                                      <option value="Wearable">Wearable</option>
//                                  </select>

//                                  <input
//                                      type="text"
//                                      placeholder="Brand"
//                             className=" text-black p-2 border border-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                      value={brand}
//                                      onChange={(e) => setBrand(e.target.value)}
//                                     //  style={{ height: '30px' }} // Decreased height
//                                  />

//                                  <input
//                                      type="number"
//                                      placeholder="Min Price"
//                             className=" text-black p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                      value={minPrice}
//                                      onChange={(e) => setMinPrice(e.target.value)}
//                                     //  style={{ height: '30px' }}  //Decreased height
//                                  />

//                                  <input
//                                      type="number"
//                                      placeholder="Max Price"
//                             className="text-black p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                      value={maxPrice}
//                                      onChange={(e) => setMaxPrice(e.target.value)}
//                                     //  style={{ height: '30px' }} // Decreased height
//                                  />
//                              </div>

//                 </div>

//                 {/* Products List */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {data?.products.map((product) => (
//                         <div
//                             key={product._id}
//                             className="bg-white border border-gray-300 rounded-lg shadow-xl overflow-hidden transform transition-all hover:scale-105"
//                         >
//                             <Link to={`/products/${product._id}`} >
//                             {/* <img
//                                 src={`${BASE_URL}${product.images[0]}`}
//                                 alt={product.name}
//                                 className="w-full h-56 object-cover"
//                             /> */}

//                                 <img
//                                     // Use the Cloudinary URL directly from `product.images[0]`
//                                     src={product.images[0]}
//                                     alt={product.name}
//                                     className="w-full h-56 object-cover"
//                                 />


//                             </Link>
//                             <button
//                                 onClick={() => toggleFavorite(product._id)}
//                                 className={`absolute bottom-48 right-4 p-2 rounded-full shadow-md ${favoriteStatuses[product._id] ? 'bg-red-300' : 'bg-white'
//                                     } hover:bg-gray-300 transition duration-300`}
//                             >
//                                 {favoriteStatuses[product._id] ? (
//                                     <AiFillHeart
//                                         className="text-2xl text-gray-500"
//                                         title="Remove from favorites"
//                                     />
//                                 ) : (
//                                     <AiOutlineHeart
//                                         className="text-2xl text-red-700"
//                                         title="Add to favorites"
//                                     />
//                                 )}
//                             </button>
//                             <div className="p-1">
//                                 <h2 className="font-bold text-black mb-2">{product.name}</h2>
//                                 <p className="text-yellow-500">
//                                     <span className='text-yellow-300 text-3xl'> {getStars(product.rating)} ({product.numReviews})</span>
//                                 </p>

//                                 <p className="text-gray-800">{`${product.description.substring(0, 100)}...`}</p>
//                                 <p className="mb-1">
//                                     <span className="text-yellow-300 line-through mr-2 font-extrabold">{product.price + 12} ETB</span>
//                                     <span className="text-blue-600 mr-2">{product.price} ETB</span>
//                                 </p>
//                                 <div className="flex justify-between mt-4">
//                                     <Link
//                                         to={`/products/${product._id}`}
//                                         className="text-center text-white w-32 bg-blue-400 rounded-lg p-2 hover:bg-blue-800 transition-all"
//                                     >
//                                         View Details
//                                     </Link>

//                                     {/* Add to Cart Icon Button */}
//                                     <button
//                                         onClick={() => handleAddToCart(product)}
//                                         disabled={product.Stock === 0}
//                                         className={`w-10 h-10 flex items-center justify-center font-bold text-white rounded-full shadow-lg transition-all ${product.Stock === 0
//                                             ? 'bg-gray-400 cursor-not-allowed'
//                                             : 'bg-green-600 hover:bg-green-400'
//                                             }`}
//                                         aria-label="Add to Cart"
//                                         title='Add to cart'
//                                     >
//                                         <FontAwesomeIcon icon={faCartPlus} className="text-lg" />
//                                     </button>
//                                 </div>

//                             </div>

//                         </div>
//                     ))}
//                 </div>

//                 {/* Pagination */}
//                 <div className="mt-8 flex justify-center gap-4">
//                     <button
//                         onClick={() => setPage(page - 1)}
//                         disabled={page === 1}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-300 disabled:opacity-35"
//                     >
//                         ❮
//                     </button>
//                     <span className="text-lg text-white">
//                         {/* Page {page} of {data?.totalPages} */}
//                     </span>
//                     <button
//                         onClick={() => setPage(page + 1)}
//                         disabled={page === data?.totalPages}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-300 disabled:opacity-35"
//                     >
//                         ❯
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductsPage;







import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { useGetProductsQuery } from './services/productsApi';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Title from './Layout/Title';
import { useDispatch } from 'react-redux';
import { addItemToCart } from './features/cart/cartSlice';
import toast from 'react-hot-toast';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useGetCurrentUserQuery } from './features/api/authApi';
import { useParams, useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';

// Lazy load Carousel to reduce initial bundle size
const Carousel = lazy(() => import('./Layout/Carousel'));

// Professional Memoized Product Card
const ProductCard = React.memo(({ product, handleAddToCart, toggleFavorite, favoriteStatuses, BASE_URL }) => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group relative">
        {/* Product Image */}
        <div className="relative overflow-hidden">
            <Link to={`/products/${product._id}`}>
                <img
                    src={`${product.images[0]}?w=300&h=224&f=webp&q=80`}
                    alt={product.name}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                />
            </Link>
            
            {/* Favorite Button */}
            <button
                onClick={() => toggleFavorite(product._id)}
                className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
                    favoriteStatuses[product._id] 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
                }`}
                title={favoriteStatuses[product._id] ? "Remove from favorites" : "Add to favorites"}
            >
                {favoriteStatuses[product._id] ? (
                    <AiFillHeart className="text-xl" />
                ) : (
                    <AiOutlineHeart className="text-xl" />
                )}
            </button>
            
            {/* Stock Badge */}
            {product.Stock === 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Out of Stock
                </div>
            )}
        </div>
        
        {/* Product Info */}
        <div className="p-4">
            <h2 className="font-bold text-gray-800 mb-2 text-lg line-clamp-2">{product.name}</h2>
            
            {/* Rating */}
            <div className="flex items-center mb-2">
                <div className="flex text-yellow-400 text-sm">
                    {Array(Math.floor(product.rating))
                        .fill('★')
                        .concat(product.rating % 1 !== 0 ? ['☆'] : [])
                        .concat(Array(5 - Math.ceil(product.rating)).fill('☆'))
                        .join('')}
                </div>
                <span className="text-gray-600 text-sm ml-2">({product.numReviews})</span>
            </div>
            
            {/* Description */}
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
            
            {/* Price */}
            <div className="mb-4">
                <span className="text-gray-400 line-through text-sm">{product.price + 12} ETB</span>
                <span className="text-blue-600 font-bold text-lg ml-2">{product.price} ETB</span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-between items-center">
                <Link
                    to={`/products/${product._id}`}
                    className="flex-1 mr-2 text-center text-white bg-blue-600 rounded-lg py-2 px-4 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                    View Details
                </Link>
                <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.Stock === 0}
                    className={`w-10 h-10 flex items-center justify-center text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
                        product.Stock === 0 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-green-600 hover:bg-green-700'
                    }`}
                    title="Add to cart"
                >
                    <FontAwesomeIcon icon={faCartPlus} className="text-lg" />
                </button>
            </div>
        </div>
    </div>
));

// Professional Skeleton Loader (mimics ProductCard exactly)
const ProductCardSkeleton = () => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-pulse">
        {/* Image skeleton */}
        <div className="h-56 bg-gray-300"></div>
        
        {/* Content skeleton */}
        <div className="p-4">
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-4"></div>
            
            {/* Price skeleton */}
            <div className="flex items-center mb-4">
                <div className="h-4 bg-gray-300 rounded w-16 mr-2"></div>
                <div className="h-6 bg-gray-300 rounded w-20"></div>
            </div>
            
            {/* Button skeleton */}
            <div className="flex justify-between items-center">
                <div className="h-10 bg-gray-300 rounded flex-1 mr-2"></div>
                <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            </div>
        </div>
    </div>
);

const ProductsPage = () => {
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const dispatch = useDispatch();
    const [quantity] = useState(1);
    const navigate = useNavigate();
    const { data, error, isLoading } = useGetProductsQuery(
        {
            page,
            keyword,
            category,
            brand,
            minPrice,
            maxPrice,
        },
        { refetchOnMountOrArgChange: true } // Ensure fresh data on mount or filter change
    );
    const categories = ['All', 'Electronics', 'Camera', 'Home', 'Wearable', 'Computer', 'Techono', 'Charger'];
    const BASE_URL =
        process.env.NODE_ENV === 'production'
            ? 'https://e-market-fnu1.onrender.com'
            : process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const { data: user } = useGetCurrentUserQuery();
    const [favoriteStatuses, setFavoriteStatuses] = useState({});

    // Debounced search handler to reduce API calls
    const debouncedSetKeyword = useCallback(
        debounce((value) => setKeyword(value), 500),
        []
    );

    // Fetch favorite statuses only when user changes
    useEffect(() => {
        const fetchFavoriteStatuses = async (userId) => {
            if (!userId) return;
            try {
                const response = await fetch(`${BASE_URL}/api/favorites/${userId}`, {
                    credentials: 'include', // Include cookies for auth
                });
                if (response.ok) {
                    const favoriteData = await response.json();
                    setFavoriteStatuses(
                        favoriteData.reduce((acc, favorite) => {
                            acc[favorite.productId] = true;
                            return acc;
                        }, {})
                    );
                }
            } catch (error) {
                console.error('Failed to fetch favorite statuses', error);
            }
        };
        if (user?._id) {
            fetchFavoriteStatuses(user._id);
        }
    }, [user?._id, BASE_URL]);

    // Handle category selection
    const handleCategoryClick = useCallback((cat) => {
        setCategory(cat === 'All' ? '' : cat);
        setPage(1); // Reset to first page on category change
    }, []);

    // Handle add to cart
    const handleAddToCart = useCallback(
        async (product) => {
            if (!product || product.Stock < 1) {
                toast.error('Product is out of stock');
                return;
            }
            dispatch(addItemToCart({ ...product, quantity }));
            try {
                await axios.post(
                    `${BASE_URL}/api/cart`,
                    { productId: product._id, quantity },
                    { withCredentials: true }
                );
                toast.success('Added to cart');
            } catch (error) {
                console.error('Error adding to cart:', error);
                toast.error('Failed to add to cart');
            }
        },
        [dispatch, BASE_URL, quantity]
    );

    // Toggle favorite status
    const toggleFavorite = useCallback(
        async (productId) => {
            if (!user) {
                navigate('/login');
                toast.error('You need to log in to manage favorites.');
                return;
            }
            try {
                const response = await fetch(`${BASE_URL}/api/favorites/${user._id}/${productId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ userId: user._id }),
                });
                if (response.ok) {
                    const message = await response.json();
                    setFavoriteStatuses((prev) => ({
                        ...prev,
                        [productId]: !prev[productId],
                    }));
                    toast.success(message.message);
                } else {
                    toast.error('Failed to update favorite status');
                }
            } catch (error) {
                toast.error('Failed to update favorites');
                console.error('Error updating favorite status:', error);
            }
        },
        [user, navigate, BASE_URL]
    );

    if (isLoading) {
        const skeletonCount = window.innerWidth < 768 ? 3 : 6;
        return (
            <div className="relative w-full min-h-screen bg-gray-800 text-white">
                {/* Professional Loading Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">E-Market</h1>
                    <p className="text-gray-300">Loading your shopping experience...</p>
                </div>
                
                {/* Loading Spinner */}
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
                
                {/* Skeleton Products Grid */}
                <div className="px-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array(skeletonCount).fill().map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    if (error) return <div className="text-center text-red-500">Error fetching products</div>;

    return (
        <div className="relative w-full min-h-screen bg-gray-800 text-white overflow-hidden">
            {/* Professional Header Section */}
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-8 mb-6">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center text-white mb-2">Welcome to E-Market</h1>
                    <p className="text-center text-gray-300 text-lg">Discover amazing products at unbeatable prices</p>
                </div>
            </div>
            
            {/* Hero Carousel Section */}
            <Suspense fallback={
                <div className="h-80 bg-gray-700 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            }>
                <Carousel />
            </Suspense>
            
            <div className="relative px-3 max-w-7xl mx-auto">
                <Title title="Our Products" />
                
                {/* Professional Category Navigation */}
                <div className="bg-gray-700 rounded-lg p-4 mb-6">
                    <h2 className="text-xl font-semibold text-white mb-4 text-center">Shop by Category</h2>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryClick(cat)}
                                className={`px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105 ${
                                    category === cat 
                                        ? 'bg-blue-500 text-white shadow-lg' 
                                        : 'bg-gray-600 text-white hover:bg-gray-500'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Professional Search and Filter Section */}
                <div className="mb-8 p-6 bg-gray-700 rounded-lg shadow-lg backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white mb-4 text-center">Find Your Perfect Product</h3>
                    <div className="flex flex-col lg:flex-row items-center gap-4 mb-4">
                        <div className="relative flex-1 w-full">
                            <input
                                type="text"
                                placeholder="🔍 Search products..."
                                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                onChange={(e) => debouncedSetKeyword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <select
                            value={category}
                            onChange={(e) => handleCategoryClick(e.target.value)}
                            className="p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        >
                            <option value="">📂 All Categories</option>
                            {categories.slice(1).map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="🏷️ Brand"
                            className="p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="💰 Min Price"
                            className="p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="💰 Max Price"
                            className="p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
                {/* Professional Products Section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Featured Products</h2>
                        <p className="text-gray-300">Showing {data?.products?.length || 0} products</p>
                    </div>
                    
                    {data?.products?.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                            <p className="text-gray-300">Try adjusting your search criteria or browse all categories</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data?.products.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    handleAddToCart={handleAddToCart}
                                    toggleFavorite={toggleFavorite}
                                    favoriteStatuses={favoriteStatuses}
                                    BASE_URL={BASE_URL}
                                />
                            ))}
                        </div>
                    )}
                </div>
                {/* Professional Pagination */}
                {data?.totalPages > 1 && (
                    <div className="mt-12 mb-8">
                        <div className="flex justify-center items-center gap-4">
                            <button
                                onClick={() => setPage((prev) => prev - 1)}
                                disabled={page === 1}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
                            >
                                ← Previous
                            </button>
                            
                            <div className="flex items-center gap-2">
                                <span className="text-white font-medium">Page</span>
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold">
                                    {page}
                                </span>
                                <span className="text-white font-medium">of</span>
                                <span className="text-white font-bold">{data?.totalPages || 1}</span>
                            </div>
                            
                            <button
                                onClick={() => setPage((prev) => prev + 1)}
                                disabled={page === data?.totalPages}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;