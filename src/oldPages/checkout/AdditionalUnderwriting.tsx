import styled from '@emotion/styled';
import { connect } from 'react-redux';
import React, { useState, useLayoutEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { CheckoutStep } from './store/checkout.types';
import { BRAND, BREAKPOINTS } from '../../ui/variables';
import { CartItem, PromoInfo } from '../cart/store/cart.types';
import { MembershipState } from '../../app/store/plan/plan.types';
import UnderwritingConfirmIncome from './components/UnderwritingConfirmIncome';
import UnderwritingReduceCartDeposit from './components/UnderwritingReduceCartDeposit';
import UnderwritingReviewOrder from './components/UnderwritingReviewOrder';
import { CheckoutState, DepositOrigin } from './store/checkout.types';
import { APIError, State as GlobalState } from '../../types/ReduxState';
import {
  getIsPlacingOrder,
  getMaxTCVError,
  getMembershipFee,
  getDeliveryFee,
  getTaxDueNow,
  getDueNow,
  getDepositAmount,
  getIsSubmittingDeposit,
  getDepositError
} from './store/checkout.selectors';
import { getMembershipState, getRentalLength } from '../../app/store/plan/plan.selectors';
import { getIsMobileBreakpoint } from '../../app/store/dimensions/dimensions.selectors';
import { getCartItems, getNumberOfItemsInCart, getPromo, getPromoDescription } from '../cart/store/cart.selectors';

const UnderwritingContainer = styled.div`
  padding-bottom: 40px;
  width: 100%;
`;

const Content = styled.div`
  max-width: 1034px;
  margin: auto;
  padding: 0 26px;
`;

export const LineBreak = styled.hr`
  height: 1px;
  background-color: ${BRAND.ACCENT};
  width: 100%;
  margin: 48px 0;
  @media ${BREAKPOINTS.MOBILE} {
    margin: 32px 0;
  }
`;

interface StateProps {
  deliveryFee: number;
  taxAmount: number;
  dueNow: number;
  monthlyMembershipFee: number;
  depositAmount: number;
  isPlacingOrder: boolean;
  isMobileBreakpoint: boolean;
  isSubmittingDeposit: boolean;
  cartItems: CartItem[];
  totalItems: number;
  promo: PromoInfo | null;
  promoDescription: string;
  maxTCVError: CheckoutState['maxTCVError'];
  depositError: APIError | null;
  membershipState: MembershipState;
  rentalLength: number;
}

interface OwnProps {
  statedIncome: string;
  monthlyFurnitureTotal: number;
  onPlaceOrder: () => void;
  onSetStatedIncomeAndPlaceOrder: (statedIncome: string) => void;
  onDepositSubmission: (originator: DepositOrigin) => void;
}

type Props = StateProps & OwnProps;

const AdditionalUnderwriting = (props: Props) => {
  const [removedCartItems, setRemovedCartItems] = useState<string[]>([]);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleToggleRemoveItem = (cacheId: string) => {
    const ids = [...removedCartItems];
    const index = removedCartItems.indexOf(cacheId);

    if (index === -1) {
      ids.push(cacheId);
    } else {
      ids.splice(index, 1);
    }

    setRemovedCartItems(ids);
  };

  return (
    <UnderwritingContainer>
      <Content>
        <Switch>
          <Route exact={true} path={`/checkout/${CheckoutStep.Eligibility}/income`}>
            <UnderwritingConfirmIncome
              isPlacingOrder={props.isPlacingOrder}
              statedIncome={props.statedIncome}
              onSetStatedIncomeAndPlaceOrder={props.onSetStatedIncomeAndPlaceOrder}
            />
          </Route>
          <Route path={`/checkout/${CheckoutStep.Eligibility}/reduce-cart-deposit`}>
            <UnderwritingReduceCartDeposit
              monthlyFurnitureTotal={props.monthlyFurnitureTotal}
              depositAmount={props.depositAmount}
              cartItems={props.cartItems}
              removedCartItems={removedCartItems}
              rentalLength={props.rentalLength}
              maxTCV={props.maxTCVError?.maxTCV}
              eligibleForDeposit={props.maxTCVError?.eligibleForDeposit}
              statedIncome={props.statedIncome}
              onToggleRemoveItem={handleToggleRemoveItem}
              onDepositSubmission={props.onDepositSubmission}
              isSubmittingDeposit={props.isSubmittingDeposit}
              depositError={props.depositError}
            />
          </Route>
          <Route exact={true} path={`/checkout/${CheckoutStep.Eligibility}/review`}>
            <UnderwritingReviewOrder
              dueNow={props.dueNow}
              taxAmount={props.taxAmount}
              cartItems={props.cartItems}
              totalItems={props.totalItems}
              promo={props.promo}
              promoDescription={props.promoDescription}
              monthlyFurnitureTotal={props.monthlyFurnitureTotal}
              deliveryFee={props.deliveryFee}
              rentalLength={props.rentalLength}
              monthlyMembershipFee={props.monthlyMembershipFee}
              membershipState={props.membershipState}
              onPlaceOrder={props.onPlaceOrder}
              isPlacingOrder={props.isPlacingOrder}
              isMobileBreakpoint={props.isMobileBreakpoint}
            />
          </Route>
        </Switch>
      </Content>
    </UnderwritingContainer>
  );
};

const mapStateToProps = (state: GlobalState): StateProps => ({
  deliveryFee: getDeliveryFee(state),
  taxAmount: getTaxDueNow(state),
  dueNow: getDueNow(state),
  monthlyMembershipFee: getMembershipFee(state),
  rentalLength: getRentalLength(state) as number,
  depositAmount: getDepositAmount(state),
  isPlacingOrder: getIsPlacingOrder(state),
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  isSubmittingDeposit: getIsSubmittingDeposit(state),
  cartItems: getCartItems(state),
  totalItems: getNumberOfItemsInCart(state),
  promo: getPromo(state),
  promoDescription: getPromoDescription(state),
  maxTCVError: getMaxTCVError(state),
  depositError: getDepositError(state),
  membershipState: getMembershipState(state)
});

export default connect(mapStateToProps)(AdditionalUnderwriting);
