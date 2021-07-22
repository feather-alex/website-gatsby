import { State as GlobalState, APIError } from "../../../types/ReduxState";
import { ProductEntities, ProductEntitiesState } from "./entities.types";
import * as selectors from "./entities.selectors";
import { initialState } from "./entities.reducer";

describe("Product Entities - Selectors", () => {
  describe("getIsFetchingProductEntities", () => {
    it("Should return the value of: isFetching", () => {
      const value = true;

      const state: ProductEntitiesState = {
        ...initialState,
        isFetching: value,
      };

      const selected = selectors.getIsFetchingProductEntities({
        app: { productEntities: state },
      } as GlobalState);

      expect(selected).toEqual(value);
    });
  });

  describe("getProductEntities", () => {
    it("Should return the value of: data", () => {
      const value: ProductEntities = {
        categories: {
          products: [],
          bundles: [],
        },
        deliveryAreas: [],
      };

      const state: ProductEntitiesState = {
        ...initialState,
        data: value,
      };

      const selected = selectors.getProductEntities({
        app: { productEntities: state },
      } as GlobalState);

      expect(selected).toEqual(value);
    });
  });

  describe("getProductEntitiesError", () => {
    it("Should return the value of: error", () => {
      const value: APIError = {
        error: "Some error here.",
        message: "And a corresponding error message here.",
        status: 500,
      };

      const state: ProductEntitiesState = {
        ...initialState,
        error: value,
      };

      const selected = selectors.getProductEntitiesError({
        app: { productEntities: state },
      } as GlobalState);

      expect(selected).toEqual(value);
    });
  });
});
