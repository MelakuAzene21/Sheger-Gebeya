import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/api/authApi';
import { productsApi } from '../services/productsApi';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/cart/orderSlice'
import { orderApi } from '../features/api/orderApi';
import authReducer from '../features/api/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        order: orderReducer,
        [authApi.reducerPath]: authApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApi.middleware, productsApi.middleware, orderApi.middleware]),
});
 