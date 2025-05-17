import { createSlice } from "@reduxjs/toolkit";
import { clearCart } from "./cartSlice";

const initialState = {
  user: null, // প্রথমে null সেট করে রাখি
};

// ফাইল লোড হওয়ার সময়, লোকালস্টোরেজ থেকে ইউজার ডেটা পড়া
if (typeof window !== "undefined") {
  const userFromLocalStorage = localStorage.getItem("user");

  // Check if the user data exists and is valid JSON
  if (userFromLocalStorage && userFromLocalStorage !== "undefined") {
    try {
      const savedUser = JSON.parse(userFromLocalStorage);
      if (savedUser) {
        initialState.user = savedUser; // যদি ডেটা থাকে তবে সেট করব
      }
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
    }
  }
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // লোকালস্টোরেজে সেভ
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // লোকালস্টোরেজ থেকে রিমুভ
      localStorage.removeItem("cart"); // Clear cart from localStorage
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer; 