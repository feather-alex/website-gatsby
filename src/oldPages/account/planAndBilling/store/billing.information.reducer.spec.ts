import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import { APIError } from "../../../../types/ReduxState";
import {
  BillingInformation,
  BillingSourcesResource,
} from "./billing.information.types";
import billingInformation from "./billing.information.reducer";
import { initialState } from "./billing.information.reducer";
import * as actions from "./billing.information.actions";

describe("Plan & Billing - Reducers", () => {
  let state: BillingInformation;

  const error: APIError = {
    status: 500,
    error: "error stack here",
    message: "error message that tells you nothing",
  };

  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  describe("Getting payment profile", () => {
    it("should handle action to fetch payment profile", () => {
      const action: FluxStandardAction = actions.getPaymentProfileRequest();

      const reduced = billingInformation(state, action);
      expect(reduced.isFetching).toEqual(true);
    });

    it("should handle successfully fetching payment profile", () => {
      const paymentProfile: BillingSourcesResource = {
        id: "123",
        defaultSourceId: "12345",
        sources: [
          {
            id: "12345",
            sourceType: "card",
            lastFour: "4424",
            expMonth: 8,
            expYear: 22,
          },
          {
            id: "54321",
            sourceType: "bank_account",
            lastFour: "1111",
            expMonth: 0,
            expYear: 0,
          },
        ],
      };
      const action: FluxStandardAction =
        actions.getPaymentProfileSuccess(paymentProfile);
      const reduced = billingInformation(state, action);
      expect(reduced.error).toEqual(null);
      expect(reduced.isFetching).toEqual(false);
      expect(reduced.defaultSource).toEqual(paymentProfile.sources[0]);
      expect(reduced.sources).toEqual([paymentProfile.sources[0]]);
    });

    it("should handle unsuccessfully fetching payment profile", () => {
      const action: FluxStandardAction =
        actions.getPaymentProfileFailure(error);
      const reduced = billingInformation(state, action);
      expect(reduced.error).toEqual(error);
      expect(reduced.isFetching).toEqual(false);
    });
  });

  describe("Add new card", () => {
    it("should handle action to add a payment source info request", () => {
      const sourceId = "sourceId";
      const isPrimary = true;
      const action: FluxStandardAction = actions.addBillingCardRequest(
        sourceId,
        isPrimary
      );

      const reduced = billingInformation(state, action);
      expect(reduced.isFetching).toEqual(true);
      expect(reduced.error).toBeNull();
    });

    it("should handle failing to add a new card", () => {
      const action: FluxStandardAction = actions.addBillingCardFailure(error);

      const reduced = billingInformation(state, action);
      expect(reduced.isFetching).toEqual(false);
      expect(reduced.error).toEqual(error);
    });
  });

  describe("Remove billing card", () => {
    it("should handle action to remove a billing card request", () => {
      const token = "atoken";
      const action: FluxStandardAction =
        actions.removeBillingCardRequest(token);

      const reduced = billingInformation(state, action);
      expect(reduced.isFetching).toEqual(true);
      expect(reduced.error).toBeNull();
    });

    it("should handle failing to remove a billing card", () => {
      const action: FluxStandardAction =
        actions.removeBillingCardFailure(error);

      const reduced = billingInformation(state, action);
      expect(reduced.isFetching).toEqual(false);
      expect(reduced.error).toEqual(error);
    });
  });

  describe("Set primary card", () => {
    it("should handle action to set a primary card request", () => {
      const token = "token";
      const action: FluxStandardAction = actions.setPrimaryCardRequest(token);

      const reduced = billingInformation(state, action);
      expect(reduced.isFetching).toEqual(true);
      expect(reduced.error).toBeNull();
    });

    it("should handle failing to set a primary card request", () => {
      const action: FluxStandardAction = actions.setPrimaryCardFailure(error);
      const reduced = billingInformation(state, action);
      expect(reduced.isFetching).toEqual(false);
      expect(reduced.error).toEqual(error);
    });
  });
});
