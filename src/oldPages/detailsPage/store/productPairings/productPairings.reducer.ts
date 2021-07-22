import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import { ProductPairingsState } from "./productPairings.types";
import {
  GET_PRODUCT_PAIRINGS_REQUEST,
  GET_PRODUCT_PAIRINGS_SUCCESS,
  GET_PRODUCT_PAIRINGS_FAILURE,
  GET_PRODUCT_BESTSELLERS_REQUEST,
  GET_PRODUCT_BESTSELLERS_SUCCESS,
  GET_PRODUCT_BESTSELLERS_FAILURE,
} from "./productPairings.actions";

export const initialState: ProductPairingsState = {
  isFetching: false,
  products: [],
  bestsellers: [],
  error: null,
};

const productPairings = (
  state: ProductPairingsState = initialState,
  action: FluxStandardAction
) => {
  switch (action.type) {
    case GET_PRODUCT_PAIRINGS_REQUEST:
    case GET_PRODUCT_BESTSELLERS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case GET_PRODUCT_PAIRINGS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        products: action.payload,
      };

    case GET_PRODUCT_BESTSELLERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        bestsellers: action.payload,
      };

    case GET_PRODUCT_PAIRINGS_FAILURE:
    case GET_PRODUCT_BESTSELLERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productPairings;
