/* eslint-disable jsx-a11y/media-has-caption */
/** @jsx jsx */
import { jsx } from "@emotion/core";

import Button from "../../ui/buttons/Button";
import Paragraph1 from "../../ui/paragraphs/Paragraph1";
import Analytics from "../../analytics/analytics";
import { HOMEPAGE, AnalyticsEventKey } from "../../analytics/homepage/events";
import { homepageClickLinkPayloadMapping } from "../../analytics/homepage/payload-mappings";
import {
  Header,
  HeaderDisplay,
  TextSection,
  CTAContainer,
  ImageContainer,
} from "./HomepageHeaderComponents";

import { HomepageHero } from "../../contentful/contentful.types";
import SecondaryHero from "../../ui/headers/SecondaryHero";
import ResponsiveImage from "../../ui/images/ResponsiveImage";
import { useSelector } from "react-redux";
import { getIsMobileView } from "../../app/store/dimensions/dimensions.selectors";

interface Props {
  isMobileBreakpoint: boolean;
  heroContent: HomepageHero | null;
}

const HomepageHeader = ({ isMobileBreakpoint, heroContent }: Props) => {
  const isMobileView = useSelector(getIsMobileView);

  if (!heroContent) {
    return null;
  }

  const mobileImage = heroContent.mobileImage
    ? heroContent.mobileImage.url
    : heroContent.desktopImage.url;

  return (
    <Header>
      <HeaderDisplay>
        <TextSection>
          <SecondaryHero>{heroContent.header1}</SecondaryHero>
          {heroContent.header2 && (
            <SecondaryHero>{heroContent.header2}</SecondaryHero>
          )}
          <Paragraph1>{heroContent.paragraph}</Paragraph1>
          <CTAContainer isMobileBreakpoint={isMobileBreakpoint}>
            <Button
              to={heroContent.cta[0].url}
              isFullWidth={isMobileView}
              onClick={() =>
                Analytics.trackEvent(
                  HOMEPAGE.CLICK_CTA,
                  homepageClickLinkPayloadMapping({
                    link: AnalyticsEventKey.headerFurniture,
                  })
                )
              }
            >
              {heroContent.cta[0].label}
            </Button>
          </CTAContainer>
        </TextSection>
        <ImageContainer>
          <ResponsiveImage
            src={isMobileView ? mobileImage : heroContent.desktopImage.url}
            objectFit="cover"
            objectPosition={isMobileView ? "top" : "right"}
            height={isMobileView ? 224 : 550}
            width={isMobileView ? 300 : 1200}
          />
        </ImageContainer>
      </HeaderDisplay>
    </Header>
  );
};

export default HomepageHeader;
