import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    getUsers: (state, action) => {
      return action.payload; // Sobrescribe el estado con la lista de usuarios
    },
    createUser: (state, action) => {
      state.push(action.payload); // Agrega un nuevo usuario
    },
    deleteUser: (state, action) => {
      return state.filter((user) => user._id !== action.payload); // Filtra el usuario eliminado
    },
    updateUser: (state, action) => {
      const index = state.findIndex((user) => user._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { getUsers, createUser, deleteUser, updateUser } =
  usersSlice.actions;
export default usersSlice.reducer;
