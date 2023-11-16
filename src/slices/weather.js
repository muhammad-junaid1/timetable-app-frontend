import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  initialState: {},
  name: "weather",
  reducers: {
    setWeather: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
