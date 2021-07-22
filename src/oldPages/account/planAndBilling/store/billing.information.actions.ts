import {
  FluxStandardAction,
  ActionCreator,
} from "../../../../types/FluxStandardActions";
import { APIError } from "../../../../types/ReduxState";
import {
  BillingResource,
  BillingSourcesResource,
} from "./billing.information.types";

// ==================== Payment Profile ====================
export const GET_PAYMENT_PROFILE_REQUEST = "GET_PAYMENT_PROFILE_REQUEST";
export const GET_PAYMENT_PROFILE_SUCCESS = "GET_PAYMENT_PROFILE_SUCCESS";
export const GET_PAYMENT_PROFILE_FAILURE = "GET_PAYMENT_PROFILE_FAILURE";
export type GET_PAYMENT_PROFILE_REQUEST = typeof GET_PAYMENT_PROFILE_REQUEST;
export type GET_PAYMENT_PROFILE_SUCCESS = typeof GET_PAYMENT_PROFILE_SUCCESS;
export type GET_PAYMENT_PROFILE_FAILURE = typeof GET_PAYMENT_PROFILE_FAILURE;

export type GetPaymentProfileSuccess = (
  paymentProfile: BillingSourcesResource
) => FluxStandardAction;
export type GetPaymentProfileFailure = (error: APIError) => FluxStandardAction;

// Get Billing Information
export const getPaymentProfileRequest: ActionCreator = () => ({
  type: GET_PAYMENT_PROFILE_REQUEST,
});

export const getPaymentProfileSuccess: GetPaymentProfileSuccess = (
  paymentProfile: BillingSourcesResource
) => ({
  type: GET_PAYMENT_PROFILE_SUCCESS,
  payload: paymentProfile,
});

export const getPaymentProfileFailure: GetPaymentProfileFailure = (
  error: APIError
) => ({
  type: GET_PAYMENT_PROFILE_FAILURE,
  payload: error,
  error: true,
});

// ===================== Add a new card =====================
export const ADD_NEW_BILLING_CARD_REQUEST = "ADD_NEW_BILLING_CARD_REQUEST";
export const ADD_NEW_BILLING_CARD_FAILURE = "ADD_NEW_BILLING_CARD_FAILURE";

export type AddBillingCardRequest = (
  sourceId: string,
  isPrimary: boolean
) => FluxStandardAction;
export type AddBillingCardSuccess = (
  billingInformation: BillingResource
) => FluxStandardAction;
export type AddBillingCardFailure = (error: APIError) => FluxStandardAction;

export const addBillingCardRequest: AddBillingCardRequest = (
  sourceId: string,
  isPrimary: boolean
) => ({
  type: ADD_NEW_BILLING_CARD_REQUEST,
  payload: { sourceId, isPrimary },
});

export const addBillingCardFailure: AddBillingCardFailure = (
  error: APIError
) => ({
  type: ADD_NEW_BILLING_CARD_FAILURE,
  payload: error,
  error: true,
});

// ===================== Set default card =====================
export const SET_PRIMARY_CARD_REQUEST = "SET_PRIMARY_CARD_REQUEST";
export const SET_PRIMARY_CARD_FAILURE = "SET_PRIMARY_CARD_FAILURE";

export type SetPrimaryCardRequest = (token: string) => FluxStandardAction;
export type SetPrimaryCardSuccess = (
  paymentProfile: BillingSourcesResource
) => FluxStandardAction;
export type SetPrimaryCardFailure = (error: APIError) => FluxStandardAction;

export const setPrimaryCardRequest: SetPrimaryCardRequest = (
  token: string
) => ({
  type: SET_PRIMARY_CARD_REQUEST,
  payload: { token },
});

export const setPrimaryCardFailure: SetPrimaryCardFailure = (
  error: APIError
) => ({
  type: SET_PRIMARY_CARD_FAILURE,
  payload: error,
  error: true,
});

// ===================== Remove card =====================
export const REMOVE_BILLING_CARD_REQUEST = "REMOVE_BILLING_CARD_REQUEST";
export const REMOVE_BILLING_CARD_FAILURE = "REMOVE_BILLING_CARD_FAILURE";

export type RemoveBillingCardRequest = (token: string) => FluxStandardAction;
export type RemoveBillingCardFailure = (error: APIError) => FluxStandardAction;

export const removeBillingCardRequest: RemoveBillingCardRequest = (
  token: string
) => ({
  type: REMOVE_BILLING_CARD_REQUEST,
  payload: { token },
});

export const removeBillingCardFailure: RemoveBillingCardFailure = (
  error: APIError
) => ({
  type: REMOVE_BILLING_CARD_FAILURE,
  payload: error,
  error: true,
});
