import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./components/utils/userslice";

export default configureStore({
    reducer: {
        user: userReducer, 
    }
})