import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Title from './Title';

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit form using fetch API
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/messages/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setResponseMessage(data.message);
                setFormData({ name: '', email: '', message: '' }); // Clear form
            } else {
                setResponseMessage(data.message || 'Error sending message. Please try again later.');
            }
        } catch (error) {
            setResponseMessage('Server error. Please try again later.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm5xjtEioE8uh0J-rQ46U_YMI5goW9mtPTpKJZQ_6zCH5Zh__EX8s3J3M&s')" }}>
            <Title title={"Contact-Us"} />
            <div className="relative bg-cover bg-center h-64">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 flex items-center justify-center h-full text-center">
                    <h1 className="text-4xl font-bold text-white">Contact Us</h1>
                </div>
            </div>
            <div className="container mx-auto py-12 px-4 md:px-8 lg:px-16">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-16">
                    <div className="lg:w-2/3 bg-white p-8 shadow-lg rounded-lg mb-8 lg:mb-0">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Get in Touch</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-600 text-lg mb-2">Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-green-500" />
                            </div>
                            <div>
                                <label className="block text-gray-600 text-lg mb-2">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-green-500" />
                            </div>
                            <div>
                                <label className="block text-gray-600 text-lg mb-2">Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-green-500" rows="5"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition">
                                Send Message
                            </button>
                        </form>
                        {responseMessage && <p className="mt-4 text-center text-lg text-green-600">{responseMessage}</p>}
                    </div>
                    {/* Contact Information */}
                    <div className="lg:w-1/3 space-y-8">
                        {/* Store Info */}
                        <div className="p-8 bg-gray-50 shadow-lg rounded-lg">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Store Location</h3>
                            <p className="mt-4 text-gray-600"><span className="font-semibold">Email:</span> melakuazene623@gmail.com</p>
                            <p className="text-gray-600"><span className="font-semibold">Phone:</span> (251) 918219856</p>
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
                            <img src="https://www.google.com/maps/vt/data=2DHcWi4cecKMYv_eZ_FJJsJMmAvkU6HuZ4swe7EwV7k3u4Cg7emUZZx462-_Gr2LpgFfEg-2m_4qfXnmv-c7BlbWkusGG5vU-XQb7nhypokNROTYUTJOozD76aSY-K7r9nUvFD-a-0DS0kxDeYQhqgVQFCZQgsWvYtTrW4H4GZXh81fIKJfhNP244yER-BXphPtVcE3JeKG_hKbyJu2JIyV2WwWHovLZSvmEkRMmgkvKgHGEWS7JO-Ln0KWU-oSVAQdR_D42WLqWR2Lx3tKCpqeF-KBO637tj-DfmA" alt="Map" className="w-full h-full object-cover" />
                            </div>
                       </div>  
                  </div>
            </div>
        </div>
    );
};

export default ContactUs;
