import { useEffect, useState } from 'react';
import { useLocation,Link } from 'react-router-dom';

const SuccessPage = () => {
    const location = useLocation();
    const [transactionData, setTransactionData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Extract tx_ref from the query params
        const queryParams = new URLSearchParams(location.search);
        const txRef = queryParams.get("tx_ref");

        if (!txRef) {
            setTransactionData({ message: "Transaction reference not found." });
            setIsLoading(false);
            return; // Early return if txRef is null
        }

        // Fetch the message from the callback route
        const verifyTransaction = async () => {
            try {
                const response = await fetch(`http://localhost:5000/payment/verify-transaction/${txRef}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    // Update this section to match the response structure
                    setTransactionData({
                        status: data.success ? 'success' : 'failed',
                        message: data.message,
                        // first_name: data.data.first_name,
                        // email: data.data.email,
                        // amount: data.data.amount,
                        // currency: data.data.currency
                    });
                } else {
                    setTransactionData({ message: data.message || "Failed to process the transaction." });
                }
            } catch (error) {
                console.error("Error processing the callback:", error);
                setTransactionData({ message: "Error processing the transaction." });
            } finally {
                setIsLoading(false);
            }
        };

        verifyTransaction();
    }, [location]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
                    Payment Verification
                </h1>
                {isLoading ? (
                    <p className="text-center text-gray-500">Verifying...</p>
                ) : (
                    <div className="space-y-4">
                        {transactionData ? (
                            <>
                                <div className="border border-gray-200 p-4 rounded-md">
                                    <p className="text-lg font-semibold text-gray-700">
                                        Status: <span className={`text-${transactionData.status === 'success' ? 'green' : 'red'}-500`}>{transactionData.status}</span>
                                    </p>
                                </div>
                                <div className="border border-gray-200 p-4 rounded-md">
                                    <p className="text-gray-700">
                                        <strong>Message:</strong> {transactionData.message}
                                    </p>
                                </div>
                                <div>
                                    <Link
                                        to={'/'}
                                        className="  mt-10 ml-6 text-white bg-blue-500 px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
                                    >
                                        Back to Home
                                    </Link>
                                    </div>
                                {/* {transactionData.first_name && (
                                    <>
                                        <div className="border border-gray-200 p-4 rounded-md">
                                            <p className="text-gray-700">
                                                <strong>First Name:</strong> {transactionData.first_name}
                                            </p>
                                        </div>
                                        <div className="border border-gray-200 p-4 rounded-md">
                                            <p className="text-gray-700">
                                                <strong>Email:</strong> {transactionData.email}
                                            </p>
                                        </div>
                                        <div className="border border-gray-200 p-4 rounded-md">
                                            <p className="text-gray-700">
                                                <strong>Amount:</strong> {transactionData.amount} {transactionData.currency}
                                            </p>
                                        </div>
                                        <div className="border border-gray-200 p-4 rounded-md">
                                            <p className="text-gray-700">
                                                <strong>Currency:</strong> {transactionData.currency}
                                            </p>
                                        </div>
                                    </>
                                )} */}
                            </>
                        ) : (
                            <p className="text-center text-gray-500">No transaction data found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuccessPage;
