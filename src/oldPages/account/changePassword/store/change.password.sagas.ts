import { SagaIterator } from 'redux-saga';
import Request, { RequestMethod } from '../../../../api/request';
import { put, call, takeLatest } from 'redux-saga/effects';
import { changePasswordSuccess, changePasswordFailure, CHANGE_PASSWORD_REQUEST } from './change.password.actions';
import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import { logOut } from '../../../auth/login/store/login.actions';
import Analytics from '../../../../analytics/analytics';
import { ACCOUNTS } from '../../../../analytics/accounts/events';

// ========== Chnage Password Saga ===============
export function* changePassword(action: FluxStandardAction): SagaIterator {
  try {
    yield call(
      [Request, 'send'],
      RequestMethod.POST,
      '/auth/change-password',
      undefined,
      action.payload.credentials,
      true
    );

    yield call(Analytics.trackEvent, ACCOUNTS.CHANGE_PASSWORD);
    yield put(changePasswordSuccess());
  } catch (error) {
    yield put(changePasswordFailure(error));
    if (error && error.status === 401) {
      yield put(logOut());
    }
  }
}

export default function* changePasswordWatcher(): SagaIterator {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword);
}
