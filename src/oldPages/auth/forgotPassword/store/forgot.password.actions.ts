import { APIError } from '../../../../types/ReduxState';
import { FluxStandardAction, ActionCreator } from '../../../../types/FluxStandardActions';

// ================== Reset Password ===================

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';
export const RESET_RESET_PASSWORD_SENT = 'RESET_RESET_PASSWORD_SENT';

export type ResetPasswordRequest = (formValues: { email: string }) => FluxStandardAction;
export type ResetPasswordFailure = (error: APIError) => FluxStandardAction;

export const resetPasswordRequest: ResetPasswordRequest = (email: { email: string }) => ({
  type: RESET_PASSWORD_REQUEST,
  payload: { email }
});

export const resetPasswordSuccess: ActionCreator = () => ({
  type: RESET_PASSWORD_SUCCESS
});

export const resetPasswordFailure: ResetPasswordFailure = (error: APIError) => ({
  type: RESET_PASSWORD_FAILURE,
  payload: { error }
});

export const resetResetPasswordSent: ActionCreator = () => ({
  type: RESET_RESET_PASSWORD_SENT
});
