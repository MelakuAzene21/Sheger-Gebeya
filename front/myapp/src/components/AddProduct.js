// src/components/AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';
import Title from '../Layout/Title';
const AddProduct = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = { name, description, price, category, stock, image };

        try {
            await axios.post('http://localhost:5000/api/products/add', newProduct,{withCredentials:true});
            onProductAdded();
            setName('');
            setDescription('');
            setPrice('');
            setCategory('');
            setStock('');
            setImage('');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="container mx-auto mt-5">
            <Title title={"Add Products"} />

            <h1 className="text-2xl font-bold mb-4">Add Product</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
