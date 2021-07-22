import { put, call, select, takeEvery, takeLatest } from "redux-saga/effects";
import Request, { RequestMethod } from "../../../api/request";
import { FluxStandardAction } from "../../../types/FluxStandardActions";
import { SagaIterator } from "redux-saga";
import * as selectors from "./search.selectors";
import { QueryParam } from "../../../api/request";
import * as actions from "./search.actions";
import { SEARCH } from "../../../analytics/search/events";
import Analytics from "../../../analytics/analytics";
import { searchResultsPayloadMapping } from "../../../analytics/search/payload-mappings";
import { getDeliveryAreaIdentifier } from "../../../app/store/plan/plan.selectors";

export function* initSearchResults(action: FluxStandardAction): SagaIterator {
  // Track search keyword
  Analytics.trackEvent(
    SEARCH.NEW_SEARCH,
    searchResultsPayloadMapping({ query: action.payload.keyword })
  );

  // Reset search
  yield put(actions.resetSearch());

  // Fetch search products
  yield put(actions.loadSearchProducts());

  // Fetch search packages
  yield put(actions.loadSearchPackages());
}

export function* getProductsRequest(): SagaIterator {
  try {
    // Get values from global state that are required for API call.
    const offset = yield select(selectors.getProductsOffset);
    const keyword = yield select(selectors.getSearchKeyword);
    const deliveryArea = yield select(getDeliveryAreaIdentifier);

    // Hardcoded this as 1000 to force a return of all the results from the api.
    const numItems = "1000";

    // Format values as an array of query parameters.
    const queryParams: QueryParam[] = [
      { name: "numItems", value: numItems },
      { name: "offset", value: offset.toString() },
      { name: "keywords", value: keyword },
    ];

    if (deliveryArea) {
      queryParams.push({ name: "deliveryArea", value: deliveryArea });
    }

    // Make API call.
    const payload = yield call(
      [Request, "send"],
      RequestMethod.GET,
      "/search/products",
      queryParams
    );

    // Handle successful response.
    yield put(actions.loadSearchProductsSuccess(payload));
  } catch (error) {
    // Handle failed response.
    yield put(actions.loadSearchProductsFailure(error));
  }
}

export function* getPackagesRequest(): SagaIterator {
  try {
    // Get keyword from global state.
    const keyword = yield select(selectors.getSearchKeyword);

    // Format query parameter array.
    const queryParams: QueryParam[] = [{ name: "keywords", value: keyword }];

    // Make API call.
    const payload = yield call(
      [Request, "send"],
      RequestMethod.GET,
      "/search/bundles",
      queryParams
    );

    // Handle successful response.
    yield put(actions.loadSearchPackagesSuccess(payload));
  } catch (error) {
    // Handle failed response.
    yield put(actions.loadSearchPackagesFailure(error));
  }
}

// Watcher saga...
// Watches for actions dispatched to the store.
// Initiates worker saga(s).
export default function* searchWatcher(): SagaIterator {
  yield takeEvery(actions.ADD_SEARCH_KEYWORD, initSearchResults);

  yield takeLatest(actions.GET_SEARCH_PRODUCTS_REQUEST, getProductsRequest);

  yield takeLatest(actions.GET_SEARCH_PACKAGES_REQUEST, getPackagesRequest);
}
