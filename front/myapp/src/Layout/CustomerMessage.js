import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Title from './Title'
const Messages = () => {
    const [messages, setMessages] = useState([]);
    const BASE_URL =
        process.env.NODE_ENV === 'production'
            ? 'https://e-market-fnu1.onrender.com'
            : process.env.REACT_APP_API_URL || 'http://localhost:5000';
    // Fetch messages from the backend
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/messages/all`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <Title title='Customer Questions' />

            <h2 className="text-4xl font-semibold text-center text-gray-800 mb-10">Customer Messages</h2>
            <div className="container mx-auto px-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {messages.map((message) => (
                        <div key={message._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
                            <h3 className="text-2xl font-semibold text-gray-700 mb-3">{message.name}</h3>
                            <p className="text-gray-600">{message.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Messages;
