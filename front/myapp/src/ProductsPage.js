
// import React, { useState } from 'react';
// import { useGetProductsQuery } from './services/productsApi';
// import { Link } from 'react-router-dom';

// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

// const ProductsPage = () => {
//     const [page, setPage] = useState(1);
//     const [keyword, setKeyword] = useState('');
//     const [category, setCategory] = useState('');
//     const [brand, setBrand] = useState('');
//     const [minPrice, setMinPrice] = useState('');
//     const [maxPrice, setMaxPrice] = useState('');

//     // Fetch products
//     const { data, error, isLoading } = useGetProductsQuery({
//         page,
//         keyword,
//         category,
//         brand,
//         minPrice,
//         maxPrice,
//     });

//     // if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
//     if (isLoading) return <Skeleton count={20} />
// ;

//     if (error) return <div className="text-center text-red-500">Error fetching products</div>;

//     return (
//         <div className="container mx-auto px-4 py-8 bg-gray-800">
//             {/* Search bar */}
//             <div className="mb-6 flex flex-col lg:flex-row items-center lg:items-start gap-4">
//                 <input
//                     type="text"
//                     placeholder="Search by name..."
//                     className="p-3 border border-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                     value={keyword}
//                     onChange={(e) => setKeyword(e.target.value)}
//                 />
//             </div>

//             {/* Filters */}
//             <div className="mb-6 flex flex-wrap gap-4 ">
//                 <select
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     className="p-3 border border-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                     <option value="">All Categories</option>
//                     <option value="Electronics">Electronics</option>
//                     <option value="Mobile Device">Mobile Device</option>
//                     <option value="Home">Home</option>
//                     <option value="store">Store</option>
//                     <option value="Wearable">Wearable</option>
//                 </select>

//                 <input
//                     type="text"
//                     placeholder="Brand"
//                     className="p-3 border border-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={brand}
//                     onChange={(e) => setBrand(e.target.value)}
//                 />

//                 <input
//                     type="number"
//                     placeholder="Min Price"
//                     className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={minPrice}
//                     onChange={(e) => setMinPrice(e.target.value)}
//                 />

//                 <input
//                     type="number"
//                     placeholder="Max Price"
//                     className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={maxPrice}
//                     onChange={(e) => setMaxPrice(e.target.value)}
//                 />
//             </div>

//             {/* Products List */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {data.products.map((product) => (
//                     <div
//                         key={product._id}
//                         className="bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
//                     >
//                         {/* Show the first image */}
//                         <img
//                             src={`http://localhost:5000${product.images[0]}`}  // Display the first image
//                             alt={product.name}
//                             className="w-full h-48 object-cover"
//                         />
//                         <div className="p-4 bg-gray-500 ">
//                             <h2 className="text-xl font-semibold mb-2 text-white">{product.name}</h2>
//                             <p className="text-white mb-4">${product.price}</p>
//                             <Link
//                                 to={`/products/${product._id}`}
//                                 className="text-white bg-gray-600 rounded-md p-3 hover:bg-green-500 "
//                             >
//                                 View Details
//                             </Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Pagination */}
//             <div className="mt-8 flex justify-center gap-4">
//                 <button
//                     onClick={() => setPage(page - 1)}
//                     disabled={page === 1}
//                     className="p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 disabled:opacity-50"
//                 >
//                     Previous
//                 </button>
//                 <span className="text-lg text-white">
//                     Page {page} of {data.totalPages}
//                 </span>
//                 <button
//                     onClick={() => setPage(page + 1)}
//                     disabled={page === data.totalPages}
//                     className="p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 disabled:opacity-50"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ProductsPage;






// import React, { useState } from 'react';
// import { useGetProductsQuery } from './services/productsApi';
// import { Link } from 'react-router-dom';

// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'
// import Carousel from './Layout/Carousel';
// import Title from './Layout/Title';

// const ProductsPage = () => {
//     const [page, setPage] = useState(1);
//     const [keyword, setKeyword] = useState('');
//     const [category, setCategory] = useState('');
//     const [brand, setBrand] = useState('');
//     const [minPrice, setMinPrice] = useState('');
//     const [maxPrice, setMaxPrice] = useState('');

//     // Fetch products
//     const { data, error, isLoading } = useGetProductsQuery({
//         page,
//         keyword,
//         category,
//         brand,
//         minPrice,
//         maxPrice,
//     });

//     if (isLoading) return <Skeleton count={20} />;

//     if (error) return <div className="text-center text-red-500">Error fetching products</div>;

//     return (
//         <div className="w-full min-h-screen bg-gray-800">
//             <Title title={"Products Page"}/>
//             {/* Search bar */}
//             <div className="mb-3 flex flex-col lg:flex-row items-center lg:items-start gap-4 px-4">
//                 <input
//                     type="text"
//                     placeholder="Search by name..."
//                     className="p-2 border border-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                     value={keyword}
//                     onChange={(e) => setKeyword(e.target.value)}
//                     style={{ height: '30px' }} // Decreased height
//                 />
//             </div>

//             {/* Filters */}
//             <div className="mb-2 flex flex-wrap gap-4 px-4">
//                 <select
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     className="p-2 border border-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     style={{ height: '40px' }} // Decreased height
//                 >
//                     <option value="">All Categories</option>
//                     <option value="Electronics">Electronics</option>
//                     <option value="Mobile Device">Mobile Device</option>
//                     <option value="Home">Home</option>
//                     <option value="store">Store</option>
//                     <option value="Wearable">Wearable</option>
//                 </select>

//                 <input
//                     type="text"
//                     placeholder="Brand"
//                     className="p-2 border border-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={brand}
//                     onChange={(e) => setBrand(e.target.value)}
//                     style={{ height: '30px' }} // Decreased height
//                 />

//                 <input
//                     type="number"
//                     placeholder="Min Price"
//                     className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={minPrice}
//                     onChange={(e) => setMinPrice(e.target.value)}
//                     style={{ height: '30px' }} // Decreased height
//                 />

//                 <input
//                     type="number"
//                     placeholder="Max Price"
//                     className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={maxPrice}
//                     onChange={(e) => setMaxPrice(e.target.value)}
//                     style={{ height: '30px' }} // Decreased height
//                 />
//             </div>

//             {/* Products List */}
//             <Carousel />
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
//                 {data.products.map((product) => (
//                     <div
//                         key={product._id}
//                         className="bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
//                     >
//                         <img
//                             src={`http://localhost:5000${product.images[0]}`}  // Display the first image
//                             alt={product.name}
//                             className="w-full h-48 object-cover"
//                         />
//                         <div className="p-4 bg-gray-500">
//                             <h2 className="text-xl font-semibold mb-2 text-white">{product.name}</h2>
//                             <p className="text-white">{product.description}</p>
//                             <p className="text-white mb-4"><del className='mr-3 text-yellow-300'>${product.price + 12}</del>${product.price}</p>
//                             <Link
//                                 to={`/products/${product._id}`}
//                                 className="text-white bg-gray-600 rounded-md p-3 hover:bg-green-500"
//                             >
//                                 View Details
//                             </Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Pagination */}
//             <div className="mt-8 flex justify-center gap-4">
//                 <button
//                     onClick={() => setPage(page - 1)}
//                     disabled={page === 1}
//                     className="p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 disabled:opacity-50"
//                 >
//                     Previous
//                 </button>
//                 <span className="text-lg text-white">
//                     Page {page} of {data.totalPages}
//                 </span>
//                 <button
//                     onClick={() => setPage(page + 1)}
//                     disabled={page === data.totalPages}
//                     className="p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 disabled:opacity-50"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };
// export default ProductsPage;


// ProductsPage.js
import React, { useState, useEffect } from 'react';
import { useGetProductsQuery } from './services/productsApi';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Carousel from './Layout/Carousel';
import Title from './Layout/Title';
import { useDispatch } from 'react-redux';
import { addItemToCart } from './features/cart/cartSlice';
import toast from 'react-hot-toast';
import {  AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Add Heart Icons
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useGetCurrentUserQuery } from './features/api/authApi';
import { useParams ,useNavigate} from 'react-router-dom'
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
    const { data, error, isLoading, refetch } = useGetProductsQuery({
        page,
        keyword,
        category,
        brand,
        minPrice,
        maxPrice,
    });
    const categories = ['All', 'Electronics', 'camera', 'Home', 'Wearable', 'Computer','Techono','charger'];
    // Handle category selection and refetch products
    const handleCategoryClick = (cat) => {
        setCategory(cat === 'All' ? '' : cat);
    };
    const BASE_URL =
        process.env.NODE_ENV === 'production'
            ? 'https://e-market-fnu1.onrender.com'
            : process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const { data: user } = useGetCurrentUserQuery(); // Fetch current user info
    // Track favorite status for each item
    const [favoriteStatuses, setFavoriteStatuses] = useState({});
        const navigate = useNavigate();
    // Refetch products when category changes
    useEffect(() => {
        refetch();
    }, [category, refetch]);

    // Fetch and update favorite statuses on load
    useEffect(() => {
        const fetchFavoriteStatuses = async (userId) => {
            if (!userId) return;

            try {
                const response = await fetch(`${BASE_URL}/api/favorites/${userId}`);
                if (response.ok) {
                    const favoriteData = await response.json();
                    // Create a map of favorite statuses by productId
                    const initialStatuses = {};
                    favoriteData.forEach((favorite) => {
                        initialStatuses[favorite.productId] = true;
                    });
                    setFavoriteStatuses(initialStatuses);
                }
            } catch (error) {
                console.error('Failed to fetch favorite statuses', error);
            }
        };

        if (user) {
            fetchFavoriteStatuses(user._id);
        }
    }, [user]);

    if (isLoading) return <Skeleton count={20} />;
    if (error) return <div className="text-center text-red-500">Error fetching products</div>;
    const handleAddToCart = async (product) => {
        if (!product) {
            console.error("Product is undefined");
            return;
        }

        if (product.Stock < 1) {
            return toast.error('Product is out of stock');
        }

        dispatch(addItemToCart({ ...product, quantity }));

        try {
            await axios.post(
                `${BASE_URL}/api/cart`,
                { productId: product._id, quantity },
                {
                    withCredentials: true, // Send cookies with request
                }
            );
        } catch (error) {
            console.error('Error adding to cart:', error.response ? error.response.data : error.message);
        }
    };


    // Toggle favorite status for a specific product
    const toggleFavorite = async (productId) => {
        if (!user) {
            navigate('/login');
            toast.error('You need to log in to manage favorites.');
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/favorites/${user._id}/${productId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id }),
            });

            if (response.ok) {
                const message = await response.json();
                setFavoriteStatuses((prevStatuses) => ({
                    ...prevStatuses,
                    [productId]: !prevStatuses[productId], // Toggle the specific product's favorite status
                }));
                toast.success(message.message);
            } else {
                toast.error('Failed to update favorite status');
            }
        } catch (error) {
            toast.error('Failed to update favorites');
            console.error('Error updating favorite status:', error);
        }
    };

    const getStars = (rating) => {
        const fullStars = Math.floor(rating);  // Full stars
        const halfStar = rating % 1 !== 0;     // Half star if rating is not an integer
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);  // Remaining empty stars

        const stars = [];

        // Push full stars (★)
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`}>&#9733;</span>); // Full star Unicode
        }

        // Push half star (☆ or ⯪)
        if (halfStar) {
            stars.push(<span key="half">&#9734;</span>); // Empty star for half-star rating
        }

        // Push empty stars (☆)
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`}>&#9734;</span>); // Empty star Unicode
        }

        return stars;
    };








    return (
        <div className="relative w-full min-h-screen bg-gray-800 text-white overflow-hidden">
            {/* <div className="absolute inset-0 z-0 opacity-30"> */}
                <Carousel />
            {/* </div> */}
            <div className="relative px-3  ">
                <Title title="Our Products" />
                {/* Category Navigation */}
                <div className="flex gap-4 justify-center mb-5">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            className={`px-4 py-2 rounded-lg ${category === cat ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
                                } hover:bg-blue-400 transition duration-300`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                   {/* Search and Filter Section */}
                <div className="mb-5 p-4 bg-gray-700 rounded-lg shadow-lg backdrop-blur-sm flex flex-col lg:flex-row items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="p-3 w-auto rounded-lg bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    {/* Filters */}
                             <div className="mb-2 flex flex-wrap gap-4 px-4">
                                 <select
                                     value={category}
                                     onChange={(e) => setCategory(e.target.value)}
                                     className="text-black p-2 border border-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                     style={{ height: '40px' }} // Decreased height
                                 >
                                     <option value="">All Categories</option>
                                     <option value="Electronics">Electronics</option>
                                     <option value="camera">Camera</option>
                                     <option value="Computer">Compuetr</option>
                                     <option value="Home">Home</option>
                                     <option value="Wearable">Wearable</option>
                                 </select>

                                 <input
                                     type="text"
                                     placeholder="Brand"
                            className=" text-black p-2 border border-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                     value={brand}
                                     onChange={(e) => setBrand(e.target.value)}
                                    //  style={{ height: '30px' }} // Decreased height
                                 />

                                 <input
                                     type="number"
                                     placeholder="Min Price"
                            className=" text-black p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                     value={minPrice}
                                     onChange={(e) => setMinPrice(e.target.value)}
                                    //  style={{ height: '30px' }}  //Decreased height
                                 />

                                 <input
                                     type="number"
                                     placeholder="Max Price"
                            className="text-black p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                     value={maxPrice}
                                     onChange={(e) => setMaxPrice(e.target.value)}
                                    //  style={{ height: '30px' }} // Decreased height
                                 />
                             </div>

                </div>

                {/* Products List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white border border-gray-300 rounded-lg shadow-xl overflow-hidden transform transition-all hover:scale-105"
                        >
                            <Link to={`/products/${product._id}`} >                           
                            <img
                                src={`${BASE_URL}${product.images[0]}`}
                                alt={product.name}
                                className="w-full h-56 object-cover"
                            />

                            </Link> 
                            <button
                                onClick={() => toggleFavorite(product._id)}
                                className={`absolute bottom-48 right-4 p-2 rounded-full shadow-md ${favoriteStatuses[product._id] ? 'bg-red-300' : 'bg-white'
                                    } hover:bg-gray-300 transition duration-300`}
                            >
                                {favoriteStatuses[product._id] ? (
                                    <AiFillHeart
                                        className="text-2xl text-gray-500"
                                        title="Remove from favorites"
                                    />
                                ) : (
                                    <AiOutlineHeart
                                        className="text-2xl text-red-700"
                                        title="Add to favorites"
                                    />
                                )}
                            </button>
                            <div className="p-1">
                                <h2 className="font-bold text-black mb-2">{product.name}</h2>
                                <p className="text-yellow-500">
                                    <span className='text-yellow-300 text-3xl'> {getStars(product.rating)} ({product.numReviews})</span>
                                </p>

                                <p className="text-gray-800">{`${product.description.substring(0, 100)}...`}</p>
                                <p className="mb-1">
                                    <span className="text-yellow-300 line-through mr-2 font-extrabold">{product.price + 12} ETB</span>
                                    <span className="text-blue-600 mr-2">{product.price} ETB</span>
                                </p>
                                <div className="flex justify-between mt-4">
                                    <Link
                                        to={`/products/${product._id}`}
                                        className="text-center text-white w-32 bg-blue-400 rounded-lg p-2 hover:bg-blue-800 transition-all"
                                    >
                                        View Details
                                    </Link>

                                    {/* Add to Cart Icon Button */}
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={product.Stock === 0}
                                        className={`w-10 h-10 flex items-center justify-center font-bold text-white rounded-full shadow-lg transition-all ${product.Stock === 0
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-green-600 hover:bg-green-400'
                                            }`}
                                        aria-label="Add to Cart"
                                        title='Add to cart'
                                    >
                                        <FontAwesomeIcon icon={faCartPlus} className="text-lg" />
                                    </button>
                                </div>

                            </div>

                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-300 disabled:opacity-35"
                    >
                        ❮
                    </button>
                    <span className="text-lg text-white">
                        {/* Page {page} of {data?.totalPages} */}
                    </span>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === data?.totalPages}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-300 disabled:opacity-35"
                    >
                        ❯
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
