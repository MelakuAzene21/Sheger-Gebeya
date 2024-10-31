import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Title from './Title'
const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What types of products do you offer?",
            answer: "We offer a wide range of products including home appliances, mobile phones, laptops, cameras, and other electronic devices. We focus on quality to ensure you get the best shopping experience."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order is confirmed, you will receive an email with a tracking link. You can use it to monitor the status of your delivery in real-time."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy on most items. Please ensure that products are unused and in original packaging when requesting a return. Visit our Return Policy page for more details."
        },
        {
            question: "How can I contact customer support?",
            answer: "You can reach us via email at support@ecome.shop or call us at (628) 900-3319. Our support team is available Monday to Friday, from 9 AM to 5 PM."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we do offer international shipping for certain products. Shipping fees and delivery times may vary based on your location."
        }
    ];

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-6">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
                <p className="text-gray-600 mb-12">Find answers to common questions about our products, shipping, returns, and more.</p>
            </div>
            <Title title='Frequently Asked Question' />

            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-md cursor-pointer transition-all"
                        onClick={() => toggleAnswer(index)}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                            <span className="text-gray-500">
                                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                            </span>
                        </div>
                        {activeIndex === index && (
                            <p className="mt-4 text-gray-600">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
