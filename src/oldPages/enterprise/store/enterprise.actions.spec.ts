import { PayloadAction } from "@reduxjs/toolkit";

import {
  mockRequestPayload,
  mockSuccessPayload,
  mockError,
} from "./enterprise.fixtures";
import { APIError } from "../../../types/ReduxState";
import {
  EnterpriseRequestPayload,
  EnterpriseSuccessPayload,
} from "./enterprise.types";
import { getEnterpriseContent } from "./enterprise.actions";

describe("Enterprises - Actions", () => {
  it("Should handle action: GET_ENTERPRISE_REQUEST", () => {
    const expectedAction: PayloadAction<EnterpriseRequestPayload> = {
      type: getEnterpriseContent.request.type,
      payload: mockRequestPayload,
    };

    const actionAction = getEnterpriseContent.request(mockRequestPayload);

    expect(actionAction).toEqual(expectedAction);
  });

  it("Should handle action: GET_ENTERPRISE_SUCCESS", () => {
    const expectedAction: PayloadAction<EnterpriseSuccessPayload> = {
      type: getEnterpriseContent.success.type,
      payload: mockSuccessPayload,
    };

    const actionAction = getEnterpriseContent.success(mockSuccessPayload);

    expect(actionAction).toEqual(expectedAction);
  });

  it("Should handle action: GET_ENTERPRISE_FAILURE", () => {
    const expectedAction: PayloadAction<APIError> = {
      type: getEnterpriseContent.failure.type,
      payload: mockError,
    };

    const actualAction = getEnterpriseContent.failure(mockError);

    expect(actualAction).toEqual(expectedAction);
  });
});
