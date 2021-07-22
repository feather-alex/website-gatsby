import { FluxStandardAction } from "../../../types/FluxStandardActions";
import { APIError } from "../../../types/ReduxState";
import { NewsletterSignupRequestResource } from "./newsletter.signup.types";

export const NEWSLETTER_SIGNUP_REQUEST = "NEWSLETTER_SIGNUP_REQUEST";
export const NEWSLETTER_SIGNUP_SUCCESS = "NEWSLETTER_SIGNUP_SUCCESS";
export const NEWSLETTER_SIGNUP_FAILURE = "NEWSLETTER_SIGNUP_FAILURE";
export const RESET_NEWSLETTER_SIGNUP = "RESET_NEWSLETTER_SIGNUP";

export type NewsletterSignupRequest = (
  requestData: NewsletterSignupRequestResource
) => FluxStandardAction;
export type NewsletterSignupSuccess = () => FluxStandardAction;
export type NewsletterSignupFailure = (error: APIError) => FluxStandardAction;
export type ResetNewsletterSignup = () => FluxStandardAction;

export const newsletterSignupRequest: NewsletterSignupRequest = (
  requestData: NewsletterSignupRequestResource
) => ({
  type: NEWSLETTER_SIGNUP_REQUEST,
  payload: { requestData },
});

export const newsletterSignupSuccess: NewsletterSignupSuccess = () => ({
  type: NEWSLETTER_SIGNUP_SUCCESS,
});

export const newsletterSignupFailure: NewsletterSignupFailure = (
  error: APIError
) => ({
  type: NEWSLETTER_SIGNUP_FAILURE,
  payload: { error },
});

export const resetNewsletterSignup: ResetNewsletterSignup = () => ({
  type: RESET_NEWSLETTER_SIGNUP,
});
