import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  RESET_HAS_REGISTERED,
  SET_REGISTER_EMAIL,
} from "./register.actions";
import { Register } from "./register.types";

export const initialState: Register = {
  email: "",
  hasRegistered: false,
  isFetching: false,
  error: null,
};

const register = (state = initialState, action: FluxStandardAction) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
        email: action.payload.credentials.email,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasRegistered: true,
        error: null,
      };

    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasRegistered: false,
        error: action.payload.error,
      };

    case RESET_HAS_REGISTERED:
      return {
        ...state,
        hasRegistered: false,
        error: null,
      };

    case SET_REGISTER_EMAIL:
      return {
        ...state,
        email: action.payload.email,
        hasRegistered: false,
        isFetching: false,
        error: null,
      };

    default:
      return state;
  }
};

export default register;
