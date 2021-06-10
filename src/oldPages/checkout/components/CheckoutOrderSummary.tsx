/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import MiniCartProductsList from '../../cart/components/MiniCartProductsList';
import { CartItem, ProductIdentifiers } from '../../cart/store/cart.types';
import Panel from 'react-bootstrap/lib/Panel';
import React from 'react';
import { MembershipState, MembershipStateDisplayName } from '../../../app/store/plan/plan.types';
import { State as GlobalState } from '../../../types/ReduxState';

import DownIcon from '../../../assets/icons/ui-elements/dropdown_arrow.svg';
import PromoEntry from './PromoEntry';
import { Section, Line, TotalSection } from '../../cart/components/MiniCartFooter';
import Title2 from '../../../ui/titles/Title2';
import Title1 from '../../../ui/titles/Title1';
import { BREAKPOINTS, BRAND, SHADES } from '../../../ui/variables';
import Button, { ButtonStyle } from '../../../ui/buttons/Button';
import { Z_INDICIES } from '../../../ui/zIndicies';
import { ItemUnavailableError } from '../store/checkout.types';
import Caption from '../../../ui/captions/Caption';
import { getDeliveryFee, getTaxDueNow, getDueNow, getMembershipFee, getOrderTCV } from '../store/checkout.selectors';
import { getCartMinimum, getMembershipState } from '../../../app/store/plan/plan.selectors';
import {
  getCartItems,
  getCartUuid,
  getNumberOfItemsInCart,
  getUnavailableItems
} from '../../cart/store/cart.selectors';
import { getIsMobileBreakpoint } from '../../../app/store/dimensions/dimensions.selectors';

const LeaseSection = styled.div`
  text-align: left;
  margin-bottom: 20px;
`;

interface StateProps {
  cartItems: CartItem[];
  totalItems: number;
  deliveryFee: number;
  taxAmount: number;
  dueNow: number;
  orderTCV: number;
  membershipState: MembershipState;
  monthlyMembershipFee: number | null;
  isMobileBreakpoint: boolean;
  cartUuid: string;
  unavailableProducts: ProductIdentifiers[];
  cartMinimum: number | null;
}

type Props = StateProps & {
  backToCart: () => void;
  itemsError: ItemUnavailableError[];
  cartMinimum: number;
  rentalLength: number;
  monthlyFurnitureTotal: number;
};

interface State {
  orderSummaryOpen: boolean | undefined;
  linkDisplay: string;
  inputDisplay: string;
  resultDisplay: string;
}

class CheckoutOrderSummary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      orderSummaryOpen: !props.isMobileBreakpoint,
      linkDisplay: 'block',
      inputDisplay: 'none',
      resultDisplay: 'none'
    };

    this.toggleOrderSummary = this.toggleOrderSummary.bind(this);
  }

  toggleOrderSummary() {
    this.setState((prevState) => ({ orderSummaryOpen: !prevState.orderSummaryOpen }));
  }

  renderBelowMinimum() {
    const { cartMinimum, monthlyFurnitureTotal, membershipState } = this.props;

    return (
      <div className="order-summary__banner">
        {`You're just ${cartMinimum - monthlyFurnitureTotal} away from the ${cartMinimum}
        /month minimum as a ${MembershipStateDisplayName[membershipState].toLowerCase()}.`}
      </div>
    );
  }

  render() {
    const {
      dueNow,
      totalItems,
      taxAmount,
      deliveryFee,
      cartMinimum,
      monthlyFurnitureTotal,
      membershipState,
      monthlyMembershipFee,
      orderTCV
    } = this.props;

    const { orderSummaryOpen } = this.state;

    return (
      <div data-cy="order-summary" className="checkout-page__order-summary">
        <Panel expanded={orderSummaryOpen} onToggle={() => null}>
          <Panel.Heading>
            <Panel.Title>
              <div className="order-summary__header-desktop">
                <Button
                  css={css`
                    margin: 20px 50px;
                    position: absolute;
                    top: 0;
                    right: 0;
                  `}
                  style={ButtonStyle.COMPACT_TEXT}
                  onClick={this.props.backToCart}
                >
                  Back to cart
                </Button>
                <div className="desktop-header">
                  <span className="futura">Order summary</span>
                  <p className="futura reg-14">
                    {totalItems} item{totalItems > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={this.toggleOrderSummary}
                className="order-summary__header-mobile"
              >
                <div>
                  <span className="futura">Order summary</span>
                  <p className="futura reg-14">
                    {totalItems} item{totalItems > 1 ? 's' : ''}
                  </p>
                </div>
                {orderSummaryOpen ? <DownIcon className="rotated-icon" /> : <DownIcon />}
              </div>
            </Panel.Title>
          </Panel.Heading>

          <Panel.Body collapsible={true}>
            <div
              css={css`
                background-color: ${SHADES.WHITE};
                display: flex;
                flex-direction: column;
              `}
              className="order-summary-body"
            >
              <div
                css={css`
                  flex-grow: 1;
                  overflow: auto;
                  height: calc((100vh - 125px) - 362px);
                `}
              >
                <MiniCartProductsList
                  rentalLength={this.props.rentalLength}
                  products={this.props.cartItems}
                  itemsErrors={this.props.itemsError}
                  unavailableProducts={this.props.unavailableProducts}
                  inCheckout={true}
                  isMobileBreakpoint={this.props.isMobileBreakpoint}
                />
              </div>

              {monthlyFurnitureTotal < cartMinimum && this.renderBelowMinimum()}
              <div
                css={css`
                  position: relative;
                  flex-shrink: 0;
                `}
              >
                <div
                  css={css`
                    padding: 20px 50px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-content: center;
                    text-align: center;
                    background: ${BRAND.BACKGROUND};
                    z-index: ${Z_INDICIES.CHECKOUT_ORDER_SUMMARY};
                    @media ${BREAKPOINTS.MOBILE} {
                      padding: 20px;
                      justify-content: flex-start;
                    }
                  `}
                >
                  <Section
                    css={css`
                      padding: 20px 0;
                    `}
                  >
                    <PromoEntry cartUuid={this.props.cartUuid} />
                  </Section>

                  <LeaseSection>
                    <Section>
                      <Title2>{MembershipStateDisplayName[membershipState]} Lease</Title2>
                      <Line />
                      <Title2>
                        {membershipState === MembershipState.MEMBER ? (
                          <Title2>12 Month</Title2>
                        ) : (
                          <Title2>3 Month Minimum</Title2>
                        )}
                      </Title2>
                    </Section>
                    <Caption color={BRAND.SECONDARY_TEXT}>Term begins on furniture delivery date.</Caption>
                  </LeaseSection>

                  {membershipState === MembershipState.MEMBER && (
                    <Section>
                      <Title2>Membership</Title2>
                      <Line />
                      <Title2 dataCy="membership-fee" className="grey-right">
                        ${monthlyMembershipFee}/mo
                      </Title2>
                    </Section>
                  )}
                  <Section>
                    <Title2 className={`${monthlyFurnitureTotal < cartMinimum ? 'below-minimum-amount' : ''}`}>
                      Monthly Furniture Total
                    </Title2>
                    <Line />
                    <Title2
                      dataCy="monthly-subtotal"
                      className={`${monthlyFurnitureTotal < cartMinimum ? 'below-minimum-amount' : 'grey-right'}`}
                    >
                      $
                      {monthlyFurnitureTotal.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                      /mo
                    </Title2>
                  </Section>
                  <Section>
                    <Title2>White-glove Delivery &amp; Assembly</Title2>
                    <Line />
                    <Title2 dataCy="delivery-fee">{!deliveryFee ? `FREE` : `$${deliveryFee}`}</Title2>
                  </Section>
                  {taxAmount > 0 && (
                    <Section>
                      <Title2>Sales Tax</Title2>
                      <Line />
                      <Title2 dataCy="sales-tax">
                        ${taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Title2>
                    </Section>
                  )}
                  <TotalSection>
                    <Title2 isBold={true}>Amount Due Now</Title2>
                    <Line />
                    <Title1 dataCy="amount-due-now" isBold={true}>
                      ${dueNow.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Title1>
                  </TotalSection>
                  {/* hide tcv value from user but allow attentive script to query */}
                  <div
                    css={css`
                      display: none;
                    `}
                    data-attentive="tcv"
                  >
                    {orderTCV}
                  </div>
                </div>
              </div>
            </div>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  cartUuid: getCartUuid(state),
  unavailableProducts: getUnavailableItems(state),
  deliveryFee: getDeliveryFee(state),
  taxAmount: getTaxDueNow(state),
  dueNow: getDueNow(state),
  monthlyMembershipFee: getMembershipFee(state),
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  cartItems: getCartItems(state),
  totalItems: getNumberOfItemsInCart(state),
  membershipState: getMembershipState(state),
  orderTCV: getOrderTCV(state),
  cartMinimum: getCartMinimum(state)
});

export default connect(mapStateToProps)(CheckoutOrderSummary);
