import { PayloadAction } from "@reduxjs/toolkit";

import {
  getAccountOverview,
  setAccountSubscriptionStartDate,
  SET_ACCOUNT_SUBSCRIPTION_START_DATE,
} from "./account.overview.actions";
import { APIError } from "../../../../types/ReduxState";
import { Subscription } from "./account.overview.types";
import { mockAccountResource, mockError } from "./account.overview.fixtures";

describe("Account Overview - Actions", () => {
  describe("Get Account Overview", () => {
    it("should create a get account overview request action", () => {
      const expectedAction = {
        type: getAccountOverview.request.type,
      };

      expect(getAccountOverview.request()).toEqual(expectedAction);
    });

    it("should create a successful get account overview action", () => {
      const expectedAction: PayloadAction<Subscription> = {
        type: getAccountOverview.success.type,
        payload: mockAccountResource,
      };

      expect(getAccountOverview.success(mockAccountResource)).toEqual(
        expectedAction
      );
    });

    it("should create a get account overview failure action", () => {
      const expectedAction: PayloadAction<APIError> = {
        type: getAccountOverview.failure.type,
        payload: mockError,
      };

      expect(getAccountOverview.failure(mockError)).toEqual(expectedAction);
    });

    it("should set a subscription start date", () => {
      const payload: Date = new Date();
      const expectedAction: PayloadAction<Date> = {
        type: SET_ACCOUNT_SUBSCRIPTION_START_DATE,
        payload,
      };

      expect(setAccountSubscriptionStartDate(payload)).toEqual(expectedAction);
    });
  });
});
