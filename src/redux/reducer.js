import { GET_USERS } from "./action";

const initialState = {
  users: [],
  usersCopy: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: // 'value' is not defined.
      return {
        ...state,
        users: action.payload,
      };
    default:
      return { ...state };
  }
};

export default reducer;