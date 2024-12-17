import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import usersReducer from "./usersSlice";
import ordersReducer from "./orderSlice";
import cartReducer from "./cartSlice";
import authReducer from './authSlice';



const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
    orders: ordersReducer,
    cart: cartReducer,
    auth:authReducer,
  },
});

export default store;
