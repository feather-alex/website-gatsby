import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import reducer, { initialState } from './login.reducer';
import * as actions from './login.actions';
import { Login, LoginResponseResource } from './login.types';
import { APIError } from '../../../../types/ReduxState';

describe('Login Reducer', () => {
  const email = 'user@fake.com';
  const password = 'shhhsecrets';
  const error: APIError = {
    status: 500,
    message: 'Something bad happened',
    error: 'Oh noes!'
  };
  let state: Login;

  beforeEach(() => (state = { ...initialState }));

  it('should handle login request action', () => {
    const action: FluxStandardAction = {
      type: actions.LOGIN_REQUEST,
      payload: { credentials: { email, password } }
    };
    const authState = reducer(state, action);
    expect(authState.isFetching).toEqual(true);
    expect(authState.error).toBeNull();
    expect(authState.email).toEqual(email);
  });

  it('should handle action login success action', () => {
    const auth: LoginResponseResource = {
      firstName: 'Tom',
      lastName: 'Thomas',
      isFirstLogin: true,
      token: 'dkmdasfjio81kl1323fd',
      expiresIn: 434312,
      customerId: 123
    };
    const action: FluxStandardAction = {
      type: actions.LOGIN_SUCCESS,
      payload: { auth }
    };
    const expectedState: Login = {
      ...state,
      authenticated: true,
      name: auth.firstName,
      isFirstLogin: true,
      isFetching: false,
      error: null
    };

    const authState = reducer(state, action);
    expect(authState).toEqual(expectedState);
  });

  it('should handle action login failure action ', () => {
    const action: FluxStandardAction = {
      type: actions.LOGIN_FAILURE,
      payload: { error }
    };
    const authState = reducer(state, action);
    expect(authState.isFetching).toEqual(false);
    expect(authState.error).toEqual(error);
  });

  it('should handle the login reset action', () => {
    state = {
      ...state,
      email: 'anemail@here.com',
      error: {
        status: 500,
        message: 'An error',
        error: 'BIG ERROR'
      }
    };
    const action: FluxStandardAction = {
      type: actions.LOGIN_RESET
    };
    const authState = reducer(state, action);
    expect(authState.email).toEqual('');
    expect(authState.error).toEqual(null);
  });

  it('should handle the logout action', () => {
    state = {
      ...state,
      authenticated: true,
      name: 'Alvin'
    };
    const action = actions.logOut();
    const authState = reducer(state, action);
    expect(authState).toEqual(initialState);
  });

  it('should handle the action to dismiss the welcome modal', () => {
    const action = actions.dismissWelcomeModal();
    const authState = reducer(state, action);
    expect(authState.hasViewedWelcomeModal).toEqual(true);
  });

  it('should handle the reset authentication action', () => {
    state = {
      ...initialState,
      authenticated: true,
      name: 'Todd'
    };
    const action = actions.resetAuthentication();
    const authState = reducer(state, action);
    expect(authState).toEqual(initialState);
  });
});
