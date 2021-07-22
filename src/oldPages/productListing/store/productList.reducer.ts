import { ProductListState } from "./productList.types";
import {
  GET_PRODUCT_LIST_REQUEST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAILURE,
  RESET_PRODUCT_LIST,
  ProductListActions,
} from "./productList.actions";

export const initialState: ProductListState = {
  isFetching: false,
  error: null,
  products: [],
  meta: {
    pageNumber: 0,
    total: 0,
    availableFilters: {
      brands: [],
      classes: [],
      subclasses: [],
    },
  },
};

const productList = (
  state: ProductListState = initialState,
  action: ProductListActions
) => {
  switch (action.type) {
    case GET_PRODUCT_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        meta: {
          ...action.payload.meta,
          pageNumber: state.meta.pageNumber,
        },
        products: action.payload.isInfiniteLoading
          ? state.products.concat(action.payload.products)
          : action.payload.products,
      };

    case GET_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    case RESET_PRODUCT_LIST:
      return {
        ...initialState,
        meta: {
          ...initialState.meta,
          availableFilters: state.meta.availableFilters,
        },
      };

    default:
      return state;
  }
};

export default productList;
