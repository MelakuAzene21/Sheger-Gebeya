import React from 'react';
import Title from './Title';

const About = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Title title={"About -Us"} />
            {/* Banner Section */}
            <div className="relative bg-cover bg-center h-64" style={{ backgroundImage: "url('https://via.placeholder.com/1200x400')" }}>
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
                    <div className="relative bg-cover bg-center h-64 rounded-lg shadow-lg" style={{ backgroundImage: "url('https://via.placeholder.com/600x400')" }}>
                        <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
                        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">Home Products</h3>
                    </div>
                    <div className="relative bg-cover bg-center h-64 rounded-lg shadow-lg" style={{ backgroundImage: "url('https://via.placeholder.com/600x400')" }}>
                        <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
                        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">Mobile Devices</h3>
                    </div>
                    <div className="relative bg-cover bg-center h-64 rounded-lg shadow-lg" style={{ backgroundImage: "url('https://via.placeholder.com/600x400')" }}>
                        <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
                        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">Laptops</h3>
                    </div>
                    <div className="relative bg-cover bg-center h-64 rounded-lg shadow-lg" style={{ backgroundImage: "url('https://via.placeholder.com/600x400')" }}>
                        <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
                        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">Cameras</h3>
                    </div>
                    <div className="relative bg-cover bg-center h-64 rounded-lg shadow-lg" style={{ backgroundImage: "url('https://via.placeholder.com/600x400')" }}>
                        <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
                        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">Wearable Tech</h3>
                    </div>
                    <div className="relative bg-cover bg-center h-64 rounded-lg shadow-lg" style={{ backgroundImage: "url('https://via.placeholder.com/600x400')" }}>
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
            </div>
        </div>
    );
};

export default About;
