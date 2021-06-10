import { FluxStandardAction, ActionCreator } from '../../../types/FluxStandardActions';
import { CartItem, ProductIdentifiers, ProductRecommendation, PromoInfo } from './cart.types';
import { APIError } from '../../../types/ReduxState';
import { DeliveryAreaIdentifier, MembershipState } from '../../../app/store/plan/plan.types';

export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export const UPDATE_CART_ITEMS = 'UPDATE_CART_ITEMS';
export const GET_RECOMMENDATIONS_REQUEST = 'GET_RECOMMENDATIONS_REQUEST';
export const GET_RECOMMENDATIONS_FAILURE = 'GET_RECOMMENDATIONS_FAILURE';
export const GET_RECOMMENDATIONS_SUCCESS = 'GET_RECOMMENDATIONS_SUCCESS';
export const UPDATE_UNAVAILABLE_ITEMS = 'UPDATE_UNAVAILABLE_ITEMS';
export const RESET_CART = 'RESET_CART';
export const NORMALIZE_CART_PRICES = 'NORMALIZE_CART_PRICES';
export const GET_UNAVAILABLE_PRODUCTS_REQUEST = 'GET_UNAVAILABLE_PRODUCTS_REQUEST';
export const GET_UNAVAILABLE_PRODUCTS_SUCCESS = 'GET_UNAVAILABLE_PRODUCTS_SUCCESS';
export const GET_UNAVAILABLE_PRODUCTS_FAILURE = 'GET_UNAVAILABLE_PRODUCTS_FAILURE';
export const GET_PROMO_REQUEST = 'GET_PROMO_REQUEST';
export const GET_PROMO_SUCCESS = 'GET_PROMO_SUCCESS';
export const GET_PROMO_FAILURE = 'GET_PROMO_FAILURE';
export const RESET_PROMO = 'RESET_PROMO';

export type AddToCartAction = FluxStandardAction<typeof ADD_ITEM_TO_CART, CartItem>;
export type RemoveFromCartAction = FluxStandardAction<typeof REMOVE_ITEM_FROM_CART, CartItem>;
export type UpdateCartItemsAction = FluxStandardAction<typeof UPDATE_CART_ITEMS, { items: CartItem[] }>;
export type NormalizeCartAction = FluxStandardAction<
  typeof NORMALIZE_CART_PRICES,
  {
    membershipState: MembershipState;
  }
>;

export type GetUnavailableProductsRequestAction = FluxStandardAction<typeof GET_UNAVAILABLE_PRODUCTS_REQUEST>;
export type GetPromoRequestAction = FluxStandardAction<
  typeof GET_PROMO_REQUEST,
  {
    promo: string | null;
    rentalLength: number;
    subTotal: number;
    deliveryAreaIdentifier: DeliveryAreaIdentifier;
  }
>;

export type GetRecommendationRequestAction = FluxStandardAction<typeof GET_RECOMMENDATIONS_REQUEST>;

export type CartActions =
  | AddToCartAction
  | RemoveFromCartAction
  | UpdateCartItemsAction
  | FluxStandardAction<
      typeof UPDATE_UNAVAILABLE_ITEMS,
      {
        updatedUnavailableItems: ProductIdentifiers[];
      }
    >
  | NormalizeCartAction
  | FluxStandardAction<typeof RESET_CART, undefined>
  | GetUnavailableProductsRequestAction
  | FluxStandardAction<typeof GET_UNAVAILABLE_PRODUCTS_SUCCESS, { unavailableItems: ProductIdentifiers[] }>
  | FluxStandardAction<typeof GET_UNAVAILABLE_PRODUCTS_FAILURE, { error: APIError }>
  | GetPromoRequestAction
  | FluxStandardAction<typeof GET_PROMO_SUCCESS, { promoInfo: PromoInfo }>
  | FluxStandardAction<typeof GET_PROMO_FAILURE, { error: APIError }>
  | FluxStandardAction<typeof RESET_PROMO, undefined>
  | GetRecommendationRequestAction
  | FluxStandardAction<typeof GET_RECOMMENDATIONS_SUCCESS, { recommendations: ProductRecommendation[] }>
  | FluxStandardAction<typeof GET_RECOMMENDATIONS_FAILURE, { error: APIError }>;

export type AddToCart = (item: CartItem) => CartActions;
export const addToCart: AddToCart = (item: CartItem) => ({
  type: ADD_ITEM_TO_CART,
  payload: item
});

export type RemoveCartItem = (cartItem: CartItem) => CartActions;
export const removeCartItem: RemoveCartItem = (cartItem: CartItem) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: cartItem
});

export type UpdateCartItems = (items: CartItem[]) => CartActions;
export const updateCartItems: UpdateCartItems = (items: CartItem[]) => ({
  type: UPDATE_CART_ITEMS,
  payload: { items }
});

export type UpdateUnavailableItems = (updatedUnavailableItems: ProductIdentifiers[]) => CartActions;
export const updateUnavailableItems: UpdateUnavailableItems = (updatedUnavailableItems: ProductIdentifiers[]) => ({
  type: UPDATE_UNAVAILABLE_ITEMS,
  payload: { updatedUnavailableItems }
});

export type GetRecommendationsRequest = () => CartActions;
export type GetRecommendationsSuccess = (recommendations: ProductRecommendation[]) => CartActions;
export type GetRecommendationsFailure = (error: APIError) => CartActions;

export const getRecommendationsRequest: GetRecommendationsRequest = () => ({
  type: GET_RECOMMENDATIONS_REQUEST
});

export const getRecommendationsSuccess: GetRecommendationsSuccess = (recommendations: ProductRecommendation[]) => ({
  type: GET_RECOMMENDATIONS_SUCCESS,
  payload: { recommendations }
});

export const getRecommendationsFailure: GetRecommendationsFailure = (error: APIError) => ({
  type: GET_RECOMMENDATIONS_FAILURE,
  payload: { error }
});

export const resetCart: ActionCreator = () => ({ type: RESET_CART });

export type NormalizeCartPrices = (membershipState: MembershipState) => CartActions;
export const normalizeCartPrices: NormalizeCartPrices = (membershipState: MembershipState) => ({
  type: NORMALIZE_CART_PRICES,
  payload: { membershipState }
});

export type GetUnavailableProductsRequest = () => CartActions;
export type GetUnavailableProductsSuccess = (unavailableItems: ProductIdentifiers[]) => CartActions;
export type GetUnavailableProductsFailure = (error: APIError) => CartActions;

export const getUnavailableProductsRequest: GetUnavailableProductsRequest = () => ({
  type: GET_UNAVAILABLE_PRODUCTS_REQUEST
});

export const getUnavailableProductsSuccess: GetUnavailableProductsSuccess = (
  unavailableItems: ProductIdentifiers[]
) => ({
  type: GET_UNAVAILABLE_PRODUCTS_SUCCESS,
  payload: { unavailableItems }
});

export const getUnavailableProductsFailure: GetUnavailableProductsFailure = (error: APIError) => ({
  type: GET_UNAVAILABLE_PRODUCTS_FAILURE,
  payload: { error },
  error: true
});

interface PromoRequestOpts {
  promo: string | null;
  rentalLength: number;
  subTotal: number;
  deliveryAreaIdentifier: DeliveryAreaIdentifier;
}
export type GetPromoRequest = (opts: PromoRequestOpts) => CartActions;
export const getPromoRequest: GetPromoRequest = (opts: PromoRequestOpts) => ({
  type: GET_PROMO_REQUEST,
  payload: opts
});

export type GetPromoSuccess = (promoInfo: PromoInfo) => CartActions;
export const getPromoSuccess: GetPromoSuccess = (promoInfo: PromoInfo) => ({
  type: GET_PROMO_SUCCESS,
  payload: { promoInfo }
});

export type GetPromoFailure = (error: APIError) => CartActions;
export const getPromoFailure: GetPromoFailure = (error: APIError) => ({
  type: GET_PROMO_FAILURE,
  payload: { error },
  error: true
});

export const resetPromo = () => ({
  type: RESET_PROMO
});
