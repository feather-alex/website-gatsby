/** @jsx jsx */
import { Fragment } from "react";
import { css, jsx } from "@emotion/react";
import Title1 from "../titles/Title1";
import { ItemType } from "./ItemCard";
import { BRAND } from "../variables";
import { MembershipState } from "../../app/store/plan/plan.types";

interface Props {
  mainTitle: string;
  itemCount?: number;
  featherPrice: number;
  isMobileBreakpoint: boolean;
  itemType: ItemType;
  shouldShowFromPrice?: boolean;
  membershipState: MembershipState;
}

const ItemCardJustifiedDescription = ({
  mainTitle,
  itemCount,
  featherPrice,
  isMobileBreakpoint,
  itemType,
  shouldShowFromPrice,
  membershipState,
}: Props) => {
  return (
    <div
      data-cy="product-card-description"
      css={css`
        width: 100%;
        margin-top: ${isMobileBreakpoint
          ? itemType === ItemType.Package
            ? "24px"
            : "16px"
          : "32px"};
      `}
    >
      <Fragment>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <div>
            <Title1 isBold={true}>{mainTitle}</Title1>
          </div>
          {itemCount && itemType === ItemType.Package && (
            <Title1 color={BRAND.SECONDARY_TEXT}>{`${itemCount} items`}</Title1>
          )}
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <Title1>{`${
            membershipState === MembershipState.NONE || shouldShowFromPrice
              ? "from "
              : ""
          }$${featherPrice}/mo`}</Title1>
        </div>
      </Fragment>
    </div>
  );
};
export default ItemCardJustifiedDescription;
