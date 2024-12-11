import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    getProducts: (state, action) => {
      return action.payload; // Sobrescribe el estado con la lista de productos
    },
    createProduct: (state, action) => {
      state.push(action.payload); // Agrega un nuevo producto
    },
    deleteProduct: (state, action) => {
      return state.filter((product) => product._id !== action.payload); // Filtra el producto eliminado
    },
    updateProduct: (state, action) => {
      const index = state.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { getProducts, createProduct, deleteProduct, updateProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
