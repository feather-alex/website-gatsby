import {
  CHANGE_MEMBERSHIP_SELECTION,
  ZIPCODE_SUBMIT_REQUEST,
  ZIPCODE_SUBMIT_SUCCESS,
  ZIPCODE_SUBMIT_FAILURE,
  RESET_ZIPCODE,
  RESET_PLAN,
  RESET_SELECTION,
  PlanActionTypes,
} from "./plan.actions";
import { Plan, MembershipState } from "./plan.types";
import { NEWSLETTER_SIGNUP_SUCCESS } from "../newsletter-signup/newsletter.signup.actions";

export const initialState: Plan = {
  cartMinimum: null,
  deliveryFee: null,
  rentalLength: null,
  membershipState: MembershipState.NONE,
  monthlyMembershipFee: null,
  deliveryZipcode: null,
  deliveryAreaIdentifier: null,
  isInDeliveryZone: null,
  isEmailSubmitted: false,
  isFetching: false,
  error: null,
};

const plan = (state = initialState, action: PlanActionTypes) => {
  switch (action.type) {
    case CHANGE_MEMBERSHIP_SELECTION: {
      const { membershipState } = action.payload;

      switch (membershipState) {
        case MembershipState.MEMBER: {
          return {
            ...state,
            membershipState: MembershipState.MEMBER,
            cartMinimum: 29,
            rentalLength: 12,
            deliveryFee: 0,
            monthlyMembershipFee: 19,
          };
        }
        case MembershipState.NON_MEMBER: {
          return {
            ...state,
            membershipState: MembershipState.NON_MEMBER,
            cartMinimum: 99,
            rentalLength: 3,
            deliveryFee: 99,
            monthlyMembershipFee: 0,
          };
        }
        case MembershipState.NONE:
        default: {
          return {
            ...state,
            membershipState: MembershipState.NONE,
            cartMinimum: null,
            rentalLength: null,
            deliveryFee: null,
            monthlyMembershipFee: null,
          };
        }
      }
    }

    case ZIPCODE_SUBMIT_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
        deliveryZipcode: action.payload.zipcode,
      };
    }

    case ZIPCODE_SUBMIT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        deliveryAreaIdentifier: action.payload.postalData.identifier,
        isInDeliveryZone:
          action.payload.postalData.identifier === null ? false : true,
      };
    }

    case ZIPCODE_SUBMIT_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
        isInDeliveryZone: false,
      };
    }

    case RESET_ZIPCODE: {
      return {
        ...state,
        deliveryZipcode: null,
        deliveryAreaIdentifier: null,
        isInDeliveryZone: null,
      };
    }

    case RESET_PLAN: {
      return {
        ...state,
        membershipState: MembershipState.NONE,
        cartMinimum: null,
        rentalLength: null,
        deliveryFee: null,
        monthlyMembershipFee: null,
      };
    }

    case RESET_SELECTION: {
      return {
        ...initialState,
      };
    }

    case NEWSLETTER_SIGNUP_SUCCESS:
      return {
        ...state,
        isEmailSubmitted: true,
      };

    default: {
      return state;
    }
  }
};

export default plan;
