import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 mb-0 sticky w-full">
            <div className="w-full px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 italic">About Us</h4>
                        <p className="text-lg italic">
                            We provide the best products to meet your needs. Our commitment to quality ensures your satisfaction.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 italic">Quick Links</h4>
                        <ul className="text-sm space-y-2 italic">
                            <li><Link to="/" className="hover:text-gray-600 transition text-lg">Home</Link></li>
                            <li><Link to="/cart" className="hover:text-gray-600 transition text-lg">Shop</Link></li>
                            <li><Link to="/about" className="hover:text-gray-600 transition text-lg">About</Link></li>
                            <li><Link to="/contact" className="hover:text-gray-600 transition text-lg">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Social Media Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-6">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom Section */}
                <div className="text-center mt-8 border-t border-gray-700 pt-4">
                    <p className="text-sm italic font-mono font-bold">&copy; 2024 E-Market. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
