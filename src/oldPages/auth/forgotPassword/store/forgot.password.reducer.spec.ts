import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import { APIError } from "../../../../types/ReduxState";
import { ForgotPassword } from "./forgot.password.types";
import reducer, { initialState } from "./forgot.password.reducer";
import * as actions from "./forgot.password.actions";

describe("Reset Password Reducer", () => {
  const email = "user@test.com";
  const error: APIError = {
    status: 500,
    message: "An error occurred!",
    error: "whoops",
  };
  let state: ForgotPassword;

  beforeEach(() => (state = { ...initialState }));

  it("should handle action to send password reset email", () => {
    const action: FluxStandardAction = actions.resetPasswordRequest({ email });
    const auth = reducer(state, action);
    expect(auth.isFetching).toEqual(true);
    expect(auth.error).toBeNull();
    expect(auth.email).toEqual(email);
  });

  it("should handle successfully sending a password reset email", () => {
    const action: FluxStandardAction = actions.resetPasswordSuccess();

    const auth = reducer(state, action);
    expect(auth.isFetching).toEqual(false);
    expect(auth.error).toBeNull();
    expect(auth.hasSentResetPasswordLink).toEqual(true);
  });

  it("should handle failing to send password reset email", () => {
    const action: FluxStandardAction = actions.resetPasswordFailure(error);
    const auth = reducer(state, action);
    expect(auth.isFetching).toEqual(false);
    expect(auth.error).toEqual(error);
  });

  it("should handle reset of the reset password link sent", () => {
    state = {
      ...state,
      hasSentResetPasswordLink: true,
    };
    const action: FluxStandardAction = actions.resetResetPasswordSent();
    const auth = reducer(state, action);
    expect(auth.hasSentResetPasswordLink).toEqual(false);
  });
});
