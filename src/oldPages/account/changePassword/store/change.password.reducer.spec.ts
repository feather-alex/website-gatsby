import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import { ChangePassword } from './change.password.types';
import { APIError } from '../../../../types/ReduxState';
import reducer, { initialState } from './change.password.reducer';
import * as actions from './change.password.actions';

describe('Authentication - Reducer', () => {
  const currentPassword = 'token';
  const newPassword = 'password';

  let state: ChangePassword;

  beforeEach(() => (state = { ...initialState }));

  it('should handle action to change password', () => {
    const action: FluxStandardAction = {
      type: actions.CHANGE_PASSWORD_REQUEST,
      payload: { currentPassword, newPassword }
    };
    const changePassword = reducer(initialState, action);
    expect(changePassword.isFetching).toEqual(true);
    expect(changePassword.error).toBeNull();
  });

  it('should handle successfully changing password', () => {
    const action: FluxStandardAction = {
      type: actions.CHANGE_PASSWORD_SUCCESS
    };

    const changePassword = reducer(state, action);
    expect(changePassword.isFetching).toEqual(false);
    expect(changePassword.error).toBeNull();
    expect(changePassword.isPasswordUpdated).toEqual(true);
  });

  it('should handle failing to change password', () => {
    const error: APIError = {
      error: 'Error coming through',
      message: 'Heads up, this is failing',
      status: 500
    };

    const action: FluxStandardAction = {
      type: actions.CHANGE_PASSWORD_FAILURE,
      payload: { error },
      error: true
    };
    const changePassword = reducer(state, action);
    expect(changePassword.isFetching).toEqual(false);
    expect(changePassword.error).toEqual(error);
  });
});
