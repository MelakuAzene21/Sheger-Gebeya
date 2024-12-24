// import React, { useRef, useEffect, useState } from 'react';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Tooltip,
//     Legend,
// } from 'chart.js';
// import { Chart } from 'react-chartjs-2';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Tooltip,
//     Legend
// );

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
// const colors = [
//     'red',
//     'orange',
//     'yellow',
//     'lime',
//     'green',
//     'teal',
//     'blue',
//     'purple',
// ];

// // Function to generate random data for the chart
// const generateRandomData = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// // Sample chart data
// export const data = {
//     labels,
//     datasets: [
//         {
//             label: 'Dataset 1',
//             data: labels.map(() => generateRandomData(-1000, 1000)),
//         },
//         {
//             label: 'Dataset 2',
//             data: labels.map(() => generateRandomData(-1000, 1000)),
//         },
//     ],
// };

// // Function to create gradient for chart
// function createGradient(ctx, area) {
//     const colorStart = colors[Math.floor(Math.random() * colors.length)];
//     const remainingColors = colors.filter(color => color !== colorStart);
//     const colorMid = remainingColors[Math.floor(Math.random() * remainingColors.length)];
//     const colorEnd = remainingColors.filter(color => color !== colorMid)[0];

//     const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

//     gradient.addColorStop(0, colorStart);
//     gradient.addColorStop(0.5, colorMid);
//     gradient.addColorStop(1, colorEnd);

//     return gradient;
// }

// export function SalesChart() {
//     const chartRef = useRef(null);
//     const [chartData, setChartData] = useState(data);

//     useEffect(() => {
//         const chart = chartRef.current;

//         if (!chart) {
//             return;
//         }

//         const chartData = {
//             ...data,
//             datasets: data.datasets.map(dataset => ({
//                 ...dataset,
//                 borderColor: createGradient(chart.ctx, chart.chartArea),
//             })),
//         };

//         setChartData(chartData);
//     }, []);

//     return <Chart ref={chartRef} type="line" data={chartData} />;
// }
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SalesChart() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const BASE_URL =
        process.env.NODE_ENV === 'production'
            ? 'https://e-market-fnu1.onrender.com'
            : process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const navigate=useNavigate();
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/orders`, { withCredentials: true });
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/products`, { withCredentials: true });
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    // Calculate statistics
    const totalSoldProducts = orders.reduce((total, order) => {
        return total + order.orderItems.reduce((sum, item) => sum + item.qty, 0);
    }, 0);

    const totalRevenue = orders.reduce((total, order) => {
        return total + order.orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    }, 0);

    const paidOrdersCount = orders.filter((order) => order.isPaid).length;
    const pendingOrdersCount = orders.filter((order) => !order.isPaid).length;
    const deliveredOrdersCount = orders.filter((order) => order.isDelivered).length;

    // Calculate product stock statistics
    const outOfStockProducts = products.filter((product) => product.Stock === 0).length;
    const belowTwentyStockProducts = products.filter((product) => product.Stock < 20).length;

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <header className="mb-6">
                <p className="text-gray-600">Overview of sales and inventory performance</p>
                <button
                    onClick={() => navigate(-1)} // Go back in history
                    className="px-4 py-2 bg-indigo-500 text-white rounded shadow hover:bg-indigo-600"
                >
                    Go Back
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Orders Summary */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="mr-2 text-indigo-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11m4 0h4M5.5 14H19m-13.5 0H3m2.5-4h15m-15 0h-2m5 0h13M7 18l3 3m0 0l3-3m-3 3v-6" />
                            </svg>
                        </span>
                        Orders Summary
                    </h2>
                    <p className="text-gray-600">Total Orders: {orders.length}</p>
                    <p className="text-gray-600">Paid Orders: {paidOrdersCount}</p>
                    <p className="text-gray-600">Pending Orders: {pendingOrdersCount}</p>
                    <p className="text-gray-600">Delivered Orders: {deliveredOrdersCount}</p>
                </div>

                {/* Sales Summary */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="mr-2 text-green-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
                            </svg>
                        </span>
                        Sales Summary
                    </h2>
                    <p className="text-gray-600">Total Sold Products: {totalSoldProducts}</p>
                    <p className="text-gray-600">Total Revenue: {totalRevenue.toFixed(2)} ETB</p>
                </div>

                {/* Inventory Summary */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="mr-2 text-red-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                        Inventory Summary
                    </h2>
                    <p className="text-gray-600">Total Products: {products.length}</p>
                    <p className="text-red-600">Out of Stock Products: {outOfStockProducts}</p>
                    <p className="text-yellow-600">Products with Stock Below 20: {belowTwentyStockProducts}</p>
                </div>
            </div>
        </div>
    );
}
