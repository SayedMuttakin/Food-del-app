import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // Import the cart reducer
import reservationReducer from "./slices/reservationSlice";
import authReducer from "./authSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    reservation: reservationReducer,
    auth: authReducer,
  },
});

export default store;
