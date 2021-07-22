import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import * as actions from "./change.password.actions";
import { APIError } from "../../../../types/ReduxState";
import { ChangePasswordRequestResource } from "./change.password.types";

describe("Change Password - Actions", () => {
  const email = "eng@livefeather.com";
  const currentPassword = "userId";
  const newPassword = "password";

  const error: APIError = {
    error: "Here is another",
    message: "Some error about failure",
    status: 500,
  };

  it("should change password", () => {
    const credentials: ChangePasswordRequestResource = {
      email,
      currentPassword,
      newPassword,
    };

    const expectedAction: FluxStandardAction = {
      type: actions.CHANGE_PASSWORD_REQUEST,
      payload: { credentials },
    };
    const actionCreator = actions.changePasswordRequest({
      email,
      currentPassword,
      newPassword,
    });
    expect(actionCreator).toEqual(expectedAction);
  });

  it("should dispatch the correct action on success", () => {
    const expectedAction: FluxStandardAction = {
      type: actions.CHANGE_PASSWORD_SUCCESS,
    };
    const actionCreator = actions.changePasswordSuccess();
    expect(actionCreator).toEqual(expectedAction);
  });

  it("should return error on failure", () => {
    const expectedAction: FluxStandardAction = {
      type: actions.CHANGE_PASSWORD_FAILURE,
      payload: error,
      error: true,
    };
    const actionCreator = actions.changePasswordFailure(error);
    expect(actionCreator.type).toEqual(expectedAction.type);
    expect(actionCreator.error).toBeTruthy();
  });
});
