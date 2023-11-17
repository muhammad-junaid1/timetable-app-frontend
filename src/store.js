import { configureStore } from "@reduxjs/toolkit";
import greetingReducer from "./slices/greeting";
import weatherReducer from "./slices/weather";
import sidebarVisibilityReducer from "./slices/sidebarVisibility";

export default configureStore({
    reducer: {
        greeting: greetingReducer, 
        weather: weatherReducer, 
        sidebarVisibility: sidebarVisibilityReducer
    }
})