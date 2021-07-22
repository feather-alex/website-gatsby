import {
  ProductPairingsRequestPayload,
  ProductBestsellersRequestPayload,
} from "./productPairings.types";
import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import { APIError } from "../../../../types/ReduxState";
import {
  FullProductDetails,
  ProductForListing,
} from "../../../../types/Product";

export const GET_PRODUCT_PAIRINGS_REQUEST = "GET_PRODUCT_PAIRINGS_REQUEST";
export type GetProductPairingsRequest = (
  payload: ProductPairingsRequestPayload
) => FluxStandardAction;
export const getProductPairingsRequest: GetProductPairingsRequest = (
  payload: ProductPairingsRequestPayload
) => ({
  type: GET_PRODUCT_PAIRINGS_REQUEST,
  payload,
});

export const GET_PRODUCT_PAIRINGS_SUCCESS = "GET_PRODUCT_PAIRINGS_SUCCESS";
export type GetProductPairingsSuccess = (
  payload: ProductForListing[]
) => FluxStandardAction;
export const getProductPairingsSuccess: GetProductPairingsSuccess = (
  payload: ProductForListing[]
) => ({
  type: GET_PRODUCT_PAIRINGS_SUCCESS,
  payload,
});

export const GET_PRODUCT_PAIRINGS_FAILURE = "GET_PRODUCT_PAIRINGS_FAILURE";
export type GetProductPairingsFailure = (error: APIError) => FluxStandardAction;
export const getProductPairingsFailure: GetProductPairingsFailure = (
  error: APIError
) => ({
  type: GET_PRODUCT_PAIRINGS_FAILURE,
  payload: error,
  error: true,
});

// bestsellers
export const GET_PRODUCT_BESTSELLERS_REQUEST =
  "GET_PRODUCT_BESTSELLERS_REQUEST";
export type GetProductBestsellersRequest = (
  payload: ProductBestsellersRequestPayload
) => FluxStandardAction;
export const getProductBestsellersRequest: GetProductBestsellersRequest = (
  payload: ProductBestsellersRequestPayload
) => ({
  type: GET_PRODUCT_BESTSELLERS_REQUEST,
  payload,
});

export const GET_PRODUCT_BESTSELLERS_SUCCESS =
  "GET_PRODUCT_BESTSELLERS_SUCCESS";
export type GetProductBestsellersSuccess = (
  payload: FullProductDetails[]
) => FluxStandardAction;
export const getProductBestsellersSuccess: GetProductBestsellersSuccess = (
  payload: FullProductDetails[]
) => ({
  type: GET_PRODUCT_BESTSELLERS_SUCCESS,
  payload,
});

export const GET_PRODUCT_BESTSELLERS_FAILURE =
  "GET_PRODUCT_BESTSELLERS_FAILURE";
export type GetProductBestsellersFailure = (
  error: APIError
) => FluxStandardAction;
export const getProductBestsellersFailure: GetProductBestsellersFailure = (
  error: APIError
) => ({
  type: GET_PRODUCT_BESTSELLERS_FAILURE,
  payload: error,
  error: true,
});
