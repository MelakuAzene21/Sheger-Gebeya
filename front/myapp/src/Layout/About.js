import React from 'react';
import Title from './Title';
import { Link } from 'react-router-dom';
const About = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Title title={"About -Us"} />
            {/* Banner Section */}
            <div className="relative bg-cover bg-center h-64" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_E8WB9XhDBEBLdEDeFOHmicREpg29_N5PRZRyh6hlUay3hAKQzIM2gNNpMwvwkSzC3DsdQA&s')" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 flex items-center justify-center h-full text-center">
                    <h1 className="text-4xl font-bold text-white">About Us</h1>
                </div>
            </div>

            {/* Introduction Section */}
            <div className="container mx-auto p-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Who We Are</h2>
                <p className="text-lg text-gray-600 text-center mb-8">
                    Welcome to our store, where we bring you a wide collection of high-quality products for home, mobile, laptops, cameras, and more! We are committed to providing excellent customer service and top-quality products to meet your everyday needs.
                </p>
            </div>

            {/* Our Collection Section */}
            <div className="container mx-auto p-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Our Collection</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="relative bg-cover bg-center h-64 rounded-lg shadow-lg" style={{ backgroundImage: "url('data:image/jpeg;base64,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')" }}>
                        <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
                        <h3 className="absolute bottom-4 left-4 text-2xl text-center font-bold text-white">Home Products</h3>
                    </div>
                    <div className="relative bg-cover bg-center h-64 rounded-lg shadow-lg" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN7hTIaUbfzgjCmMOXSKa-QboWi292sfBHP8bOElGwC_FvG9lGzVTbj0Y&s')" }}>
                        <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
                        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">Mobile Devices</h3>
                    </div>
                    <div className="relative bg-cover bg-center h-64 rounded-lg shadow-lg" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL-TVcqmem-5SPACM6GNv5iKpKkfsnKnhoEWc59IZh6dYtiB5U_ffc66qJjC62MdGhvtuR2Q&s')" }}>
                        <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
                        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">Laptops</h3>
                    </div>
                    <div className="relative bg-cover bg-center h-64 rounded-lg shadow-lg" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ZZxcMNJ7NiL2KdK7eUHbogZk6Zocvv24k_jllCygH7MdJLXWAtuRPjw&s')" }}>
                        <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
                        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">Cameras</h3>
                    </div>
                    <div className="relative bg-cover bg-center h-64 rounded-lg shadow-lg" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFe4iWRUPBf7MfZ-XM9SI3bVT6dYCRkuIjWwimgA_npvy6WtCJU7-ypetwSeBJ24A0gmvtww&s')" }}>
                        <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
                        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">Wearable Tech</h3>
                    </div>
                    <div className="relative bg-cover bg-center h-64 rounded-lg shadow-lg" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY0CG3Eu2xPcVHw3r4axfm8Q3ond1P45we5k2vLCLZYGsxgo18Zn35YEyw-kzb9GbqgacIog&s')" }}>
                        <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
                        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">Audio Equipment</h3>
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-white py-12">
                <div className="container mx-auto px-8">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-green-500 mb-2">High Quality</h3>
                            <p className="text-gray-600">Our products are sourced from top brands to ensure the highest quality and reliability.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-green-500 mb-2">Affordable Prices</h3>
                            <p className="text-gray-600">We offer competitive pricing without compromising on quality.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-green-500 mb-2">Excellent Support</h3>
                            <p className="text-gray-600">Our dedicated support team is here to assist you with any queries.</p>
                        </div>
                    </div>
                </div>



                <div className="text-center">
                    <h3 className="text-2xl font-bold text-green-500 mb-2">Discover Our Best Products!</h3>
                    <p className="text-gray-600 mb-4">Experience quality and value like never before with our top-rated products.</p>
                    <Link
                        to="/"
                        className="inline-block px-6 py-3 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition duration-300"
                    >
                        Shop Now
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default About;
