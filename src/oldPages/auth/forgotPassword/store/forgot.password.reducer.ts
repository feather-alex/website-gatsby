import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_RESET_PASSWORD_SENT
} from './forgot.password.actions';
import { ForgotPassword } from './forgot.password.types';

export const initialState: ForgotPassword = {
  hasSentResetPasswordLink: false,
  error: null,
  isFetching: false,
  email: ''
};

const forgotPassword = (state = initialState, action: FluxStandardAction) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        email: action.payload.email.email,
        isFetching: true,
        error: null
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasSentResetPasswordLink: true,
        error: null
      };

    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error
      };

    case RESET_RESET_PASSWORD_SENT:
      return {
        ...state,
        hasSentResetPasswordLink: false,
        error: null
      };

    default:
      return state;
  }
};

export default forgotPassword;
