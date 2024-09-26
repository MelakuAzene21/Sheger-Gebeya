import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import axios from 'axios';

function AdminPage() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products', { withCredentials: true });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`, { withCredentials: true });
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleProductAdded = () => {
        // Fetch products again after a new product is added
        const fetchProducts = async () => {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        };
        fetchProducts();
    };

    const handleProductUpdated = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) => (product._id === updatedProduct._id ? updatedProduct : product))
        );
        setEditingProduct(null);
    };

    return (
        <div className="App">
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-xl">E-Commerce Admin Dashboard</h1>
            </header>
            <main className="p-4">
                {!editingProduct && <AddProduct onProductAdded={handleProductAdded} />}
                {editingProduct && (
                    <UpdateProduct
                        product={editingProduct}
                        onProductUpdated={handleProductUpdated}
                    />
                )}
                <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
            </main>
        </div>
    );
}

export default AdminPage;
