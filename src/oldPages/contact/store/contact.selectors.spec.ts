import { State as GlobalState } from "../../../types/ReduxState";
import { ContactState } from "./contact.types";
import { initialState } from "./contact.reducer";
import * as selectors from "./contact.selectors";

describe("Contact Page - Selectors", () => {
  let state: ContactState;

  it("Should get the value of: isProcessingRequest", () => {
    const value = true;

    state = {
      ...initialState,
      isProccessingRequest: value,
    };

    const selected = selectors.getIsProcessingRequest({
      contact: state,
    } as GlobalState);

    expect(selected).toEqual(value);
  });

  it("Should get the value of: displayErrorMessage", () => {
    const value = true;

    state = {
      ...initialState,
      displayErrorMessage: value,
    };

    const selected = selectors.getDisplayErrorMessage({
      contact: state,
    } as GlobalState);

    expect(selected).toEqual(value);
  });

  it("Should get the value of: displaySuccessMessage", () => {
    const value = true;

    state = {
      ...initialState,
      displaySuccessMessage: value,
    };

    const selected = selectors.getDisplaySuccessMessage({
      contact: state,
    } as GlobalState);

    expect(selected).toEqual(value);
  });
});
