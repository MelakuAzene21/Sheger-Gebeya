
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

const ProductsPage = () => {
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

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
    // Refetch products when category changes
    useEffect(() => {
        refetch();
    }, [category, refetch]);
    console.log('setCategory:', setCategory);

    if (isLoading) return <Skeleton count={20} />;
    if (error) return <div className="text-center text-red-500">Error fetching products</div>;

    return (
        <div className="relative w-full min-h-screen bg-gray-800 text-white overflow-hidden">
            {/* <div className="absolute inset-0 z-0 opacity-30"> */}
                <Carousel />
            {/* </div> */}
            <div className="relative z-10 p-8">
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
                                src={`http://localhost:5000${product.images[0]}`}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            </Link> 
                            <div className="p-4 ">
                                <h2 className="text-2xl font-bold text-black mb-2">{product.name}</h2>
                                <p className="text-gray-800 mb-4">{product.description}</p>
                                <p className=" mb-4">
                                    <span className="text-yellow-300 line-through mr-2 font-extrabold">{product.price + 12}  ETB</span>
                                    <p className="text-blue-600  mr-2">{product.price}  ETB</p>
                                </p>
                                <Link
                                    to={`/products/${product._id}`}
                                    className="block w-full text-center text-white bg-blue-600 rounded-lg py-2 hover:bg-blue-500 transition-all"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-300 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-lg text-white">
                        Page {page} of {data?.totalPages}
                    </span>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === data?.totalPages}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
