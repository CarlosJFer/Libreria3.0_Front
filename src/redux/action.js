import axios from "axios";

// Definimos una constante para el tipo de acción GET_USERS
export const GET_USERS = "GET_USERS";

// Creamos una acción llamada getUsers
export const getUsers = () => {
  // La acción retorna una función que usa dispatch, esto es gracias a redux-thunk
  return async function (dispatch) {
    // Hacemos una solicitud GET a la API para obtener usuarios y esperamos la respuesta
    const users = (await axios("https://api.escuelajs.co/api/v1/users")).data;

    // Una vez obtenemos los datos, despachamos una acción con el tipo GET_USERS
    // y pasamos los datos de los usuarios como payload
    dispatch({ type: GET_USERS, payload: users });
  };
};