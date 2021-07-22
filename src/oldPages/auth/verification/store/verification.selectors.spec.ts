import { State as GlobalState } from "../../../../types/ReduxState";
import { Verification } from "./verification.types";
import { initialState } from "./verification.reducer";
import * as selectors from "./verification.selectors";

describe("Verification selectors", () => {
  let state: Verification;

  beforeEach(() => {
    state = { ...initialState };
  });

  it("should return whether we are currently fetching from the API", () => {
    const isFetching = selectors.getIsFetching({
      auth: { verification: state },
    } as GlobalState);
    expect(isFetching).toEqual(false);
  });

  it("should return the current error", () => {
    const error = selectors.getError({
      auth: { verification: state },
    } as GlobalState);
    expect(error).toEqual(null);
  });

  it("should return the flag to track if the user has re-sent the verificiation link", () => {
    const hasSentResetPasswordLink = selectors.getHasResentVerificationEmail({
      auth: { verification: state },
    } as GlobalState);
    expect(hasSentResetPasswordLink).toEqual(false);
  });
});
