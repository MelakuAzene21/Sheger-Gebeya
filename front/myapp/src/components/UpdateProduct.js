import React, { useState } from 'react';
import axios from 'axios';

const UpdateProduct = ({ product, onProductUpdated }) => {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [category, setCategory] = useState(product.category);
    const [stock, setStock] = useState(product.stock);
    const [image, setImage] = useState(product.image);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedProduct = { name, description, price, category, stock, image };

        try {
            const response = await axios.put(`http://localhost:5000/api/products/${product._id}`, updatedProduct, { withCredentials: true });
            onProductUpdated(response.data);  // Pass the updated product back to the parent
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-2xl font-bold mb-4">Update Product</h1>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
