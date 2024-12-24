// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const orderApi = createApi({
//     reducerPath: 'orderApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://localhost:5000/api',
//         credentials: 'include'
//     }),
//     endpoints: (builder) => ({
//         createOrder: builder.mutation({
//             query: (orderData) => ({
//                 url: 'orders',
//                 method: 'POST',
//                 body: orderData,
//             }),
//         }),
//     }),
    
// });

// export const { useCreateOrderMutation } = orderApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// Dynamically set the base URL based on the environment
const BASE_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://e-market-fnu1.onrender.com/api' // Production URL
        : process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // Local development URL


export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
         baseUrl:BASE_URL,
        credentials: 'include'
     }),  // Adjust based on your API
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: 'orders',
                method: 'POST',
                body: orderData,
            }),
            invalidatesTags: ['Orders'],
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: 'orders/myorders',
                method: 'GET',
            }),
            providesTags: ['Orders'],
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `orders/${orderId}`,
                method: 'GET',
            }),
            providesTags: ['Orders'],
        }),
    }),
});

export const { useCreateOrderMutation, useGetMyOrdersQuery, useGetOrderDetailsQuery } = orderApi;
