import {
  HowItWorksRequestPayload,
  HowItWorksSuccessPayload,
} from "./howItWorks.types";
import createRequestAction from "../../../utils/createRequestAction";
import { APIError } from "../../../types/ReduxState";

export const getHowItWorksContent = createRequestAction<
  HowItWorksRequestPayload,
  HowItWorksSuccessPayload,
  APIError
>("HOW_IT_WORKS_CONTENT");
