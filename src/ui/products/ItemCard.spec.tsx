import React from "react";
import { MemoryRouter } from "react-router";
import ItemCard, { ItemType, DescriptionDisplay } from "./ItemCard";
import { MembershipState } from "../../app/store/plan/plan.types";
import renderWithRedux from "../../utils/test-utils";

jest.mock("../images/BaseImage", () => {
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ({ imgUrl }: any) => <img alt="test" src={imgUrl} />;
});

describe("<ItemCard />", () => {
  it("renders correctly with listingImage", () => {
    const { getByText, getByAltText } = renderWithRedux(
      <MemoryRouter>
        <ItemCard
          to="/"
          listingImage={{
            desktop:
              "https://img.livefeather.com/products/akepa-nightstand/images/x4049A-main-desktop.jpg",
            mobile: null,
          }}
          name="Angelina bedroom package"
          featherPrice={74}
          numberOfItems={10}
          isMobileBreakpoint={true}
          itemType={ItemType.Package}
          shouldShowFromPrice={false}
          descriptionDisplay={DescriptionDisplay.Justify}
          membershipState={MembershipState.MEMBER}
        />
      </MemoryRouter>
    );

    expect(getByText("Angelina bedroom package")).toBeTruthy();
    expect(getByAltText("test")).toBeTruthy();
  });
});
