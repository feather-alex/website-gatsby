import { changePassword } from './change.password.sagas';
import { expectSaga } from 'redux-saga-test-plan';
import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import * as actions from './change.password.actions';
import * as matchers from 'redux-saga-test-plan/matchers';
import Request, { RequestMethod } from '../../../../api/request';
import { APIError } from '../../../../types/ReduxState';
import { ChangePasswordRequestResource } from './change.password.types';
import { logOut } from '../../../auth/login/store/login.actions';

describe('Change Password - Sagas', () => {
  const email = 'eng@livefeather.com';
  const currentPassword = 'currentPassword';
  const newPassword = 'newPassword';

  const credentials: ChangePasswordRequestResource = {
    email,
    currentPassword,
    newPassword
  };

  it('should handle successfully changing password', () => {
    const action: FluxStandardAction = {
      type: actions.CHANGE_PASSWORD_REQUEST,
      payload: { credentials }
    };

    return expectSaga(changePassword, action)
      .provide([
        [
          matchers.call(
            [Request, 'send'],
            RequestMethod.POST,
            '/auth/change-password',
            undefined,
            {
              email,
              currentPassword,
              newPassword
            },
            true
          ),
          undefined
        ]
      ])
      .put({
        type: actions.CHANGE_PASSWORD_SUCCESS
      })
      .run();
  });

  it('should handle unsuccessfully changing password', () => {
    const apiError: APIError = {
      error: 'Error coming through',
      message: 'Heads up, this is failing',
      status: 500
    };

    const action: FluxStandardAction = {
      type: actions.CHANGE_PASSWORD_REQUEST,
      payload: { credentials }
    };

    return expectSaga(changePassword, action)
      .provide([
        [
          matchers.call(
            [Request, 'send'],
            RequestMethod.POST,
            '/auth/change-password',
            undefined,
            {
              email,
              currentPassword,
              newPassword
            },
            true
          ),
          Promise.reject(apiError)
        ]
      ])
      .put({
        type: actions.CHANGE_PASSWORD_FAILURE,
        payload: { error: apiError },
        error: true
      })
      .run();
  });

  it('should handle unsuccessfully changing password due to being unauthenticated', () => {
    const action: FluxStandardAction = {
      type: actions.CHANGE_PASSWORD_REQUEST,
      payload: { credentials }
    };

    const apiError: APIError = {
      error: 'Unauthenticated',
      message: 'Who you be',
      status: 401
    };

    return expectSaga(changePassword, action)
      .provide([
        [
          matchers.call(
            [Request, 'send'],
            RequestMethod.POST,
            '/auth/change-password',
            undefined,
            {
              email,
              currentPassword,
              newPassword
            },
            true
          ),
          Promise.reject(apiError)
        ]
      ])
      .put({
        type: actions.CHANGE_PASSWORD_FAILURE,
        payload: { error: apiError },
        error: true
      })
      .put(logOut())
      .run();
  });
});
