import React from 'react';

const ShippingAndReturn = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Shipping & Return Policy</h1>

                {/* Shipping Policy Section */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-green-600 mb-4">Shipping Policy</h2>
                    <p className="text-gray-700 mb-4">
                        We aim to make your shopping experience seamless with various shipping options. Choose the shipping
                        method that best suits your needs and enjoy quick and reliable delivery.
                    </p>
                    <ul className="space-y-3 text-gray-600">
                        <li>
                            <span className="font-semibold">Shipping Methods:</span> Standard, Expedited, and Express shipping
                            options are available.
                        </li>
                        <li>
                            <span className="font-semibold">Delivery Times:</span> Standard (5-7 business days), Expedited (2-3
                            business days), Express (1-2 business days).
                        </li>
                        <li>
                            <span className="font-semibold">Shipping Areas:</span> We ship domestically across the United States
                            and internationally to selected regions.
                        </li>
                        <li>
                            <span className="font-semibold">Tracking:</span> Receive a tracking number to follow your order from
                            dispatch to delivery.
                        </li>
                    </ul>
                </div>

                {/* Return Policy Section */}
                <div>
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">Return Policy</h2>
                    <p className="text-gray-700 mb-4">
                        If you’re not completely satisfied with your purchase, we’re here to help with a straightforward return
                        process.
                    </p>
                    <ul className="space-y-3 text-gray-600">
                        <li>
                            <span className="font-semibold">Return Timeframe:</span> You have 30 days from the date of delivery
                            to initiate a return.
                        </li>
                        <li>
                            <span className="font-semibold">Condition of Returned Items:</span> Products must be unused and in
                            their original packaging to be eligible for a return.
                        </li>
                        <li>
                            <span className="font-semibold">Refunds and Exchanges:</span> We offer full refunds, exchanges, or
                            store credit based on your preference.
                        </li>
                        <li>
                            <span className="font-semibold">Return Shipping:</span> Customers are responsible for return
                            shipping fees, unless the item was received damaged or incorrect.
                        </li>
                        <li>
                            <span className="font-semibold">Exceptions:</span> Certain items like final sale, personal care, and
                            customized products cannot be returned.
                        </li>
                    </ul>
                </div>

                {/* Additional Info */}
                <div className="mt-12 text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Questions?</h3>
                    <p className="text-gray-600">
                        For more information on our policies, contact our support team at{' '}
                        <a href="mailto:melakuazene623@gmail.com" className="text-blue-500 hover:underline">
                            melakuazene623@gmail.com
                        </a>{' '}
                        or call us at (251) 918219856.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShippingAndReturn;
