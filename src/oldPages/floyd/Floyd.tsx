/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import Layout from '../../app/Layout';
import { getIsMobileBreakpoint } from '../../app/store/dimensions/dimensions.selectors';
import Hero from './Hero';
import FeatherXFloyd from './FeatherXFloyd';
import WhyWeLoveFloyd from './WhyWeLoveFloyd';
import VariableImageFeature from '../../ui/pageElements/VariableImageFeature';
import FeatherFloydLogo from '../../ui/logos/FeatherFloydLogo';
import { SHADES } from '../../ui/variables';
import Header2 from '../../ui/headers/Header2';
import Button, { ButtonStyle } from '../../ui/buttons/Button';
import ProductShowcase from '../../ui/miscellaneous/ProductShowcase';
import useMount from '../../utils/useMount';
import Analytics from '../../analytics/analytics';
import PAGES from '../../analytics/pages';
import { FLOYD } from '../../analytics/floyd/events';
import { floydPayloadMapping, floydCTALocation } from '../../analytics/floyd/payload-mappings';

const FLOYD_PRODUCTS = ['the-floyd-sofa', 'the-floyd-platform-bed', 'the-floyd-shelving-system'];
const FLOYD_VARIANTS = ['three-seater-white', 'full-queen-black', 'tall-white', 'three-seater-chaise-white'];

const FeatherFloydHeader = styled(Header2)`
  max-width: 320px;
  margin: 16px 0 32px;
`;

const handleCTAAnalytics = () =>
  Analytics.trackEvent(FLOYD.CLICK_CTA, floydPayloadMapping({ location: floydCTALocation.BEST_OF_BOTH_CTA }));

const Floyd = () => {
  useMount(() => {
    Analytics.trackPage(PAGES.FLOYD);
  });

  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  const imgUrl = isMobileBreakpoint
    ? 'https://img.livefeather.com/pages-new/Floyd/bedroom-with-plant-and-floyd-bed-mobile.png'
    : 'https://img.livefeather.com/pages-new/Floyd/bedroom-with-plant-and-floyd-bed-desktop.png';

  return (
    <Layout>
      <Hero imgUrl={imgUrl} />
      <FeatherXFloyd isMobileBreakpoint={isMobileBreakpoint} />
      <WhyWeLoveFloyd isMobileBreakpoint={isMobileBreakpoint} />
      <ProductShowcase title="Shop Floyd" productIdentifiers={FLOYD_PRODUCTS} variants={FLOYD_VARIANTS} />
      <VariableImageFeature
        image={{
          src: 'https://img.livefeather.com/pages-new/Floyd/man-reading-in-living-room.png',
          alt: 'Get the best of both worlds image'
        }}
        imageWidthPercentage={50}
      >
        <FeatherFloydLogo width={144} color={SHADES.WHITE} />
        <FeatherFloydHeader color={SHADES.WHITE}>Get the best of both worlds</FeatherFloydHeader>
        <Button style={ButtonStyle.PRIMARY_INVERTED} onClick={handleCTAAnalytics} to="/products?brands=floyd">
          Shop Floyd
        </Button>
      </VariableImageFeature>
    </Layout>
  );
};

export default Floyd;
