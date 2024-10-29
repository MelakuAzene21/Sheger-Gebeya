import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Title from './Title';

const ContactUs = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Title title={"Contact-Us"} />
            {/* Header Section */}
            <div className="relative bg-cover bg-center h-64" style={{ backgroundImage: "url('https://via.placeholder.com/1200x400')" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 flex items-center justify-center h-full text-center">
                    <h1 className="text-4xl font-bold text-white">Contact Us</h1>
                </div>
            </div>

            <div className="container mx-auto py-12 px-4 md:px-8 lg:px-16">
                {/* Contact Form Section */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-16">
                    {/* Form */}
                    <div className="lg:w-2/3 bg-white p-8 shadow-lg rounded-lg mb-8 lg:mb-0">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Get in Touch</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-600 text-lg mb-2">Name</label>
                                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-green-500" />
                            </div>
                            <div>
                                <label className="block text-gray-600 text-lg mb-2">Email</label>
                                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-green-500" />
                            </div>
                            <div>
                                <label className="block text-gray-600 text-lg mb-2">Message</label>
                                <textarea placeholder="Your Message" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-green-500" rows="5"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="lg:w-1/3 space-y-8">
                        {/* Store Info */}
                        <div className="p-8 bg-gray-50 shadow-lg rounded-lg">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Store Location</h3>
                            <p className="text-gray-600">30 N Gould St Ste R<br />Sheridan, WY 82801</p>
                            <p className="mt-4 text-gray-600"><span className="font-semibold">Email:</span> support@ecome.shop</p>
                            <p className="text-gray-600"><span className="font-semibold">Phone:</span> (628) 900-3319</p>
                        </div>

                        {/* Social Media Links */}
                        <div className="p-8 bg-gray-50 shadow-lg rounded-lg">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Follow Us</h3>
                            <div className="flex space-x-6">
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                                    <FaFacebook size={28} />
                                </a>
                                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                                    <FaTwitter size={28} />
                                </a>
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                                    <FaInstagram size={28} />
                                </a>
                                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                                    <FaLinkedin size={28} />
                                </a>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="h-64 bg-gray-200 shadow-lg rounded-lg overflow-hidden">
                            <img src="https://via.placeholder.com/600x400" alt="Map" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
