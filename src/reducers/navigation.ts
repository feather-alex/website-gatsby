import { Navigation, Action } from "../types/ReduxState";
import { PostalRequest } from "../types/Postal";
import {
  HANDLE_POSTAL_CODE,
  DISPLAY_WE_DELIVER,
  DISPLAY_NO_DELIVERY,
  UPDATE_DELIVERY_AREA,
  DISPLAY_POSTAL_INPUT,
  HANDLE_EMAIL_SUCCESS,
  TOGGLE_NAVIGATION_BANNER,
} from "../constants/actions";

export const initialState: Navigation = {
  postal: null,
  deliverToPostal: false,
  hasEnteredEmail: false,
  displayWeDeliver: false,
  displayNoDelivery: false,
  displayEmailInput: false,
  invalidPostalInput: false,
  displayPostalInput: false,
  customerCanCheckout: false,
  deliveryAreaIdentifier: null,
  displayInitialGreeting: true,
  displayNavigationBanner: false,
};

// ===== Reducers =====
const navigation = (state = initialState, action: Action) => {
  switch (action.type) {
    case TOGGLE_NAVIGATION_BANNER:
      return {
        ...state,
        displayNavigationBanner: action.response,
      };

    case HANDLE_POSTAL_CODE: {
      const {
        postal,
        identifier,
        weDeliver,
        inputError,
        showNavigationBanner,
      } = action.response;
      return {
        ...state,
        postal: inputError ? null : postal,
        deliverToPostal: weDeliver ? true : false,
        displayWeDeliver: weDeliver && !inputError ? true : false,
        displayNoDelivery: !weDeliver && !inputError ? true : false,
        displayPostalInput: inputError ? true : false,
        invalidPostalInput: inputError ? true : false,
        customerCanCheckout: postal && weDeliver && !inputError,
        deliveryAreaIdentifier: identifier && !inputError ? identifier : null,
        displayNavigationBanner: showNavigationBanner ? true : false,
      };
    }
    case HANDLE_EMAIL_SUCCESS:
      return {
        ...state,
        hasEnteredEmail: true,
      };

    case DISPLAY_POSTAL_INPUT:
      return {
        ...state,
        displayWeDeliver: false,
        displayNoDelivery: false,
        invalidPostalInput: false,
        displayPostalInput: action.response ? true : false,
        displayInitialGreeting: false,
        displayNavigationBanner: action.response ? true : false,
      };

    case DISPLAY_NO_DELIVERY:
      return {
        ...state,
        displayWeDeliver: false,
        displayNoDelivery: true,
        displayEmailInput: false,
        displayPostalInput: false,
        displayNavigationBanner: true,
      };

    case DISPLAY_WE_DELIVER:
      return {
        ...state,
        displayWeDeliver: true,
        displayNoDelivery: false,
        displayEmailInput: false,
        displayPostalInput: false,
        displayNavigationBanner: true,
      };

    case UPDATE_DELIVERY_AREA:
      return {
        ...state,
        deliveryAreaIdentifier: action.response.newDeliveryArea,
      };

    default:
      return state;
  }
};

export default navigation;

// ===== Actions =====
export interface DisplayNavigationBanner {
  (displayNavigationBanner: boolean): { type: string; response: boolean };
}
export const displayNavigationBanner: DisplayNavigationBanner = (
  display: boolean
) => ({
  type: TOGGLE_NAVIGATION_BANNER,
  response: display,
});

export interface HandleEmailSuccess {
  (): { type: string };
}
export const handleEmailSuccess: HandleEmailSuccess = () => ({
  type: HANDLE_EMAIL_SUCCESS,
});

export interface HandlePostalCode {
  (request: PostalRequest): {
    type: string;
    response: {
      postal: string;
      identifier: string | undefined;
      weDeliver: boolean;
      inputError?: boolean;
      showNavigationBanner?: boolean;
    };
  };
}
export const handlePostalCode: HandlePostalCode = (obj: PostalRequest) => ({
  type: HANDLE_POSTAL_CODE,
  response: obj,
});

export interface DisplayPostalInput {
  (displayInput: boolean): { type: string; response: boolean };
}
export const displayPostalInput: DisplayPostalInput = (
  displayInput: boolean
) => ({
  type: DISPLAY_POSTAL_INPUT,
  response: displayInput,
});

export interface DisplayNoDelivery {
  (): { type: string };
}
export const displayNoDelivery: DisplayNoDelivery = () => ({
  type: DISPLAY_NO_DELIVERY,
});

export interface DisplayWeDeliver {
  (): { type: string };
}
export const displayWeDeliver: DisplayWeDeliver = () => ({
  type: DISPLAY_WE_DELIVER,
});

export interface UpdateDeliveryArea {
  (newDeliveryArea: string): {
    type: string;
    response: { newDeliveryArea: string };
  };
}
export const updateDeliveryArea: UpdateDeliveryArea = (
  newDeliveryArea: string
) => ({
  type: UPDATE_DELIVERY_AREA,
  response: { newDeliveryArea },
});
