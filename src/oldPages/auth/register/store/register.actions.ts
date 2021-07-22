import {
  FluxStandardAction,
  ActionCreator,
} from "../../../../types/FluxStandardActions";
import { APIError } from "../../../../types/ReduxState";
import { RegisterRequestResource } from "./register.types";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const RESET_HAS_REGISTERED = "RESET_HAS_REGISTERED";
export const SET_REGISTER_EMAIL = "SET_REGISTER_EMAIL";

export type RegisterRequest = (
  credentials: RegisterRequestResource
) => FluxStandardAction;
export type RegisterSuccess = () => FluxStandardAction;
export type RegisterFailure = (error: APIError) => FluxStandardAction;
export type SetRegisterEmail = (email: string) => FluxStandardAction;

export const registerRequest: RegisterRequest = (
  credentials: RegisterRequestResource
) => ({
  type: REGISTER_REQUEST,
  payload: { credentials },
});

export const registerSuccess: RegisterSuccess = () => ({
  type: REGISTER_SUCCESS,
});

export const registerFailure: RegisterFailure = (error: APIError) => ({
  type: REGISTER_FAILURE,
  payload: { error },
});

export const resetHasRegistered: ActionCreator = () => ({
  type: RESET_HAS_REGISTERED,
});

export const setRegisterEmail: SetRegisterEmail = (email: string) => ({
  type: SET_REGISTER_EMAIL,
  payload: { email },
});
