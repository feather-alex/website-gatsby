import { APIError } from "../../../../types/ReduxState";

export interface ForgotPassword {
  email: string;
  hasSentResetPasswordLink: boolean;
  error: APIError | null;
  isFetching: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}
