import { ActionCreator, FluxStandardAction } from '../../../types/FluxStandardActions';
import { APIError } from '../../../types/ReduxState';
import { ProductListRequestPayload, ProductListSuccessPayload } from './productList.types';

// Get ProductList -- Request
export const GET_PRODUCT_LIST_REQUEST = 'GET_PRODUCT_LIST_REQUEST';

export type GetProductListRequest = (payload: ProductListRequestPayload) => ProductListActions;

export const getProductListRequest: GetProductListRequest = (
  payload: ProductListRequestPayload
): ProductListActions => ({
  type: GET_PRODUCT_LIST_REQUEST,
  payload
});

// Get ProductList -- Success
export const GET_PRODUCT_LIST_SUCCESS = 'GET_PRODUCT_LIST_SUCCESS';

export type GetProductListSuccess = (payload: ProductListSuccessPayload) => ProductListActions;

export const getProductListSuccess: GetProductListSuccess = (
  payload: ProductListSuccessPayload
): ProductListActions => ({
  type: GET_PRODUCT_LIST_SUCCESS,
  payload
});

// Get ProductList -- Failure
export const GET_PRODUCT_LIST_FAILURE = 'GET_PRODUCT_LIST_FAILURE';

export type GetProductListFailure = (error: APIError) => ProductListActions;

export const getProductListFailure: GetProductListFailure = (error: APIError): ProductListActions => ({
  type: GET_PRODUCT_LIST_FAILURE,
  payload: error,
  error: true
});

// Reset ProductList
export const RESET_PRODUCT_LIST = 'RESET_PRODUCT_LIST';

export const resetProductList: ActionCreator<ProductListActions> = () => ({
  type: RESET_PRODUCT_LIST
});

export type GetProductListRequestAction = FluxStandardAction<
  typeof GET_PRODUCT_LIST_REQUEST,
  ProductListRequestPayload
>;

export type ProductListActions =
  | FluxStandardAction<typeof GET_PRODUCT_LIST_FAILURE, APIError>
  | FluxStandardAction<typeof RESET_PRODUCT_LIST, undefined>
  | GetProductListRequestAction
  | FluxStandardAction<typeof GET_PRODUCT_LIST_SUCCESS, ProductListSuccessPayload>;
