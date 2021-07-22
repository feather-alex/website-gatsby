import { FluxStandardAction } from "../../../types/FluxStandardActions";
import { initialState } from "./search.reducer";
import searchReducer from "./search.reducer";
import * as actions from "./search.actions";
import { Search } from "./search.types";
import { APIError } from "../../../types/ReduxState";

describe("Search Page - Reducer", () => {
  let state: Search;

  beforeEach(() => (state = { ...initialState }));

  it("Should handle action: ADD_SEARCH_KEYWORD", () => {
    const payload = {
      keyword: "chair",
    };

    const action: FluxStandardAction = {
      type: actions.ADD_SEARCH_KEYWORD,
      payload,
    };

    const reduced = searchReducer(state, action);

    expect(reduced.keyword).toEqual(payload.keyword);
  });

  it("Should handle action: GET_SEARCH_PRODUCTS_REQUEST", () => {
    const action: FluxStandardAction = {
      type: actions.GET_SEARCH_PRODUCTS_REQUEST,
    };

    const reduced = searchReducer(state, action);

    expect(reduced.products.isFetching).toEqual(true);
    expect(reduced.products.isInfiniteLoading).toEqual(false);
  });

  it("Should handle action: GET_SEARCH_PRODUCTS_SUCCESS (no infinite loading)", () => {
    const payload = {
      total: 13,
      pageData: [1, 2, 3, 4, 5],
    };

    const action: FluxStandardAction = {
      type: actions.GET_SEARCH_PRODUCTS_SUCCESS,
      payload,
    };

    const reduced = searchReducer(state, action);

    expect(reduced.products.isFetching).toEqual(false);
    expect(reduced.products.total).toEqual(payload.total);
    expect(reduced.products.data).toEqual(payload.pageData);
    expect(reduced.products.error).toEqual(null);
  });

  it("Should handle action: GET_SEARCH_PRODUCTS_SUCCESS (with infinite loading)", () => {
    state = {
      ...initialState,
      products: {
        ...initialState.products,
        isInfiniteLoading: true,
        // TODO: Fix this the next time the file is edited.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: [-1, 0] as any,
      },
    };

    const payload = {
      total: 13,
      pageData: [1, 2, 3, 4, 5],
    };

    const action: FluxStandardAction = {
      type: actions.GET_SEARCH_PRODUCTS_SUCCESS,
      payload,
    };

    const reduced = searchReducer(state, action);

    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const expectedProductsData = state.products.data.concat(
      payload.pageData as any
    );

    expect(reduced.products.isFetching).toEqual(false);
    expect(reduced.products.total).toEqual(payload.total);
    expect(reduced.products.data).toEqual(expectedProductsData);
    expect(reduced.products.error).toEqual(null);
  });

  it("Should handle action: GET_SEARCH_PRODUCTS_FAILURE", () => {
    const payload: APIError = {
      error: "Some error here",
      message: "Something else.",
      status: 500,
    };

    const action: FluxStandardAction = {
      type: actions.GET_SEARCH_PRODUCTS_FAILURE,
      payload,
      error: true,
    };

    const reduced = searchReducer(state, action);

    expect(reduced.products.isFetching).toEqual(false);
    expect(reduced.products.error).toEqual(payload.error);
  });

  it("Should handle action: GET_SEARCH_PACKAGES_REQUEST", () => {
    const action: FluxStandardAction = {
      type: actions.GET_SEARCH_PACKAGES_REQUEST,
    };

    const reduced = searchReducer(state, action);

    expect(reduced.packages.isFetching).toEqual(true);
  });

  it("Should handle action: GET_SEARCH_PACKAGES_SUCCESS", () => {
    const payload = [1, 2, 3, 4, 5];

    const action: FluxStandardAction = {
      type: actions.GET_SEARCH_PACKAGES_SUCCESS,
      payload,
    };

    const reduced = searchReducer(state, action);

    expect(reduced.packages.isFetching).toEqual(false);
    expect(reduced.packages.data).toEqual(payload);
    expect(reduced.packages.error).toEqual(null);
  });

  it("Should handle action: GET_SEARCH_PACKAGES_FAILURE", () => {
    const payload: APIError = {
      error: "Some error here",
      message: "Something else.",
      status: 500,
    };

    const action: FluxStandardAction = {
      type: actions.GET_SEARCH_PACKAGES_FAILURE,
      payload,
      error: true,
    };

    const reduced = searchReducer(state, action);

    expect(reduced.packages.isFetching).toEqual(false);
    expect(reduced.packages.error).toEqual(payload.error);
  });

  it("Should handle action: RESET_SEARCH", () => {
    state = {
      ...initialState,
      products: {
        ...initialState.products,
        total: 19,
      },
      packages: {
        ...initialState.packages,
        isFetching: true,
      },
    };

    const action: FluxStandardAction = {
      type: actions.RESET_SEARCH,
    };

    const reduced = searchReducer(state, action);

    expect(reduced).toEqual(initialState);
    expect(reduced.products.total).toEqual(initialState.products.total);
    expect(reduced.packages.isFetching).toEqual(
      initialState.packages.isFetching
    );
  });
});
