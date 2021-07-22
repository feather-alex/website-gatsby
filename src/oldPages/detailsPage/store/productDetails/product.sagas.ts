import Request, { RequestMethod } from "../../../../api/request";
import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import { SagaIterator } from "redux-saga";
import { takeLatest } from "redux-saga/effects";
import { call, put } from "redux-saga/effects";
import * as actions from "./product.actions";

export function* getProductDetails(action: FluxStandardAction): SagaIterator {
  try {
    // Make API request.
    const response = yield call(
      [Request, "send"],
      RequestMethod.GET,
      `/products/${action.payload.productIdentifier}`
    );

    // Dispatch action for successful request.
    yield put(actions.getProductDetailsSuccess(response));
  } catch (error) {
    // Dispatch action for failed request.
    yield put(actions.getProductDetailsFailure(error));
  }
}

export default function* productDetailsWatcher(): SagaIterator {
  yield takeLatest(actions.GET_PRODUCT_DETAILS_REQUEST, getProductDetails);
}
