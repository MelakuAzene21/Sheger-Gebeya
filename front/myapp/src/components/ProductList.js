import React from 'react';

const ProductList = ({ products, userRole, onEdit, onDelete }) => {
    if (!products || products.length === 0) {
        return <p>No products available.</p>;
    }
    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map(product => (
                    <div key={product._id} className="p-4 border rounded shadow-sm">
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p>{product.description}</p>
                        <p className="text-gray-500">${product.price}</p>
                        <div className="mt-4">
                            <button
                                className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={() => onEdit(product)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => onDelete(product._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
