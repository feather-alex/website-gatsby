/** @jsx jsx */
import React, { useEffect } from "react";
import { v1 } from "uuid";
import { css, jsx } from "@emotion/core";
import { useState } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header2 from "../../../ui/headers/Header2";
import Header3 from "../../../ui/headers/Header3";
import Paragraph1 from "../../../ui/paragraphs/Paragraph1";
import Button, { ButtonStyle } from "../../../ui/buttons/Button";
import { LineBreak } from "../AdditionalUnderwriting";
import { COLORS, BREAKPOINTS, SHADES, BRAND } from "../../../ui/variables";
import RemoveCartItems from "./RemoveCartItems";
import { CheckoutStep } from "../store/checkout.types";
import UnderwritingDeposit from "./UnderwritingDeposit";
import { CartItem } from "../../cart/store/cart.types";
import { removeCartItem } from "../../cart/store/cart.actions";
import { calcSubTotal } from "../../../utils/cart";
import {
  getMaxTCVMonthlyCartTotal,
  getRemovalAmountToMeetMaxTCV,
  cartItemTotalMinimumMet,
  formatCurrency,
} from "../store/checkout.service";
import { DepositOrigin } from "../store/checkout.types";
import Caption from "../../../ui/captions/Caption";
import { APIError } from "../../../types/ReduxState";

const Head = styled.div`
  max-width: 754px;
  margin: auto;
  text-align: center;
  padding-top: 110px;
  @media ${BREAKPOINTS.MOBILE} {
    padding-top: 49px;
  }
`;

const FormSubmit = styled.div`
  max-width: 608px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlowToggle = styled.div`
  max-width: 612px;
  margin: auto;
  display: flex;
  margin-bottom: 40px;
`;

const ToggleButton = styled.button`
  color: ${SHADES.SHADE_DARKER};
  height: 112px;
  background: none;
  padding: 0 24px;
  border: 1px solid ${COLORS.CLOUD_HOVER};
  width: 50%;
  background-color: ${COLORS.CLOUD};
  font-weight: 500;
  @media ${BREAKPOINTS.MOBILE} {
    padding: 0 16px;
  }

  &:hover {
    color: ${COLORS.SHADOW};
  }

  &.selected {
    color: ${BRAND.PRIMARY_TEXT};
    background-color: ${BRAND.BACKGROUND};
    border: 1px solid ${BRAND.PRIMARY};
  }
`;

const SubmitButton = styled(Button)`
  margin-bottom: 32px;
`;

const ErrorMessage = styled(Caption)`
  max-width: 512px;
  margin-bottom: 20px;
  text-align: center;
`;

enum Views {
  ReduceCart,
  Deposit,
}

interface Props {
  cartItems: CartItem[];
  depositAmount: number;
  removedCartItems: string[];
  monthlyFurnitureTotal: number;
  rentalLength: number;
  statedIncome: string;
  maxTCV?: number;
  eligibleForDeposit?: boolean;
  onToggleRemoveItem: (cacheId: string) => void;
  onDepositSubmission: (originator: DepositOrigin) => void;
  isSubmittingDeposit: boolean;
  depositError: APIError | null;
}

export type CachedCartItem = CartItem & { cacheId: string };

const UnderwritingReduceCartDeposit = ({
  statedIncome,
  depositAmount,
  cartItems,
  monthlyFurnitureTotal,
  rentalLength,
  maxTCV,
  onToggleRemoveItem,
  removedCartItems,
  eligibleForDeposit,
  onDepositSubmission,
  isSubmittingDeposit,
  depositError,
}: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [cachedCartItems, setCachedCartItems] = useState<CachedCartItem[]>([]);
  const [currentView, setCurrentView] = useState(Views.ReduceCart);

  useEffect(() => {
    const itemsWithCacheId: CachedCartItem[] = cartItems.map((item) => ({
      ...item,
      cacheId: v1(),
    }));
    setCachedCartItems(itemsWithCacheId);
  }, [cartItems]);

  if (!statedIncome || !maxTCV) {
    history.push(`/checkout/${CheckoutStep.Eligibility}/income`);
    return null;
  }

  const nonRemovedItems = cachedCartItems.filter(
    (item) => !removedCartItems.includes(item.cacheId)
  );

  const maxMonthlyCartTotal = getMaxTCVMonthlyCartTotal(maxTCV, rentalLength);
  const nonRemovedItemTotal = calcSubTotal(nonRemovedItems, rentalLength);
  const amountNeededToRemoveTotal = getRemovalAmountToMeetMaxTCV(
    maxMonthlyCartTotal,
    nonRemovedItemTotal
  );

  const onSubmitCartEdits = () => {
    removedCartItems.forEach((cacheId) => {
      const item = cachedCartItems.find((i) => i.cacheId === cacheId);
      if (item) {
        dispatch(removeCartItem(item));
      }
    });
    history.push(`/checkout/${CheckoutStep.Eligibility}/review`);
  };

  return (
    <React.Fragment>
      <Head>
        <Header2
          dataCy="reduce-cart-deposit-header"
          css={css`
            margin-bottom: 24px;
          `}
        >
          Sorry, your intended furniture spend is more than we can approve at
          this time.
        </Header2>
        <Paragraph1
          css={css`
            max-width: 600px;
            margin: auto;
          `}
        >
          Based on your credit score and reported income of $
          {formatCurrency(Number(statedIncome))}, you have been approved for up
          to a monthly furniture total of ${formatCurrency(maxMonthlyCartTotal)}
          /mo.
        </Paragraph1>
      </Head>

      <LineBreak />

      {eligibleForDeposit && (
        <React.Fragment>
          <Header3
            css={css`
              text-align: center;
              margin-bottom: 32px;
            `}
          >
            Become eligible by selecting one of these two options:
          </Header3>

          <FlowToggle>
            <ToggleButton
              data-cy="remove-items-toggle"
              className={
                currentView === Views.ReduceCart ? "selected" : undefined
              }
              css={css`
                border-right: 0;
              `}
              type="button"
              onClick={() => setCurrentView(Views.ReduceCart)}
            >
              Remove items from your cart
            </ToggleButton>
            <ToggleButton
              data-cy="submit-deposit-toggle"
              className={currentView === Views.Deposit ? "selected" : undefined}
              css={css`
                border-left: 0;
              `}
              type="button"
              onClick={() => setCurrentView(Views.Deposit)}
            >
              Submit a deposit for your intended cart
            </ToggleButton>
          </FlowToggle>
        </React.Fragment>
      )}

      {!eligibleForDeposit && (
        <Header3
          css={css`
            text-align: center;
            transition: all 400ms ease;
            ${amountNeededToRemoveTotal > 0
              ? `
                opacity: 1;
                visibility: visible;
                margin-top: 0px
                margin-bottom: 8px;
                `
              : `
                opacity: 0;
                visibility: hidden;
                margin-top: -32px;
                margin-bottom: 0px;
              `}
          `}
        >
          To become eligible:
        </Header3>
      )}

      {currentView === Views.ReduceCart && (
        <RemoveCartItems
          cartItems={cachedCartItems}
          onToggleRemoveItem={onToggleRemoveItem}
          removedCartItems={removedCartItems}
          monthlyFurnitureTotal={nonRemovedItemTotal}
          amountNeededToRemoveTotal={amountNeededToRemoveTotal}
          rentalLength={rentalLength}
        />
      )}

      {currentView === Views.Deposit && (
        <UnderwritingDeposit
          monthlyFurnitureTotal={monthlyFurnitureTotal}
          depositAmount={depositAmount}
        />
      )}

      <FormSubmit>
        {currentView === Views.ReduceCart && (
          <SubmitButton
            isDisabled={
              !cartItemTotalMinimumMet(rentalLength, nonRemovedItemTotal) ||
              amountNeededToRemoveTotal > 0 ||
              isSubmittingDeposit
            }
            onClick={onSubmitCartEdits}
            isFullWidth={true}
            dataCy="submit-order-reduced-cart"
          >
            Confirm Cart Edits
          </SubmitButton>
        )}

        {currentView === Views.Deposit && (
          <SubmitButton
            onClick={() => {
              onDepositSubmission(DepositOrigin.AdditionalUnderwriting);
            }}
            isFullWidth={true}
            dataCy="submit-deposit-review"
            isDisabled={isSubmittingDeposit}
          >
            {isSubmittingDeposit ? "Sending..." : "Submit Order for Review"}
          </SubmitButton>
        )}

        {depositError && (
          <ErrorMessage color={BRAND.ERROR}>
            Uh oh! Something unexpected happened. Please try again.
          </ErrorMessage>
        )}

        <Button
          to="/cart"
          color={BRAND.SECONDARY_TEXT}
          style={ButtonStyle.COMPACT_TEXT}
        >
          Cancel Order &amp; Return to Cart
        </Button>
      </FormSubmit>
    </React.Fragment>
  );
};

export default UnderwritingReduceCartDeposit;
