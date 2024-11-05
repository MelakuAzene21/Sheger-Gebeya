import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/thank-you'); // Navigate to the thank you page
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold mb-4">Payment Successful</h2>
            <p className="mb-6">Thank you for your payment! Your transaction has been completed.</p>
            <button
                onClick={handleContinue}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Continue
            </button>
        </div>
    );
};

export default Success;
