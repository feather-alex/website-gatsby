import {
  NEWSLETTER_SIGNUP_REQUEST,
  NEWSLETTER_SIGNUP_SUCCESS,
  NEWSLETTER_SIGNUP_FAILURE,
  RESET_NEWSLETTER_SIGNUP,
} from "./newsletter.signup.actions";
import { FluxStandardAction } from "../../../types/FluxStandardActions";
import { NewsletterState } from "./newsletter.signup.types";

export const initialState: NewsletterState = {
  email: null,
  isFetching: false,
  error: null,
  displaySuccess: false,
};

const newsletter = (
  state: NewsletterState = initialState,
  action: FluxStandardAction
) => {
  switch (action.type) {
    case NEWSLETTER_SIGNUP_REQUEST: {
      return {
        ...state,
        isFetching: true,
        email: action.payload.requestData.email,
      };
    }

    case NEWSLETTER_SIGNUP_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        displaySuccess: true,
      };
    }

    case NEWSLETTER_SIGNUP_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
        displaySuccess: false,
      };
    }

    case RESET_NEWSLETTER_SIGNUP: {
      return {
        email: null,
        isFetching: false,
        error: null,
        displaySuccess: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default newsletter;
