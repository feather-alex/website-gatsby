import { FluxStandardAction } from "../../../types/FluxStandardActions";
import newsletterReducer, { initialState } from "./newsletter.signup.reducer";
import * as actions from "./newsletter.signup.actions";
import { APIError } from "../../../types/ReduxState";
import {
  NewsletterSignupRequestResource,
  NewsletterInputOrigin,
  NewsletterState,
} from "./newsletter.signup.types";

describe("Newsletter Signup - Reducer", () => {
  let state: NewsletterState;

  beforeEach(() => (state = { ...initialState }));

  it("should handle newsletter signup request action", () => {
    const email = "eng@mail.com";
    const requestData: NewsletterSignupRequestResource = {
      email,
      origin: NewsletterInputOrigin.FOOTER,
    };

    const action: FluxStandardAction = {
      type: actions.NEWSLETTER_SIGNUP_REQUEST,
      payload: { requestData },
    };

    const newsletterState = newsletterReducer(state, action);
    expect(newsletterState.isFetching).toEqual(true);
    expect(newsletterState.error).toBeNull();
    expect(newsletterState.email).toEqual(email);
  });

  it("should handle newsletter signup success action", () => {
    const action: FluxStandardAction = {
      type: actions.NEWSLETTER_SIGNUP_SUCCESS,
    };

    const newsletterState = newsletterReducer(state, action);
    expect(newsletterState.isFetching).toEqual(false);
    expect(newsletterState.error).toBeNull();
    expect(newsletterState.displaySuccess).toEqual(true);
  });

  it("should handle newsletter signup failure action", () => {
    const error: APIError = {
      error: "This is an error",
      message: "Bad, very bad",
      status: 400,
    };

    const action: FluxStandardAction = {
      type: actions.NEWSLETTER_SIGNUP_FAILURE,
      payload: { error },
    };

    const newsletterState = newsletterReducer(state, action);
    expect(newsletterState.isFetching).toEqual(false);
    expect(newsletterState.error).toEqual(error);
    expect(newsletterState.displaySuccess).toEqual(false);
  });

  it("should handle reset newsletter action", () => {
    const action: FluxStandardAction = {
      type: actions.RESET_NEWSLETTER_SIGNUP,
    };

    const newsletterState = newsletterReducer(state, action);
    expect(newsletterState.isFetching).toEqual(false);
    expect(newsletterState.error).toBeNull();
    expect(newsletterState.displaySuccess).toEqual(false);
    expect(newsletterState.email).toBeNull();
  });
});
