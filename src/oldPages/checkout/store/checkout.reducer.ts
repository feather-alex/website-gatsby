import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  processCheckout,
  processCheckoutAmounts,
  resetErrorsStateValues,
  checkoutStepCompleted,
  resetCheckoutForms,
  updateSSNInfo,
  changeCheckoutStep,
  toggleDeliverySameAsBilling,
  depositRequest
} from './checkout.actions';
import {
  CheckoutState,
  ItemUnavailableError,
  CheckoutErrors,
  StripeErrorCodes,
  UIErrorMessages,
  AmountsSuccessPayload,
  CheckoutStateStep,
  CheckoutStep,
  ChangeStepPayload
} from './checkout.types';
import { APIError } from '../../../api/error';
import { CheckoutFormDataPayload, SSNInfoFields } from './checkoutForms.types';

export const initialState: CheckoutState = {
  isPlacingOrder: false,
  isSubmittingDeposit: false,
  isSSNNotValid: false,
  isSSNNotFound: false,
  isCreditNotFound: false,
  itemsError: null,
  serverError: null,
  maxTCVError: null,
  depositError: null,
  cardError: { error: null },
  generateNewStripeToken: false,
  isFetchingAmount: false,
  amountError: null,
  taxDueNow: 0,
  deliveryFee: 0,
  monthlyTotal: 0,
  monthlyTax: 0,
  dueNow: 0,
  membershipFee: 0,
  depositAmount: 0,
  orderTCV: 0,
  step: CheckoutStep.CustomerInfo,
  customerInfo: {
    firstName: '',
    lastName: '',
    persona: null,
    email: '',
    company: ''
  },
  deliveryInfo: {
    streetAddress: '',
    apt: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    googleDeliveryStreetAddress: ''
  },
  billingAddressInfo: {
    billingStreetAddress: '',
    billingApt: '',
    billingCity: '',
    billingState: '',
    billingPostalCode: '',
    googleBillingStreetAddress: ''
  },
  ssnInfo: {
    ssn: '',
    legalFirstName: '',
    legalLastName: ''
  },
  isDeliverySameAsBilling: true
};

export default createReducer(initialState, {
  [processCheckout.request.type](state: CheckoutState) {
    state.isPlacingOrder = true;
    state.generateNewStripeToken = false;
    state.cardError = { error: null };
    state.serverError = null;
    state.itemsError = null;
  },

  [processCheckout.success.type](state: CheckoutState) {
    state.isPlacingOrder = false;
    state.isSSNNotValid = false;
    state.isSSNNotFound = false;
    state.isCreditNotFound = false;
    state.itemsError = null;
    state.serverError = null;
    state.maxTCVError = null;
    state.depositError = null;
    state.cardError = { error: null };
  },

  [processCheckout.failure.type](state: CheckoutState, { payload: error }: PayloadAction<APIError>) {
    state.isPlacingOrder = false;
    // Encountered an error while placing an order?
    // Let's replace that old Stripe token!
    state.generateNewStripeToken = true;

    if (error.status === 400 && typeof error.body === 'object' && error.body && error.body['data']) {
      const errorData = error.body['data'];
      if (errorData.type && errorData.type === CheckoutErrors.StripeCardError) {
        switch (errorData.code) {
          case StripeErrorCodes.InvalidExpiryYear:
          case StripeErrorCodes.InvalidExpiryMonth:
            state.cardError = {
              error: UIErrorMessages.InvalidExpirationDate
            };
            break;
          case StripeErrorCodes.InvalidCVC:
          case StripeErrorCodes.IncorrectCVC:
            state.cardError = {
              error: UIErrorMessages.InvalidCVC
            };
            break;
          case StripeErrorCodes.IncorrectNumber:
            state.cardError = {
              error: UIErrorMessages.InvalidCreditCardNumber
            };
            break;
          case StripeErrorCodes.IncorrectZip:
            state.cardError = {
              error: UIErrorMessages.InvalidBillingZipCode
            };
            break;
          case StripeErrorCodes.CardDeclined:
            state.cardError = {
              error: UIErrorMessages.CardDeclined
            };
            break;
          case StripeErrorCodes.InsufficientFunds:
            state.cardError = {
              error: UIErrorMessages.InsufficientFunds
            };
            break;
          case StripeErrorCodes.ProcessingError:
            state.cardError = {
              error: UIErrorMessages.GenericError
            };
            break;
          case StripeErrorCodes.ExpiredCard:
            state.cardError = {
              error: UIErrorMessages.ExpiredCard
            };
            break;
          case StripeErrorCodes.InvalidFunding:
            state.cardError = {
              error: UIErrorMessages.InvalidFunding
            };
            break;
          case StripeErrorCodes.NoToken:
            state.cardError = {
              error: UIErrorMessages.CardTokenError
            };
            break;
          default:
            state.cardError = {
              error: UIErrorMessages.GenericError
            };
            break;
        }
      }
      // handle out of stock item(s) error
      else if (errorData.items && errorData.items.length) {
        state.isSSNNotValid = false;
        state.isCreditNotFound = false;
        state.isSSNNotFound = false;
        state.itemsError = errorData.items as ItemUnavailableError[];
      } else {
        switch (errorData.message) {
          case CheckoutErrors.CustomerNotApproved: {
            state.isSSNNotValid = false;
            state.isSSNNotFound = false;
            state.isCreditNotFound = false;
            state.maxTCVError = null;
            break;
          }
          case CheckoutErrors.OFACCheckFailed: {
            state.isSSNNotValid = false;
            state.isSSNNotFound = false;
            state.isCreditNotFound = false;
            state.maxTCVError = null;
            break;
          }
          case CheckoutErrors.AdditionalInformationRequired: {
            state.isCreditNotFound = true;
            state.isSSNNotFound = false;
            state.isSSNNotValid = false;
            state.maxTCVError = null;
            break;
          }
          case CheckoutErrors.CreditReportNotFound: {
            state.isSSNNotFound = true;
            state.isCreditNotFound = false;
            state.isSSNNotValid = false;
            state.maxTCVError = null;
            break;
          }
          case CheckoutErrors.InvalidSSN: {
            state.isSSNNotValid = true;
            state.isSSNNotFound = false;
            state.isCreditNotFound = false;
            state.maxTCVError = null;
            break;
          }
          case CheckoutErrors.MaxTCVError: {
            state.maxTCVError = {
              maxTCV: errorData.maxTCV,
              eligibleForDeposit: errorData.eligibleForDeposit
            };
            state.isSSNNotValid = false;
            state.isSSNNotFound = false;
            state.isCreditNotFound = false;
            break;
          }
          // if we error out for any other reason, just show server error
          default: {
            state.isSSNNotValid = false;
            state.isSSNNotFound = false;
            state.isCreditNotFound = false;
            state.maxTCVError = null;
            state.serverError = error;
            break;
          }
        }
      }
    } else {
      state.isSSNNotValid = false;
      state.isSSNNotFound = false;
      state.isCreditNotFound = false;
      state.serverError = error;
    }
  },

  [depositRequest.request.type](state: CheckoutState) {
    state.isSubmittingDeposit = true;
    state.depositError = null;
  },

  [depositRequest.success.type](state: CheckoutState) {
    state.isSubmittingDeposit = false;
    state.depositError = null;
  },

  [depositRequest.failure.type](state: CheckoutState, { payload: error }: PayloadAction<APIError>) {
    state.isSubmittingDeposit = false;
    state.depositError = error;
  },

  [resetErrorsStateValues.type](state: CheckoutState) {
    state.isSSNNotValid = false;
    state.isSSNNotFound = false;
    state.isCreditNotFound = false;
    state.serverError = null;
    state.itemsError = null;
    state.depositError = null;
    state.maxTCVError = null;
    state.cardError = { error: null };
  },

  [processCheckoutAmounts.request.type](state: CheckoutState) {
    state.isFetchingAmount = true;
    state.amountError = null;
  },

  [processCheckoutAmounts.success.type](state: CheckoutState, action: PayloadAction<AmountsSuccessPayload>) {
    state.isFetchingAmount = false;
    state.amountError = null;
    state.taxDueNow = action.payload.taxDueNow;
    state.deliveryFee = action.payload.deliveryFee;
    state.monthlyTotal = action.payload.totalDueMonthly;
    state.monthlyTax = action.payload.taxDueMonthly;
    state.dueNow = action.payload.totalDueNow;
    state.membershipFee = action.payload.monthlyFee;
    state.depositAmount = action.payload.depositAmount;
    state.orderTCV = action.payload.orderTCV;
  },

  [processCheckoutAmounts.failure.type](state: CheckoutState, action: PayloadAction<APIError>) {
    state.isFetchingAmount = false;
    state.amountError = action.payload;
  },

  [checkoutStepCompleted.type](state: CheckoutState, { payload }: PayloadAction<CheckoutFormDataPayload>) {
    switch (payload.step) {
      case CheckoutStateStep.CustomerInfo:
        state.customerInfo = payload.data;
        state.step = CheckoutStep.DeliveryInfo;
        break;

      case CheckoutStateStep.DeliveryInfo:
        state.deliveryInfo = payload.data;

        // If the customer is currently on Step 2 (Delivery Info),
        // and they indicated that their delivery address is the
        // same as their billing address, send them to Step 4 (Billing Info).
        if (state.isDeliverySameAsBilling) {
          (state.step = CheckoutStep.BillingInfo),
            (state.billingAddressInfo = {
              billingStreetAddress: payload.data.streetAddress,
              billingApt: payload.data.apt,
              billingPostalCode: payload.data.zipcode,
              billingCity: payload.data.city,
              billingState: payload.data.state,
              googleBillingStreetAddress: payload.data.googleDeliveryStreetAddress
            });

          // Otherwise, send them to the next step in the checkout progression (Billing Address).
        } else {
          state.step = CheckoutStep.BillingAddress;
        }
        break;

      case CheckoutStateStep.BillingAddress:
        state.billingAddressInfo = payload.data;
        state.step = CheckoutStep.BillingInfo;
        break;

      default:
        break;
    }
  },

  [updateSSNInfo.type](state: CheckoutState, action: PayloadAction<SSNInfoFields>) {
    state.ssnInfo = action.payload;
  },

  // reset all the checkout forms
  [resetCheckoutForms.type](state: CheckoutState) {
    state.customerInfo = initialState.customerInfo;
    state.deliveryInfo = initialState.deliveryInfo;
    state.billingAddressInfo = initialState.billingAddressInfo;
  },

  [changeCheckoutStep.type](state: CheckoutState, { payload }: PayloadAction<ChangeStepPayload>) {
    state.step = payload.step;
  },

  [toggleDeliverySameAsBilling.type](state: CheckoutState) {
    state.isDeliverySameAsBilling = !state.isDeliverySameAsBilling;
  }
});
