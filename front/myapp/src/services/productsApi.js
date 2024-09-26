import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the API slice
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',  // Adjust this base URL to match your backend's base URL
        credentials:'include'
    }),
    tagTypes: ['User', 'Product','Reviews'],  // Add tag types here
    endpoints: (builder) => ({
        
        addProduct: builder.mutation({
            query: (formData) => ({
                url: '/products/add',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags:['Product']
        }),
        // Fetch products with optional filters like page, keyword, category, etc.
        getProducts: builder.query({
            query: ({ page, keyword, category, brand, minPrice, maxPrice }) => ({
                url: 'products/item',
                params: {
                    page,
                    keyword,
                    category,
                    brand,
                    minPrice,
                    maxPrice,
                },
            }),
            providesTags:['Products']
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...updatedProduct }) => ({
                url: `/products/${id}`,
                method: 'PUT',
                body: updatedProduct,
            }),
            invalidatesTags: ['Product'], // Invalidate the 'Product' tag to refetch
        }),

        // Delete Product
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'], // Invalidate the 'Product' tag to refetch
        }),

        // Fetch reviews for a specific product
        getReviews: builder.query({
            query: (productId) => ({
                url: `products/${productId}/reviews`,
                method: 'GET',
            }),
            providesTags:['Reviews']
        }),

        // Post a review for a specific product
        postReview: builder.mutation({
            query: ({ productId, rating, comment }) => ({
                url: `products/${productId}/review`,
                method: 'POST',
                body: { rating, comment },
               
            }),
            invalidatesTags:['Reviews']
        }),

        // Update a specific review
        updateReview: builder.mutation({
            query: ({ productId, reviewId, rating, comment }) => ({
                url: `products/${productId}/review/${reviewId}`,
                method: 'PUT',
                body: { rating, comment },
               
            }),
            invalidatesTags: ['Reviews']
        }),

        // Delete a specific review
        deleteReview: builder.mutation({
            query: ({ productId, reviewId }) => ({
                url: `products/${productId}/review/${reviewId}`,
                method: 'DELETE',
                
            }),
        }),
        invalidatesTags: ['Reviews']
    }),
});

// Export the auto-generated hooks for the API queries/mutations
export const {
    useUpdateProductMutation,
    useDeleteProductMutation,
    useAddProductMutation,
    useGetProductsQuery,
    useGetReviewsQuery,
    usePostReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
} = productsApi;
