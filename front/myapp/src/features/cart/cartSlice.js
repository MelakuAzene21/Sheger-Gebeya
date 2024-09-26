import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast'; // Add this if you want to use toast notifications

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        cartTotalQuantity: 0,
    },
    reducers: {
        addItemToCart(state, action) {
            const item = action.payload;
            const existingItem = state.cartItems.find(i => i._id === item._id);
            if (existingItem) {
                existingItem.quantity += item.quantity;
                toast.success(`${item.name} quantity updated in cart!`);
            } else {
                state.cartItems.push(item);
                toast.success(`${item.name} added to cart!`);
            }
            state.cartTotalQuantity += item.quantity;
        },
        removeItemFromCart(state, action) {
            const productId = action.payload;
            const itemIndex = state.cartItems.findIndex(item => item._id === productId);
            if (itemIndex > -1) {
                const item = state.cartItems[itemIndex];
                state.cartTotalQuantity -= item.quantity;
                state.cartItems.splice(itemIndex, 1);
                toast.error(`${item.name} removed from cart!`);
            }
        },
        emptyCart: (state) => {
            state.cartTotalQuantity=0;
            state.cartItems = [];  // Clear all items in the cart
        },
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find(item => item._id === id);
            if (item) {
                item.quantity = quantity;
                toast.success(`${item.name}'s quantity updated!`);
            }
        },
    },
});

export const { addItemToCart, removeItemFromCart, updateQuantity ,emptyCart} = cartSlice.actions;
export default cartSlice.reducer;
