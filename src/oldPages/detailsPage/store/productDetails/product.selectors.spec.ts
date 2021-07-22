import { State as GlobalState, APIError } from "../../../../types/ReduxState";
import { ProductDetailsState } from "./product.types";
import { FullProductDetails } from "../../../../types/Product";
import * as selectors from "./product.selectors";
import { initialState } from "./product.reducer";
import mockProductDetails from "./product.fixtures";

describe("Product Details - Selectors", () => {
  describe("Redux Selectors", () => {
    it("Should return the value of: data (single product)", () => {
      const value = mockProductDetails;

      const state: ProductDetailsState = {
        ...initialState,
        data: value,
      };

      const selected = selectors.getProductDetails({
        productDetails: state,
      } as GlobalState);

      expect(selected).toEqual(value);
    });

    it("Should return the value of: isFetching", () => {
      const value = true;

      const state: ProductDetailsState = {
        ...initialState,
        isFetching: value,
      };

      const selected = selectors.getIsFetching({
        productDetails: state,
      } as GlobalState);

      expect(selected).toEqual(value);
    });

    it("Should return the value of: error", () => {
      const value: APIError = {
        error: "lil error boi",
        message: "causin all sorts of problems",
        status: 500,
      };

      const state: ProductDetailsState = {
        ...initialState,
        error: value,
      };

      const selected = selectors.getError({
        productDetails: state,
      } as GlobalState);

      expect(selected).toEqual(value);
    });
  });

  describe("Product Details Selectors", () => {
    let productDetails: FullProductDetails = { ...mockProductDetails };

    beforeEach(() => (productDetails = { ...mockProductDetails }));

    it("Should return the value of: title", () => {
      const value = productDetails.title;

      const selected = selectors.title(productDetails);

      expect(selected).toEqual(value);
    });

    it("Should return the value of: identifier", () => {
      const value = productDetails.identifier;

      const selected = selectors.identifier(productDetails);

      expect(selected).toEqual(value);
    });

    it("Should return the value of: member price", () => {
      const value = productDetails.variants[0].rentalPrices[12];

      const selected = selectors.memberPrice(productDetails);

      expect(selected).toEqual(value);
    });

    it("Should return the value of: non-member price", () => {
      const value = productDetails.variants[0].rentalPrices[3];

      const selected = selectors.nonMemberPrice(productDetails);

      expect(selected).toEqual(value);
    });
  });
});
