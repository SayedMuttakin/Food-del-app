import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    // নতুন এড করা রিডিউসার
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity === 1) {
          state.cart = state.cart.filter((item) => item.id !== action.payload);
        } else {
          item.quantity--;
        }
      }
    },
  },
});

// এক্সপোর্টে নতুন একশনগুলো যোগ করুন
export const { 
  addToCart, 
  removeFromCart, 
  clearCart, 
  incrementQuantity, 
  decrementQuantity 
} = cartSlice.actions;

export default cartSlice.reducer;