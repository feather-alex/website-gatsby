/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Fragment } from 'react';
import Title3 from '../../../ui/titles/Title3';
import Title4 from '../../../ui/titles/Title4';
import { BRAND, SHADES } from '../../../ui/variables';
import { MembershipState, MembershipStateDisplayName } from '../../../app/store/plan/plan.types';

interface Props {
  isMobileBreakpoint: boolean;
  deliverToPostal: boolean | null;
  membershipState: MembershipState;
  showBelowMinimum: boolean;
  postalCode: string | null;
  subtotal: number;
  openPlanSelectionOverlay: () => void;
}

const MiniCartBanner = ({
  isMobileBreakpoint,
  deliverToPostal,
  membershipState,
  showBelowMinimum,
  postalCode,
  subtotal,
  openPlanSelectionOverlay
}: Props) => {
  const isVisible = !deliverToPostal || showBelowMinimum;

  const dataCy = showBelowMinimum
    ? membershipState === MembershipState.MEMBER
      ? 'member-minimum'
      : 'nonmember-minimum'
    : '';

  const monthlyMinimum = membershipState === MembershipState.MEMBER ? 29 : 99;
  const memberType = MembershipStateDisplayName[membershipState].toLowerCase();

  let content;

  if (showBelowMinimum) {
    content = `You're just $${
      monthlyMinimum - subtotal
    } away from the $${monthlyMinimum}/month minimum as a ${memberType}.`;
  }

  if (!deliverToPostal) {
    content = (
      <Fragment>
        Sorry, we don't currently deliver to {postalCode || 'your area'}.{' '}
        <span
          role="button"
          tabIndex={0}
          onClick={openPlanSelectionOverlay}
          css={css`
            text-decoration: underline;
            cursor: pointer;
          `}
        >
          Check another zip code.
        </span>
      </Fragment>
    );
  }

  const BannerTitle = isMobileBreakpoint ? Title4 : Title3;

  return (
    <div
      css={css`
        position: absolute;
        top: ${isVisible ? -46 : 0}px;
        right: 0;
        width: ${isMobileBreakpoint ? 100 : 50}vw;
        height: ${isVisible ? 46 : 0}px;
        background: ${BRAND.ERROR};
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        transition: all 0.5s ease-in-out;
      `}
      data-cy={dataCy}
    >
      <BannerTitle color={SHADES.WHITE}>{content}</BannerTitle>
    </div>
  );
};

export default MiniCartBanner;
