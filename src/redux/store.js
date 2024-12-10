import { configureStore } from "@reduxjs/toolkit";
import userReduce from "./usersSlice";
import productReduce from "./productsSlice";

const store = configureStore({
  reducer: {
    users: userReduce,
    products: productReduce,
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
