import { FaqContentState } from "./faqs.types";
import { State as GlobalState } from "../../../types/ReduxState";
import * as selectors from "./faqs.selectors";
import { initialState } from "./faqs.reducer";
import { mockError, makeMockFaqCategory } from "./faqs.fixtures";

describe("FAQ - Selectors", () => {
  let state: FaqContentState;

  beforeAll(() => (state = { ...initialState }));

  it("Should return a list of: FAQ categories", () => {
    state = {
      ...initialState,
      faqCategories: [
        makeMockFaqCategory("Billing"),
        makeMockFaqCategory("Covid-19"),
      ],
    };
    const selected = selectors.getFAQCategories({ faq: state } as GlobalState);

    expect(selected.length).toEqual(2);
  });

  it("Should return the value of: meta", () => {
    const value = {
      name: "a",
      description: "b",
      imageUrl: "c",
      title: "d",
    };

    state = {
      ...initialState,
      meta: value,
    };

    const selected = selectors.getMeta({ faq: state } as GlobalState);

    expect(selected).toEqual(value);
  });

  it("Should return the value of: isFetching", () => {
    const value = true;

    state = {
      ...initialState,
      isFetching: value,
    };

    const selected = selectors.getIsFetching({ faq: state } as GlobalState);

    expect(selected).toBeTruthy();
  });

  it("Should return the value of: error", () => {
    state = {
      ...initialState,
      error: mockError,
    };

    const selected = selectors.getError({ faq: state } as GlobalState);

    expect(selected).toEqual(mockError);
  });
});
