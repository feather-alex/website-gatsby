import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import reducer, { initialState } from "./register.reducer";
import * as actions from "./register.actions";
import { Register } from "./register.types";
import { APIError } from "../../../../types/ReduxState";

describe("Register", () => {
  const email = "fake@user.com";
  const password = "somethingnotpublic";
  const error: APIError = {
    status: 500,
    message: "An error!",
    error: "Server failed to process request",
  };
  let state: Register;

  beforeEach(() => (state = { ...initialState }));

  it("should handle action to send registration email", () => {
    const action: FluxStandardAction = actions.registerRequest({
      email,
      password,
    });
    const auth = reducer(initialState, action);
    expect(auth.isFetching).toEqual(true);
    expect(auth.error).toBeNull();
    expect(auth.email).toEqual(email);
  });

  it("should handle successfully sending a registration email", () => {
    const action: FluxStandardAction = actions.registerSuccess();

    const auth = reducer(state, action);
    expect(auth.isFetching).toEqual(false);
    expect(auth.error).toBeNull();
    expect(auth.hasRegistered).toEqual(true);
  });

  it("should handle failing to send registration email", () => {
    const action: FluxStandardAction = actions.registerFailure(error);
    const auth = reducer(state, action);
    expect(auth.isFetching).toEqual(false);
    expect(auth.error).toEqual(error);
  });

  it("should handle reset has registered", () => {
    state = {
      ...state,
      hasRegistered: true,
    };
    const action: FluxStandardAction = actions.resetHasRegistered();
    const auth = reducer(state, action);
    expect(auth.hasRegistered).toEqual(false);
  });

  it("should handle setting the email", () => {
    const action: FluxStandardAction = actions.setRegisterEmail(email);
    const auth = reducer(state, action);
    expect(auth.email).toEqual(email);
  });
});
