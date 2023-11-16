import { configureStore } from "@reduxjs/toolkit";
import greetingReducer from "./slices/greeting";
import weatherReducer from "./slices/weather";

export default configureStore({
    reducer: {
        greeting: greetingReducer, 
        weather: weatherReducer
    }
})