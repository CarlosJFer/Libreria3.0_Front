import { configureStore } from "@reduxjs/toolkit"; // Importación corregida
import reducer from "./reducer";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true, // Nota: la clave correcta es "devTools", no "devTool"
});

export default store;
