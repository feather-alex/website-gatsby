import { State as GlobalState } from '../../../types/ReduxState';
import { createSelector } from 'reselect';

export const getGenerateNewStripeToken = ({ checkout }: GlobalState) => checkout.generateNewStripeToken;
export const getIsPlacingOrder = ({ checkout }: GlobalState) => checkout.isPlacingOrder;
export const getIsSubmittingDeposit = ({ checkout }: GlobalState) => checkout.isSubmittingDeposit;

export const getCardError = ({ checkout }: GlobalState) => checkout.cardError;
export const getItemsError = ({ checkout }: GlobalState) => checkout.itemsError;
export const getServerError = ({ checkout }: GlobalState) => checkout.serverError;
export const getDepositError = ({ checkout }: GlobalState) => checkout.depositError;
export const getMaxTCVError = ({ checkout }: GlobalState) => checkout.maxTCVError;
export const getMaxTCVAmount = createSelector(getMaxTCVError, (maxTCVError) => {
  return maxTCVError ? maxTCVError.maxTCV : null;
});

export const getIsSSNNotFound = ({ checkout }: GlobalState) => checkout.isSSNNotFound;
export const getIsCreditNotFound = ({ checkout }: GlobalState) => checkout.isCreditNotFound;
export const getIsSSNNotValid = ({ checkout }: GlobalState) => checkout.isSSNNotValid;
export const getServerSideSSNError = createSelector(getIsSSNNotValid, (isSSNNotValid) =>
  isSSNNotValid ? 'Invalid SSN Format. Please make sure your number is accurate and contains 9 digits' : undefined
);

export const getIsFetchingAmount = ({ checkout }: GlobalState) => checkout.isFetchingAmount;
export const getAmountError = ({ checkout }: GlobalState) => checkout.amountError;
export const getTaxDueNow = ({ checkout }: GlobalState) => checkout.taxDueNow;
export const getDeliveryFee = ({ checkout }: GlobalState) => checkout.deliveryFee;
export const getMonthlyTotal = ({ checkout }: GlobalState) => checkout.monthlyTotal;
export const getMonthlyTax = ({ checkout }: GlobalState) => checkout.monthlyTax;
export const getDueNow = ({ checkout }: GlobalState) => checkout.dueNow;
export const getMembershipFee = ({ checkout }: GlobalState) => checkout.membershipFee;
export const getDepositAmount = ({ checkout }: GlobalState) => checkout.depositAmount;
export const getOrderTCV = ({ checkout }: GlobalState) => checkout.orderTCV;

export const getCustomerInfo = ({ checkout }: GlobalState) => checkout.customerInfo;
export const getDeliveryInfo = ({ checkout }: GlobalState) => checkout.deliveryInfo;
export const getBillingAddressInfo = ({ checkout }: GlobalState) => checkout.billingAddressInfo;
export const getSSNInfo = ({ checkout }: GlobalState) => checkout.ssnInfo;
export const getCheckoutStep = ({ checkout }: GlobalState) => checkout.step;
export const getIsDeliverySameAsBilling = ({ checkout }: GlobalState) => checkout.isDeliverySameAsBilling;
