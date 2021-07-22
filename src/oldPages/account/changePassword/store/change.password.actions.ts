import {
  FluxStandardAction,
  ActionCreator,
} from "../../../../types/FluxStandardActions";
import { APIError } from "../../../../types/ReduxState";
import { ChangePasswordRequestResource } from "./change.password.types";

export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";
export const RESET_IS_PASSWORD_UPDATED = "RESET_IS_PASSWORD_UPDATED";

export type ChangePasswordRequest = (
  credentials: ChangePasswordRequestResource
) => FluxStandardAction;
export type ChangePasswordFailure = (error: APIError) => FluxStandardAction;

// ================== Change Password Actions ===================

export const changePasswordRequest: ChangePasswordRequest = (
  credentials: ChangePasswordRequestResource
) => ({
  type: CHANGE_PASSWORD_REQUEST,
  payload: { credentials },
});

export const changePasswordSuccess: ActionCreator = () => ({
  type: CHANGE_PASSWORD_SUCCESS,
});

export const changePasswordFailure: ChangePasswordFailure = (
  error: APIError
) => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload: { error },
  error: true,
});

export const resetIsPasswordUpdated: ActionCreator = () => ({
  type: RESET_IS_PASSWORD_UPDATED,
});
