import { VerificationFormData } from './verification.types';
import { APIError } from '../../../../types/ReduxState';
import {
  resendVerification,
  resendVerificationSuccess,
  resendVerificationFailure,
  RESEND_VERIFICATION,
  RESEND_VERIFICATION_SUCCESS,
  RESEND_VERIFICATION_FAILURE
} from './verification.actions';

describe('Verification Actions', () => {
  it('should create an action for resending verification', () => {
    const formValues: VerificationFormData = {
      email: 'someone@rentfeather.com'
    };
    const expectedAction = {
      type: RESEND_VERIFICATION,
      payload: formValues
    };

    const action = resendVerification(formValues);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action for successfully resending verification', () => {
    const expectedAction = {
      type: RESEND_VERIFICATION_SUCCESS
    };
    const action = resendVerificationSuccess();

    expect(action).toEqual(expectedAction);
  });

  it('should create an action for unsuccessfully resending verificaiton', () => {
    const apiError: APIError = {
      status: 500,
      error: 'whoops',
      message: 'an error happened somehow'
    };
    const expectedAction = {
      type: RESEND_VERIFICATION_FAILURE,
      payload: { error: apiError }
    };
    const action = resendVerificationFailure(apiError);
    expect(action).toEqual(expectedAction);
  });
});
