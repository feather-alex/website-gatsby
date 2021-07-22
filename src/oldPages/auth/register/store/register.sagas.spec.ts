import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import { APIError } from "../../../../types/ReduxState";
import Request, { RequestMethod } from "../../../../api/request";
import {
  registerRequest,
  registerSuccess,
  registerFailure,
} from "./register.actions";
import { handleRegister } from "./register.sagas";
import { RegisterRequestResource } from "./register.types";

describe("Registration Sagas", () => {
  const email = "test@domain.biz";
  const password = "secretsecretsecret";

  it("should handle successfully registering", () => {
    const credentials: RegisterRequestResource = {
      email,
      password,
    };
    const action: FluxStandardAction = registerRequest(credentials);

    return expectSaga(handleRegister, action)
      .provide([
        [
          matchers.call(
            [Request, "send"],
            RequestMethod.POST,
            "/auth/register",
            undefined,
            credentials,
            true
          ),
          {},
        ],
      ])
      .put(registerSuccess())
      .run();
  });

  it("should handle unsuccessfully registering", () => {
    const apiError: APIError = {
      error: "Error coming through",
      message: "Heads up, this is failing",
      status: 500,
    };
    const credentials: RegisterRequestResource = {
      email,
      password,
    };

    const action: FluxStandardAction = registerRequest(credentials);

    return expectSaga(handleRegister, action)
      .provide([
        [
          matchers.call(
            [Request, "send"],
            RequestMethod.POST,
            "/auth/register",
            undefined,
            { email, password },
            true
          ),
          Promise.reject(apiError),
        ],
      ])
      .put(registerFailure(apiError))
      .run();
  });
});
