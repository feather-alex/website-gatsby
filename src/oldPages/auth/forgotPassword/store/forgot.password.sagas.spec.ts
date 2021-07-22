import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import { APIError } from "../../../../types/ReduxState";
import Request, { RequestMethod } from "../../../../api/request";
import { handleResetPassword } from "./forgot.password.sagas";
import {
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
} from "./forgot.password.actions";

describe("Reset Password", () => {
  const email = "test@test.co";

  it("should handle successfully resetting the password", () => {
    const action: FluxStandardAction = resetPasswordRequest({ email });

    return expectSaga(handleResetPassword, action)
      .provide([
        [
          matchers.call(
            [Request, "send"],
            RequestMethod.POST,
            "/auth/reset-password",
            undefined,
            {
              email,
            },
            true
          ),
          undefined,
        ],
      ])
      .put(resetPasswordSuccess())
      .run();
  });

  it("should handle unsuccessfully resetting the password", () => {
    const apiError: APIError = {
      error: "Error coming through",
      message: "Heads up, this is failing",
      status: 500,
    };

    const action: FluxStandardAction = resetPasswordRequest({ email });

    return expectSaga(handleResetPassword, action)
      .provide([
        [
          matchers.call(
            [Request, "send"],
            RequestMethod.POST,
            "/auth/reset-password",
            undefined,
            {
              email,
            },
            true
          ),
          Promise.reject(apiError),
        ],
      ])
      .put(resetPasswordFailure(apiError))
      .run();
  });
});
