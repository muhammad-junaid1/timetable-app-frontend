import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    initialState: "Guest", 
    name: "user", 
    reducers: {
        setName: (state, action) => {
            return action.payload;
        }
    },
});

export const {setName} = userSlice.actions;

export default userSlice.reducer;