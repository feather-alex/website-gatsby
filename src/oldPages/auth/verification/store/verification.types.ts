import { APIError } from "../../../../types/ReduxState";

export interface Verification {
  hasResentVerification: boolean;
  isFetching: boolean;
  error: APIError | null;
}

export interface VerificationFormData {
  email: string;
}
