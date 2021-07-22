import { State as GlobalState, APIError } from "../../../types/ReduxState";
import { ProductForListing } from "../../../types/Product";
import * as selectors from "./search.selectors";
import { initialState } from "./search.reducer";
import { initialState as initialPlanState } from "../../../app/store/plan/plan.reducer";
import { Search } from "./search.types";
import { Plan } from "../../../app/store/plan/plan.types";

const product = {
  identifier: "chair",
  title: "amazing chair",
  categories: [],
  subclass: {
    identifier: "subclass",
    name: "subclass",
  },
  brand: {
    identifier: "",
    name: "",
  },
  variants: [],
  options: [],
};

const variant = {
  identifier: "default",
  options: [],
  availability: [],
  retailPrice: 0,
  rentalPrices: { "3": 3, "12": 12 },
  listingImage: { mobile: "mobile.jpg", desktop: "desktop.jpg" },
  swatchImage: { mobile: "mobile.jpg", desktop: "desktop.jpg" },
};

describe("Search Page - Selectors", () => {
  let state: Search;

  describe("keyword", () => {
    beforeEach(() => (state = { ...initialState }));

    it("Should return the value of: keyword", () => {
      const value = "placeholder";

      state = {
        ...initialState,
        keyword: value,
      };

      const selected = selectors.getSearchKeyword({
        search: state,
      } as GlobalState);

      expect(selected).toEqual(value);
    });

    describe("determine whether a keyword is present", () => {
      it("Should return true if a keyword is present", () => {
        const value = "keyword placeholder";

        state = {
          ...initialState,
          keyword: value,
        };

        const selected = selectors.getIsKeywordPresent({
          search: state,
        } as GlobalState);

        expect(selected).toEqual(true);
      });

      it("Should return false if a keyword is not present", () => {
        const selected = selectors.getIsKeywordPresent({
          search: state,
        } as GlobalState);

        expect(selected).toEqual(false);
      });
    });
  });

  describe("products", () => {
    beforeEach(() => (state = { ...initialState }));

    it("Should return the value of: products.data (empty)", () => {
      const value: ProductForListing[] = [];

      state = {
        ...initialState,
        products: {
          ...initialState.products,
          data: value,
        },
      };

      const selected = selectors.getProductsData({
        search: state,
      } as GlobalState);

      expect(selected).toEqual(value);
    });

    it("Should return the value of: products.data (non-empty)", () => {
      const value: ProductForListing[] = [product];

      state = {
        ...initialState,
        products: {
          ...initialState.products,
          data: value as ProductForListing[],
        },
      };

      const selected = selectors.getProductsData({
        search: state,
      } as GlobalState);

      expect(selected).toEqual(value);
    });

    it("Should return the value of: total (no products)", () => {
      const value: ProductForListing[] = [];

      state = {
        ...initialState,
        products: {
          ...initialState.products,
          data: value,
        },
      };

      const planState: Plan = {
        ...initialPlanState,
      };

      const selected = selectors.getProductsTotal({
        search: state,
        plan: planState,
      } as GlobalState);

      expect(selected).toEqual(0);
    });

    it("Should return the value of: total (one product with a single variant)", () => {
      const value: ProductForListing[] = [
        {
          ...product,
          variants: [variant],
        },
      ];

      state = {
        ...initialState,
        products: {
          ...initialState.products,
          data: value,
        },
      };

      const planState: Plan = {
        ...initialPlanState,
      };

      const selected = selectors.getProductsTotal({
        search: state,
        plan: planState,
      } as GlobalState);

      expect(selected).toEqual(1);
    });

    it("Should return the value of: total (one product with multiple variants and unique images)", () => {
      const value: ProductForListing[] = [
        {
          ...product,
          variants: [
            variant,
            {
              ...variant,
              listingImage: { mobile: "mobile2.jpg", desktop: "desktop2.jpg" },
            },
          ],
        },
      ];

      state = {
        ...initialState,
        products: {
          ...initialState.products,
          data: value,
        },
      };

      const planState: Plan = {
        ...initialPlanState,
      };

      const selected = selectors.getProductsTotal({
        search: state,
        plan: planState,
      } as GlobalState);

      expect(selected).toEqual(2);
    });

    it("Should return the value of: total (one product with multiple variants and non-unique images)", () => {
      const value: ProductForListing[] = [
        {
          ...product,
          variants: [
            variant,
            {
              ...variant,
              identifier: "thing 2",
            },
          ],
        },
      ];

      state = {
        ...initialState,
        products: {
          ...initialState.products,
          data: value,
        },
      };

      const planState: Plan = {
        ...initialPlanState,
      };

      const selected = selectors.getProductsTotal({
        search: state,
        plan: planState,
      } as GlobalState);

      expect(selected).toEqual(1);
    });

    it("Should return the value of: error", () => {
      const value: APIError = {
        error: "Some error here.",
        message: "Oh look, an error.",
        status: 500,
      };

      state = {
        ...initialState,
        products: {
          ...initialState.products,
          error: value,
        },
      };

      const selected = selectors.getProductsError({
        search: state,
      } as GlobalState);

      expect(selected).toEqual(value);
    });

    it("Should return the value of: offset", () => {
      const value = 7;

      state = {
        ...initialState,
        products: {
          ...initialState.products,
          offset: value,
        },
      };

      const selected = selectors.getProductsOffset({
        search: state,
      } as GlobalState);

      expect(selected).toEqual(value);
    });

    it("Should return the value of: isFetching", () => {
      const value = true;

      state = {
        ...initialState,
        products: {
          ...initialState.products,
          isFetching: value,
        },
      };

      const selected = selectors.getIsFetchingProducts({
        search: state,
      } as GlobalState);

      expect(selected).toEqual(value);
    });

    it("Should return the value of: isInfiniteLoading", () => {
      const value = true;

      state = {
        ...initialState,
        products: {
          ...initialState.products,
          isInfiniteLoading: value,
        },
      };

      const selected = selectors.getIsInfiniteLoading({
        search: state,
      } as GlobalState);

      expect(selected).toEqual(value);
    });
  });

  describe("packages", () => {
    beforeEach(() => (state = { ...initialState }));

    it("Should return the value of: packages.data", () => {
      const value = [
        {
          identifier: "package",
          title: "great package",
          category: {
            identifier: "",
            name: "",
          },
          listingImage: {
            mobile: "",
            desktop: "",
          },
          variants: [],
          availability: [],
        },
      ];

      state = {
        ...initialState,
        packages: {
          ...initialState.packages,
          data: value,
        },
      };

      const selected = selectors.getPackagesData({
        search: state,
      } as GlobalState);

      expect(selected).toEqual(value);
    });

    it("Should return the value of: error", () => {
      const value: APIError = {
        error: "Some error here.",
        message: "Oh look, an error.",
        status: 500,
      };

      state = {
        ...initialState,
        packages: {
          ...initialState.packages,
          error: value,
        },
      };

      const selected = selectors.getPackagesError({
        search: state,
      } as GlobalState);

      expect(selected).toEqual(value);
    });

    it("Should return the value of: isFetching", () => {
      const value = true;

      state = {
        ...initialState,
        packages: {
          ...initialState.packages,
          isFetching: value,
        },
      };

      const selected = selectors.getIsFetchingPackages({
        search: state,
      } as GlobalState);

      expect(selected).toEqual(value);
    });
  });
});
