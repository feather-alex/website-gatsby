/** @jsx jsx */
import React, { useRef, useState, useEffect } from "react";
import { css, jsx } from "@emotion/core";

import Button, { ButtonStyle } from "../buttons/Button";
import ItemCardPLPDescription from "./ItemCardPLPDescription";
import ItemCardCenteredDescription from "./ItemCardCenteredDescription";
import ResponsiveImage from "../images/ResponsiveImage";
import { BRAND } from "../variables";
import { useSelector } from "react-redux";
// import { getIsNavbarBreakpoint } from "../../app/store/dimensions/dimensions.selectors";
// import { MembershipState } from "../../app/store/plan/plan.types";
import useIntersect from "../../utils/use-intersection-observer";
import { Link } from "gatsby";

export interface Image {
  desktop: string | null;
  mobile: string | null;
  zoom?: string | null;
}

export enum ItemType {
  Package = "package",
  Product = "product",
}

export enum DescriptionDisplay {
  Justify = "justify",
  Center = "center",
  PLP = "plp",
}

interface ProductCardSpacing {
  padding: string;
  margin: string;
  imageHeight: number;
  imageWidth: number;
}

interface Props {
  to: string;
  listingImage: Image;
  listingImages?: Image[];
  name: string;
  featherPrice: number;
  numberOfItems?: number;
  onClick?: () => void;
  onEditClick?: (event: React.MouseEvent) => void;
  isMobileBreakpoint: boolean;
  shouldShowFromPrice?: boolean;
  itemType: ItemType;
  descriptionDisplay: DescriptionDisplay;
  backgroundColor?: string;
  membershipState: MembershipState;
  intersectionCallback?: () => void;
}

const ItemCard = ({
  to,
  listingImage,
  listingImages,
  name,
  featherPrice,
  onClick,
  onEditClick,
  isMobileBreakpoint,
  itemType,
  shouldShowFromPrice,
  descriptionDisplay,
  membershipState,
  backgroundColor = BRAND.BACKGROUND,
  intersectionCallback,
}: Props) => {
  const [imgIdx, setImgIdx] = useState(0);
  const [shouldRotate, setShouldRotate] = useState(false);
  const isNavbarBreakpoint = false; // useSelector(getIsNavbarBreakpoint);

  const isListingImg = listingImage.desktop || listingImage.mobile;

  // used for infinite scroll callbacks
  const ref = useRef(null);
  useIntersect({ callback: intersectionCallback, ref });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (listingImages && shouldRotate) {
        setImgIdx((imgIdx + 1) % listingImages.length);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [listingImages, imgIdx, shouldRotate]);

  let imageSrc = isMobileBreakpoint
    ? listingImage.mobile || listingImage.desktop
    : listingImage.desktop || listingImage.mobile;

  if (imageSrc === null && listingImages) {
    const currentImage = listingImages[imgIdx];
    imageSrc = isMobileBreakpoint
      ? currentImage.mobile || currentImage.desktop
      : currentImage.desktop || currentImage.mobile;
  }

  const widthCalc = isNavbarBreakpoint
    ? itemType === ItemType.Package ||
      descriptionDisplay === DescriptionDisplay.Center
      ? "100%"
      : "50%"
    : itemType === ItemType.Package
    ? "50%"
    : "33.3333%";

  // Accounts for margin space when placing cards in a row on PLP
  const basePad = 4;

  const packageSpacing: ProductCardSpacing = {
    padding: isMobileBreakpoint ? "24px" : "32px",
    margin: `${basePad / 2}px ${isMobileBreakpoint ? 0 : basePad / 2}px`,
    imageHeight: isMobileBreakpoint ? 157 : 275,
    imageWidth: isMobileBreakpoint ? 279 : 490,
  };
  const productCenteredSpacing: ProductCardSpacing = {
    padding: "40px 32px",
    margin: `${isMobileBreakpoint ? basePad / 2 : 0}px ${basePad / 2}px`,
    imageHeight: 211,
    imageWidth: 211,
  };
  const productPLPSpacing: ProductCardSpacing = {
    padding: isMobileBreakpoint ? "24px 16px 16px" : "40px 32px 16px",
    margin: `${basePad / 2}px`,
    imageHeight: isMobileBreakpoint ? 154 : 266,
    imageWidth: isMobileBreakpoint ? 154 : 266,
  };

  const itemCardSpacing =
    itemType === ItemType.Package
      ? packageSpacing
      : descriptionDisplay === DescriptionDisplay.PLP
      ? productPLPSpacing
      : productCenteredSpacing;

  return (
    <Link
      to={to}
      ref={ref}
      css={css`
        display: inline-block;
        width: calc(${widthCalc} - ${basePad}px);
        margin: ${itemCardSpacing.margin};
        height: auto;
        position: relative;
        top: 0;
        transition: all 0.25s ease-in-out;
        padding: ${itemCardSpacing.padding};
        background-color: ${backgroundColor};

        ${!onEditClick &&
        !isMobileBreakpoint &&
        `&:hover {
            position: relative;
            top: -9px;
          }`}
      `}
      onMouseEnter={() => !isListingImg && setShouldRotate(true)}
      onMouseLeave={() => !isListingImg && setShouldRotate(false)}
      onClick={onClick}
    >
      {onEditClick && (
        <div
          css={css`
            position: absolute;
            top: 15px;
            left: 15px;
          `}
        >
          <Button style={ButtonStyle.PRIMARY_INVERTED} onClick={onEditClick}>
            Edit
          </Button>
        </div>
      )}
      {imageSrc && (
        <ResponsiveImage
          src={imageSrc}
          to={to}
          height={itemCardSpacing.imageHeight}
          width={itemCardSpacing.imageWidth}
          objectPosition={itemType === ItemType.Package ? "center" : "bottom"}
        />
      )}

      {descriptionDisplay === DescriptionDisplay.PLP ? (
        <ItemCardPLPDescription
          mainTitle={name}
          featherPrice={featherPrice}
          isMobileBreakpoint={isMobileBreakpoint}
          shouldShowFromPrice={shouldShowFromPrice}
          membershipState={membershipState}
        />
      ) : (
        <ItemCardCenteredDescription
          mainTitle={name}
          featherPrice={featherPrice}
        />
      )}
    </Link>
  );
};

export default ItemCard;
