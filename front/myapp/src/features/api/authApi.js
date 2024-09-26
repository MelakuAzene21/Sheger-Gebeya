import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api', // Your backend URL
  credentials: 'include', // This includes cookies with every request
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['User'], // Define 'User' as a tag type
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (newUser) => ({
        url: '/auth/register',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled; // Wait for signup to complete
          await dispatch(authApi.endpoints.getCurrentUser.initiate(null)); // Trigger fetching current user profile
        } catch (error) {
          console.log('Error during signup:', error);
        }
      },
    }),
    login: builder.mutation({
      query: (userCredentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: userCredentials,
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled; // Wait for login to complete
          await dispatch(authApi.endpoints.getCurrentUser.initiate(null)); // Fetch current user profile after login
        } catch (error) {
          console.log('Error during login:', error);
        }
      },
    }),
    getCurrentUser: builder.query({
      query: () => '/auth/profile',
      providesTags: ['User'], 
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled; // Wait for profile query to complete
          console.log('Fetched current user profile:', data); // You can dispatch user data to the store if necessary
        } catch (error) {
          console.log('Error fetching current user:', error);
        }
      },
    }),
  


    updateProfileByAdmin: builder.mutation({
      query: ({ _id, ...userData }) => ({
        url: `/users/${_id}`,
        method: 'PUT', // Use PUT for updating
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (userData ) => ({
        url: "users/updateProfile",
        method: 'PUT', // Use PUT for updating
        body: userData,
      }),
      invalidatesTags:['User'],
    }),
    updatePassword: builder.mutation({
      query: (passwordData) => ({
        url: 'users/updatePassword',
        method: 'PUT', // Use PUT for updating
        body: passwordData,
      }),
      invalidatesTags:['User']

    }),
    // Mutation to delete a user by ID
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,      // Backend endpoint to delete user by ID
        method: 'DELETE',             // DELETE method to remove a user
      }),
      invalidatesTags: ['User'],
    }),
    getAllUsers: builder.query({
      query: () => '/users',  // This assumes your backend has a /profile endpoint for current user info
     providesTags:['User']
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],  // Invalidate 'User' tag on logout
    }),

    getAllProducts: builder.query({
      query: ({ page = 1, limit = 5, keyword = '', category = '', brand = '', minPrice = '', maxPrice = '', inStock = '' }) => ({
        url: `/products/item`,
        params: { page, limit, keyword, category, brand, minPrice, maxPrice, inStock },
      }),
      providesTags: ['Product'],  // Provide 'Product' tag for product list
    }),
    getProducts: builder.query({
      query: () => '/products', // This will hit the '/api/products' endpoint
    providesTags:['Product']
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ['Product'],  // Provide 'Product' tag for individual product
    }),
  })
})

 export const {
  useGetProductsQuery,
  useUpdateProfileMutation,
  useUpdateProfileByAdminMutation,
  useDeleteUserMutation,
  useUpdatePasswordMutation,
  useSignupMutation,
  useLoginMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetAllUsersQuery,
} = authApi;
