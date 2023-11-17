
import { createSlice } from "@reduxjs/toolkit";

const sidebar = createSlice({
  initialState: {
    showContent: false, 
    showContainer: false
  },
  name: "sidebarVisibility",
  reducers: {
    setContentVisiblity: (state, action) => {
      return { ...state, showContent: action.payload};
    },
    setContainerVisibility: (state, action) => {
      return { ...state, showContainer: action.payload };
    },
  },
});

export const { setContainerVisibility, setContentVisiblity } = sidebar.actions;

export default sidebar.reducer;
