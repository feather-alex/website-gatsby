import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import * as actions from "./billing.information.actions";
import { APIError } from "../../../../types/ReduxState";
import { BillingSourcesResource } from "./billing.information.types";

describe("Plan & Billing - Actions", () => {
  const error: APIError = {
    status: 500,
    error: "error stack here",
    message: "error message that tells you nothing",
  };

  describe("Payment Profile", () => {
    const paymentProfile: BillingSourcesResource = {
      id: "somecardno",
      defaultSourceId: "some source id",
      sources: [
        {
          sourceType: "card",
          id: "somecardno",
          lastFour: "5746",
          expMonth: 9,
          expYear: 22,
        },
      ],
    };

    it("should create a get payment profile request action", () => {
      const expectedAction: FluxStandardAction = {
        type: actions.GET_PAYMENT_PROFILE_REQUEST,
      };
      const action = actions.getPaymentProfileRequest();
      expect(action).toEqual(expectedAction);
    });

    it("should create a get payment profile success action", () => {
      const expectedAction: FluxStandardAction = {
        type: actions.GET_PAYMENT_PROFILE_SUCCESS,
        payload: paymentProfile,
      };
      const action = actions.getPaymentProfileSuccess(paymentProfile);
      expect(action).toEqual(expectedAction);
    });

    it("should create a get payment profile failure action", () => {
      const expectedAction: FluxStandardAction = {
        type: actions.GET_PAYMENT_PROFILE_FAILURE,
        payload: error,
        error: true,
      };
      const action = actions.getPaymentProfileFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });

  describe("Add new billing card", () => {
    it("should create an add new card request action", () => {
      const sourceId = "";
      const isPrimary = true;
      const expectedAction: FluxStandardAction = {
        type: actions.ADD_NEW_BILLING_CARD_REQUEST,
        payload: { sourceId, isPrimary },
      };

      const action = actions.addBillingCardRequest(sourceId, isPrimary);
      expect(action).toEqual(expectedAction);
    });

    it("should create an add new card failure action", () => {
      const expectedAction: FluxStandardAction = {
        type: actions.ADD_NEW_BILLING_CARD_FAILURE,
        payload: error,
        error: true,
      };

      const action = actions.addBillingCardFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });

  describe("Set primary card", () => {
    it("should create a set primary card action", () => {
      const token = "";
      const expectedAction: FluxStandardAction = {
        type: actions.SET_PRIMARY_CARD_REQUEST,
        payload: { token },
      };

      const action = actions.setPrimaryCardRequest(token);
      expect(action).toEqual(expectedAction);
    });

    it("should create a set primary card failure action", () => {
      const expectedAction: FluxStandardAction = {
        type: actions.SET_PRIMARY_CARD_FAILURE,
        payload: error,
        error: true,
      };

      const action = actions.setPrimaryCardFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });

  describe("Remove billing card", () => {
    it("should create a remove billing card request action", () => {
      const token = "";
      const expectedAction: FluxStandardAction = {
        type: actions.REMOVE_BILLING_CARD_REQUEST,
        payload: { token },
      };

      const action = actions.removeBillingCardRequest(token);
      expect(action).toEqual(expectedAction);
    });

    it("should create a remove billing card failure action", () => {
      const expectedAction: FluxStandardAction = {
        type: actions.REMOVE_BILLING_CARD_FAILURE,
        payload: error,
        error: true,
      };

      const action = actions.removeBillingCardFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });
});
