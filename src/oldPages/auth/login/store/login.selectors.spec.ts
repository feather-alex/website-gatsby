import { State as GlobalState } from "../../../../types/ReduxState";
import * as selectors from "./login.selectors";
import { Login } from "./login.types";
import { initialState } from "./login.reducer";

describe("Login selectors", () => {
  let state: Login;

  beforeEach(() => {
    state = { ...initialState };
  });

  it("should return whether we are currently fetching from the API", () => {
    const isFetching = selectors.getIsFetching({
      auth: { login: state },
    } as GlobalState);
    expect(isFetching).toEqual(false);
  });

  it("should return email value", () => {
    const email = selectors.getEmail({ auth: { login: state } } as GlobalState);
    expect(email).toEqual("");
  });

  it("should return the current error", () => {
    const error = selectors.getError({ auth: { login: state } } as GlobalState);
    expect(error).toEqual(null);
  });

  it("should return whether the user is currently authenticated", () => {
    const authenticated = selectors.getIsAuthenticated({
      auth: { login: state },
    } as GlobalState);
    expect(authenticated).toEqual(false);
  });

  it("should return the current name value", () => {
    const name = selectors.getName({ auth: { login: state } } as GlobalState);
    expect(name).toEqual("");
  });

  describe("determining if the email address has not yet been verified", () => {
    it("should return null when error is null (default state)", () => {
      const emailHasNotBeenVerified = selectors.getEmailHasNotBeenVerified({
        auth: { login: state },
      } as GlobalState);
      expect(emailHasNotBeenVerified).toEqual(null);
    });

    it("should return false when error is present, but not the error we are looking for", () => {
      state = {
        ...state,
        error: {
          status: 500,
          message: "Server messed this one up...",
          error: "Whoops",
        },
      };
      const emailHasNotBeenVerified = selectors.getEmailHasNotBeenVerified({
        auth: { login: state },
      } as GlobalState);
      expect(emailHasNotBeenVerified).toEqual(false);
    });

    it("should return true when the error is present, and is the error we are looking for", () => {
      state = {
        ...state,
        error: {
          status: 403,
          message: "Verify your address",
          error: "An important error",
        },
      };
      const emailHasNotBeenVerified = selectors.getEmailHasNotBeenVerified({
        auth: { login: state },
      } as GlobalState);
      expect(emailHasNotBeenVerified).toEqual(true);
    });
  });

  describe("determining the posessive account name to show", () => {
    it("should return null if not authenticated (default state)", () => {
      const accountName = selectors.getAccountName({
        auth: { login: state },
      } as GlobalState);
      expect(accountName).toEqual(null);
    });

    it("should return null if name is an empty string", () => {
      state = {
        ...state,
        name: "",
      };
      const accountName = selectors.getAccountName({
        auth: { login: state },
      } as GlobalState);
      expect(accountName).toEqual(null);
    });

    it(`should return the possessive form of a name that does NOT end with 's'`, () => {
      state = {
        ...state,
        authenticated: true,
        name: "Ted",
      };
      const accountName = selectors.getAccountName({
        auth: { login: state },
      } as GlobalState);
      expect(accountName).toEqual(`Ted's`);
    });

    it(`should return the possessive form of a name that end with 's'`, () => {
      state = {
        ...state,
        authenticated: true,
        name: "Jess",
      };
      const accountName = selectors.getAccountName({
        auth: { login: state },
      } as GlobalState);
      expect(accountName).toEqual(`Jess'`);
    });
  });
});
