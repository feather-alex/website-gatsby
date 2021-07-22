/** @jsx jsx */

import { jsx } from "@emotion/core";
import renderWithRedux from "../../../../utils/test-utils";
import PackageItemsList from "./PackageItemsList";
import { initialState as initialReducerState } from "../../../../store/reducer";
import { State as GlobalState } from "../../../../types/ReduxState";
import {
  DeliveryAreaIdentifier,
  MembershipState,
} from "../../../../app/store/plan/plan.types";
import { noop } from "../../../../utils/ui-helpers";
import { PkgItem } from "../../../../types/Package";
import { OptionType } from "../../../../types/Product";

const mockItems: PkgItem[] = [
  {
    identifier: "akepa-dresser",
    title: "Akepa dresser",
    variantIdentifier: "akepa-color-white",
    brand: {
      identifier: "feather",
      name: "Feather",
    },
    retailPrice: 699,
    image: {
      mobile:
        "https://img.livefeather.com/products/akepa-dresser/images/x4048A-main-desktop.jpg",
      desktop:
        "https://img.livefeather.com/products/akepa-dresser/images/x4048A-main-desktop.jpg",
    },
    rentalPrices: { 3: 100, 12: 29 },
    options: [
      {
        identifier: "akepa-color",
        name: "",
        type: OptionType.Color,
        valueIdentifier: "white",
        valueName: "White",
      },
    ],
    description:
      "It's like a vintage chest and storage unit in one. The rich mahogany and clean lines fit into any bedroom, study, or living room, while the spacious drawers act like a second closet.↵*Contactless delivery details: item arrives fully assembled. Moving item requires 2 people (78 lbs.)",
    dimensions: {
      image: { mobile: "", desktop: "" },
      width: '32"',
      height: '36"',
      length: '18"',
      weight: "",
    },
    displayOrder: 0,
    availability: [
      {
        deliveryArea: DeliveryAreaIdentifier.NY,
        isEnabled: true,
        isInStock: true,
        stockExpectedDate: null,
      },
      {
        deliveryArea: DeliveryAreaIdentifier.SF,
        isEnabled: true,
        isInStock: false,
        stockExpectedDate: null,
      },
      {
        deliveryArea: DeliveryAreaIdentifier.LA,
        isEnabled: true,
        isInStock: true,
        stockExpectedDate: null,
      },
    ],
  },
];

const mockItemsQuantity = (quantity: number) => {
  return { "akepa-dresser": quantity };
};

describe("<PackageItemsList />", () => {
  it("renders an item non-member monthly price when non-member is selected and the item is in stock", () => {
    const newYorkDeliveryAreaState: GlobalState = {
      ...initialReducerState,
      plan: {
        ...initialReducerState.plan,
        deliveryAreaIdentifier: DeliveryAreaIdentifier.NY,
      },
    };

    const { getByText } = renderWithRedux(
      <PackageItemsList
        items={mockItems}
        selectedItemsQuantity={mockItemsQuantity(1)}
        membershipState={MembershipState.NON_MEMBER}
        handleSelectedItemsQuantity={() => noop}
      />,
      newYorkDeliveryAreaState
    );

    expect(getByText("$100/mo")).toBeTruthy();
  });

  it("renders item member monthly price when member is selected and item is in stock", () => {
    const newYorkDeliveryAreaState: GlobalState = {
      ...initialReducerState,
      plan: {
        ...initialReducerState.plan,
        deliveryAreaIdentifier: DeliveryAreaIdentifier.NY,
      },
    };
    const { getByText } = renderWithRedux(
      <PackageItemsList
        items={mockItems}
        selectedItemsQuantity={mockItemsQuantity(1)}
        membershipState={MembershipState.MEMBER}
        handleSelectedItemsQuantity={() => noop}
      />,
      newYorkDeliveryAreaState
    );

    expect(getByText("$29/mo")).toBeTruthy();
  });

  it("renders an out of stock message when the item is not in stock and member is selected", () => {
    const sanFranDeliveryAreaState: GlobalState = {
      ...initialReducerState,
      plan: {
        ...initialReducerState.plan,
        deliveryAreaIdentifier: DeliveryAreaIdentifier.SF,
      },
    };

    const { getByText } = renderWithRedux(
      <PackageItemsList
        items={mockItems}
        selectedItemsQuantity={mockItemsQuantity(1)}
        membershipState={MembershipState.MEMBER}
        handleSelectedItemsQuantity={() => noop}
      />,
      sanFranDeliveryAreaState
    );

    expect(getByText("Out of stock")).toBeTruthy();
  });

  it("renders an out of stock message when the item is not in stock and non-member is selected", () => {
    const sanFranDeliveryAreaState: GlobalState = {
      ...initialReducerState,
      plan: {
        ...initialReducerState.plan,
        deliveryAreaIdentifier: DeliveryAreaIdentifier.SF,
      },
    };

    const { getByText } = renderWithRedux(
      <PackageItemsList
        items={mockItems}
        selectedItemsQuantity={mockItemsQuantity(1)}
        membershipState={MembershipState.NON_MEMBER}
        handleSelectedItemsQuantity={() => noop}
      />,
      sanFranDeliveryAreaState
    );

    expect(getByText("Out of stock")).toBeTruthy();
  });

  it("renders an item non-member monthly price when the quantity selected is greater than one", () => {
    const newYorkDeliveryAreaState: GlobalState = {
      ...initialReducerState,
      plan: {
        ...initialReducerState.plan,
        deliveryAreaIdentifier: DeliveryAreaIdentifier.NY,
      },
    };

    const { getByText } = renderWithRedux(
      <PackageItemsList
        items={mockItems}
        selectedItemsQuantity={mockItemsQuantity(2)}
        membershipState={MembershipState.NON_MEMBER}
        handleSelectedItemsQuantity={() => noop}
      />,
      newYorkDeliveryAreaState
    );

    expect(getByText("$200/mo")).toBeTruthy();
  });

  it("renders an item member monthly price when the quantity selected is greater than one", () => {
    const newYorkDeliveryAreaState: GlobalState = {
      ...initialReducerState,
      plan: {
        ...initialReducerState.plan,
        deliveryAreaIdentifier: DeliveryAreaIdentifier.NY,
      },
    };

    const { getByText } = renderWithRedux(
      <PackageItemsList
        items={mockItems}
        selectedItemsQuantity={mockItemsQuantity(2)}
        membershipState={MembershipState.MEMBER}
        handleSelectedItemsQuantity={() => noop}
      />,
      newYorkDeliveryAreaState
    );

    expect(getByText("$58/mo")).toBeTruthy();
  });

  it("renders a removed message when the quantity selected is equal to zero", () => {
    const newYorkDeliveryAreaState: GlobalState = {
      ...initialReducerState,
      plan: {
        ...initialReducerState.plan,
        deliveryAreaIdentifier: DeliveryAreaIdentifier.NY,
      },
    };

    const { getByText } = renderWithRedux(
      <PackageItemsList
        items={mockItems}
        selectedItemsQuantity={mockItemsQuantity(0)}
        membershipState={MembershipState.MEMBER}
        handleSelectedItemsQuantity={() => noop}
      />,
      newYorkDeliveryAreaState
    );

    expect(getByText("Removed")).toBeTruthy();
  });

  it("quantity handler calls the correct item identifier", () => {
    const newYorkDeliveryAreaState: GlobalState = {
      ...initialReducerState,
      plan: {
        ...initialReducerState.plan,
        deliveryAreaIdentifier: DeliveryAreaIdentifier.NY,
      },
    };

    const mockHandler = jest.fn();
    renderWithRedux(
      <PackageItemsList
        items={mockItems}
        selectedItemsQuantity={mockItemsQuantity(1)}
        membershipState={MembershipState.MEMBER}
        handleSelectedItemsQuantity={mockHandler}
      />,
      newYorkDeliveryAreaState
    );

    expect(mockHandler).toBeCalledTimes(1);
    expect(mockHandler).toBeCalledWith(mockItems[0].identifier);
  });
});
