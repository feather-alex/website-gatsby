import { FluxStandardAction } from "../../../types/FluxStandardActions";
import { Search } from "./search.types";
import {
  RESET_SEARCH,
  ADD_SEARCH_KEYWORD,
  GET_SEARCH_PRODUCTS_REQUEST,
  GET_SEARCH_PRODUCTS_SUCCESS,
  GET_SEARCH_PRODUCTS_FAILURE,
  GET_SEARCH_PACKAGES_REQUEST,
  GET_SEARCH_PACKAGES_SUCCESS,
  GET_SEARCH_PACKAGES_FAILURE,
} from "./search.actions";

export const initialState: Search = {
  keyword: "",

  products: {
    data: [],
    total: 0,
    error: null,
    offset: 0,
    isFetching: false,
    isInfiniteLoading: false,
  },

  packages: {
    data: [],
    error: null,
    isFetching: false,
  },
};

const search = (state: Search = initialState, action: FluxStandardAction) => {
  switch (action.type) {
    case ADD_SEARCH_KEYWORD: {
      const { keyword } = action.payload;

      return {
        ...state,
        keyword,
      };
    }
    case GET_SEARCH_PRODUCTS_REQUEST:
      return {
        ...state,

        products: {
          ...state.products,
          isFetching: true,
        },
      };

    case GET_SEARCH_PRODUCTS_SUCCESS: {
      const responseData = action.payload;
      const { data, isInfiniteLoading } = state.products;

      const productData = isInfiniteLoading
        ? data.concat(responseData.pageData)
        : responseData.pageData;

      return {
        ...state,

        products: {
          ...state.products,
          error: null,
          data: productData,
          isFetching: false,
          isInfiniteLoading: true,
          offset: productData.length,
          total: action.payload.total,
        },
      };
    }
    case GET_SEARCH_PRODUCTS_FAILURE:
      return {
        ...state,

        products: {
          ...state.products,
          isFetching: false,
          error: action.payload.error,
        },
      };

    case GET_SEARCH_PACKAGES_REQUEST:
      return {
        ...state,

        packages: {
          ...state.packages,
          isFetching: true,
        },
      };

    case GET_SEARCH_PACKAGES_SUCCESS:
      return {
        ...state,

        packages: {
          ...state.packages,
          error: null,
          isFetching: false,
          data: action.payload,
        },
      };

    case GET_SEARCH_PACKAGES_FAILURE:
      return {
        ...state,

        packages: {
          ...state.packages,
          data: [],
          isFetching: false,
          error: action.payload.error,
        },
      };

    case RESET_SEARCH:
      return {
        ...state,
        products: initialState.products,
        packages: initialState.packages,
      };

    default:
      return state;
  }
};

export default search;
