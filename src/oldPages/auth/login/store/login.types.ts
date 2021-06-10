import { APIError } from '../../../../types/ReduxState';

export interface Login {
  email: string;
  name: string;
  isFirstLogin: boolean;
  hasViewedWelcomeModal: boolean;
  authenticated: boolean;
  isFetching: boolean;
  error: APIError | null;
}

export interface LoginRequestResource {
  email: string;
  password: string;
}

export interface LoginResponseResource {
  isFirstLogin: boolean;
  firstName: string;
  lastName: string;
  token: string;
  expiresIn: number;
  customerId: number;
}

export interface LogOutExpiration {
  expiresIn: number;
}

export interface Credentials {
  email: string;
  password: string;
}
