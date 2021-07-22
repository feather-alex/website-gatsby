import { ContactRequest, ReasonsForInquiry } from "./contact.types";
import { FluxStandardAction } from "../../../types/FluxStandardActions";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import * as actions from "./contact.actions";
import { APIError } from "../../../types/ReduxState";
import * as sagas from "./contact.sagas";
import { reset } from "redux-form";
import Request, { RequestMethod } from "../../../api/request";

describe("Contact Page - Sagas", () => {
  describe("handleInquiryRequest", () => {
    const formValues = {
      fullName: "Jeffrey",
      emailAddress: "jnflynn93@aol.com",
      messageBody: "Omg, Feather is toats like the best ever.",
      reasonForInquiry: ReasonsForInquiry.Affiliates,
      companyName: "Feather",
    };

    const action: FluxStandardAction = {
      type: actions.SEND_INQUIRY_REQUEST,
      payload: formValues,
    };

    const inquiryRequestPayload: ContactRequest = {
      name: "Jeffrey",
      email: "jnflynn93@aol.com",
      company: "Feather",
      reasonForInquiry: ReasonsForInquiry.Affiliates,
      message: "Omg, Feather is toats like the best ever.",
    };

    it("Should handle a successful execution.", () => {
      return expectSaga(sagas.handleInquiryRequest, action)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.POST,
              "/inquiry",
              undefined,
              inquiryRequestPayload,
              true
            ),
            inquiryRequestPayload,
          ],
        ])
        .put(actions.sendInquirySuccess())
        .put(reset("contact"))
        .run();
    });

    it("Should handle a failed execution.", () => {
      const error: APIError = {
        error: "lil error boi",
        message: "causin all sorts of problems",
        status: 401,
      };

      return expectSaga(sagas.handleInquiryRequest, action)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.POST,
              "/inquiry",
              undefined,
              inquiryRequestPayload,
              true
            ),
            Promise.reject(error),
          ],
        ])
        .put(actions.sendInquiryFailure(error))
        .run();
    });
  });
});
