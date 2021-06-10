import { createAction } from '@reduxjs/toolkit';
import createRequestAction from '../../../utils/createRequestAction';
import {
  AmountsRequestPayload,
  AmountsSuccessPayload,
  ChangeStepPayload,
  CheckoutRequestPayload,
  CheckoutSuccessPayload,
  DepositRequestPayload
} from './checkout.types';
import { CheckoutFormDataPayload, SSNInfoFields } from './checkoutForms.types';
import { APIError } from '../../../api/error';

export const CHECKOUT = 'CHECKOUT';
export const processCheckout = createRequestAction<CheckoutRequestPayload, CheckoutSuccessPayload, APIError>(CHECKOUT);

export const RESET_ERRORS = 'RESET_ERRORS';
export const resetErrorsStateValues = createAction(RESET_ERRORS);

export const DEPOSIT_REQUEST = 'DEPOSIT_REQUEST';
export const depositRequest = createRequestAction<DepositRequestPayload, {}, APIError>(DEPOSIT_REQUEST);

export const CHECKOUT_AMOUNTS = 'AMOUNTS';
export const processCheckoutAmounts = createRequestAction<AmountsRequestPayload, AmountsSuccessPayload, APIError>(
  CHECKOUT_AMOUNTS
);

export const CHECKOUT_STEP_COMPLETED = 'CHECKOUT_STEP_COMPLETED';
export const checkoutStepCompleted = createAction<CheckoutFormDataPayload>(CHECKOUT_STEP_COMPLETED);

export const RESET_CHECKOUT_FORMS = 'RESET_CHECKOUT_FORMS';
export const resetCheckoutForms = createAction(RESET_CHECKOUT_FORMS);

export const SSN_INFO_UPDATE = 'SSN_INFO_UPDATE';
export const updateSSNInfo = createAction<SSNInfoFields>(SSN_INFO_UPDATE);

export const CHANGE_CHECKOUT_STEP = 'CHANGE_CHECKOUT_STEP';
export const changeCheckoutStep = createAction<ChangeStepPayload>(CHANGE_CHECKOUT_STEP);

export const TOGGLE_DELIVERY_SAME_AS_BILLING = 'TOGGLE_DELIVERY_SAME_AS_BILLING';
export const toggleDeliverySameAsBilling = createAction(TOGGLE_DELIVERY_SAME_AS_BILLING);
