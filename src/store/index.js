import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './slice/Uislice.js'
import authReducer from '../features/auth/authSlice.js'
import cartReducer from '../features/cart/cartSlice.js'

export const store = configureStore({
    reducer : {
        ui : uiReducer,
        auth : authReducer,
        cart : cartReducer
    }
})