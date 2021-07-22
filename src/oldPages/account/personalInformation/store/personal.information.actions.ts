import { PersonalInfoResource } from "./personal.information.types";
import { APIError } from "../../../../types/ReduxState";
import {
  FluxStandardAction,
  ActionCreator,
} from "../../../../types/FluxStandardActions";

export const GET_PERSONAL_INFORMATION_REQUEST =
  "GET_PERSONAL_INFORMATION_REQUEST";
export const GET_PERSONAL_INFORMATION_SUCCESS =
  "GET_PERSONAL_INFORMATION_SUCCESS";
export const GET_PERSONAL_INFORMATION_FAILURE =
  "GET_PERSONAL_INFORMATION_FAILURE";
export const UPDATE_PERSONAL_INFORMATION_REQUEST =
  "UPDATE_PERSONAL_INFORMATION_REQUEST";
export const UPDATE_PERSONAL_INFORMATION_SUCCESS =
  "UPDATE_PERSONAL_INFORMATION_SUCCESS";
export const UPDATE_PERSONAL_INFORMATION_FAILURE =
  "UPDATE_PERSONAL_INFORMATION_FAILURE";
export const UPDATE_ACCOUNT_LAST_ACCESSED_AT =
  "UPDATE_ACCOUNT_LAST_ACCESSED_AT";

export type UpdatePersonalInfoFailure = (error: APIError) => FluxStandardAction;
export type UpdatePersonalInfo = (
  email: string,
  phone: string
) => FluxStandardAction;
// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UpdatePersonalInfoSuccess = (response: any) => FluxStandardAction;
export type LoadPersonalInfoSuccess = (
  personalInfoResource: PersonalInfoResource
) => FluxStandardAction;
export type LoadPersonalInfoFailure = (error: APIError) => FluxStandardAction;

// Load Personal Information
export const loadPersonalInfo: ActionCreator = () => ({
  type: GET_PERSONAL_INFORMATION_REQUEST,
});

export const loadPersonalInfoSuccess: LoadPersonalInfoSuccess = (
  personalInfoResource: PersonalInfoResource
) => ({
  type: GET_PERSONAL_INFORMATION_SUCCESS,
  payload: personalInfoResource,
});

export const loadPersonalInfoFailure: LoadPersonalInfoFailure = (
  error: APIError
) => ({
  type: GET_PERSONAL_INFORMATION_FAILURE,
  payload: error,
  error: true,
});

// Update Personal Information
export const updatePersonalInfo: UpdatePersonalInfo = (
  email: string,
  phone: string
) => ({
  type: UPDATE_PERSONAL_INFORMATION_REQUEST,
  payload: { email, phone },
});

export const updatePersonalInfoSuccess: UpdatePersonalInfoSuccess = (
  personalInfoResource: PersonalInfoResource
) => ({
  type: UPDATE_PERSONAL_INFORMATION_SUCCESS,
  payload: personalInfoResource,
});

export const updatePersonalInfoFailure: UpdatePersonalInfoFailure = (
  error: APIError
) => ({
  type: UPDATE_PERSONAL_INFORMATION_FAILURE,
  payload: error,
  error: true,
});
