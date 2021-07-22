import Request, { RequestMethod } from "../../../api/request";
import { SagaIterator } from "redux-saga";
import { takeLatest } from "redux-saga/effects";
import { call, put } from "redux-saga/effects";
import {
  getProductListSuccess,
  getProductListFailure,
  GetProductListRequestAction,
  GET_PRODUCT_LIST_REQUEST,
} from "./productList.actions";
import { ProductListResponse } from "../../../types/Product";
import { formatProductListResponse } from "../productList.service";
import * as Analytics from "./productList.analytics";

export function* getProductList(
  action: GetProductListRequestAction
): SagaIterator {
  try {
    const response: ProductListResponse = yield call(
      [Request, "send"],
      RequestMethod.POST,
      "/products",
      undefined,
      action.payload.body
    );

    const formattedResults = formatProductListResponse(
      response,
      action.payload.isInfiniteLoading
    );

    yield call([Analytics, "trackListingAnalytics"], action, formattedResults);

    yield put(getProductListSuccess(formattedResults));
  } catch (error) {
    yield put(getProductListFailure(error));
  }
}

export default function* productListWatcher(): SagaIterator {
  yield takeLatest(GET_PRODUCT_LIST_REQUEST, getProductList);
}
