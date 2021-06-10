import { APIError } from '../../../../types/ReduxState';

export interface ChangePassword {
  error: APIError | null;
  isFetching: boolean;
  isPasswordUpdated: boolean;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordRequestResource {
  email: string;
  currentPassword: string;
  newPassword: string;
}
