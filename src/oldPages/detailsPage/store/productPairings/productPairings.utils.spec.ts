import { filterPairedProducts } from "./productPairings.utils";
import { ProductForListing } from "../../../../types/Product";

describe("Utility functions for product pairings", () => {
  describe("filterPariedProducts", () => {
    it("should filter out origin products from the product pairings", () => {
      const mockProductPairings = [
        { identifier: "athene-chair" },
        { identifier: "crosby-desk-chair" },
        { identifier: "varick-console" },
      ] as ProductForListing[];
      const mockPairedProductIdentifiers = ["athene-chair"];
      const result = filterPairedProducts(
        mockProductPairings,
        mockPairedProductIdentifiers
      );

      expect(result).toEqual([
        { identifier: "crosby-desk-chair" },
        { identifier: "varick-console" },
      ]);
    });

    it("should return an array of unique product pairings", () => {
      const mockProductPairings = [
        { identifier: "athene-chair" },
        { identifier: "athene-chair" },
        { identifier: "crosby-desk-chair" },
        { identifier: "varick-console" },
      ] as ProductForListing[];
      const mockPairedProductIdentifiers = ["jay-bench"];
      const result = filterPairedProducts(
        mockProductPairings,
        mockPairedProductIdentifiers
      );

      expect(result).toEqual([
        { identifier: "athene-chair" },
        { identifier: "crosby-desk-chair" },
        { identifier: "varick-console" },
      ]);
    });
  });
});
