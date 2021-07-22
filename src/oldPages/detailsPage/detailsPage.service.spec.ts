import { DeliveryAreaIdentifier } from "../../app/store/plan/plan.types";
import { PkgItem } from "../../types/Package";
import {
  getPackageStatus,
  getPackagePrices,
  getUniqueItemsData,
} from "./detailsPage.service";

const akepaDresser: PkgItem = {
  identifier: "akepa-dresser",
  title: "Akepa Dresser",
  variantIdentifier: "akepa-color-white",
  brand: {
    identifier: "feather",
    name: "Feather",
  },
  retailPrice: 427,
  image: { desktop: "", mobile: "" },
  rentalPrices: { 3: 259, 12: 49 },
  options: [],
  type: "package",
  description: "",
  dimensions: {
    image: { desktop: "", mobile: "" },
    width: "",
    height: "",
    length: "",
    weight: "",
  },
  displayOrder: 0,
  availability: [
    {
      deliveryArea: DeliveryAreaIdentifier.NY,
      isInStock: false,
      isEnabled: false,
      stockExpectedDate: null,
    },
    {
      deliveryArea: DeliveryAreaIdentifier.SF,
      isInStock: true,
      isEnabled: true,
      stockExpectedDate: null,
    },
    {
      deliveryArea: DeliveryAreaIdentifier.LA,
      isInStock: false,
      isEnabled: false,
      stockExpectedDate: null,
    },
  ],
};

const akepaNightstand: PkgItem = {
  identifier: "akepa-nightstand",
  title: "Akepa Nightstand",
  variantIdentifier: "akepa-color-white",
  brand: {
    identifier: "feather",
    name: "Feather",
  },
  retailPrice: 265,
  image: { desktop: "", mobile: "" },
  rentalPrices: { 3: 119, 12: 19 },
  options: [],
  type: "package",
  description: "",
  dimensions: {
    image: { desktop: "", mobile: "" },
    width: "",
    height: "",
    length: "",
    weight: "",
  },
  displayOrder: 0,
  availability: [
    {
      deliveryArea: DeliveryAreaIdentifier.NY,
      isInStock: false,
      isEnabled: false,
      stockExpectedDate: null,
    },
    {
      deliveryArea: DeliveryAreaIdentifier.SF,
      isInStock: false,
      isEnabled: true,
      stockExpectedDate: null,
    },
    {
      deliveryArea: DeliveryAreaIdentifier.LA,
      isInStock: false,
      isEnabled: true,
      stockExpectedDate: null,
    },
  ],
};

describe("Details Page Services", () => {
  let items: PkgItem[];

  beforeEach(() => {
    items = [akepaDresser, akepaNightstand];
  });

  describe("Determining if a package is considered in stock", () => {
    it("should return true if at least one item is in stock in the current delivery area", () => {
      const isPackageInStock = getPackageStatus(
        DeliveryAreaIdentifier.SF,
        items,
        "isInStock"
      );
      expect(isPackageInStock).toEqual(true);
    });

    it("should return false if all items are oos in the current delivery area", () => {
      const isPackageInStock = getPackageStatus(
        DeliveryAreaIdentifier.NY,
        items,
        "isInStock"
      );
      expect(isPackageInStock).toEqual(false);
    });
  });

  describe("Determining if a package is considered enabled", () => {
    it("should return true if at least one item is enabled in the current delivery area", () => {
      const isPackageEnabled = getPackageStatus(
        DeliveryAreaIdentifier.LA,
        items,
        "isEnabled"
      );
      expect(isPackageEnabled).toEqual(true);
    });

    it("should return false if all items are disabled in the current delivery area", () => {
      const isPackageEnabled = getPackageStatus(
        DeliveryAreaIdentifier.NY,
        items,
        "isEnabled"
      );
      expect(isPackageEnabled).toEqual(false);
    });
  });

  describe("Calculate accurate price points for Packages at/with", () => {
    it("initial quantities", () => {
      const prices = {
        memberRentalPrice: 68,
        nonMemberRentalPrice: 378,
        retailPrice: 692,
      };

      const packagePrices = getPackagePrices(items);
      expect(packagePrices).toEqual(prices);
    });

    it("higher quantities", () => {
      const prices = {
        memberRentalPrice: 223,
        nonMemberRentalPrice: 1253,
        retailPrice: 2341,
      };

      const quantity: { [id: string]: number } = {
        "akepa-dresser": 3,
        "akepa-nightstand": 4,
      };

      const packagePrices = getPackagePrices(items, quantity);
      expect(packagePrices).toEqual(prices);
    });

    it("no quantities", () => {
      const prices = {
        memberRentalPrice: 0,
        nonMemberRentalPrice: 0,
        retailPrice: 0,
      };

      const quantity: { [id: string]: number } = {
        "akepa-dresser": 0,
        "akepa-nightstand": 0,
      };

      const packagePrices = getPackagePrices(items, quantity);
      expect(packagePrices).toEqual(prices);
    });
  });

  describe("Return unique items data for a group of package items", () => {
    it("should return items data back if it is already unique", () => {
      const quantity: { [id: string]: number } = {
        "akepa-dresser": 1,
        "akepa-nightstand": 1,
      };
      const itemsData = { uniqueItems: items, uniqueItemsQuantity: quantity };

      const uniqueItemsData = getUniqueItemsData(items);
      expect(uniqueItemsData).toEqual(itemsData);
    });

    it("should return a consolidated items data back for non-unique values", () => {
      const quantity: { [id: string]: number } = {
        "akepa-dresser": 1,
        "akepa-nightstand": 2,
      };
      const nonUniqueItems: PkgItem[] = [
        akepaDresser,
        akepaNightstand,
        akepaNightstand,
      ];
      const itemsData = { uniqueItems: items, uniqueItemsQuantity: quantity };

      const uniqueItemsData = getUniqueItemsData(nonUniqueItems);
      expect(uniqueItemsData).toEqual(itemsData);
    });
  });
});
