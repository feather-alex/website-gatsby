import { Cart, PromoState } from "./cart.types";
import { v1 } from "uuid";
import {
  RESET_CART,
  UPDATE_CART_ITEMS,
  UPDATE_UNAVAILABLE_ITEMS,
  GET_UNAVAILABLE_PRODUCTS_REQUEST,
  GET_UNAVAILABLE_PRODUCTS_SUCCESS,
  GET_UNAVAILABLE_PRODUCTS_FAILURE,
  CartActions,
  GET_PROMO_REQUEST,
  GET_PROMO_SUCCESS,
  GET_PROMO_FAILURE,
  RESET_PROMO,
  GET_RECOMMENDATIONS_SUCCESS,
  GET_RECOMMENDATIONS_REQUEST,
  GET_RECOMMENDATIONS_FAILURE,
} from "./cart.actions";

export const initialState: Cart = {
  promo: null,
  promoError: null,
  promoState: PromoState.EMPTY,
  items: [],
  unavailableItems: [],
  isFetching: false,
  error: null,
  uuid: v1(),
  recommendations: [],
  isRecommendationsFetching: false,
  recommendationsError: null,
};

const cart = (state: Cart = initialState, action: CartActions): Cart => {
  switch (action.type) {
    case UPDATE_CART_ITEMS:
      return {
        ...state,
        items: action.payload.items,
      };

    case UPDATE_UNAVAILABLE_ITEMS:
      return {
        ...state,
        unavailableItems: action.payload.updatedUnavailableItems,
      };

    case GET_UNAVAILABLE_PRODUCTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case GET_UNAVAILABLE_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        unavailableItems: action.payload.unavailableItems,
      };

    case GET_UNAVAILABLE_PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };

    case RESET_CART:
      return {
        ...initialState,
        uuid: v1(),
      };

    case GET_PROMO_REQUEST:
      return {
        ...state,
        promoState: PromoState.FETCHING,
      };

    case GET_PROMO_SUCCESS:
      return {
        ...state,
        promo: action.payload.promoInfo,
        promoState: PromoState.VALID,
      };

    case GET_PROMO_FAILURE:
      return {
        ...state,
        promo: null,
        promoError: action.payload.error,
        promoState: PromoState.INVALID,
      };

    case RESET_PROMO:
      return {
        ...state,
        promo: null,
        promoError: null,
        promoState: PromoState.EMPTY,
      };

    case GET_RECOMMENDATIONS_REQUEST:
      return {
        ...state,
        recommendations: [],
        isRecommendationsFetching: true,
      };

    case GET_RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        recommendations: action.payload.recommendations,
        isRecommendationsFetching: false,
        recommendationsError: null,
      };

    case GET_RECOMMENDATIONS_FAILURE:
      return {
        ...state,
        recommendations: [],
        isRecommendationsFetching: false,
        recommendationsError: action.payload.error,
      };

    default:
      return state;
  }
};

export default cart;
