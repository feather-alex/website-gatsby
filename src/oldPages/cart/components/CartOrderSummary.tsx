/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { BRAND, BREAKPOINTS, SHADES } from "../../../ui/variables";

import Header3 from "../../../ui/headers/Header3";
import Title3 from "../../../ui/titles/Title3";
import Button from "../../../ui/buttons/Button";
import { ProductIdentifiers } from "../store/cart.types";
import {
  MembershipState,
  MembershipStateDisplayName,
} from "../../../app/store/plan/plan.types";
import Paragraph2 from "../../../ui/paragraphs/Paragraph2";
import Subheader2 from "../../../ui/subheaders/Subheader2";
import SelectInput, { InputType } from "../../../ui/formElements/SelectInput";

const Container = styled.div`
  max-width: 400px;
  margin-left: 48px;
  display: flex;
  flex-shrink: 1.75;
  flex-direction: column;
  justify-content: flex-end;
  position: sticky;
  top: 136px;
  overflow: auto;

  @media ${BREAKPOINTS.BANNER} {
    max-width: 536px;
  }

  @media ${BREAKPOINTS.MOBILE} {
    margin: 0;
    max-width: none;
  }
`;

const OrderSummary = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${BRAND.BACKGROUND};
  padding: 32px 32px 24px 32px;

  @media ${BREAKPOINTS.BANNER} {
    background-color: transparent;
    margin-top: 32px;
    padding: 0;
  }

  @media ${BREAKPOINTS.MOBILE} {
    max-width: none;
    width: 100%;
    padding: 32px 24px;
  }
`;

const OrderSummaryHeader = styled(Header3)`
  margin-bottom: 24px;
`;

const OrderSummaryLineItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  width: 100%;

  @media ${BREAKPOINTS.MOBILE} {
    margin-bottom: 8px;
  }
`;

const OrderSummarySubtotal = styled(OrderSummaryLineItem)`
  margin-top: 10px;
  margin-bottom: 8px;

  @media ${BREAKPOINTS.MOBILE} {
    margin-top: 8px;
  }
`;

const Line = styled.hr`
  flex: 2;
  width: 100%;
  margin: 8px 0;
  border-color: ${SHADES.SHADE_LIGHTER};
  align-self: center;
`;

const BoldParagraph2 = styled(Paragraph2)`
  font-weight: 500;
`;

const TermsAndConditionsSection = styled.div`
  margin-top: 16px;
  margin-bottom: 24px;
  width: auto;
  display: flex;
  justify-content: space-around;
`;

const TermsAndConditionsLink = styled(Link)`
  color: ${SHADES.SHADE_DARK};
  text-decoration: underline;

  &:hover {
    color: ${SHADES.SHADE_DARK};
  }
`;

const CheckoutButton = styled(Button)`
  margin-bottom: 8px;
`;

const MinimumErrorMessage = styled(Title3)`
  margin: 8px 0;
`;

const OutOfStockErrorMessage = styled(Title3)`
  margin: 8px 0;
`;

export interface Props {
  membershipState: MembershipState;
  membershipFee: number | null;
  subtotal: number;
  total: number;
  showTncError: boolean;
  isTncChecked: boolean;
  unavailableCartItems: ProductIdentifiers[];
  cartMinimum: number | null;
  validZipcode: boolean | null;
  handleCheckoutClick: () => void;
  handleTncCheck: () => void;
  handleTrackTncClick: () => void;
}

const CartOrderSummary = (props: Props) => {
  const {
    membershipState,
    membershipFee,
    cartMinimum,
    total,
    subtotal,
    isTncChecked,
    validZipcode,
    handleCheckoutClick,
    handleTncCheck,
    handleTrackTncClick,
    unavailableCartItems,
    showTncError,
  } = props;

  const isCheckoutDisabled = () => {
    return (
      !cartMinimum ||
      subtotal < cartMinimum ||
      !validZipcode ||
      !!unavailableCartItems.length
    );
  };

  return (
    <Container>
      <OrderSummary>
        <OrderSummaryHeader>Order Summary</OrderSummaryHeader>

        <OrderSummaryLineItem>
          <Paragraph2>Delivery &#38; Assembly:</Paragraph2>
          <BoldParagraph2>
            {membershipState === MembershipState.MEMBER ? `FREE` : `$99`}
          </BoldParagraph2>
        </OrderSummaryLineItem>

        {membershipState === MembershipState.MEMBER && (
          <OrderSummaryLineItem>
            <Paragraph2>Membership:</Paragraph2>
            <Paragraph2>${membershipFee}/mo</Paragraph2>
          </OrderSummaryLineItem>
        )}

        <Line />

        <OrderSummarySubtotal>
          <Paragraph2>Subtotal:</Paragraph2>
          <Subheader2>
            ${total}
            {membershipState === MembershipState.MEMBER && "/mo"}
          </Subheader2>
        </OrderSummarySubtotal>

        <Line />

        <TermsAndConditionsSection>
          <SelectInput
            dataCy="checkmark"
            inputType={InputType.Checkbox}
            onChange={handleTncCheck}
            isChecked={isTncChecked}
            error={showTncError}
          >
            <Paragraph2 color={SHADES.SHADE_DARK}>
              I agree to Feather's&nbsp;
              <TermsAndConditionsLink
                to="/terms-and-conditions"
                target="_blank"
                onClick={handleTrackTncClick}
              >
                Terms & Conditions
              </TermsAndConditionsLink>
            </Paragraph2>
          </SelectInput>
        </TermsAndConditionsSection>

        <CheckoutButton
          dataCy="checkout-button"
          isFullWidth={true}
          isDisabled={isCheckoutDisabled()}
          onClick={handleCheckoutClick}
        >
          Checkout
        </CheckoutButton>

        {cartMinimum && subtotal < cartMinimum && (
          <MinimumErrorMessage color={BRAND.ERROR}>
            As a {MembershipStateDisplayName[membershipState].toLowerCase()},
            you must meet a ${cartMinimum} minimum in order to checkout.
          </MinimumErrorMessage>
        )}

        {!!unavailableCartItems.length && (
          <OutOfStockErrorMessage
            color={BRAND.ERROR}
            dataCy="out-of-stock-cart"
          >
            Unfortunately some of your items are now unavailable! To proceed
            with checkout, please remove any out of stock items.
          </OutOfStockErrorMessage>
        )}
      </OrderSummary>
    </Container>
  );
};

export default CartOrderSummary;
