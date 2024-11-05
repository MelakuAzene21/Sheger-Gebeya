// import React from 'react';
// import { useGetMyOrdersQuery } from '../features/api/orderApi';
// import { Link } from 'react-router-dom';
// import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

// const OrdersTable = () => {
//     const { data: orders, isLoading, isError, error } = useGetMyOrdersQuery();

//     if (isLoading) return <div className="flex justify-center my-10"><CircularProgress /></div>;
//     if (isError) return <Typography variant="h6" color="error" className="text-center">Error: {error.message}</Typography>;

//     if (!orders || orders.length === 0) {
//         return <Typography variant="h6" className="text-center mt-6">No orders found.</Typography>;
//     }

//     const getPaymentStatusColor = (isPaid) => {
//         return isPaid ? 'text-blue-500' : 'text-red-500'; // Blue for paid, red for not paid
//     };

//     const getDeliveryStatusColor = (isDelivered) => {
//         return isDelivered ? 'text-green-500' : 'text-red-700'; // Green for delivered, darker red for not delivered
//     };

//     return (
//         <TableContainer component={Paper} className="my-8 shadow-md">
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell><strong>ID</strong></TableCell>
//                         <TableCell><strong>Amount</strong></TableCell>
//                         <TableCell><strong>Payment Status</strong></TableCell>
//                         <TableCell><strong>Order Status</strong></TableCell>
//                         <TableCell><strong>Action</strong></TableCell>
                      
//                     </TableRow>
                  
//                 </TableHead>
//                 <TableBody>
                  
//                     {orders.map((order) => (
//                         <TableRow key={order._id}>
//                             <TableCell>{order._id}</TableCell>
//                             <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
//                             {/* Payment Status Color */}
//                             <TableCell className={getPaymentStatusColor(order.isPaid)}>
//                                 {order.isPaid ? 'Paid' : 'Not Paid'}
//                             </TableCell>
//                             {/* Delivery Status Color */}
//                             <TableCell className={getDeliveryStatusColor(order.isDelivered)}>
//                                 {order.isDelivered ? 'Delivered' : 'Not Delivered'}
//                             </TableCell>
//                             <TableCell>
//                                 <Link to={`/order/${order._id}`} className="text-blue-500 hover:underline">Details</Link>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// };

// export default OrdersTable;


import React from 'react';
import { useGetMyOrdersQuery } from '../features/api/orderApi';
import { Link } from 'react-router-dom';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Title from '../Layout/Title';
const OrdersTable = () => {
    const { data: orders, isLoading, isError, error } = useGetMyOrdersQuery();

    // Handle loading state
    if (isLoading) return (
        <div className="flex justify-center my-10">
            <CircularProgress />
        </div>
    );

    // Handle error state, including 404 (No orders found)
    if (isError) {
        if (error?.status === 404) {
            // Display a friendly message if there are no orders (404)
            return (
                <div
                    className="flex flex-col items-center my-10 p-10 rounded-lg shadow-md min-h-[300px]"
                    style={{
                        backgroundImage: "linear-gradient(to right, #D1C4E9, #BBDEFB)", // Add background gradient
                        backgroundColor: "#BBDEFB", // Fallback solid color
                        border: "1px solid #ccc",  // Optional: Adds border to show component boundaries
                    }}
                >
                    <img
                        src="/images/no-orders.png"
                        alt="No orders"
                        className="w-1/4 mb-6"
                    />
                    <Typography variant="h6" className="text-gray-700 font-semibold mb-4 text-center">
                        Looks like you haven't placed any orders yet!
                    </Typography>
                    <Typography className="text-gray-500 mb-6 text-center">
                        Ready to discover our amazing products? Start your shopping journey now!
                    </Typography>
                    <Link
                        to={'/'}
                        className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 ease-in-out"
                    >
                        Start Shopping
                    </Link>
                </div>

            );
        } else {
            // Display general error message for other errors
            return (
                <Typography variant="h6" color="error" className="text-center">
                    Error: {error.message}
                </Typography>
            );
        }
    }

    // Check if there are no orders
    if (!orders || orders.length === 0) {
        return (
            <div className="flex flex-col items-center my-10 p-10 bg-gradient-to-r from-purple-200 to-blue-100 rounded-lg shadow-md">
                <img
                    src="/images/no-orders.png"
                    alt="No orders"
                    className="w-1/4 mb-6"
                />
                <Typography variant="h6" className="text-gray-700 font-semibold mb-4 text-center">
                    Looks like you haven't placed any orders yet!
                </Typography>
                <Typography className="text-gray-500 mb-6 text-center">
                    Ready to discover our amazing products? Start your shopping journey now!
                </Typography>
                <Link
                    to={'/'}
                    className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 ease-in-out"
                >
                    Start Shopping
                </Link>
            </div>

        );
    }

    // Get color for payment status
    const getPaymentStatusColor = (isPaid) => {
        return isPaid ? 'text-blue-500' : 'text-red-500'; // Blue for paid, red for not paid
    };

    // Get color for delivery status
    const getDeliveryStatusColor = (isDelivered) => {
        return isDelivered ? 'text-green-500' : 'text-red-700'; // Green for delivered, darker red for not delivered
    };

    return (
        <TableContainer component={Paper} className="my-8 shadow-md">
            <Title Title={"Orders Table"}/>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>ID</strong></TableCell>
                        <TableCell><strong>Amount</strong></TableCell>
                        <TableCell><strong>Payment Status</strong></TableCell>
                        <TableCell><strong>Order Status</strong></TableCell>
                        <TableCell><strong>Action</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order) => (
                        <TableRow key={order._id}>
                            <TableCell>{order._id}</TableCell>
                            <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                            {/* Payment Status Color */}
                            <TableCell>
                                <span className={`font-bold ${order.isPaid ? 'text-green-500' : 'text-red-500'}`}>
                                    {order.isPaid ? 'Paid' : 'Not Paid'}
                                </span>
                            </TableCell>

                            {/* Delivery Status Color */}
                           
                            <TableCell>
                                <span className={`font-bold ${order.isDelivered ? 'text-green-500' : 'text-red-500'}`}>

                                {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Link to={`/order/${order._id}`} className="text-blue-500 cursor bg-green-400 rounded-xl p-2">Details</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrdersTable;
