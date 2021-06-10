/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleOverlay } from '../../../app/store/overlay/overlay.actions';
import { Overlays } from '../../../app/store/overlay/overlay.types';
import { MembershipState, MembershipStateDisplayName } from '../../../app/store/plan/plan.types';
import Title1 from '../../../ui/titles/Title1';
import Title2 from '../../../ui/titles/Title2';
import { SHADES, BRAND } from '../../../ui/variables';
import MiniCartBanner from './MiniCartBanner';
import {
  getMonthlyMembershipFee,
  getDeliveryFee,
  getDeliveryZipCode,
  getIsInDeliveryZone,
  getMembershipState,
  getCartMinimum
} from '../../../app/store/plan/plan.selectors';
import { getIsMobileBreakpoint } from '../../../app/store/dimensions/dimensions.selectors';
import { getCartTotals } from '../store/cart.selectors';
import { getIsAuthenticated } from '../../auth/login/store/login.selectors';
import { useHistory } from 'react-router';
import { changeMembershipSelection } from '../../../app/store/plan/plan.actions';
import Button from '../../../ui/buttons/Button';
import { Z_INDICIES } from '../../../ui/zIndicies';

export const Section = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 0;
`;

export const TotalSection = styled(Section)`
  padding: 20px 0 30px;
`;

export const Line = styled.hr`
  flex: 1;
  margin: 0 10px;
  border-color: ${SHADES.SHADE_LIGHTER};
  align-self: center;
`;

export const ChangePlanLink = styled.div`
  margin-left: 5px;
  font-size: 14px;
  color: ${BRAND.SECONDARY_TEXT};
  cursor: pointer;
  text-decoration: underline;
`;

const MiniCartFooter = () => {
  const [showBelowMinimum, setShowBelowMinimum] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const membershipFee = useSelector(getMonthlyMembershipFee);
  const deliveryFee = useSelector(getDeliveryFee);
  const postalCode = useSelector(getDeliveryZipCode);
  const deliverToPostal = useSelector(getIsInDeliveryZone);
  const membershipState = useSelector(getMembershipState);
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  const cartMinimum = useSelector(getCartMinimum);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const { total, subtotal } = useSelector(getCartTotals);

  const isCartMinimumMet = cartMinimum !== null ? subtotal >= cartMinimum : false;

  const handleSwitchMembership = useCallback(() => {
    dispatch(
      changeMembershipSelection(
        membershipState === MembershipState.MEMBER ? MembershipState.NON_MEMBER : MembershipState.MEMBER
      )
    );

    setShowBelowMinimum(!isCartMinimumMet);
  }, [membershipState, isCartMinimumMet, dispatch]);

  const handleCheckoutButtonClick = useCallback(() => {
    if (isAuthenticated) {
      dispatch(toggleOverlay(Overlays.AddItemsToCurrentPlanOverlay, true));
      return;
    }

    if (!isCartMinimumMet && !showBelowMinimum) {
      setShowBelowMinimum(true);
    } else if (isCartMinimumMet) {
      dispatch(toggleOverlay(Overlays.MiniCartOverlay, false));
      history.push({ pathname: '/cart' });
    }
  }, [isAuthenticated, dispatch, isCartMinimumMet, showBelowMinimum, history]);

  const openPlanSelectionOverlay = useCallback(() => {
    dispatch(toggleOverlay(Overlays.PlanSelectionOverlay, true));
  }, [dispatch]);

  return (
    <div
      css={css`
        position: relative;
        flex-shrink: 0;
      `}
    >
      <MiniCartBanner
        isMobileBreakpoint={isMobileBreakpoint}
        deliverToPostal={deliverToPostal}
        membershipState={membershipState}
        showBelowMinimum={!isCartMinimumMet && showBelowMinimum}
        postalCode={postalCode}
        subtotal={subtotal}
        openPlanSelectionOverlay={openPlanSelectionOverlay}
      />

      <div
        css={css`
          width: ${isMobileBreakpoint ? 100 : 50}vw;
          padding: ${isMobileBreakpoint ? '20px' : '20px 50px'};
          display: flex;
          flex-direction: column;
          justify-content: ${isMobileBreakpoint ? 'flex-start' : 'center'};
          align-content: center;
          text-align: center;
          background: ${BRAND.BACKGROUND};
          z-index: ${Z_INDICIES.MINI_CART_FOOTER};
        `}
      >
        {membershipState === MembershipState.MEMBER ? (
          <Section>
            <Title2>Membership (annual)</Title2>
            <ChangePlanLink onClick={handleSwitchMembership}>Remove</ChangePlanLink>
            <Line />
            <Title2>${`${membershipFee}`}/mo</Title2>
          </Section>
        ) : (
          <Section>
            <Title2>{MembershipStateDisplayName[MembershipState.NON_MEMBER]} (3 month)</Title2>
            <Line />
            <ChangePlanLink onClick={handleSwitchMembership}>Switch to member</ChangePlanLink>
          </Section>
        )}

        <Section>
          <Title2 color={isCartMinimumMet ? BRAND.PRIMARY_TEXT : BRAND.ERROR}>Monthly furniture total</Title2>
          <Line />
          <Title2 color={isCartMinimumMet ? BRAND.PRIMARY_TEXT : BRAND.ERROR}>${subtotal.toLocaleString()}/mo</Title2>
        </Section>

        <Section>
          <Title2>White-glove delivery &#38; assembly</Title2>
          <Line />
          <Title2>{membershipState === MembershipState.MEMBER ? 'FREE' : `$${deliveryFee}`}</Title2>
        </Section>

        <TotalSection>
          <Title2 isBold={true}>
            {membershipState === MembershipState.MEMBER ? 'Monthly total' : 'Amount due now:'}
          </Title2>
          <Line />
          <Title1 isBold={true}>
            ${total.toLocaleString()}
            {membershipState === MembershipState.MEMBER && '/mo'}
          </Title1>
        </TotalSection>

        <Button
          isFullWidth={true}
          onClick={handleCheckoutButtonClick}
          dataCy="checkout-button"
          isAppearDisabled={!isCartMinimumMet || !deliverToPostal}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default MiniCartFooter;
