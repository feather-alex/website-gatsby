import { ProductDetailsRequestPayload } from "./product.types";
import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import { FullProductDetails } from "../../../../types/Product";
import { APIError } from "../../../../types/ReduxState";

// Get Product(s) Details -- Request
export const GET_PRODUCT_DETAILS_REQUEST = "GET_PRODUCT_DETAILS_REQUEST";

export type GetProductDetailsRequest = (
  payload: ProductDetailsRequestPayload
) => FluxStandardAction;

export const getProductDetailsRequest: GetProductDetailsRequest = (
  payload: ProductDetailsRequestPayload
) => ({
  type: GET_PRODUCT_DETAILS_REQUEST,
  payload,
});

// Get Product(s) Details -- Success
export const GET_PRODUCT_DETAILS_SUCCESS = "GET_PRODUCT_DETAILS_SUCCESS";

export type GetProductDetailsSuccess = (
  payload: FullProductDetails | FullProductDetails[]
) => FluxStandardAction;

export const getProductDetailsSuccess: GetProductDetailsSuccess = (
  payload: FullProductDetails | FullProductDetails[]
) => ({
  type: GET_PRODUCT_DETAILS_SUCCESS,
  payload,
});

// Get Product(s) Details -- Failure
export const GET_PRODUCT_DETAILS_FAILURE = "GET_PRODUCT_DETAILS_FAILURE";

export type GetProductDetailsFailure = (error: APIError) => FluxStandardAction;

export const getProductDetailsFailure: GetProductDetailsFailure = (
  error: APIError
) => ({
  type: GET_PRODUCT_DETAILS_FAILURE,
  payload: error,
  error: true,
});
