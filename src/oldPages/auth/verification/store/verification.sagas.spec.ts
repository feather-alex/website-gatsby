import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import { APIError } from '../../../../types/ReduxState';
import Request, { RequestMethod } from '../../../../api/request';
import { handleResendVerification } from './verification.sagas';
import { resendVerification, resendVerificationSuccess, resendVerificationFailure } from './verification.actions';

describe('Verification Sagas', () => {
  const email = 'chad@user.net';

  it('should handle successfully resending a verification email', () => {
    const action: FluxStandardAction = resendVerification({ email });

    return expectSaga(handleResendVerification, action)
      .provide([
        [matchers.call([Request, 'send'], RequestMethod.POST, '/auth/verify-email', undefined, { email }, true), {}]
      ])
      .put(resendVerificationSuccess())
      .run();
  });

  it('should handle unsuccessfully resending a verificaiton email', () => {
    const apiError: APIError = {
      status: 500,
      error: 'Something wrong',
      message: 'And its the server'
    };
    const action: FluxStandardAction = resendVerification({ email });

    return expectSaga(handleResendVerification, action)
      .provide([
        [
          matchers.call([Request, 'send'], RequestMethod.POST, '/auth/verify-email', undefined, { email }, true),
          Promise.reject(apiError)
        ]
      ])
      .put(resendVerificationFailure(apiError))
      .run();
  });
});
