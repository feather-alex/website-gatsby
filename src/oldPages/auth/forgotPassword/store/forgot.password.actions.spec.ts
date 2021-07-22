import { APIError } from "../../../../types/ReduxState";
import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import * as actions from "./forgot.password.actions";

describe("Reset Password", () => {
  const error: APIError = {
    error: "Here is another",
    message: "Some error about failure",
    status: 400,
  };
  const email = "user@test.com";

  it("should send password reset email", () => {
    const expectedAction: FluxStandardAction = {
      type: actions.RESET_PASSWORD_REQUEST,
      payload: { email: { email } },
    };
    const action = actions.resetPasswordRequest({ email });
    expect(action).toEqual(expectedAction);
  });

  it("should dispatch the correct action on success", () => {
    const expectedAction: FluxStandardAction = {
      type: actions.RESET_PASSWORD_SUCCESS,
    };
    const action = actions.resetPasswordSuccess();
    expect(action).toEqual(expectedAction);
  });

  it("should return error on failure", () => {
    const expectedAction: FluxStandardAction = {
      type: actions.RESET_PASSWORD_FAILURE,
      payload: { error },
    };
    const action = actions.resetPasswordFailure(error);
    expect(action.type).toEqual(expectedAction.type);
  });

  it("should create a reset reset password has sent action", () => {
    const expectedAction: FluxStandardAction = {
      type: actions.RESET_RESET_PASSWORD_SENT,
    };
    const action = actions.resetResetPasswordSent();
    expect(action).toEqual(expectedAction);
  });
});
