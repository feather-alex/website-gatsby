import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGIN_RESET,
  DISMISS_WELCOME_MODAL,
  RESET_AUTHENTICATION
} from './login.actions';
import { Login } from './login.types';

export const initialState: Login = {
  email: '',
  name: '',
  isFirstLogin: false,
  hasViewedWelcomeModal: false,
  authenticated: false,
  isFetching: false,
  error: null
};

const login = (state = initialState, action: FluxStandardAction) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        email: action.payload.credentials.email,
        isFetching: true,
        error: null
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        isFirstLogin: action.payload.auth.isFirstLogin,
        name: action.payload.auth.firstName,
        authenticated: true
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error
      };

    case LOGIN_RESET:
      return {
        ...state,
        email: '',
        error: null
      };

    case LOGOUT_REQUEST:
    case RESET_AUTHENTICATION:
      return {
        ...initialState
      };

    case DISMISS_WELCOME_MODAL:
      return {
        ...state,
        hasViewedWelcomeModal: true
      };

    default:
      return state;
  }
};

export default login;
