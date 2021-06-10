/** @jsx jsx */
import { jsx } from "@emotion/core";

import renderWithRedux from "../../utils/test-utils";
import ProductShowcase from "./ProductShowcase";
import { initialState as initialReducerState } from "../../store/reducer";
import { State as GlobalState } from "../../types/ReduxState";
import { DeliveryAreaIdentifier } from "../../app/store/plan/plan.types";

jest.mock("../../assets/images/minus-cursor-1x.png", () => {
  return "";
});
jest.mock("../../assets/images/minus-cursor-2x.png", () => {
  return "";
});
jest.mock("../../assets/images/plus-cursor-1x.png", () => {
  return "";
});
jest.mock("../../assets/images/plus-cursor-2x.png", () => {
  return "";
});

describe("<ProductShowcase />", () => {
  it("renders products without variants given", () => {
    const testState: GlobalState = {
      ...initialReducerState,
      productPairings: {
        ...initialReducerState.productPairings,
        products: [
          {
            identifier: "test",
            title: "Test Product Title",
            variants: [
              {
                identifier: "test-variant",
                retailPrice: 59,
                rentalPrices: { "12": 12, "3": 3 },
                options: [],
                availability: [
                  {
                    deliveryArea: DeliveryAreaIdentifier.NY,
                    isEnabled: true,
                    isInStock: true,
                  },
                ],
                listingImage: { desktop: "", mobile: "" },
                swatchImage: { desktop: "", mobile: "" },
              },
              {
                identifier: "test-variant-2",
                retailPrice: 59,
                rentalPrices: { "12": 13, "3": 4 },
                options: [],
                availability: [
                  {
                    deliveryArea: DeliveryAreaIdentifier.NY,
                    isEnabled: true,
                    isInStock: true,
                  },
                ],
                listingImage: { desktop: "desktop.jpg", mobile: "mobile.jpg" },
                swatchImage: { desktop: "", mobile: "" },
              },
            ],
            brand: { identifier: "", name: "" },
            options: [],
            subclass: { identifier: "", name: "" },
            categories: [],
          },
        ],
      },
    };
    const { findByText } = renderWithRedux(
      <ProductShowcase title="test" productIdentifiers={["test"]} />,
      testState
    );

    expect(findByText("test")).toBeTruthy();
    expect(findByText("12")).toBeTruthy();
    expect(findByText("Test Product Title")).toBeTruthy();
  });

  it("renders products with variants given", () => {
    const testState: GlobalState = {
      ...initialReducerState,
      productPairings: {
        ...initialReducerState.productPairings,
        products: [
          {
            identifier: "test",
            title: "Test Product Title",
            variants: [
              {
                identifier: "test-variant",
                retailPrice: 59,
                rentalPrices: { "12": 12, "3": 3 },
                options: [],
                availability: [
                  {
                    deliveryArea: DeliveryAreaIdentifier.NY,
                    isEnabled: true,
                    isInStock: true,
                  },
                ],
                listingImage: { desktop: "", mobile: "" },
                swatchImage: { desktop: "", mobile: "" },
              },
              {
                identifier: "test-variant-2",
                retailPrice: 59,
                rentalPrices: { "12": 13, "3": 4 },
                options: [],
                availability: [
                  {
                    deliveryArea: DeliveryAreaIdentifier.NY,
                    isEnabled: true,
                    isInStock: true,
                  },
                ],
                listingImage: { desktop: "desktop.jpg", mobile: "mobile.jpg" },
                swatchImage: { desktop: "", mobile: "" },
              },
            ],
            brand: { identifier: "", name: "" },
            options: [],
            subclass: { identifier: "", name: "" },
            categories: [],
          },
        ],
      },
    };
    const { findByText } = renderWithRedux(
      <ProductShowcase title="test" productIdentifiers={["test"]} />,
      testState
    );

    expect(findByText("test")).toBeTruthy();
    expect(findByText("13")).toBeTruthy();
    expect(findByText("Test Product Title")).toBeTruthy();
  });
});
