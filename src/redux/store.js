import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import usersReducer from "./usersSlice";
import ordersReducer from "./orderSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
    orders: ordersReducer,
    cart: cartReducer,
  },
});

export default store;
