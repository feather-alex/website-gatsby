import {
  mockRequestPayload,
  mockSuccessPayload,
  mockError,
} from "./featherPerks.fixtures";
import featherPerksReducer, { initialState } from "./featherPerks.reducer";
import { getFeatherPerksContent } from "./featherPerks.actions";
import { FeatherPerksContentState } from "./featherPerks.types";

describe("Enterprise - Reducer", () => {
  let state: FeatherPerksContentState;

  beforeEach(() => (state = { ...initialState }));

  it("Should handle action: GET_FEATHER_PERKS_REQUEST", () => {
    const action = getFeatherPerksContent.request(mockRequestPayload);
    const reduced = featherPerksReducer(state, action);

    expect(reduced.isFetching).toEqual(true);
    expect(reduced.error).toBeNull();
    expect(reduced.perks).toBeNull();
  });

  it("Should handle action: GET_FEATHER_PERKS_SUCCESS", () => {
    const action = getFeatherPerksContent.success(mockSuccessPayload);

    const reduced = featherPerksReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.error).toBeNull();
    expect(reduced.perks).toEqual(mockSuccessPayload.perks);
  });

  it("Should handle action: GET_FEATHER_PERKS_FAILURE", () => {
    const action = getFeatherPerksContent.failure(mockError);

    const reduced = featherPerksReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.error).toEqual(mockError);
    expect(reduced.perks).toBeNull();
  });
});
