import createRequestAction from "../../../utils/createRequestAction";
import { APIError } from "../../../api/error";
import {
  EnterpriseRequestPayload,
  EnterpriseSuccessPayload,
} from "./enterprise.types";

export const GET_CONTENT = "GET_ENTERPRISE_CONTENT";
export const getEnterpriseContent = createRequestAction<
  EnterpriseRequestPayload,
  EnterpriseSuccessPayload,
  APIError
>(GET_CONTENT);
