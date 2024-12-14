import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    getOrders: (state, action) => {
      return action.payload; // Sobrescribe el estado con la lista de órdenes
    },
    createOrder: (state, action) => {
      state.push(action.payload); // Agrega una nueva orden
    },
    deleteOrder: (state, action) => {
      return state.filter((order) => order._id !== action.payload); // Filtra la orden eliminada
    },
    updateOrder: (state, action) => {
      const index = state.findIndex(
        (order) => order._id === action.payload._id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { getOrders, createOrder, deleteOrder, updateOrder } =
  ordersSlice.actions;
export default ordersSlice.reducer;
