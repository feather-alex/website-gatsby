/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useDispatch } from 'react-redux';
import Paragraph2 from '../../../ui/paragraphs/Paragraph2';
import { SHADES, BREAKPOINTS, COLORS, BRAND } from '../../../ui/variables';
import Banner from './Banner';
import { toggleOverlay } from '../../store/overlay/overlay.actions';
import { Overlays } from '../../store/overlay/overlay.types';
import Analytics from '../../../analytics/analytics';
import { NAVBAR } from '../../../analytics/navbar/events';

const ZipcodeSuccessBanner = () => {
  const dispatch = useDispatch();
  return (
    <Banner backgroundColor={COLORS.MINT}>
      <div
        css={css`
          margin-right: 16px;

          @media ${BREAKPOINTS.BANNER} {
            margin-right: 0;
            margin-bottom: 16px;
          }
        `}
      >
        <Paragraph2 color={BRAND.PRIMARY_TEXT}>Great news, you're in our delivery area!</Paragraph2>
      </div>
      <div
        css={css`
          border-radius: 400px;
          box-shadow: inset 0 0 0 2px ${SHADES.BLACK};
          padding: 8px 24px;
          display: flex;
          cursor: pointer;
          display: flex;
          font-weight: 500;
          justify-content: center;
          align-items: center;
          &:hover {
            box-shadow: none;
            background-color: ${SHADES.WHITE};
          }
        `}
        role="button"
        tabIndex={0}
        onClick={() => {
          Analytics.trackEvent(NAVBAR.BANNER_CHOOSE_PLAN);
          dispatch(toggleOverlay(Overlays.PlanSelectionOverlay, true));
        }}
      >
        <Paragraph2 color={BRAND.PRIMARY_TEXT}>Choose your furniture plan</Paragraph2>
      </div>
    </Banner>
  );
};

export default ZipcodeSuccessBanner;
