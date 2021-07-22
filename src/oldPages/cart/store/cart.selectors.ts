import { State as GlobalState } from "../../../types/ReduxState";
import { createSelector } from "reselect";
import { ProductIdentifiers, PromoType } from "./cart.types";
import {
  getRentalLength,
  getMonthlyMembershipFee,
  getDeliveryFee,
  getCartMinimum,
} from "../../../app/store/plan/plan.selectors";
import { calcSubTotal } from "../../../utils/cart";

export const getCartUuid = ({ cart }: GlobalState) => cart.uuid;
export const getCartItems = ({ cart }: GlobalState) => cart.items;
export const getNumberOfItemsInCart = ({ cart }: GlobalState) =>
  cart.items.length;

export const getUnavailableItems = ({ cart }: GlobalState) =>
  cart.unavailableItems;
export const getIsFetching = ({ cart }: GlobalState) => cart.isFetching;
export const getError = ({ cart }: GlobalState) => cart.error;

export const getPromo = ({ cart }: GlobalState) => cart.promo;
export const getPromoState = ({ cart }: GlobalState) => cart.promoState;
export const getPromoError = ({ cart }: GlobalState) => cart.promoError;
export const getRecommendations = ({ cart }: GlobalState) =>
  cart.recommendations;
export const getIsRecommendationsFetching = ({ cart }: GlobalState) =>
  cart.isRecommendationsFetching;
export const getRecommendationsError = ({ cart }: GlobalState) =>
  cart.recommendationsError;

export const getPromoDescription = createSelector(getPromo, (promo) => {
  if (!promo) {
    return "";
  }

  switch (promo.type) {
    case PromoType.Fixed: {
      return `$${promo.amount} off first month`;
    }
    case PromoType.Percentage: {
      if (promo.special) {
        return `${promo.amount}% above monthly`;
      }
      return `${promo.amount}% off monthly`;
    }
    default: {
      return "";
    }
  }
});

export const getCartSubtotal = createSelector(
  getCartItems,
  getRentalLength,
  (cartItems, rentalLength) => {
    return rentalLength !== null ? calcSubTotal(cartItems, rentalLength) : 0;
  }
);

export const getCartTotals = createSelector(
  getCartSubtotal,
  getMonthlyMembershipFee,
  getDeliveryFee,
  (subtotal, membershipFee, deliveryFee) => {
    const total =
      membershipFee !== null && deliveryFee !== null
        ? subtotal + membershipFee + deliveryFee
        : subtotal;

    return {
      subtotal,
      total,
    };
  }
);

export const getCartContainsUnavailableProducts = createSelector(
  getUnavailableItems,
  (unavailableItems: ProductIdentifiers[]) => !!unavailableItems.length
);

export const getIsCartMinimumMet = createSelector(
  getCartSubtotal,
  getCartMinimum,
  (subtotal, cartMinimum) => {
    return cartMinimum ? subtotal >= cartMinimum : false;
  }
);
