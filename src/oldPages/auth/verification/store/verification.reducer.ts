import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import {
  RESEND_VERIFICATION,
  RESEND_VERIFICATION_SUCCESS,
  RESEND_VERIFICATION_FAILURE,
  RESET_RESEND_VERIFICATION_EMAIL,
} from "./verification.actions";
import { Verification } from "./verification.types";

export const initialState: Verification = {
  hasResentVerification: false,
  isFetching: false,
  error: null,
};

const verification = (state = initialState, action: FluxStandardAction) => {
  switch (action.type) {
    case RESEND_VERIFICATION:
      return {
        ...state,
        isFetching: true,
        error: null,
      };

    case RESEND_VERIFICATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasResentVerification: true,
      };

    case RESEND_VERIFICATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };

    case RESET_RESEND_VERIFICATION_EMAIL:
      return {
        ...state,
        hasResentVerification: false,
        error: null,
      };

    default:
      return state;
  }
};

export default verification;
