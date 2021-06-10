import { FluxStandardAction, ActionCreator } from '../../../types/FluxStandardActions';
import { FullPackageDetails } from '../../../types/Package';
import { ProductListResponse } from '../../../types/Product';
import { APIError } from '../../../types/ReduxState';

// Add Search Keyword
export const ADD_SEARCH_KEYWORD = 'ADD_SEARCH_KEYWORD';

export type AddKeyword = ({ keyword }: { keyword: string }) => FluxStandardAction;

export const addKeyword: AddKeyword = ({ keyword }) => ({
  type: ADD_SEARCH_KEYWORD,
  payload: { keyword }
});

// Get Search Products -- Request
export const GET_SEARCH_PRODUCTS_REQUEST = 'GET_SEARCH_PRODUCTS_REQUEST';

export const loadSearchProducts: ActionCreator = () => ({
  type: GET_SEARCH_PRODUCTS_REQUEST
});

// Get Search Products -- Success
export const GET_SEARCH_PRODUCTS_SUCCESS = 'GET_SEARCH_PRODUCTS_SUCCESS';

export type LoadSearchProductsSuccess = (payload: ProductListResponse) => FluxStandardAction;

export const loadSearchProductsSuccess: LoadSearchProductsSuccess = (payload: ProductListResponse) => ({
  type: GET_SEARCH_PRODUCTS_SUCCESS,
  payload
});

// Get Search Products -- Failure
export const GET_SEARCH_PRODUCTS_FAILURE = 'GET_SEARCH_PRODUCTS_FAILURE';

export type LoadSearchProductsFailure = (error: APIError) => FluxStandardAction;

export const loadSearchProductsFailure: LoadSearchProductsFailure = (error: APIError) => ({
  type: GET_SEARCH_PRODUCTS_FAILURE,
  payload: { error },
  error: true
});

// Get Search Packages -- Request
export const GET_SEARCH_PACKAGES_REQUEST = 'GET_SEARCH_PACKAGES_REQUEST';

export const loadSearchPackages: ActionCreator = () => ({
  type: GET_SEARCH_PACKAGES_REQUEST
});

// Get Search Packages -- Success
export const GET_SEARCH_PACKAGES_SUCCESS = 'GET_SEARCH_PACKAGES_SUCCESS';

export type LoadSearchPackagesSuccess = (payload: FullPackageDetails[]) => FluxStandardAction;

export const loadSearchPackagesSuccess: LoadSearchPackagesSuccess = (payload: FullPackageDetails[]) => ({
  type: GET_SEARCH_PACKAGES_SUCCESS,
  payload
});

// Get Search Packages -- Failure
export const GET_SEARCH_PACKAGES_FAILURE = 'GET_SEARCH_PACKAGES_FAILURE';

export type LoadSearchPackagesFailure = (error: APIError) => FluxStandardAction;

export const loadSearchPackagesFailure: LoadSearchPackagesFailure = (error: APIError) => ({
  type: GET_SEARCH_PACKAGES_FAILURE,
  payload: { error },
  error: true
});

// Reset Search
export const RESET_SEARCH = 'RESET_SEARCH';

export const resetSearch: ActionCreator = () => ({
  type: RESET_SEARCH
});
