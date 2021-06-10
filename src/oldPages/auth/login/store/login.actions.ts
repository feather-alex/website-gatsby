import { LoginResponseResource, LoginRequestResource, LogOutExpiration } from './login.types';
import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import { APIError } from '../../../../types/ReduxState';

// ================== Login ====================

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_RESET = 'LOGIN_RESET';

export type LogIn = (credentials: LoginRequestResource) => FluxStandardAction;
export type LoginSuccess = (auth: LoginResponseResource) => FluxStandardAction;
export type LoginFailure = (error: APIError) => FluxStandardAction;
export type LoginReset = () => FluxStandardAction;

export const logIn: LogIn = (credentials: LoginRequestResource) => ({
  type: LOGIN_REQUEST,
  payload: { credentials }
});

export const loginSuccess: LoginSuccess = (auth: LoginResponseResource) => ({
  type: LOGIN_SUCCESS,
  payload: { auth }
});

export const loginFailure: LoginFailure = (error: APIError) => ({
  type: LOGIN_FAILURE,
  payload: { error }
});

export const loginReset: LoginReset = () => ({
  type: LOGIN_RESET
});

// ================== Logout ======================

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_EXPIRATION = 'LOGOUT_EXPIRATION';

export type LogOut = () => FluxStandardAction;
export type LogOutExpirationAction = (expiration: LogOutExpiration) => FluxStandardAction;

export const logOut: LogOut = () => ({
  type: LOGOUT_REQUEST
});

export const logOutExpiration: LogOutExpirationAction = (expiration: LogOutExpiration) => ({
  type: LOGOUT_EXPIRATION,
  payload: { expiration }
});

// ================== Welcome Modal ===============

export const DISMISS_WELCOME_MODAL = 'DISMISS_WELCOME_MODAL';

export type DismissWelcomeModal = () => FluxStandardAction;

export const dismissWelcomeModal: DismissWelcomeModal = () => ({
  type: DISMISS_WELCOME_MODAL
});

// ================== On Load Authentication  ==============
export const CHECK_AUTHENTICATION = 'CHECK_AUTHENTICATION';

export type CheckAuthentication = () => FluxStandardAction;

export const checkAuthentication: CheckAuthentication = () => ({
  type: CHECK_AUTHENTICATION
});

export const RESET_AUTHENTICATION = 'RESET_AUTHENTICATION';

export type ResetAuthenctication = () => FluxStandardAction;

export const resetAuthentication: ResetAuthenctication = () => ({
  type: RESET_AUTHENTICATION
});
