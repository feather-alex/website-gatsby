import { State as GlobalState, APIError } from "../../../types/ReduxState";
import { ProductListState } from "./productList.types";
import * as selectors from "./productList.selectors";
import { initialState } from "./productList.reducer";
import { mockMeta, mockProducts } from "../productList.fixtures";

describe("ProductList - Selectors", () => {
  describe("Redux Selectors", () => {
    it("Should return the value of meta", () => {
      const meta = mockMeta;
      const state: ProductListState = {
        ...initialState,
        meta,
      };

      const selected = selectors.getProductListMeta({
        productList: state,
      } as GlobalState);

      expect(selected).toEqual(meta);
    });

    it("Should return the value of products", () => {
      const products = mockProducts;

      const state: ProductListState = {
        ...initialState,
        products,
      };

      const selected = selectors.getProducts({
        productList: state,
      } as GlobalState);

      expect(selected).toEqual(products);
    });

    it("Should return the value of isFetching", () => {
      const isFetching = true;

      const state: ProductListState = {
        ...initialState,
        isFetching,
      };

      const selected = selectors.getIsFetching({
        productList: state,
      } as GlobalState);

      expect(selected).toEqual(isFetching);
    });

    it("Should return the value of error", () => {
      const error: APIError = {
        error: "Stuff is not working",
        message: "have you tried refreshing?",
        status: 500,
      };

      const state: ProductListState = {
        ...initialState,
        error,
      };

      const selected = selectors.getError({
        productList: state,
      } as GlobalState);

      expect(selected).toEqual(error);
    });
  });
});
