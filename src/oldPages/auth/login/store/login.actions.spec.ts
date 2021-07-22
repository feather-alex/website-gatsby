import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import { APIError } from "../../../../types/ReduxState";
import { LoginResponseResource, LoginRequestResource } from "./login.types";
import * as actions from "./login.actions";

describe("Login Actions", () => {
  describe("Login", () => {
    it("should create a login action", () => {
      const credentials: LoginRequestResource = {
        email: "test@email.com",
        password: "mysecretpasscode",
      };
      const expectedAction: FluxStandardAction = {
        type: actions.LOGIN_REQUEST,
        payload: { credentials },
      };
      const action = actions.logIn(credentials);
      expect(action).toEqual(expectedAction);
    });

    it("should create a login success action", () => {
      const authResource: LoginResponseResource = {
        isFirstLogin: false,
        firstName: "Tester",
        lastName: "Terry",
        token: "lotsoflettersandnumbersandstuff",
        expiresIn: 678400,
        customerId: 123,
      };
      const expectedAction: FluxStandardAction = {
        type: actions.LOGIN_SUCCESS,
        payload: { auth: authResource },
      };
      const action = actions.loginSuccess(authResource);
      expect(action).toEqual(expectedAction);
    });

    it("should create a login failure action", () => {
      const error: APIError = {
        error: "Here is another",
        message: "Some error about failure",
        status: 400,
      };

      const expectedAction: FluxStandardAction = {
        type: actions.LOGIN_FAILURE,
        payload: { error },
      };

      const action = actions.loginFailure(error);
      expect(action).toEqual(expectedAction);
    });

    it("should create an action to reset login state", () => {
      const expectedAction: FluxStandardAction = {
        type: actions.LOGIN_RESET,
      };

      const action = actions.loginReset();
      expect(action).toEqual(expectedAction);
    });
  });

  describe("Log out", () => {
    it("should create a log out action", () => {
      const expectedAction: FluxStandardAction = {
        type: actions.LOGOUT_REQUEST,
      };
      const action = actions.logOut();
      expect(action).toEqual(expectedAction);
    });
  });

  describe("Check authentication", () => {
    it("should create a check authentication action", () => {
      const expectedAction: FluxStandardAction = {
        type: actions.CHECK_AUTHENTICATION,
      };
      const action = actions.checkAuthentication();
      expect(action).toEqual(expectedAction);
    });

    it("should create a reset authentication action", () => {
      const expectedAction: FluxStandardAction = {
        type: actions.RESET_AUTHENTICATION,
      };
      const action = actions.resetAuthentication();
      expect(action).toEqual(expectedAction);
    });
  });
});
