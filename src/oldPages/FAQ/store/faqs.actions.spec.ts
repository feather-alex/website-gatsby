import { PayloadAction } from "@reduxjs/toolkit";

import {
  mockRequestPayload,
  mockSuccessPayload,
  mockError,
} from "./faqs.fixtures";
import {
  FaqContentRequestPayload,
  FaqContentSuccessPayload,
} from "./faqs.types";
import { APIError } from "../../../types/ReduxState";
import { getFaqContent } from "./faqs.actions";

describe("FAQs - Actions", () => {
  it("Should handle action: GET_FAQ_REQUEST", () => {
    const expectedAction: PayloadAction<FaqContentRequestPayload> = {
      type: getFaqContent.request.type,
      payload: mockRequestPayload,
    };

    const actionAction = getFaqContent.request(mockRequestPayload);

    expect(actionAction).toEqual(expectedAction);
  });

  it("Should handle action: GET_FAQ_SUCCESS", () => {
    const expectedAction: PayloadAction<FaqContentSuccessPayload> = {
      type: getFaqContent.success.type,
      payload: mockSuccessPayload,
    };

    const actionAction = getFaqContent.success(mockSuccessPayload);

    expect(actionAction).toEqual(expectedAction);
  });

  it("Should handle action: GET_FAQ_FAILURE", () => {
    const expectedAction: PayloadAction<APIError> = {
      type: getFaqContent.failure.type,
      payload: mockError,
    };

    const actualAction = getFaqContent.failure(mockError);

    expect(actualAction).toEqual(expectedAction);
  });
});
