import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import Request, { RequestMethod } from '../../../../api/request';
import { RESEND_VERIFICATION, resendVerificationSuccess, resendVerificationFailure } from './verification.actions';

export function* handleResendVerification(action: FluxStandardAction): SagaIterator {
  try {
    yield call([Request, 'send'], RequestMethod.POST, '/auth/verify-email', undefined, action.payload, true);

    yield put(resendVerificationSuccess());
  } catch (error) {
    yield put(resendVerificationFailure(error));
  }
}

export default function* verificationWatcher(): SagaIterator {
  yield takeLatest(RESEND_VERIFICATION, handleResendVerification);
}
