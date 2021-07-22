import { SagaIterator } from "redux-saga";
import { takeLatest, call, put } from "redux-saga/effects";
import Request, { RequestMethod } from "../../../../api/request";
import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import * as actions from "./productPairings.actions";
import { filterPairedProducts } from "./productPairings.utils";
import { ProductListRequest } from "../../../../types/Product";

export function* getProductPairings(action: FluxStandardAction): SagaIterator {
  try {
    const pairingsResponse = yield call(
      [Request, "send"],
      RequestMethod.POST,
      "/products/pairings",
      undefined,
      action.payload
    );

    let response = [...pairingsResponse];

    if (response.length < 4) {
      // due to our lack of offerings in the kids-room category, we will instead use the living room category
      const category =
        action.payload.categoryIdentifier === "kids-room"
          ? "living-room"
          : action.payload.categoryIdentifier;

      const body: ProductListRequest = {
        offset: 0,
        numItems: 8,
        sort: null,
        order: null,
        categories: [category],
        classes: [],
        subclasses: [],
        filter: {
          deliveryArea: action.payload.deliveryArea || null,
          brands: [],
          classes: [],
          subclasses: [],
        },
      };

      // this will return a minimum of 8 numItems even if you set it lower in queryParams.
      const extraProducts = yield call(
        [Request, "send"],
        RequestMethod.POST,
        `/products`,
        undefined,
        body
      );

      response = [...pairingsResponse, ...extraProducts.pageData];
    }

    yield put(
      actions.getProductPairingsSuccess(
        filterPairedProducts(response, action.payload.identifiers)
      )
    );
  } catch (error) {
    yield put(actions.getProductPairingsFailure(error));
  }
}

function* getProductBestsellers(action: FluxStandardAction) {
  try {
    const queryParams = [
      {
        name: "identifiers",
        value: action.payload.productIdentifiers.join(","),
      },
    ];

    const bestsellers = yield call(
      [Request, "send"],
      RequestMethod.GET,
      "/products",
      queryParams
    );

    yield put(actions.getProductBestsellersSuccess(bestsellers));
  } catch (error) {
    yield put(actions.getProductBestsellersFailure(error));
  }
}

export default function* productPairingsWatcher(): SagaIterator {
  yield takeLatest(actions.GET_PRODUCT_PAIRINGS_REQUEST, getProductPairings);
  yield takeLatest(
    actions.GET_PRODUCT_BESTSELLERS_REQUEST,
    getProductBestsellers
  );
}
