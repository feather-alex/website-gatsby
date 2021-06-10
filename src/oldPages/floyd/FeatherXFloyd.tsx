/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import FeatherFloydLogo from '../../ui/logos/FeatherFloydLogo';
import Subheader2 from '../../ui/subheaders/Subheader2';
import Button, { ButtonStyle } from '../../ui/buttons/Button';
import { BRAND, BREAKPOINTS } from '../../ui/variables';
import Analytics from '../../analytics/analytics';
import { FLOYD } from '../../analytics/floyd/events';
import { floydPayloadMapping, floydCTALocation } from '../../analytics/floyd/payload-mappings';

const FeatherXFloydContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1440px;
  margin: auto;
  text-align: center;
  padding: 104px 48px;

  @media ${BREAKPOINTS.MOBILE} {
    padding: 64px 24px;
  }
`;

const Subheader = styled(Subheader2)`
  max-width: 776px;
  margin: 48px 0;
`;

const handleAnalytics = () =>
  Analytics.trackEvent(FLOYD.CLICK_CTA, floydPayloadMapping({ location: floydCTALocation.FEATHER_X_FLOYD_CTA }));

const FeatherXFloyd = ({ isMobileBreakpoint }: { isMobileBreakpoint: boolean }) => (
  <FeatherXFloydContainer>
    <FeatherFloydLogo width={isMobileBreakpoint ? 168 : 256} color={BRAND.PRIMARY_TEXT} />
    <Subheader>
      We’re partnering with Floyd to bring more great designs to our customers. This means you’ll be able to rent a
      selection of Floyd sofas, shelves, and beds just like you would any other Feather item. Get everything delivered
      and set up in as little as 7 days, and stay flexible for whatever comes next.
    </Subheader>
    <Button onClick={handleAnalytics} to="/products?brands=floyd" style={ButtonStyle.TERTIARY}>
      Shop Floyd
    </Button>
  </FeatherXFloydContainer>
);

export default FeatherXFloyd;
