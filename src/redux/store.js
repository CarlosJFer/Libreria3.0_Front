import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import usersReducer from "./usersSlice";
import ordersReducer from "./orderSlice"; // Importa ordersReducer

const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
    orders: ordersReducer, // Añade ordersReducer
  },
});

export default store;

//PRIMER STORE SIN CONECTAR DIRECTAMENTE CON LA API
// import { configureStore } from "@reduxjs/toolkit"; // Importación corregida
// import reducer from "./reducer";
// import { thunk } from "redux-thunk";

// const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
//   devTools: true,
// });

// export default store;
