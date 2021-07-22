/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useCallback } from "react";

import { PkgItem } from "../../../../types/Package";
import { BRAND, SHADES, BREAKPOINTS, COLORS } from "../../../../ui/variables";
import { Z_INDICIES } from "../../../../ui/zIndicies";
import { getImageSrc } from "../../detailsPage.service";
import BaseImage from "../../../../ui/images/BaseImage";
import Title3 from "../../../../ui/titles/Title3";
import { isInStockAndEnabled } from "../../../../utils";
import Button, { ButtonStyle } from "../../../../ui/buttons/Button";
import { DeliveryAreaIdentifier } from "../../../../app/store/plan/plan.types";

interface Props {
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null;
  handleOpenProductInfo: (selectedItem: PkgItem) => void;
  isMobileBreakpoint: boolean;
  selectedItems: PkgItem[];
  selectedItemsQuantity: { [id: string]: number };
  isQuizResults?: boolean;
  handleSwapItem?: (index: number, identifier: string) => void;
  isItemSwappable?: (index: number) => boolean;
}

interface CardTextProps {
  text: string;
  color: string;
  dataCy?: string;
}

const CardsContainer = styled("section")`
  display: grid;
  grid-template-columns: ${({
    isThreeColumnLayout,
  }: {
    isThreeColumnLayout: boolean;
  }) => (isThreeColumnLayout ? "repeat(3, 1fr)" : "repeat(2, 1fr)")};
  margin-left: -4px;

  @media ${BREAKPOINTS.MOBILE} {
    grid-auto-flow: column;
    grid-template-columns: none;
    overflow-x: scroll;
    margin-bottom: 48px;
    padding: 0 24px;

    /*
      Apparently horizontal scrolling + padding + flexbox/grid do not play nice together
      Relevant link: https://chenhuijing.com/blog/flexbox-and-padding/
    */
    &:after {
      content: "";
      padding-right: 24px;
    }
  }
`;

const Card = styled.div`
  margin: 2px;
  padding: 56px 32px 32px 32px;
  background-color: ${COLORS.CLOUD};
  position: relative;

  @media ${BREAKPOINTS.MOBILE} {
    width: 300px;
    padding: 56px 16px 32px 16px;
  }
`;

const CardText = ({ text, color, dataCy }: CardTextProps) => {
  return (
    <div
      data-cy={dataCy}
      css={css`
        position: absolute;
        top: 26px;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        z-index: ${Z_INDICIES.PACKAGE_ITEMS_CARD_TEXT};
      `}
    >
      <div
        css={css`
          text-align: center;
        `}
      >
        <Title3 color={color}>{text}</Title3>
      </div>
    </div>
  );
};

const PackageItemsDisplay = ({
  deliveryAreaIdentifier,
  handleOpenProductInfo,
  isMobileBreakpoint,
  selectedItems,
  handleSwapItem,
  isItemSwappable,
  selectedItemsQuantity,
  isQuizResults = false,
}: Props) => {
  const isThreeColumnLayout = selectedItems.length >= 7;

  const openProductInfoOverlay = useCallback(
    (selectedItem: PkgItem) => {
      return () => {
        handleOpenProductInfo(selectedItem);
      };
    },
    [handleOpenProductInfo]
  );

  const handleSwapItemClick =
    (index: number, identifier: string) => (event: React.MouseEvent) => {
      // make sure we do not open the product details overlay with onClick of the swap button
      event.stopPropagation();

      if (isQuizResults && handleSwapItem) {
        handleSwapItem(index, identifier);
      }
    };

  const packageItemCards = selectedItems.map((item, index) => {
    const imageSrc = getImageSrc(isMobileBreakpoint, item.image);
    const numItems = selectedItemsQuantity[item.identifier];
    const isItemInStock =
      isQuizResults ||
      isInStockAndEnabled(deliveryAreaIdentifier, item.availability);
    const productCardNameColor =
      isItemInStock && selectedItemsQuantity[item.identifier] > 0
        ? BRAND.PRIMARY_TEXT
        : SHADES.SHADE_LIGHT;

    if (imageSrc) {
      return (
        <Card key={item.identifier}>
          {numItems > 1 && (
            <div
              css={css`
                font-size: 14px;
                position: absolute;
                z-index: ${Z_INDICIES.PACKAGE_ITEMS_CARD_QUANTITY};
                height: 24px;
                width: 40px;
                right: 32px;
                top: 24px;
                border-radius: 20px;
                background: ${SHADES.WHITE};
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
              `}
            >
              <Title3 isBold={true} dataCy="product-card-item-quantity">
                {numItems}
              </Title3>
            </div>
          )}
          {isQuizResults &&
            isItemSwappable &&
            isItemSwappable(index) &&
            selectedItemsQuantity[item.identifier] > 0 && (
              <div
                css={css`
                  position: absolute;
                  top: 26px;
                  left: 32px;
                  z-index: ${Z_INDICIES.PACKAGE_ITEMS_CARD_SWAP};
                `}
              >
                <Button
                  style={ButtonStyle.COMPACT_TEXT}
                  onClick={handleSwapItemClick(index, item.identifier)}
                >
                  Swap
                </Button>
              </div>
            )}

          {!isItemInStock && (
            <CardText text="Out of Stock" color={BRAND.ERROR} />
          )}
          {selectedItemsQuantity[item.identifier] === 0 && (
            <CardText
              dataCy="removed-from-package-text"
              text="Removed"
              color={SHADES.SHADE_LIGHT}
            />
          )}
          <div
            onClick={openProductInfoOverlay(item)}
            role={"button"}
            tabIndex={0}
            css={css`
              width: 100%;
              cursor: pointer;
              height: 0;
              padding-bottom: 100%;
              position: relative;
              ${!isItemInStock || selectedItemsQuantity[item.identifier] === 0
                ? "opacity: 0.7;"
                : ""}
              img {
                object-position: bottom;
                position: absolute;
              }
            `}
          >
            <BaseImage imgUrl={imageSrc} width={500} height={500} />
          </div>
          <Title3
            css={css`
              text-align: center;
              margin-top: 24px;
              padding: 0;
              width: 100%;
            `}
            isBold={true}
            color={productCardNameColor}
          >
            {item.title}
          </Title3>
        </Card>
      );
    }
    return null; // shouldn't hit this
  });

  return (
    <CardsContainer isThreeColumnLayout={isThreeColumnLayout}>
      {packageItemCards}
    </CardsContainer>
  );
};

export default PackageItemsDisplay;
