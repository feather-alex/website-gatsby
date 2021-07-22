import {
  mockRequestPayload,
  mockSuccessPayload,
  mockError,
} from "./homepage.fixtures";
import homepageReducer, { initialState } from "./homepage.reducer";
import { getHomepageContent } from "./homepage.actions";
import { HomepageContentState } from "./homepage.types";

describe("Enterprise - Reducer", () => {
  let state: HomepageContentState;

  beforeEach(() => (state = { ...initialState }));

  it("Should handle action: GET_HOMEPAGE_REQUEST", () => {
    const action = getHomepageContent.request(mockRequestPayload);
    const reduced = homepageReducer(state, action);

    expect(reduced.isFetching).toEqual(true);
    expect(reduced.meta).toBeNull();
    expect(reduced.hero).toBeNull();
    expect(reduced.sections).toBeNull();
    expect(reduced.bestSellers).toBeNull();
    expect(reduced.textLockup).toBeNull();
    expect(reduced.shopByRoom).toBeNull();
    expect(reduced.reviews).toBeNull();
    expect(reduced.error).toBeNull();
  });

  it("Should handle action: GET_HOMEPAGE_SUCCESS", () => {
    const action = getHomepageContent.success(mockSuccessPayload);

    const reduced = homepageReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.meta).toEqual(mockSuccessPayload.meta);
    expect(reduced.hero).toEqual(mockSuccessPayload.hero);
    expect(reduced.sections).toEqual(mockSuccessPayload.homepageSections);
    expect(reduced.bestSellers).toEqual(mockSuccessPayload.bestSellers);
    expect(reduced.textLockup).toEqual(mockSuccessPayload.textLockup);
    expect(reduced.shopByRoom).toEqual(mockSuccessPayload.shopByRoom);
    expect(reduced.reviews).toEqual(mockSuccessPayload.reviews);
    expect(reduced.error).toBeNull();
  });

  it("Should handle action: GET_HOMEPAGE_FAILURE", () => {
    const action = getHomepageContent.failure(mockError);

    const reduced = homepageReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.meta).toBeNull();
    expect(reduced.hero).toBeNull();
    expect(reduced.sections).toBeNull();
    expect(reduced.bestSellers).toBeNull();
    expect(reduced.textLockup).toBeNull();
    expect(reduced.shopByRoom).toBeNull();
    expect(reduced.reviews).toBeNull();
    expect(reduced.error).toEqual(mockError);
  });
});
