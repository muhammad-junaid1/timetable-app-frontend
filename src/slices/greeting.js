import { createSlice } from "@reduxjs/toolkit";

const greetingSlice = createSlice({
    initialState: "", 
    name: "greeting", 
    reducers: {
        setGreeting: (state, action) => {
            return action.payload;
        }
    },
});

export const {setGreeting} = greetingSlice.actions;

export default greetingSlice.reducer;