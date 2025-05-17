import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import reservationReducer from "./slices/reservationSlice";
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    reservation: reservationReducer,
    user: userReducer,
  },
});

export default store;
