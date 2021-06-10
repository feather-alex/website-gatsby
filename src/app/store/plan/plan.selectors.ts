import { State as GlobalState } from '../../../types/ReduxState';
import { createSelector } from 'reselect';
import { MembershipState, MembershipStateDisplayName, DeliveryAreaIdentifier } from './plan.types';

export const getError = ({ plan }: GlobalState) => plan.error;
export const getIsFetching = ({ plan }: GlobalState) => plan.isFetching;
export const getCartMinimum = ({ plan }: GlobalState) => plan.cartMinimum;
export const getDeliveryFee = ({ plan }: GlobalState) => plan.deliveryFee;
export const getRentalLength = ({ plan }: GlobalState) => plan.rentalLength;
export const getDeliveryZipCode = ({ plan }: GlobalState) => plan.deliveryZipcode;
export const getIsInDeliveryZone = ({ plan }: GlobalState) => plan.isInDeliveryZone;
export const getMonthlyMembershipFee = ({ plan }: GlobalState) => plan.monthlyMembershipFee;
export const getMembershipState = ({ plan }: GlobalState) => plan.membershipState;
export const getDeliveryAreaIdentifier = ({ plan }: GlobalState) => plan.deliveryAreaIdentifier;
export const getIsEmailSubmitted = ({ plan }: GlobalState) => plan.isEmailSubmitted;

export const getSelectPlanButtonText = createSelector(
  getMembershipState,
  getIsInDeliveryZone,
  getDeliveryZipCode,
  (membershipState, isInDeliveryZone, deliveryZipCode) => {
    if (membershipState === MembershipState.NONE) {
      return 'Choose Plan';
    } else if (isInDeliveryZone === false) {
      return 'Outside delivery zone';
    } else {
      return `${MembershipStateDisplayName[membershipState]} : ${
        deliveryZipCode === null ? 'enter zip' : deliveryZipCode
      }`;
    }
  }
);

export const getIsPlanSet = createSelector(
  getMembershipState,
  getIsInDeliveryZone,
  (membershipState: MembershipState, deliveryZone: boolean) => {
    if (membershipState !== MembershipState.NONE) {
      return deliveryZone;
    } else {
      return false;
    }
  }
);

export const getDeliveryTimelineText = createSelector(
  getMembershipState,
  getDeliveryAreaIdentifier,
  (membershipState: MembershipState, deliveryAreaIdentifier: DeliveryAreaIdentifier) => {
    if (deliveryAreaIdentifier === DeliveryAreaIdentifier.DC) {
      return membershipState === MembershipState.MEMBER
        ? 'Free delivery & assembly - typically in 9-12 days'
        : 'Delivery & assembly in your area takes 9-12 days';
    } else {
      return membershipState === MembershipState.MEMBER
        ? 'Free delivery & assembly in as little as 7 days'
        : 'Delivery & assembly in as little as 7 days';
    }
  }
);
