import { createSlice } from "@reduxjs/toolkit";

const reservationSlice = createSlice({
  name: "reservation",
  initialState: [],
  reducers: {
    addReservation: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
