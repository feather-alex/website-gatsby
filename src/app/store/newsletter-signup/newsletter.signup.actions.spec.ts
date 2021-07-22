import { FluxStandardAction } from "../../../types/FluxStandardActions";
import * as actions from "./newsletter.signup.actions";
import { APIError } from "../../../types/ReduxState";
import {
  NewsletterSignupRequestResource,
  NewsletterInputOrigin,
} from "./newsletter.signup.types";

describe("Newsletter Signup - Actions", () => {
  it("should create a newsletter signup request action", () => {
    const requestData: NewsletterSignupRequestResource = {
      email: "eng@mail.com",
      origin: NewsletterInputOrigin.FOOTER,
    };

    const expectedAction: FluxStandardAction = {
      type: actions.NEWSLETTER_SIGNUP_REQUEST,
      payload: { requestData },
    };

    const action = actions.newsletterSignupRequest(requestData);
    expect(action).toEqual(expectedAction);
  });

  it("should create a newsletter signup success action", () => {
    const expectedAction: FluxStandardAction = {
      type: actions.NEWSLETTER_SIGNUP_SUCCESS,
    };

    const action = actions.newsletterSignupSuccess();
    expect(action).toEqual(expectedAction);
  });

  it("should create a newsletter signup failure action", () => {
    const error: APIError = {
      error: "This is an error",
      message: "Bad, very bad",
      status: 400,
    };

    const expectedAction: FluxStandardAction = {
      type: actions.NEWSLETTER_SIGNUP_FAILURE,
      payload: { error },
    };

    const action = actions.newsletterSignupFailure(error);
    expect(action).toEqual(expectedAction);
  });

  it("should create a reset newsletter action", () => {
    const expectedAction: FluxStandardAction = {
      type: actions.RESET_NEWSLETTER_SIGNUP,
    };

    const action = actions.resetNewsletterSignup();
    expect(action).toEqual(expectedAction);
  });
});
