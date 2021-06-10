/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import Button, { ButtonStyle } from '../../../ui/buttons/Button';
import Header2 from '../../../ui/headers/Header2';
import Subheader2 from '../../../ui/subheaders/Subheader2';
import Title3 from '../../../ui/titles/Title3';
import { Section, Line } from '../../cart/components/MiniCartFooter';
import { BRAND, BREAKPOINTS } from '../../../ui/variables';
import { CartItem, PromoInfo } from '../../cart/store/cart.types';
import { CheckoutStep } from '../store/checkout.types';
import { MembershipState, MembershipStateDisplayName } from '../../../app/store/plan/plan.types';
import { getCartItemImage } from '../../cart/store/cart.utils';
import ReviewCartItem, { LineBreak } from './ReviewCartItem';

const ReviewOrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Head = styled.div`
  text-align: center;
  max-width: 644px;
  margin: 96px auto auto auto;
  @media ${BREAKPOINTS.MOBILE} {
    margin-top: 71px;
    max-width: 326px;
  }
`;

const OrderSummarySubHeader = styled(Subheader2)`
  margin: 48px auto 8px auto;
  @media ${BREAKPOINTS.MOBILE} {
    margin: 32px auto 0 auto;
  }
`;

const ItemCount = styled.span`
  color: ${BRAND.SECONDARY_TEXT};
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 608px;
`;

const ProductList = styled.div`
  margin: 48px auto;
  @media ${BREAKPOINTS.MOBILE} {
    margin-top: 32px;
  }
`;

const LeaseTypeSection = styled(Section)`
  padding-bottom: 0;
`;

const LeaseTypeSubText = styled(Title3)`
  padding-top: 0;
  margin-bottom: 24px;
`;

const PromoDescription = styled(Title3)`
  text-align: right;
`;

const TotalDueSection = styled(Section)`
  margin-top: 24px;
  margin-bottom: 52px;
`;

const PlaceOrderContainer = styled.div`
  margin-bottom: 32px;
  max-width: 608px;
  width: 100%;
`;

const BackToCartButton = () => {
  return (
    <Button to={`/checkout/${CheckoutStep.Eligibility}/reduce-cart-deposit`} style={ButtonStyle.COMPACT_TEXT}>
      Go Back to Edit Items
    </Button>
  );
};

interface Props {
  cartItems: CartItem[];
  totalItems: number;
  promo: PromoInfo | null;
  promoDescription: string;
  rentalLength: number;
  deliveryFee: number;
  monthlyFurnitureTotal: number;
  taxAmount: number;
  dueNow: number;
  membershipState: MembershipState;
  monthlyMembershipFee: number | null;
  isMobileBreakpoint: boolean;
  onPlaceOrder: Function;
  isPlacingOrder: boolean;
}

const UnderwritingReviewOrder = ({
  cartItems,
  totalItems,
  promo,
  promoDescription,
  membershipState,
  rentalLength,
  monthlyMembershipFee,
  monthlyFurnitureTotal,
  deliveryFee,
  taxAmount,
  dueNow,
  isMobileBreakpoint,
  onPlaceOrder,
  isPlacingOrder
}: Props) => {
  const handlePlaceOrder = () => {
    onPlaceOrder();
  };

  return (
    <ReviewOrderContainer>
      <Head>
        <Header2>Thank you! Please review your items before placing your order. </Header2>
        <OrderSummarySubHeader>
          Order Summary{' '}
          <ItemCount>
            ({totalItems} item{totalItems > 1 ? 's' : ''})
          </ItemCount>
        </OrderSummarySubHeader>
        <BackToCartButton />
      </Head>

      <ContentContainer>
        <ProductList>
          <LineBreak />
          {cartItems.map(({ image, title, variantName, rentalPrices, quantity }: CartItem, index: number) => {
            return (
              <ReviewCartItem
                key={index}
                title={title}
                variantName={variantName}
                index={index}
                backgroundImage={getCartItemImage(image)}
                price={rentalPrices[rentalLength] * quantity}
                isMobileBreakpoint={isMobileBreakpoint}
              />
            );
          })}
        </ProductList>
        <div>
          <LeaseTypeSection>
            <Title3>{MembershipStateDisplayName[membershipState]} Lease</Title3>
            <Line />
            <Title3 dataCy="rental-length" className="grey-right">
              {rentalLength} Months
            </Title3>
          </LeaseTypeSection>
          <LeaseTypeSubText color={BRAND.SECONDARY_TEXT}>Term begins on furniture delivery date.</LeaseTypeSubText>
        </div>
        {promo && (
          <Section>
            <Title3>Promo code: {promo.code}</Title3>
            <Line />
            <PromoDescription dataCy="promo-code">{promoDescription}</PromoDescription>
          </Section>
        )}
        <Section>
          <Title3>
            {membershipState === MembershipState.MEMBER ? 'Membership' : 'Short-Term Plan (3 month minimum)'}
          </Title3>
          <Line />
          <Title3 dataCy="membership-fee" className="grey-right">
            ${monthlyMembershipFee}/mo
          </Title3>
        </Section>
        <Section>
          <Title3>Monthly Furniture Total</Title3>
          <Line />
          <Title3 dataCy="monthly-subtotal">
            ${monthlyFurnitureTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            /mo
          </Title3>
        </Section>
        <Section>
          <Title3>White-glove Delivery &amp; Assembly</Title3>
          <Line />
          <Title3 dataCy="delivery-fee">{!deliveryFee ? `FREE` : `$${deliveryFee}`}</Title3>
        </Section>
        {taxAmount > 0 && (
          <Section>
            <Title3>Sales Tax</Title3>
            <Line />
            <Title3 dataCy="sales-tax">
              ${taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Title3>
          </Section>
        )}
        <TotalDueSection>
          <Title3>Total Due Now</Title3>
          <Line />
          <Subheader2 dataCy="amount-due-now">
            ${dueNow.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Subheader2>
        </TotalDueSection>
      </ContentContainer>

      <PlaceOrderContainer>
        <Button dataCy="place-order-button" onClick={handlePlaceOrder} isDisabled={isPlacingOrder} isFullWidth={true}>
          Place Order
        </Button>
      </PlaceOrderContainer>
      <BackToCartButton />
    </ReviewOrderContainer>
  );
};

export default UnderwritingReviewOrder;
