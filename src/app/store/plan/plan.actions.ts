import { APIError } from '../../../types/ReduxState';
import { ZipcodeRequestResource, ZipcodeResponseResource, MembershipState } from './plan.types';
import { FluxStandardAction } from '../../../types/FluxStandardActions';
import { NEWSLETTER_SIGNUP_SUCCESS } from '../newsletter-signup/newsletter.signup.actions';

export const CHANGE_MEMBERSHIP_SELECTION = 'CHANGE_MEMBERSHIP_SELECTION';
export const ZIPCODE_SUBMIT_REQUEST = 'ZIPCODE_SUBMIT_REQUEST';
export const ZIPCODE_SUBMIT_SUCCESS = 'ZIPCODE_SUBMIT_SUCCESS';
export const ZIPCODE_SUBMIT_FAILURE = 'ZIPCODE_SUBMIT_FAILURE';
export const RESET_ZIPCODE = 'RESET_ZIPCODE';
export const RESET_PLAN = 'RESET_PLAN';
export const RESET_SELECTION = 'RESET_SELECTION';

export type PlanActionTypes =
  | FluxStandardAction<
      typeof CHANGE_MEMBERSHIP_SELECTION,
      {
        membershipState: MembershipState;
      }
    >
  | FluxStandardAction<
      typeof ZIPCODE_SUBMIT_REQUEST,
      {
        zipcode: string;
      }
    >
  | FluxStandardAction<
      typeof ZIPCODE_SUBMIT_SUCCESS,
      {
        postalData: ZipcodeResponseResource;
      }
    >
  | FluxStandardAction<
      typeof ZIPCODE_SUBMIT_FAILURE,
      {
        error: APIError;
      }
    >
  | FluxStandardAction<typeof RESET_ZIPCODE>
  | FluxStandardAction<typeof RESET_PLAN>
  | FluxStandardAction<typeof RESET_SELECTION>
  | FluxStandardAction<typeof NEWSLETTER_SIGNUP_SUCCESS>;

export type SelectMembership = (membershipState: MembershipState) => PlanActionTypes;

export const changeMembershipSelection: SelectMembership = (membershipState: MembershipState) => ({
  type: CHANGE_MEMBERSHIP_SELECTION,
  payload: { membershipState }
});

export type ZipcodeSubmit = (zipcodeRequest: ZipcodeRequestResource) => PlanActionTypes;
export type ZipcodeSubmitSuccess = (postalData: ZipcodeResponseResource) => PlanActionTypes;
export type ZipcodeSubmitFailure = (error: APIError) => PlanActionTypes;

export const zipcodeSubmit: ZipcodeSubmit = (zipcodeRequest: ZipcodeRequestResource) => ({
  type: ZIPCODE_SUBMIT_REQUEST,
  payload: zipcodeRequest
});

export const zipcodeSubmitSuccess: ZipcodeSubmitSuccess = (postalData: ZipcodeResponseResource) => ({
  type: ZIPCODE_SUBMIT_SUCCESS,
  payload: { postalData }
});

export const zipcodeSubmitFailure: ZipcodeSubmitFailure = (error: APIError) => ({
  type: ZIPCODE_SUBMIT_FAILURE,
  payload: { error }
});

export const resetZipcode = (): PlanActionTypes => ({
  type: RESET_ZIPCODE
});

export const resetPlan = (): PlanActionTypes => ({
  type: RESET_PLAN
});

export const resetSelection = (): PlanActionTypes => ({
  type: RESET_SELECTION
});
