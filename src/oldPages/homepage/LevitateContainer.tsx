/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import Button from '../../ui/buttons/Button';
import Header3 from '../../ui/headers/Header3';
import LevitateIllustration from '../../ui/miscellaneous/LevitateIllustration';
import Analytics from '../../analytics/analytics';
import { HOMEPAGE, AnalyticsEventKey } from '../../analytics/homepage/events';
import { homepageClickLinkPayloadMapping } from '../../analytics/homepage/payload-mappings';

const LevitateContainer = () => {
  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin: 0 auto;
        padding: 120px 0;
      `}
    >
      <LevitateIllustration />

      <div
        css={css`
          max-width: 336px;
          padding: 40px 0;
        `}
      >
        <Header3>Feather is the stress‑free way to furnish your home</Header3>
      </div>

      <Button
        to={'/products'}
        onClick={() =>
          Analytics.trackEvent(
            HOMEPAGE.CLICK_CTA,
            homepageClickLinkPayloadMapping({ link: AnalyticsEventKey.stressFreeFurniture })
          )
        }
      >
        Shop Furniture
      </Button>
    </section>
  );
};

export default LevitateContainer;
