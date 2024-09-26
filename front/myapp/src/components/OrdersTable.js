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
                <div className="flex flex-col items-center my-10 mt-28">
                    <img
                        src="/images/no-orders.png"
                        alt="No orders"
                        className="w-1/3 mb-4"
                    />
                    <Typography variant="h6" className="text-gray-600 text-center">
                        You have not placed any orders yet.
                    </Typography>
                    <Link to={'/'} className='bg-blue-300 text-black px-4 py-5 rounded hover:bg-blue-600 transition-colors duration-300'>
                        Start Shopping
                    </Link >
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
            <div className="flex flex-col items-center my-10">
                <img
                    src="/images/no-orders.png"
                    alt="No orders"
                    className="w-1/3 mb-4"
                />
                <Typography variant="h6" className="text-gray-600 text-center">
                    You have not placed any orders yet.
                </Typography>
                <Link to={'/'} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300'>
                    Start Shopping
                </Link >
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
                    {orders.map((order) => (
                        <TableRow key={order._id}>
                            <TableCell>{order._id}</TableCell>
                            <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                            {/* Payment Status Color */}
                            <TableCell className={getPaymentStatusColor(order.isPaid)}>
                                {order.isPaid ? 'Paid' : 'Not Paid'}
                            </TableCell>
                            {/* Delivery Status Color */}
                            <TableCell className={getDeliveryStatusColor(order.isDelivered)}>
                                {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                            </TableCell>
                            <TableCell>
                                <Link to={`/order/${order._id}`} className="text-blue-500 hover:underline">Details</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrdersTable;
