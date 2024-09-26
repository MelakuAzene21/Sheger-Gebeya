// import React, { useState } from 'react';
// import { useGetAllProductsQuery } from '../features/api/authApi';
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//     // State to track the current page
//     const [page, setPage] = useState(1);

//     // Define limit for number of products per page
//     const limit = 5;

//     // Fetch products with current page and limit
//     const { data, error, isLoading } = useGetAllProductsQuery({ page, limit });

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error fetching products.</div>;

//     // Pagination buttons' click handlers
//     const handlePreviousPage = () => {
//         if (page > 1) setPage(page - 1); // Move to previous page
//     };

//     const handleNextPage = () => {
//         if (page < data.totalPages) setPage(page + 1); // Move to next page
//     };

//     return (
//         <div className="container mx-auto px-4 ">
//             <h1 className="text-3xl font-bold text-center my-6">Products</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {data.products.map((product) => (
//                     <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden ">
//                         <img
//                             src={product.image}  // Assuming product has 'image' field
//                             alt={product.name}
//                             className="w-full h-48 object-cover"
//                         />
//                         <div className="p-5 ">
//                             <h3 className="font-bold text-lg">{product.name}</h3>
//                             <p className="text-gray-600">${product.price}</p>
//                             <Link
//                                 to={`/products/${product._id}`}
//                                 className="text-blue-500 hover:underline mt-4 inline-block"
//                             >
//                                 View Details
//                             </Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center mt-6 space-x-4">
//                 <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                     disabled={page === 1}
//                     onClick={handlePreviousPage}
//                 >
//                     Previous
//                 </button>
//                 <span className="mx-4">{`Page ${page} of ${data.totalPages}`}</span>
//                 <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                     disabled={page === data.totalPages}
//                     onClick={handleNextPage}
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default HomePage;
