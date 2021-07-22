import {
  getCurrentOption,
  Order,
  getClickArgs,
} from "./DesktopSortDropdown.service";
import { FilterType } from "./filter.service";

describe("DesktopSortDropdown.service", () => {
  describe("getCurrentOption", () => {
    it("gets the default option when there are no active filters", () => {
      expect(
        getCurrentOption({
          [FilterType.SORT_BY]: [],
          [FilterType.ORDER]: [],
          [FilterType.BRAND_FILTER]: [],
          [FilterType.SUBCLASS]: [],
          [FilterType.CLASS]: [],
        })
      ).toEqual({ value: "default", label: "Recommended" });
    });
    it("gets the low to high option when there are active filters", () => {
      expect(
        getCurrentOption({
          [FilterType.SORT_BY]: ["price"],
          [FilterType.ORDER]: [Order.ASC],
          [FilterType.BRAND_FILTER]: [],
          [FilterType.SUBCLASS]: [],
          [FilterType.CLASS]: [],
        })
      ).toEqual({
        value: "price-low",
        label: "Price: Low to High",
      });
    });
    it("gets the high to low option when there are active filters", () => {
      expect(
        getCurrentOption({
          [FilterType.SORT_BY]: ["price"],
          [FilterType.ORDER]: [Order.DESC],
          [FilterType.BRAND_FILTER]: [],
          [FilterType.SUBCLASS]: [],
          [FilterType.CLASS]: [],
        })
      ).toEqual({
        value: "price-high",
        label: "Price: High to Low",
      });
    });
    it("gets the a to z option when there are active filters", () => {
      expect(
        getCurrentOption({
          [FilterType.SORT_BY]: ["title"],
          [FilterType.ORDER]: [Order.ASC],
          [FilterType.BRAND_FILTER]: [],
          [FilterType.SUBCLASS]: [],
          [FilterType.CLASS]: [],
        })
      ).toEqual({
        value: "a-z",
        label: "A to Z",
      });
    });
  });

  describe("getClickArgs", () => {
    it("gets default args for default", () => {
      expect(getClickArgs("default")).toEqual(["default", "default"]);
    });
    it("gets price-high args for price-high", () => {
      expect(getClickArgs("price-high")).toEqual(["price", Order.DESC]);
    });
    it("gets price-low args for price-low", () => {
      expect(getClickArgs("price-low")).toEqual(["price", Order.ASC]);
    });
    it("gets a-z args for a-z", () => {
      expect(getClickArgs("a-z")).toEqual(["title", Order.ASC]);
    });
  });
});
