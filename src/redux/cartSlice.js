import { createSlice } from "@reduxjs/toolkit";

// Get cart from localStorage
const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    localStorage.removeItem("cart"); // Clear invalid cart data
    return [];
  }
};

const initialState = {
  cart: getCartFromStorage(),
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      // Clear localStorage
      localStorage.removeItem("cart");
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);
      if (item) {
        item.quantity += 1;
        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter((i) => i._id !== action.payload);
        }
        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    setCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(action.payload));
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  setCart,
  setLoading,
} = cartSlice.actions;

export default cartSlice.reducer; 