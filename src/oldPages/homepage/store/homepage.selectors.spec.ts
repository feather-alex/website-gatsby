import { HomepageContentState } from "./homepage.types";
import { State as GlobalState } from "../../../types/ReduxState";
import * as selectors from "./homepage.selectors";
import { initialState } from "./homepage.reducer";
import { mockError, mockSuccessPayload } from "./homepage.fixtures";

describe("Homepage - Selectors", () => {
  let state: HomepageContentState;

  beforeAll(() => (state = { ...initialState }));

  it("Should return the value of: isFetching", () => {
    const value = true;

    state = {
      ...initialState,
      isFetching: value,
    };

    const selected = selectors.getIsFetching({
      homepage: state,
    } as GlobalState);

    expect(selected).toEqual(value);
  });

  it("Should return the value of: error", () => {
    state = {
      ...initialState,
      error: mockError,
    };

    const selected = selectors.getError({ homepage: state } as GlobalState);

    expect(selected).toEqual(mockError);
  });

  it("Should return the value of: meta", () => {
    state = {
      ...initialState,
      meta: mockSuccessPayload.meta,
    };

    const selected = selectors.getHomepageMeta({
      homepage: state,
    } as GlobalState);

    expect(selected).toEqual(mockSuccessPayload.meta);
  });

  it("Should return the value of: hero", () => {
    state = {
      ...initialState,
      hero: mockSuccessPayload.hero,
    };

    const selected = selectors.getHomepageHero({
      homepage: state,
    } as GlobalState);

    expect(selected).toEqual(mockSuccessPayload.hero);
  });

  it("Should return the value of: textLockup", () => {
    state = {
      ...initialState,
      textLockup: mockSuccessPayload.textLockup,
    };

    const selected = selectors.getHomepageTextLockup({
      homepage: state,
    } as GlobalState);

    expect(selected).toEqual(mockSuccessPayload.textLockup);
  });

  it("Should return the value of: sections", () => {
    state = {
      ...initialState,
      sections: mockSuccessPayload.homepageSections,
    };

    const selected = selectors.getHomepageSections({
      homepage: state,
    } as GlobalState);

    expect(selected).toEqual(mockSuccessPayload.homepageSections);
  });

  it("Should return the value of: bestSellers", () => {
    state = {
      ...initialState,
      bestSellers: mockSuccessPayload.bestSellers,
    };

    const selected = selectors.getHomepageBestSellers({
      homepage: state,
    } as GlobalState);

    expect(selected).toEqual(mockSuccessPayload.bestSellers);
  });

  it("Should return the value of: shopByRoom", () => {
    state = {
      ...initialState,
      shopByRoom: mockSuccessPayload.shopByRoom,
    };

    const selected = selectors.getHomepageShopByRoom({
      homepage: state,
    } as GlobalState);

    expect(selected).toEqual(mockSuccessPayload.shopByRoom);
  });

  it("Should return the value of: reviews", () => {
    state = {
      ...initialState,
      reviews: mockSuccessPayload.reviews,
    };

    const selected = selectors.getHomepageReviews({
      homepage: state,
    } as GlobalState);

    expect(selected).toEqual(mockSuccessPayload.reviews);
  });
});
