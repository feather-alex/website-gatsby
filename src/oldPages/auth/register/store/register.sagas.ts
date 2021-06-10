import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import Request, { RequestMethod } from '../../../../api/request';
import { REGISTER_REQUEST, registerSuccess, registerFailure } from './register.actions';

export function* handleRegister(action: FluxStandardAction): SagaIterator {
  try {
    yield call([Request, 'send'], RequestMethod.POST, '/auth/register', undefined, action.payload.credentials, true);
    yield put(registerSuccess());
  } catch (error) {
    yield put(registerFailure(error));
  }
}

export default function* registerWatchers() {
  yield takeLatest(REGISTER_REQUEST, handleRegister);
}
