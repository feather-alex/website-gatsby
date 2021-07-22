import Request, { RequestMethod } from "../../../../api/request";
import { takeLatest, call, put } from "redux-saga/effects";
import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import { APIError } from "../../../../types/ReduxState";
import { SagaIterator } from "redux-saga";
import {
  addBillingCardFailure,
  setPrimaryCardFailure,
  removeBillingCardFailure,
  REMOVE_BILLING_CARD_REQUEST,
  ADD_NEW_BILLING_CARD_REQUEST,
  SET_PRIMARY_CARD_REQUEST,
  GET_PAYMENT_PROFILE_REQUEST,
  getPaymentProfileRequest,
  getPaymentProfileSuccess,
  getPaymentProfileFailure,
} from "./billing.information.actions";
import { BillingSourcesResource } from "./billing.information.types";
import { logOut } from "../../../auth/login/store/login.actions";
import Analytics from "../../../../analytics/analytics";
import { ACCOUNTS } from "../../../../analytics/accounts/events";

export function* getPaymentProfile(): SagaIterator {
  try {
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = yield call(
      [Request, "send"],
      RequestMethod.GET,
      "/account/payment-sources"
    );
    yield put(getPaymentProfileSuccess(response as BillingSourcesResource));
  } catch (error) {
    yield put(getPaymentProfileFailure(error));
    if (error && error.status === 401) {
      yield put(logOut());
    }
  }
}

// Add new billing card
export function* addBillingCard(action: FluxStandardAction): SagaIterator {
  try {
    yield call(
      [Request, "send"],
      RequestMethod.POST,
      "/account/payment-sources",
      undefined,
      action.payload,
      false
    );
    yield call(Analytics.trackEvent, ACCOUNTS.ADD_CARD_SUCCESS);
    yield put(getPaymentProfileRequest());
  } catch (error) {
    let errorPayload: APIError = error;
    // if it is a 400 response, it is a stripe error, so we must format our error message accordingly
    if (error.status === 400) {
      errorPayload = {
        status: error.status,
        message: error.body.error,
        error: error.error,
      };
    }
    yield call(Analytics.trackEvent, ACCOUNTS.ADD_CARD_FAILURE);
    yield put(addBillingCardFailure(errorPayload));
    if (error && error.status === 401) {
      yield put(logOut());
    }
  }
}

// Set card as primary
export function* setPrimaryCard(action: FluxStandardAction): SagaIterator {
  try {
    yield call(
      [Request, "send"],
      RequestMethod.PUT,
      `/account/payment-sources/${action.payload.token}/default`
    );
    yield call(Analytics.trackEvent, ACCOUNTS.CHANGE_PRIMARY_CARD);
    yield put(getPaymentProfileRequest());
  } catch (error) {
    yield put(setPrimaryCardFailure(error));
    if (error && error.status === 401) {
      yield put(logOut());
    }
  }
}

// Remove billing card
export function* removeBillingCard(action: FluxStandardAction): SagaIterator {
  try {
    yield call(
      [Request, "send"],
      RequestMethod.DELETE,
      `/account/payment-sources/${action.payload.token}`
    );

    yield call(Analytics.trackEvent, ACCOUNTS.REMOVE_CARD_SUCCESS);
    yield put(getPaymentProfileRequest());
  } catch (error) {
    yield put(removeBillingCardFailure(error));
    if (error && error.status === 401) {
      yield put(logOut());
    }
  }
}

export default function* billingInformationWatcher(): SagaIterator {
  yield takeLatest(GET_PAYMENT_PROFILE_REQUEST, getPaymentProfile);
  yield takeLatest(ADD_NEW_BILLING_CARD_REQUEST, addBillingCard);
  yield takeLatest(SET_PRIMARY_CARD_REQUEST, setPrimaryCard);
  yield takeLatest(REMOVE_BILLING_CARD_REQUEST, removeBillingCard);
}
