import { getContentfulPages } from "./pages.actions";
import { mockError, mockSuccessPayload } from "./pages.fixtures";
import pagesReducer, { initialState } from "./pages.reducer";
import { ContentfulPagesState } from "./pages.types";

describe("Contentful Pages - Reducer", () => {
  let state: ContentfulPagesState;

  beforeEach(() => (state = { ...initialState }));

  it("Should handle action: CONTENTFUL_PAGES_REQUEST", () => {
    const action = getContentfulPages.request();
    const reduced = pagesReducer(state, action);

    expect(reduced.isFetching).toEqual(true);
    expect(reduced.pages).toEqual([]);
    expect(reduced.error).toBeNull();
  });

  it("Should handle action: CONTENTFUL_PAGES_SUCCESS", () => {
    const action = getContentfulPages.success(mockSuccessPayload);
    const reduced = pagesReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.pages).toEqual(mockSuccessPayload.pages);
    expect(reduced.error).toBeNull();
  });

  it("Should handle action: CONTENTFUL_PAGES_FAILURE", () => {
    const action = getContentfulPages.failure(mockError);
    const reduced = pagesReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.pages).toEqual([]);
    expect(reduced.error).toEqual(mockError);
  });
});
