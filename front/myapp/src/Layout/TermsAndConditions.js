import React from 'react';
import Title from './Title'
const TermsAndConditions = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Terms and Conditions</h1>
                <Title title='Terms and Condition'/>
                {/* Intro Section */}
                <div className="mb-6">
                    <p className="text-gray-700">
                        Welcome to E-Market! These terms and conditions outline the rules and regulations for using our website.
                        By accessing this site, you agree to comply with these terms. Please read them carefully.
                    </p>
                </div>

                {/* Terms Section */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">1. General Terms</h2>
                    <ul className="space-y-3 text-gray-600">
                        <li>By using our website, you agree to abide by our policies and all applicable laws and regulations.</li>
                        <li>All information provided by you should be accurate, complete, and current.</li>
                        <li>We reserve the right to update these terms at any time, and changes will be effective immediately.</li>
                    </ul>
                </div>

                {/* Account Section */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">2. Account Responsibilities</h2>
                    <ul className="space-y-3 text-gray-600">
                        <li>You are responsible for maintaining the confidentiality of your account and password.</li>
                        <li>You agree to accept responsibility for all activities that occur under your account.</li>
                        <li>Accounts may be terminated if activities are found to violate our policies.</li>
                    </ul>
                </div>

                {/* Intellectual Property Section */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">3. Intellectual Property</h2>
                    <ul className="space-y-3 text-gray-600">
                        <li>All content on this site, including images, logos, and text, is the property of E-Market or its licensors.</li>
                        <li>You may not use, reproduce, or distribute any content without written permission from E-Market.</li>
                    </ul>
                </div>

                {/* Purchases Section */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">4. Purchases and Payments</h2>
                    <ul className="space-y-3 text-gray-600">
                        <li>All sales are subject to our return and refund policies. Please review these before making a purchase.</li>
                        <li>Prices for our products are subject to change without notice.</li>
                        <li>We reserve the right to refuse any order at our discretion.</li>
                    </ul>
                </div>

                {/* Limitation of Liability Section */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">5. Limitation of Liability</h2>
                    <p className="text-gray-700 mb-4">
                        E-Market is not liable for any damages that result from the use of, or the inability to use, our website
                        or products. This limitation of liability applies to all damages of any kind.
                    </p>
                </div>

                {/* Privacy Policy Section */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">6. Privacy Policy</h2>
                    <p className="text-gray-700 mb-4">
                        We value your privacy. Please review our Privacy Policy to understand how we handle your personal
                        information.
                    </p>
                </div>

                {/* Contact Information */}
                <div className="mt-12 text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Questions?</h3>
                    <p className="text-gray-600">
                        If you have any questions about these Terms and Conditions, contact us at{' '}
                        <a href="mailto:melakuazene623@gmail.com" className="text-blue-500 hover:underline">
                           melakuazene623@gmail.com
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
