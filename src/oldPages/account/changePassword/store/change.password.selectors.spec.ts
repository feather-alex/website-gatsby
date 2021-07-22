import { State as GlobalState } from "../../../../types/ReduxState";
import { ChangePassword } from "./change.password.types";
import { initialState } from "./change.password.reducer";
import * as selectors from "./change.password.selectors";

describe("Chnage Password - Selectors", () => {
  let state: ChangePassword;

  beforeEach(() => {
    state = { ...initialState };
  });

  it("should return isFetching", () => {
    const isFetching = selectors.getIsFetching({
      accounts: { changePassword: state },
    } as GlobalState);
    expect(isFetching).toEqual(initialState.isFetching);
  });

  it("should return isPasswordUpdated", () => {
    const isPasswordUpdated = selectors.getIsPasswordUpdated({
      accounts: { changePassword: state },
    } as GlobalState);
    expect(isPasswordUpdated).toEqual(initialState.isPasswordUpdated);
  });

  it("should return error as null", () => {
    const error = selectors.getError({
      accounts: { changePassword: state },
    } as GlobalState);
    expect(error).toEqual(initialState.error);
    expect(error).toBeNull();
  });
});
