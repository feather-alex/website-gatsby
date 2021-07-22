import Request, { RequestMethod } from "../../../../api/request";
import { takeLatest, call, put, select } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { getAccountOverview as getAccountOverviewAction } from "./account.overview.actions";
import { Subscription } from "./account.overview.types";
import { logOut } from "../../../auth/login/store/login.actions";
import * as accountOverviewSelector from "./account.overview.selectors";
import { history } from "../../../../store/history";

export function* getAccountOverview(): SagaIterator {
  try {
    const response: Subscription = yield call(
      [Request, "send"],
      RequestMethod.GET,
      "/account/overview"
    );
    yield put(getAccountOverviewAction.success(response));
  } catch (error) {
    yield put(getAccountOverviewAction.failure(error));
    if (error && error.status === 401) {
      yield put(logOut());
    }
  }
}

export function* handleRedirect(): SagaIterator {
  if (history.location.pathname === "/account") {
    const hasUpcomingDelivery = yield select(
      accountOverviewSelector.hasUpcomingDelivery
    );
    const pathname = hasUpcomingDelivery
      ? "/account/delivery"
      : "/account/furniture";
    yield call<(x: string) => void>(history.push, pathname);
  }
}

export default function* accountOverviewWatcher(): SagaIterator {
  yield takeLatest(getAccountOverviewAction.request.type, getAccountOverview);
  yield takeLatest(getAccountOverviewAction.success.type, handleRedirect);
}
