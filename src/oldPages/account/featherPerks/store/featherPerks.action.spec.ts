import { PayloadAction } from "@reduxjs/toolkit";

import {
  mockRequestPayload,
  mockSuccessPayload,
  mockError,
} from "./featherPerks.fixtures";
import { APIError } from "../../../../api/error";
import {
  FeatherPerksRequestPayload,
  FeatherPerksSuccessPayload,
} from "./featherPerks.types";
import { getFeatherPerksContent } from "./featherPerks.actions";

describe("Feather perks - Actions", () => {
  it("Should handle action: GET_FEATHER_PERKS_REQUEST", () => {
    const expectedAction: PayloadAction<FeatherPerksRequestPayload> = {
      type: getFeatherPerksContent.request.type,
      payload: mockRequestPayload,
    };

    const action = getFeatherPerksContent.request(mockRequestPayload);

    expect(action).toEqual(expectedAction);
  });
});

it("Should handle action: GET_FEATHER_PERKS_SUCCESS", () => {
  const expectedAction: PayloadAction<FeatherPerksSuccessPayload> = {
    type: getFeatherPerksContent.success.type,
    payload: mockSuccessPayload,
  };

  const action = getFeatherPerksContent.success(mockSuccessPayload);

  expect(action).toEqual(expectedAction);
});

it("Should handle action: GET_FEATHER_PERKS_FAILURE", () => {
  const expectedAction: PayloadAction<APIError> = {
    type: getFeatherPerksContent.failure.type,
    payload: mockError,
  };

  const action = getFeatherPerksContent.failure(mockError);

  expect(action).toEqual(expectedAction);
});
