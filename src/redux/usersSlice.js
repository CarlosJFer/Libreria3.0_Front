import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* Acción asíncrona para obtener datos del usuario
export const fetchUserData = createAsyncThunk(
  "users/fetchUserData",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/users`);
      if (!response.ok) throw new Error("Error al obtener los datos del usuario");
      const data = await response.json();
      return data; // Retorna los datos procesados
    } catch (error) {
      return rejectWithValue(error.message); // Maneja errores
    }
  }
);*/

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
  /*extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },*/
});

export const { getUsers, createUser, deleteUser, updateUser } =
  usersSlice.actions;
export default usersSlice.reducer;