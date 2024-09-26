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

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api',
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
