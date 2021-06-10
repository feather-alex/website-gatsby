import { expectSaga } from 'redux-saga-test-plan';
import Cookies from 'js-cookie';
import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import * as matchers from 'redux-saga-test-plan/matchers';
import Request, { RequestMethod } from '../../../../api/request';
import { history } from '../../../../store/history';
import { APIError } from '../../../../types/ReduxState';
import { noop } from '../../../../utils/ui-helpers';
import { LoginResponseResource, LoginRequestResource } from './login.types';
import { logIn, loginSuccess, loginFailure, logOutExpiration, resetAuthentication } from './login.actions';
import { initialState } from './login.reducer';
import { getEmailHasNotBeenVerified } from './login.selectors';
import { handleLogin, handleLogout, handleOnLoadAuthentication } from './login.sagas';
import Analytics from '../../../../analytics/analytics';

describe('Login Sagas', () => {
  describe('Login', () => {
    const email = 'test1@fake.com';
    const password = 'pass';
    const credentials: LoginRequestResource = {
      email,
      password
    };

    it('should handle successfully logging in', () => {
      const apiResponse: LoginResponseResource = {
        firstName: 'Testman',
        lastName: 'Johnson',
        isFirstLogin: false,
        token: 'testtoken',
        expiresIn: 32003,
        customerId: 123
      };
      const expiresValue = new Date(new Date().getTime() + apiResponse.expiresIn * 1000);

      const action: FluxStandardAction = logIn(credentials);

      return expectSaga(handleLogin, action)
        .withState({ auth: { login: { ...initialState } } })
        .provide([
          [
            matchers.call([Request, 'send'], RequestMethod.POST, '/auth/login', undefined, { email, password }),
            apiResponse
          ],
          [matchers.call(Cookies.set, 'token', apiResponse.token, { expires: expiresValue }), noop],
          [matchers.call(Analytics.tatariIdentify, apiResponse.customerId), noop],
          [matchers.call(history.push, '/account'), noop]
        ])
        .put(loginSuccess(apiResponse))
        .put(logOutExpiration({ expiresIn: apiResponse.expiresIn }))
        .run();
    });

    it('should handle unsuccessfully logging in', () => {
      const apiError: APIError = {
        status: 401,
        message: 'Not going to work today',
        error: 'Big ole error here'
      };

      const action: FluxStandardAction = logIn(credentials);

      return expectSaga(handleLogin, action)
        .withState({ auth: { login: { ...initialState } } })
        .provide([
          [
            matchers.call([Request, 'send'], RequestMethod.POST, '/auth/login', undefined, { email, password }),
            Promise.reject(apiError)
          ],
          [matchers.select(getEmailHasNotBeenVerified), true]
        ])
        .put(loginFailure(apiError))
        .run();
    });

    it('should handle unsuccessfully logging in because of a pending email verification', () => {
      const apiError: APIError = {
        status: 403,
        message: 'Yo, verify yo email',
        error: 'Another big ole error here'
      };
      const action: FluxStandardAction = logIn(credentials);

      return expectSaga(handleLogin, action)
        .withState({ auth: { login: { ...initialState } } })
        .provide([
          [
            matchers.call([Request, 'send'], RequestMethod.POST, '/auth/login', undefined, { email, password }),
            Promise.reject(apiError)
          ],
          [matchers.select(getEmailHasNotBeenVerified), false],
          [matchers.call(history.push, '/verify'), noop]
        ])
        .put(loginFailure(apiError))
        .run();
    });
  });

  describe('Logout', () => {
    it('should handle logging the user out', () => {
      return expectSaga(handleLogout)
        .withState({ auth: { login: { ...initialState } } })
        .provide([
          [matchers.call(Cookies.remove, 'token'), noop],
          [matchers.call(history.push, '/login'), noop]
        ])
        .run();
    });
  });

  describe('Check authentication', () => {
    it('should handle authentication when token is not present', () => {
      return expectSaga(handleOnLoadAuthentication)
        .provide([[matchers.call(Cookies.get, 'token'), undefined]])
        .put(resetAuthentication())
        .run();
    });

    it('should handle authentication when token is present', () => {
      return expectSaga(handleOnLoadAuthentication)
        .provide([[matchers.call(Cookies.get, 'token'), 'something']])
        .not.put(resetAuthentication())
        .run();
    });
  });
});
