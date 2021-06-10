import { FluxStandardAction, ActionCreator } from '../../../../types/FluxStandardActions';
import { APIError } from '../../../../types/ReduxState';
import { VerificationFormData } from './verification.types';

export const RESEND_VERIFICATION = 'RESEND_VERIFICATION';
export const RESEND_VERIFICATION_SUCCESS = 'RESEND_VERIFICATION_SUCCESS';
export const RESEND_VERIFICATION_FAILURE = 'RESEND_VERIFICATION_FAILURE';
export const RESET_RESEND_VERIFICATION_EMAIL = 'RESET_RESEND_VERIFICATION_EMAIL';

export type ResendVerification = (values: VerificationFormData) => FluxStandardAction;
export type ResendVerificationSuccess = () => FluxStandardAction;
export type ResendVerificationFailure = (error: APIError) => FluxStandardAction;

export const resendVerification: ResendVerification = ({ email }: VerificationFormData) => ({
  type: RESEND_VERIFICATION,
  payload: { email }
});

export const resendVerificationSuccess: ResendVerificationSuccess = () => ({
  type: RESEND_VERIFICATION_SUCCESS
});

export const resendVerificationFailure: ResendVerificationFailure = (error: APIError) => ({
  type: RESEND_VERIFICATION_FAILURE,
  payload: { error }
});

export const resetResentVerificationEmail: ActionCreator = () => ({
  type: RESET_RESEND_VERIFICATION_EMAIL
});
