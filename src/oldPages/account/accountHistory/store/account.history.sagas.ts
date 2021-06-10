import Request, { RequestMethod, QueryParam } from '../../../../api/request';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as accountHistorySelectors from '../store/account.history.selectors';
import { AccountHistoryResource } from './account.history.types';
import { SagaIterator } from 'redux-saga';
import {
  getAccountHistoryFailure,
  getAccountHistorySuccess,
  GET_ACCOUNT_HISTORY_REQUEST
} from './account.history.actions';
import { logOut } from '../../../../pages/auth/login/store/login.actions';

// Get Account History
export function* getAccountHistoryRequest(): SagaIterator {
  try {
    const pageIncrements: number = yield select(accountHistorySelectors.getPerPage);
    const lastChargeId: string | undefined = yield select(accountHistorySelectors.getLastChargeId);

    const queryParams: QueryParam[] = [{ name: 'limit', value: pageIncrements.toString() }];

    if (lastChargeId !== undefined) {
      queryParams.push({ name: 'lastChargeId', value: lastChargeId });
    }

    const response: AccountHistoryResource = yield call(
      [Request, 'send'],
      RequestMethod.GET,
      '/account/payment-history',
      queryParams
    );

    yield put(getAccountHistorySuccess(response));
  } catch (error) {
    yield put(getAccountHistoryFailure(error));
    if (error && error.status === 401) {
      yield put(logOut());
    }
  }
}

// Watcher for account history
export default function* accountHistoryWatcher(): SagaIterator {
  yield takeLatest(GET_ACCOUNT_HISTORY_REQUEST, getAccountHistoryRequest);
}
