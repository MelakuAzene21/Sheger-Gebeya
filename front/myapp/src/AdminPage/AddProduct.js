// import React, { useState } from 'react';
// import { useAddProductMutation } from '../services/productsApi';
// import toast from 'react-hot-toast';

// const AddProduct = () => {
//     // Initial form state
//     const initialFormData = {
//         name: '',
//         description: '',
//         price: '',
//         brand: '',
//         category: '',
//         Stock: '',
//         rating: '',
//         numReviews: '',
//         image: null,
//     };

//     // State to manage form data
//     const [formData, setFormData] = useState(initialFormData);

//     // Mutation hook for adding a product
//     const [addProduct] = useAddProductMutation();

//     // Handle input change
//     const handleChange = (e) => {
//         if (e.target.name === 'image') {
//             setFormData({ ...formData, image: e.target.files[0] });
//         } else {
//             setFormData({ ...formData, [e.target.name]: e.target.value });
//         }
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Create FormData object to send form data including the image
//         const newProduct = new FormData();
//         Object.keys(formData).forEach((key) => {
//             newProduct.append(key, formData[key]);
//         });

//         try {
//             // Submit the form data via mutation
//             await addProduct(newProduct).unwrap();

           
//             toast.success('Product added successfully!')
//             // Clear the form by resetting the state to initial values
//             setFormData(initialFormData);

//             // Optionally clear the file input if required
//             e.target.reset();
//         } catch (error) {
//             toast.error('Error Adding Products')
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-10">
//             <h1 className="text-3xl font-semibold mb-6 text-center">Add New Product</h1>
//             <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//                         placeholder="Enter product name"
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
//                     <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//                         placeholder="Enter product description"
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
//                     <input
//                         type="number"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleChange}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//                         placeholder="Enter product price"
//                         required
//                     />
//                 </div>

//                 {/* Additional form fields for brand, category, etc. */}
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Brand</label>
//                     <input
//                         type="text"
//                         name="brand"
//                         value={formData.brand}
//                         onChange={handleChange}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//                         placeholder="Enter product brand"
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
//                     <input
//                         type="text"
//                         name="category"
//                         value={formData.category}
//                         onChange={handleChange}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//                         placeholder="Enter product category"
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Stock</label>
//                     <input
//                         type="number"
//                         name="Stock"
//                         value={formData.Stock}
//                         onChange={handleChange}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//                         placeholder="Enter product stock"
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
//                     <input
//                         type="file"
//                         name="image"
//                         onChange={handleChange}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//                         required
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                     Add Product
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddProduct;

import React, { useState } from 'react';
import { useAddProductMutation } from '../services/productsApi';
import toast from 'react-hot-toast';
import Title from '../Layout/Title';

const AddProduct = () => {
    const initialFormData = {
        name: '',
        description: '',
        price: '',
        brand: '',
        category: '',
        Stock: '',
        rating: '',
        numReviews: '',
        images: [],
        specifications: [{ name: '', value: '' }]

    };

    const [formData, setFormData] = useState(initialFormData);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [mainImageIndex, setMainImageIndex] = useState(0);

    const [addProduct] = useAddProductMutation();

    // Handle input change for both text and file inputs
    const handleChange = (e) => {
        if (e.target.name === 'images') {
            const files = Array.from(e.target.files);
            const updatedImages = [...formData.images, ...files];
            const previews = files.map((file) => URL.createObjectURL(file));

            setFormData({ ...formData, images: updatedImages });
            setImagePreviews([...imagePreviews, ...previews]);
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Remove image from the list
    const handleRemoveImage = (indexToRemove) => {
        const updatedPreviews = imagePreviews.filter((_, index) => index !== indexToRemove);
        const updatedImages = formData.images.filter((_, index) => index !== indexToRemove);

        setImagePreviews(updatedPreviews);
        setFormData({ ...formData, images: updatedImages });

        // Adjust the main image if needed
        if (mainImageIndex === indexToRemove && updatedPreviews.length > 0) {
            setMainImageIndex(0); // Reset to the first image
        } else if (updatedPreviews.length === 0) {
            setMainImageIndex(null); // No images left
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = new FormData();

        Object.keys(formData).forEach((key) => {
            if (key === 'images') {
                formData.images.forEach((image) => {
                    newProduct.append('images', image);
                });
            } else if (key === 'specifications') {
                newProduct.append('specifications', JSON.stringify(formData.specifications));
            } else {
                newProduct.append(key, formData[key]);
            }
        });

        // Submit the product
        try {
            await addProduct(newProduct).unwrap();
            toast.success('Product added successfully!');
            setFormData(initialFormData);
            setImagePreviews([]);
            setMainImageIndex(0); // Reset main image index if necessary
        } catch (error) {
            toast.error('Error adding product');
        }
    };


    const handlePreviewClick = (index) => {
        setMainImageIndex(index);
    };

    const handleSpecificationChange = (index, field, value) => {
        const updatedSpecifications = [...formData.specifications];
        updatedSpecifications[index][field] = value;
        setFormData({ ...formData, specifications: updatedSpecifications });
    };

    const addSpecificationField = () => {
        setFormData({
            ...formData,
            specifications: [...formData.specifications, { name: '', value: '' }]
        });
    };


    return (
        <div className="max-w-md mx-auto mt-10">
            <Title title={"Add Products"}/>
            <h1 className="text-3xl font-semibold mb-6 text-center text-white">Add New Product</h1>
            <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Enter product name"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Enter product description"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Enter product price"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Enter product brand"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Enter product category"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Stock</label>
                    <input
                        type="number"
                        name="Stock"
                        value={formData.Stock}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Enter product stock"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Images</label>
                    <input
                        type="file"
                        name="images"
                        multiple
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        required
                    />
                </div>

                {/* Display main image and previews */}
                <div className="mb-4">
                    {imagePreviews.length > 0 && (
                        <div className="relative mb-4">
                            <img
                                src={imagePreviews[mainImageIndex]}
                                alt="Main product"
                                className="w-full h-64 object-cover mb-2"
                            />
                            {/* "X" button to remove the main image */}
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(mainImageIndex)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                            >
                                X
                            </button>

                            <div className="flex gap-2">
                                {imagePreviews.map((preview, index) => (
                                    <img
                                        key={index}
                                        src={preview}
                                        alt="Preview"
                                        className={`w-16 h-16 object-cover cursor-pointer ${index === mainImageIndex ? 'border-2 border-blue-500' : ''
                                            }`}
                                        onClick={() => handlePreviewClick(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Specifications</label>
                    {formData.specifications.map((spec, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                placeholder="Specification Name"
                                value={spec.name}
                                onChange={(e) => handleSpecificationChange(index, 'name', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Specification Value"
                                value={spec.value}
                                onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                required
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addSpecificationField}
                        className="text-blue-500 hover:underline"
                    >
                        + Add another specification
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
