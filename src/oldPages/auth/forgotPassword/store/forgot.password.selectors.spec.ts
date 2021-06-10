import { State as GlobalState } from '../../../../types/ReduxState';
import { ForgotPassword } from './forgot.password.types';
import { initialState } from './forgot.password.reducer';
import * as selectors from './forgot.password.selectors';

describe('Forgot Password selectors', () => {
  let state: ForgotPassword;

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should return whether we are currently fetching from the API', () => {
    const isFetching = selectors.getIsFetching({ auth: { forgotPassword: state } } as GlobalState);
    expect(isFetching).toEqual(false);
  });

  it('should return the current error', () => {
    const error = selectors.getError({ auth: { forgotPassword: state } } as GlobalState);
    expect(error).toEqual(null);
  });

  it('should the flag to track if the reset password link has been sent', () => {
    const isResetLinkSent = selectors.getHasSentResetPasswordLink({
      auth: { forgotPassword: state }
    } as GlobalState);
    expect(isResetLinkSent).toEqual(false);
  });
});
