import React, { useState } from 'react';
import { useGetProductsQuery } from '../features/api/authApi'; // Import query and mutation hooks
import { useDeleteProductMutation, useUpdateProductMutation } from '../services/productsApi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Title from '../Layout/Title';

export default function Products() {
    const { data: products, error, isLoading } = useGetProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();
    const [updateProduct] = useUpdateProductMutation(); // Mutation to update product
    const [editProductData, setEditProductData] = useState(null); // State for editing product
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        Stock: '',
        brand: '',
        category: '',
    }); // State to manage form inputs

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id).unwrap();
            toast.success('Product deleted successfully!');
        } catch (error) {
            toast.error('Error deleting product');
        }
    };

    const handleEdit = (product) => {
        setEditProductData(product); // Set the product to be edited
        setFormData({ ...product }); // Populate the form with product data
        window.scrollTo(0, 0); // Scroll to the top where form is located
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct({ id: editProductData._id, ...formData }).unwrap(); // Call update mutation
            toast.success('Product updated successfully!');
            setEditProductData(null); // Clear the edit state after successful update
        } catch (error) {
            toast.error('Error updating product');
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-600 text-center mt-4">Error: {error.message}</div>;
    }

    return (
        <div className="relative w-full mx-auto p-4">
            <Title title={"All Products"}/>
            {editProductData && (
                <div className="top-0 left-0 right-0 bg-white shadow-lg z-50 p-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Stock</label>
                            <input
                                type="number"
                                name="Stock"
                                value={formData.Stock}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Description</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                required
                            />
                        </div>

                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Update Product
                            </button>
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                onClick={() => setEditProductData(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="pt-6">
                <div className="flex justify-center">
                    <div className="w-full max-w-full">
                        <h1 className="text-3xl font-bold text-center mb-6 text-white">Product List</h1>
                        <table className="table-auto w-full bg-white shadow-lg rounded-lg">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Price</th>
                                    <th className="px-4 py-2">Stock</th>
                                    <th className="px-4 py-2">Brand</th>
                                    <th className="px-4 py-2">Category</th>
                                    <th className="px-4 py-2">Description</th>
                                    <th className="px-4 py-2">Actions</th>
                                    <th className="px-4 py-2">Reviews</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product._id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                        <td className="border px-4 py-2">{product._id}</td>
                                        <td className="border px-4 py-2">{product.name}</td>
                                        <td className="border px-4 py-2">${product.price.toFixed(2)}</td>
                                        <td className="border px-4 py-2">{product.Stock}</td>
                                        <td className="border px-4 py-2">{product.brand}</td>
                                        <td className="border px-4 py-2">{product.category}</td>
                                        <td className="border px-4 py-2">{`${product.description.substring(0, 20)}...`}</td>
                                        <td className="border px-4 py-2 flex justify-center">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                        <td className="border px-4 py-2 text-black-500 font-serif font-bold bg-blue-400">
                                            <Link
                                                to={`/reviewProduct/${product._id}`}
                                                className="bg-black hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Review
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

















