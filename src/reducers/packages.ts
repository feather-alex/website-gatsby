import {
  GET_PACKAGES_REQUEST,
  GET_PACKAGES_SUCCESS,
  GET_PACKAGES_FAILURE,
  RESET_PACKAGES,
} from "../constants/actions";
import { Entity, Action } from "../types/ReduxState";
import request, { QueryParam, RequestMethod } from "../api/request";
import { PackageForListing } from "../types/Package";

// ===== Reducers =====
export const initialState: Entity<PackageForListing> = {
  isFetching: true,
  error: null,
  data: [],
};

const packages = (
  state = initialState,
  action: Action
): Entity<PackageForListing> => {
  switch (action.type) {
    case GET_PACKAGES_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true,
      };

    case GET_PACKAGES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case GET_PACKAGES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        data: action.response,
      };

    case RESET_PACKAGES:
      return initialState;

    default:
      return state;
  }
};

export default packages;

// ===== Actions =====
export interface LoadPackages {
  (category: string, queryParams?: QueryParam[]): {
    types: Array<
      GET_PACKAGES_REQUEST | GET_PACKAGES_SUCCESS | GET_PACKAGES_FAILURE
    >;
    callAPI: () => {};
  };
}

export const loadPackages: LoadPackages = (
  category = "all",
  queryParams: QueryParam[]
) => {
  return {
    types: [GET_PACKAGES_REQUEST, GET_PACKAGES_SUCCESS, GET_PACKAGES_FAILURE],
    callAPI: () =>
      request.send(
        RequestMethod.GET,
        `/bundles/category/${category}`,
        queryParams
      ),
    payload: { queryParams },
  };
};

export interface ResetPackages {
  (): { type: string };
}

export const resetPackages = () => {
  return {
    type: RESET_PACKAGES,
  };
};
