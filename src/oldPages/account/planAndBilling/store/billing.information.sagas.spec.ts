import { expectSaga } from "redux-saga-test-plan";
import { APIError } from "../../../../types/ReduxState";
import * as actions from "./billing.information.actions";
import * as matchers from "redux-saga-test-plan/matchers";
import Request, { RequestMethod } from "../../../../api/request";
import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import {
  BillingResource,
  BillingSourcesResource,
} from "./billing.information.types";
import {
  getPaymentProfile,
  removeBillingCard,
  addBillingCard,
  setPrimaryCard,
} from "./billing.information.sagas";
import { logOut } from "../../../auth/login/store/login.actions";

describe("Billing Information - Sagas", () => {
  const sources: BillingSourcesResource = {
    defaultSourceId: "somecardno",
    id: "",
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

  const billingInfoResponse: BillingResource = {
    id: "somecardno",
    sourceType: "card",
    lastFour: "5746",
    expMonth: 9,
    expYear: 22,
  };

  const token = "somecardno";

  describe("Getting payment profile information", () => {
    it("should handle successfully getting payment profile information", () => {
      const billingSourcesResponse: BillingSourcesResource = {
        id: "id",
        defaultSourceId: "12345",
        sources: [
          {
            id: "12345",
            sourceType: "card",
            lastFour: "4345",
            expMonth: 12,
            expYear: 22,
          },
        ],
      };

      return expectSaga(getPaymentProfile)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.GET,
              "/account/payment-sources"
            ),
            billingSourcesResponse,
          ],
        ])
        .put(actions.getPaymentProfileSuccess(billingSourcesResponse))
        .run();
    });

    it("should handle unsuccessfully getting payment profile information", () => {
      const apiError: APIError = {
        error: "error",
        message: "error message",
        status: 500,
      };

      return expectSaga(getPaymentProfile)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.GET,
              "/account/payment-sources"
            ),
            Promise.reject(apiError),
          ],
        ])
        .put(actions.getPaymentProfileFailure(apiError))
        .run();
    });

    it("should handle unsuccessfully getting payment profile information due to being unauthenticated", () => {
      const apiError: APIError = {
        error: "Unauthenticated",
        message: "error message",
        status: 401,
      };

      return expectSaga(getPaymentProfile)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.GET,
              "/account/payment-sources"
            ),
            Promise.reject(apiError),
          ],
        ])
        .put(actions.getPaymentProfileFailure(apiError))
        .put(logOut())
        .run();
    });
  });

  describe("Add a new billing card", () => {
    const action: FluxStandardAction = actions.addBillingCardRequest(
      "sourceId",
      false
    );

    it("should handle successfully adding a new billing card", () => {
      return expectSaga(addBillingCard, action)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.POST,
              `/account/payment-sources`,
              undefined,
              action.payload,
              false
            ),
            billingInfoResponse,
          ],
        ])
        .put(actions.getPaymentProfileRequest())
        .run();
    });

    it("should handle unsuccessfully adding a new card and its a server error", () => {
      const apiError: APIError = {
        error: "error",
        message: "error message",
        status: 500,
      };

      return expectSaga(addBillingCard, action)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.POST,
              `/account/payment-sources`,
              undefined,
              action.payload,
              false
            ),
            Promise.reject(apiError),
          ],
        ])
        .put(actions.addBillingCardFailure(apiError))
        .run();
    });

    it("should handle unsuccessfully adding a new card due to not being authenticated", () => {
      const apiError: APIError = {
        error: "Unauthenticated",
        message: "error message",
        status: 401,
      };

      return expectSaga(addBillingCard, action)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.POST,
              `/account/payment-sources`,
              undefined,
              action.payload,
              false
            ),
            Promise.reject(apiError),
          ],
        ])
        .put(actions.addBillingCardFailure(apiError))
        .put(logOut())
        .run();
    });

    it("should handle unsuccessfully adding a new card and its a stripe processing error", () => {
      const stripeError = {
        status: 400,
        message: "The request data is invalid.",
        error: "Bad Request",
        body: {
          error: "Your card was declined",
        },
      };
      const formattedStripeError: APIError = {
        status: 400,
        message: stripeError.body.error,
        error: stripeError.error,
      };
      return expectSaga(addBillingCard, action)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.POST,
              `/account/payment-sources`,
              undefined,
              action.payload,
              false
            ),
            Promise.reject(stripeError),
          ],
        ])
        .put(actions.addBillingCardFailure(formattedStripeError))
        .run();
    });
  });

  describe("Set primary card", () => {
    const action: FluxStandardAction = actions.setPrimaryCardRequest(token);

    it("should handle successfully setting a billing source to default", () => {
      return expectSaga(setPrimaryCard, action)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.PUT,
              `/account/payment-sources/${action.payload.token}/default`
            ),
            sources,
          ],
        ])
        .put(actions.getPaymentProfileRequest())
        .run();
    });

    it("should handle unsuccessfully setting a billing source to default", () => {
      const apiError: APIError = {
        error: "error",
        message: "error message",
        status: 500,
      };

      return expectSaga(setPrimaryCard, action)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.PUT,
              `/account/payment-sources/${token}/default`
            ),
            Promise.reject(apiError),
          ],
        ])
        .put(actions.setPrimaryCardFailure(apiError))
        .run();
    });

    it("should handle unsuccessfully setting a billing source to default due to being unauthenticated", () => {
      const apiError: APIError = {
        error: "Unauthenticated",
        message: "error message",
        status: 401,
      };

      return expectSaga(setPrimaryCard, action)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.PUT,
              `/account/payment-sources/${token}/default`
            ),
            Promise.reject(apiError),
          ],
        ])
        .put(actions.setPrimaryCardFailure(apiError))
        .put(logOut())
        .run();
    });
  });

  describe("Remove billing card", () => {
    const action: FluxStandardAction = actions.removeBillingCardRequest(token);

    it("should handle successfully removing a billing card", () => {
      return expectSaga(removeBillingCard, action)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.DELETE,
              `/account/payment-sources/${action.payload.token}`
            ),
            action.payload.token,
          ],
        ])
        .put(actions.getPaymentProfileRequest())
        .run();
    });

    it("should handle unsuccessfully removing a billing card", () => {
      const apiError: APIError = {
        error: "error",
        message: "error message",
        status: 500,
      };

      return expectSaga(removeBillingCard, action)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.DELETE,
              `/account/payment-sources/${action.payload.token}`
            ),
            Promise.reject(apiError),
          ],
        ])
        .put(actions.removeBillingCardFailure(apiError))
        .run();
    });

    it("should handle unsuccessfully removing a billing card due to being unauthenticated", () => {
      const apiError: APIError = {
        error: "Unauthenticated",
        message: "error message",
        status: 401,
      };

      return expectSaga(removeBillingCard, action)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.DELETE,
              `/account/payment-sources/${action.payload.token}`
            ),
            Promise.reject(apiError),
          ],
        ])
        .put(actions.removeBillingCardFailure(apiError))
        .put(logOut())
        .run();
    });
  });
});
