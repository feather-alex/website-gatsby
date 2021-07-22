import {
  GET_PACKAGE_REQUEST,
  GET_PACKAGE_SUCCESS,
  GET_PACKAGE_FAILURE,
} from "../constants/actions";
import { ObjEntity, Action } from "../types/ReduxState";
import { FullPackageDetails } from "../types/Package";
import request, { RequestMethod } from "../api/request";
import { OptionType } from "../types/Product";

const spoofProductOptionTypes = (packageDetail: FullPackageDetails) => {
  return {
    ...packageDetail,
    variants: packageDetail.variants.map((variant) => ({
      ...variant,
      options: variant.options.map((variantOption) => ({
        ...variantOption,
        type: OptionType.Structure,
      })),
    })),
    options: packageDetail.options.map((option) => ({
      ...option,
      type: OptionType.Structure,
    })),
  };
};

// ===== Reducers =====
export const initialState: ObjEntity<FullPackageDetails> = {
  isFetching: true,
  error: null,
  data: {
    title: "",
    identifier: "",
    description: "",
    category: {
      identifier: "",
      name: "",
    },
    variants: [],
    options: [],
    listingImage: {
      desktop: null,
      mobile: null,
    },
    availability: [
      {
        deliveryArea: null,
        isInStock: false,
        isEnabled: false,
        stockExpectedDate: null,
      },
    ],
    lifestyle: {
      summary: "",
      image: {
        desktop: null,
        mobile: null,
      },
    },
    otherImages: [],
  },
};

const pkg = (
  state = initialState,
  action: Action
): ObjEntity<FullPackageDetails> => {
  switch (action.type) {
    case GET_PACKAGE_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true,
      };

    case GET_PACKAGE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case GET_PACKAGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        data: spoofProductOptionTypes(action.response),
      };

    default:
      return state;
  }
};

export default pkg;

// ===== Actions =====
export interface LoadPackage {
  (pkgId: string): {
    types: Array<
      GET_PACKAGE_REQUEST | GET_PACKAGE_SUCCESS | GET_PACKAGE_FAILURE
    >;
    callAPI: () => {};
  };
}

export const loadPackage = (pkgId: string) => {
  return {
    types: [GET_PACKAGE_REQUEST, GET_PACKAGE_SUCCESS, GET_PACKAGE_FAILURE],
    callAPI: () => request.send(RequestMethod.GET, `/bundles/${pkgId}`),
    payload: { pkgId },
  };
};
