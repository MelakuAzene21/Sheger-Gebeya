import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

function Spinner() {
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#38bdf8"); // Set default color to a Tailwind blue

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">Loading Spinner</h1>

                <div className="flex justify-center mb-4">
                    <ClipLoader
                        color={color}
                        loading={loading}
                        cssOverride={override}
                        size={100}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>

                <div className="flex flex-col space-y-4">
                    <button
                        onClick={() => setLoading(!loading)}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        {loading ? "Stop Loader" : "Start Loader"}
                    </button>

                    <input
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter loader color (e.g., #38bdf8)"
                    />
                </div>
            </div>
        </div>
    );
}

export default Spinner;
