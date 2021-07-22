import { ProductDetailsState } from "./product.types";
import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import {
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAILURE,
} from "./product.actions";
import { FullProductDetails } from "../../../../types/Product";

export const initialProductDetails: FullProductDetails = {
  title: "",
  identifier: "",
  description: "",
  "3dAssetId": null,
  brand: {
    identifier: "",
    name: "",
    image: {
      mobile: null,
      desktop: null,
    },
  },
  materials: [],
  categories: [],
  subclass: { identifier: "", name: "" },
  styles: [],
  lifestyle: {
    summary: "",
    image: {
      mobile: null,
      desktop: null,
    },
  },
  options: [],
  variants: [],
  availability: [],
};

export const initialState: ProductDetailsState = {
  isFetching: false,
  data: initialProductDetails,
  error: null,
};

const product = (
  state: ProductDetailsState = initialState,
  action: FluxStandardAction
) => {
  switch (action.type) {
    case GET_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };

    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        data: action.payload,
      };

    case GET_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default product;
