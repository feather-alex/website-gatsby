import { SEND_INQUIRY_REQUEST, SEND_INQUIRY_SUCCESS, SEND_INQUIRY_FAILURE } from './contact.actions';
import { FluxStandardAction } from '../../../types/FluxStandardActions';
import { ContactState } from './contact.types';

export const initialState: ContactState = {
  isProccessingRequest: false,
  displaySuccessMessage: false,
  displayErrorMessage: false
};

const contactReducer = (state: ContactState = initialState, action: FluxStandardAction) => {
  switch (action.type) {
    case SEND_INQUIRY_REQUEST:
      return {
        ...state,
        isProccessingRequest: true
      };

    case SEND_INQUIRY_SUCCESS:
      return {
        ...state,
        isProccessingRequest: false,
        displaySuccessMessage: true
      };

    case SEND_INQUIRY_FAILURE:
      return {
        ...state,
        isProccessingRequest: false,
        displayErrorMessage: true
      };

    default:
      return state;
  }
};

export default contactReducer;
