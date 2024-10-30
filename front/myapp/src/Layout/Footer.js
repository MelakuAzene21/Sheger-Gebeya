import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 w-full">
            <div className="w-full px-6 md:px-16">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {/* Store Location Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 italic">Store Location</h4>
                        <p className="text-sm">
                            Addis Abeba ,Ethiopia<br />
                           Bole, B 8
                        </p>
                        <p className="text-sm mt-2">melakuazene623@gmail.com</p>
                        <p className="text-sm mt-2">(251) 918219856</p>
                        <div className="flex space-x-4 mt-4">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                                <FaFacebook size={20} />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                                <FaInstagram size={20} />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                                <FaYoutube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Shop Section
                    <div>
                        <h4 className="text-lg font-semibold mb-4 italic">Shop</h4>
                        <ul className="text-sm space-y-2">
                            <li><Link to="/shop/all" className="hover:text-gray-400 transition">Shop All</Link></li>
                            <li><Link to="/shop/computers" className="hover:text-gray-400 transition">Computers</Link></li>
                            <li><Link to="/shop/tablets" className="hover:text-gray-400 transition">Tablets</Link></li>
                            <li><Link to="/shop/drones-cameras" className="hover:text-gray-400 transition">Drones & Cameras</Link></li>
                            <li><Link to="/shop/audio" className="hover:text-gray-400 transition">Audio</Link></li>
                            <li><Link to="/shop/mobile" className="hover:text-gray-400 transition">Mobile</Link></li>
                            <li><Link to="/shop/tv-home-cinema" className="hover:text-gray-400 transition">TV & Home Cinema</Link></li>
                            <li><Link to="/shop/wearable-tech" className="hover:text-gray-400 transition">Wearable Tech</Link></li>
                            <li><Link to="/shop/sale" className="hover:text-gray-400 transition">Sale</Link></li>
                        </ul>
                    </div> */}

                    {/* Customer Support Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 italic">Customer Support</h4>
                        <ul className="text-sm space-y-2">
                            <li><Link to="/contact" className="hover:text-green-400 transition">Contact Us</Link></li>
                            <li><Link to="/support/question" className="hover:text-green-400 transition">Customer Questions</Link></li>
                            <li><Link to="/about" className="hover:text-green-400 transition">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Policy Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 italic">Policy</h4>
                        <ul className="text-sm space-y-2">
                            <li><Link to="/policy/shipping-returns" className="hover:text-blue-400 transition">Shipping & Returns</Link></li>
                            <li><Link to="/policy/terms-conditions" className="hover:text-blue-600 transition">Terms & Conditions</Link></li>
                            <li><Link to="/policy/payment-methods" className="hover:text-blue-600 transition">Payment Methods</Link></li>
                            <li><Link to="/faq" className="hover:text-blue-600 transition">FAQ</Link></li>
                        </ul>
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
