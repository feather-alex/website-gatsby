import { APIError } from '../../../../types/ReduxState';

export interface Register {
  email: string;
  hasRegistered: boolean;
  error: APIError | null;
  isFetching: boolean;
}

export interface RegisterFormData {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface RegisterRequestResource {
  email: string;
  password: string;
}
