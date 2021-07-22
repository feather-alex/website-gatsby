/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import Header1 from "../../ui/headers/Header1";
import Subheader2 from "../../ui/subheaders/Subheader2";
import Button from "../../ui/buttons/Button";
import BaseImage from "../../ui/images/BaseImage";
import { COLORS, BREAKPOINTS } from "../../ui/variables";
import Analytics from "../../analytics/analytics";
import { FLOYD } from "../../analytics/floyd/events";
import {
  floydPayloadMapping,
  floydCTALocation,
} from "../../analytics/floyd/payload-mappings";

const HeroContainer = styled.section`
  background-color: ${COLORS.CLOUD};
`;

const HeroMargins = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  max-width: 1440px;
  margin: auto;
  padding: 80px 0;
  @media ${BREAKPOINTS.MOBILE} {
    grid-template-columns: 1fr 1fr;
    padding: 48px 24px 80px;
  }
`;

const HeroImageContainer = styled.div`
  grid-column: 2 / span 5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  & img {
    max-width: 512px;
    height: initial;
  }

  @media ${BREAKPOINTS.MOBILE} {
    grid-column: span 2;
    margin-bottom: 32px;
    padding: 0 56px;
  }
`;

const HeroTextContainer = styled.div`
  grid-column: span 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  text-align: center;

  @media ${BREAKPOINTS.MOBILE} {
    grid-column: span 2;
    margin-bottom: 32px;
    padding: 0;
  }
`;

const Header = styled(Header1)`
  max-width: 554px;
  margin-bottom: 24px;

  @media ${BREAKPOINTS.MOBILE} {
    font-size: 32px;
    margin-bottom: 16px;
  }
`;

const Subheader = styled(Subheader2)`
  margin-bottom: 40px;
  @media ${BREAKPOINTS.MOBILE} {
    margin-bottom: 32px;
  }
`;

const handleAnalytics = () =>
  Analytics.trackEvent(
    FLOYD.CLICK_CTA,
    floydPayloadMapping({ location: floydCTALocation.HERO_CTA })
  );

const Hero = ({ imgUrl }: { imgUrl: string }) => (
  <HeroContainer>
    <HeroMargins>
      <HeroImageContainer>
        <BaseImage
          imgUrl={imgUrl}
          width={512}
          alt="Floyd bed with plant decor"
        />
      </HeroImageContainer>
      <HeroTextContainer>
        <Header>Floyd Furniture Meets Feather Flexibility</Header>
        <Subheader>Get the best of both worlds.</Subheader>
        <Button onClick={handleAnalytics} to="/products?brands=floyd">
          Shop Floyd
        </Button>
      </HeroTextContainer>
    </HeroMargins>
  </HeroContainer>
);

export default Hero;
