import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import { ChangePassword } from './change.password.types';
import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  RESET_IS_PASSWORD_UPDATED
} from './change.password.actions';

export const initialState: ChangePassword = {
  error: null,
  isFetching: false,
  isPasswordUpdated: false
};

const changePassword = (state = initialState, action: FluxStandardAction) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isPasswordUpdated: true
      };

    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isFetching: false,
        isPasswordUpdated: false,
        error: action.payload.error
      };

    case RESET_IS_PASSWORD_UPDATED:
      return {
        ...state,
        isPasswordUpdated: false,
        error: null
      };

    default:
      return state;
  }
};

export default changePassword;
