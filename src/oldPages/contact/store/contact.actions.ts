import {
  FluxStandardAction,
  ActionCreator,
} from "../../../types/FluxStandardActions";
import { ContactFormData } from "./contact.types";
import { APIError } from "../../../types/ReduxState";

// Send Inquiry -- Request
export const SEND_INQUIRY_REQUEST = "SEND_INQUIRY_REQUEST";

export type SendInquiryRequest = (
  formValues: ContactFormData
) => FluxStandardAction;

export const sendInquiryRequest: SendInquiryRequest = (
  formValues: ContactFormData
) => ({
  type: SEND_INQUIRY_REQUEST,
  payload: formValues,
});

// Send Inquiry -- Success
export const SEND_INQUIRY_SUCCESS = "SEND_INQUIRY_SUCCESS";

export const sendInquirySuccess: ActionCreator = () => ({
  type: SEND_INQUIRY_SUCCESS,
});

// Send Inquiry -- Failure
export const SEND_INQUIRY_FAILURE = "SEND_INQUIRY_FAILURE";

export type SendInquiryFailure = (error: APIError) => FluxStandardAction;

export const sendInquiryFailure: SendInquiryFailure = (error: APIError) => ({
  type: SEND_INQUIRY_FAILURE,
  payload: { error },
  error: true,
});
