/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Link } from "gatsby";

import { Image } from "../../types/Product";
import { BRAND, SHADES } from "../variables";
import { MembershipState } from "../../app/store/plan/plan.types";
import PackageCardCarousel from "./PackageCardCarousel";
import Title1 from "../titles/Title1";
import Button, { ButtonStyle } from "../buttons/Button";

export enum DescriptionDisplay {
  Justify = "justify",
  Center = "center",
}

interface Props {
  to: string;
  listingImages: Image[];
  name: string;
  featherPrice: number;
  isMobileBreakpoint: boolean;
  shouldShowFromPrice?: boolean;
  numberOfItems?: number;
  membershipState: MembershipState;
}

const PackageCard = ({
  to,
  listingImages,
  name,
  featherPrice,
  isMobileBreakpoint,
  shouldShowFromPrice,
  numberOfItems,
  membershipState,
}: Props) => {
  const imageSrcs = listingImages
    .map((image) =>
      isMobileBreakpoint
        ? image.mobile || image.desktop
        : image.desktop || image.mobile
    )
    .reduce(
      (acc: string[], src) => (!src || acc.includes(src) ? acc : [src, ...acc]),
      []
    );

  return (
    <div
      css={css`
        display: inline-block;
        position: relative;
        transition: all 0.25s ease-in-out;
        padding: 0;
        background-color: ${BRAND.BACKGROUND};
      `}
    >
      <PackageCardCarousel to={to} carouselImages={imageSrcs} />

      <Link
        to={to}
        css={css`
          display: block;
          padding: ${isMobileBreakpoint ? "24px" : "32px"};
        `}
      >
        <div
          css={css`
            width: 100%;
            display: flex;
            justify-content: space-between;
            ${isMobileBreakpoint
              ? `
            align-items: center;
            flex-direction: column;
            `
              : ""}
          `}
        >
          <div>
            <div
              css={css`
                display: flex;
                ${isMobileBreakpoint
                  ? "justify-content: center; text-align: center;"
                  : ""}
              `}
            >
              <Title1 isBold={true}>{name}</Title1>
            </div>
            <div
              css={css`
                display: flex;
                margin-top: 4px;
                ${isMobileBreakpoint ? "justify-content: center;" : ""}
              `}
            >
              <Title1 color={SHADES.SHADE_DARK}>{`${
                membershipState === MembershipState.NONE || shouldShowFromPrice
                  ? "from "
                  : ""
              }$${featherPrice}/mo • ${numberOfItems} items`}</Title1>
            </div>
          </div>
          <Button
            css={css`
              ${isMobileBreakpoint ? "margin-top: 16px;" : ""}
            `}
            to={to}
            style={ButtonStyle.COMPACT_TERTIARY}
          >
            Shop Now
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default PackageCard;
