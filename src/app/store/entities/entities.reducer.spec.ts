import { ProductEntitiesState, ProductEntities } from "./entities.types";
import entitiesReducer, { initialState } from "./entities.reducer";
import * as actions from "./entities.actions";

describe("Product Entities - Reducer", () => {
  let state: ProductEntitiesState;

  beforeEach(() => (state = { ...initialState }));

  it("Should handle action: GET_ENTITIES_REQUEST", () => {
    const action: actions.EntityActions = {
      type: actions.GET_ENTITIES_REQUEST,
    };

    const reduced = entitiesReducer(state, action);

    expect(reduced.isFetching).toEqual(true);
    expect(reduced.error).toBeNull();
    expect(reduced.data).toBeNull();
  });

  it("Should handle action: GET_ENTITIES_SUCCESS", () => {
    const payload: ProductEntities = {
      categories: {
        products: [],
        bundles: [],
      },
      deliveryAreas: [],
    };

    const action: actions.EntityActions = {
      type: actions.GET_ENTITIES_SUCCESS,
      payload,
    };

    const reduced = entitiesReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.data).toEqual(payload);
    expect(reduced.error).toBeNull();
  });

  it("Should handle action: GET_UPDATED_DELIVERY_DATES", () => {
    const payload: ProductEntities = {
      categories: {
        products: [],
        bundles: [],
      },
      deliveryAreas: [],
    };

    const action: actions.EntityActions = {
      type: actions.GET_DELIVERY_DATES_SUCCESS,
      payload,
    };

    const reduced = entitiesReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.data).toEqual(payload);
    expect(reduced.error).toBeNull();
  });

  it("Should handle action: GET_ENTITIES_FAILURE", () => {
    const payload = {
      error: {
        error: "Some error here.",
        message: "And a corresponding error message here.",
        status: 500,
      },
    };

    const action: actions.EntityActions = {
      type: actions.GET_ENTITIES_FAILURE,
      payload,
      error: true,
    };

    const reduced = entitiesReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.data).toBeNull();
    expect(reduced.error).toEqual(payload.error);
  });
});
