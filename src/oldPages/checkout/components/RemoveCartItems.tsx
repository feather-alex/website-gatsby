/** @jsx jsx */
import React, { useEffect, useRef, useState } from "react";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import Subheader2 from "../../../ui/subheaders/Subheader2";
import FixedSizeImage from "../../../ui/images/FixedSizeImage";
import Paragraph1 from "../../../ui/paragraphs/Paragraph1";
import Caption from "../../../ui/captions/Caption";
import { BREAKPOINTS, SHADES, BRAND } from "../../../ui/variables";
import Button, { ButtonStyle } from "../../../ui/buttons/Button";
import { CartItem } from "../../cart/store/cart.types";
import { formatCurrency } from "../store/checkout.service";
import { CachedCartItem } from "./UnderwritingReduceCartDeposit";
import { getCartItemImage } from "../../cart/store/cart.utils";

const ItemContent = styled.div`
  display: flex;
  align-items: center;
`;

interface CartItemProps {
  isRemoved: boolean;
  item: CachedCartItem;
  rentalLength: number;
  onToggleRemoveItem: (cacheId: string) => void;
}

const CartItem = ({
  item,
  onToggleRemoveItem,
  isRemoved,
  rentalLength,
}: CartItemProps) => {
  return (
    <li
      css={css`
        display: flex;
        height: 118px;
        padding: 16px;
        background: ${isRemoved ? "rgba(255, 255, 255, 0.5)" : SHADES.WHITE};
        margin-bottom: 4px;
        display: flex;
        justify-content: space-between;
      `}
    >
      <ItemContent>
        <span
          css={css`
            opacity: ${isRemoved ? 0.5 : 1};
          `}
        >
          <FixedSizeImage
            src={getCartItemImage(item.image)}
            width={86}
            height={86}
          />
        </span>

        <span
          css={css`
            padding-left: 20px;
          `}
        >
          <Paragraph1 color={isRemoved ? BRAND.ACCENT : BRAND.PRIMARY_TEXT}>
            {item.title}
          </Paragraph1>
          <Caption
            css={css`
              color: ${BRAND.ACCENT};
            `}
          >
            {item.variantName}
          </Caption>
        </span>
      </ItemContent>

      <ItemContent
        css={css`
          @media ${BREAKPOINTS.MOBILE} {
            flex-direction: column;
            justify-content: center;
            padding-left: 12px;
          }
        `}
      >
        <Button
          style={ButtonStyle.COMPACT_TEXT}
          onClick={() => onToggleRemoveItem(item.cacheId)}
          color={isRemoved ? BRAND.ACCENT : BRAND.PRIMARY}
          css={css`
            margin-right: 16px;
            &:focus {
              color: ${isRemoved ? BRAND.ACCENT : BRAND.PRIMARY};
            }

            @media ${BREAKPOINTS.MOBILE} {
              margin: 0;
            }
          `}
          dataCy="remove-add-back-button"
        >
          {isRemoved ? "Add Back" : "Remove"}
        </Button>
        <Paragraph1
          css={css`
            color: ${isRemoved ? BRAND.ACCENT : BRAND.PRIMARY_TEXT};
            @media ${BREAKPOINTS.MOBILE} {
              order: -1;
            }
          `}
        >
          ${item.rentalPrices[rentalLength]}/mo
        </Paragraph1>
      </ItemContent>
    </li>
  );
};

const CartItems = styled.ul`
  max-width: 612px;
  margin: auto;
  @media ${BREAKPOINTS.MOBILE} {
    margin-left: -26px;
    margin-right: -26px;
  }
`;

const Total = styled.div`
  border-top: 1px solid ${BRAND.ACCENT};
  border-bottom: 1px solid ${BRAND.ACCENT};
  margin: 32px 0 48px 0;
  padding: 21px;
`;

const TotalContent = styled.div`
  max-width: 612px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
`;

interface Props {
  cartItems: CachedCartItem[];
  removedCartItems: string[];
  rentalLength: number;
  amountNeededToRemoveTotal: number;
  monthlyFurnitureTotal: number;
  onToggleRemoveItem: (cacheId: string) => void;
}

const LockingSubheader = ({ children }: { children: React.ReactNode }) => {
  const [isLocked, setIsLocked] = useState(false);
  const el = useRef<HTMLDivElement>(null);

  const checkHeight = () => {
    if (!el.current) return;

    const offset = el.current.offsetTop - window.scrollY;
    if (offset > 0) {
      return setIsLocked(false);
    }
    return setIsLocked(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkHeight);
    return () => window.removeEventListener("scroll", checkHeight);
  }, []);

  return (
    <div ref={el}>
      <Subheader2
        css={css`
          text-align: center;
          padding-bottom: 32px;
          transition: padding 400ms ease;
          ${isLocked &&
          css`
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 2;
            padding-top: 24px;
            padding-bottom: 42px;
            background: linear-gradient(
              180deg,
              ${BRAND.BACKGROUND} 60%,
              rgba(255, 255, 255, 0) 100%
            );
          `};
        `}
      >
        {children}
      </Subheader2>
      {isLocked && el.current && (
        <div
          css={css`
            height: ${el.current.offsetHeight}px;
            padding-bottom: 32px;
          `}
        />
      )}
    </div>
  );
};

const RemoveCartItems = ({
  cartItems,
  onToggleRemoveItem,
  removedCartItems,
  amountNeededToRemoveTotal,
  rentalLength,
  monthlyFurnitureTotal,
}: Props) => {
  let neededTotal = amountNeededToRemoveTotal;
  if (amountNeededToRemoveTotal < 0) {
    neededTotal = 0;
  }

  return (
    <React.Fragment>
      <LockingSubheader>
        {neededTotal > 0
          ? `Please remove ${formatCurrency(neededTotal)}/mo from your cart`
          : `You’re eligible to check out!`}
      </LockingSubheader>

      <CartItems>
        {cartItems.map((item) => (
          <CartItem
            key={item.cacheId}
            item={item}
            rentalLength={rentalLength}
            onToggleRemoveItem={onToggleRemoveItem}
            isRemoved={removedCartItems.includes(item.cacheId)}
          />
        ))}
      </CartItems>

      <Total>
        <TotalContent>
          <Caption>Monthly Furniture Total</Caption>
          <Subheader2>${formatCurrency(monthlyFurnitureTotal)}/mo</Subheader2>
        </TotalContent>
      </Total>
    </React.Fragment>
  );
};

export default RemoveCartItems;
