import {
  resendVerification,
  resendVerificationSuccess,
  resendVerificationFailure,
  resetResentVerificationEmail
} from './verification.actions';
import reducer, { initialState } from './verification.reducer';
import { Verification } from './verification.types';
import { APIError } from '../../../../types/ReduxState';

describe('Verification Reducer', () => {
  const email = 'test@domain.party';
  const error: APIError = {
    status: 500,
    message: 'something bad happened',
    error: 'not good'
  };
  let state: Verification;

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should handle the action to resend verification', () => {
    const action = resendVerification({ email });
    const verification = reducer(state, action);
    expect(verification.error).toEqual(null);
    expect(verification.isFetching).toEqual(true);
  });

  it('should handle successfully resending verification', () => {
    const action = resendVerificationSuccess();
    const verification = reducer(state, action);
    expect(verification.error).toEqual(null);
    expect(verification.isFetching).toEqual(false);
    expect(verification.hasResentVerification).toEqual(true);
  });

  it('should handle unsuccessfully resending verification', () => {
    const action = resendVerificationFailure(error);
    const verification = reducer(state, action);
    expect(verification.error).toEqual(error);
    expect(verification.isFetching).toEqual(false);
    expect(verification.hasResentVerification).toEqual(false);
  });

  it('should handle resetting the resend verification flag', () => {
    const action = resetResentVerificationEmail();
    const verification = reducer(state, action);
    expect(verification.error).toEqual(null);
    expect(verification.hasResentVerification).toEqual(false);
    expect(verification.isFetching).toEqual(false);
  });
});
