/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import DOMPurify from "dompurify";

import Analytics from "../../analytics/analytics";
import PAGES from "../../analytics/pages";
import {
  getIsMobileBreakpoint,
  getWindowWidth,
} from "../../app/store/dimensions/dimensions.selectors";

import Layout from "../../app/Layout";
import Helmet from "../../components/Helmet";
import Header2 from "../../ui/headers/Header2";
import ImageWithText from "../../ui/pageElements/ImageWithText";
import Bestsellers from "./Bestsellers";
import HomepageHeader from "./HomepageHeader";
import HomepageReviews from "./HomepageReviews";
import LevitateContainer from "./LevitateContainer";

import { BRAND, SHADES, BREAKPOINTS } from "../../ui/variables";
import { HOMEPAGE, AnalyticsEventKey } from "../../analytics/homepage/events";
import { homepageClickLinkPayloadMapping } from "../../analytics/homepage/payload-mappings";
import Subheader2 from "../../ui/subheaders/Subheader2";
import useMount from "../../utils/useMount";
import Button, { ButtonStyle } from "../../ui/buttons/Button";
import FeatherFloydLogo from "../../ui/logos/FeatherFloydLogo";
import VariableImageFeature from "../../ui/pageElements/VariableImageFeature";
import { getHomepageContent } from "./store/homepage.actions";
import {
  CONTENTFUL_IDS,
  ImageAndText,
  UrlType,
} from "../../contentful/contentful.types";
import {
  getHomepageMeta,
  getHomepageHero,
  getHomepageTextLockup,
  getHomepageSections,
  getIsFetching,
  getError,
  getHomepageShopByRoom,
  getHomepageReviews,
} from "./store/homepage.selectors";
import Loading from "../../components/Loading";
import FullscreenErrorPage from "../../ui/miscellaneous/FullscreenErrorPage";
import ShopByRoom from "./ShopByRoom";
import HomepagePress from "./HomepagePress";

const HomepageSection = styled.section`
  background-color: ${BRAND.BACKGROUND};
`;

const TextLockupSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ isMobileBreakpoint }: { isMobileBreakpoint: boolean }) =>
    isMobileBreakpoint ? `48px 24px 40px` : `115px 24px 94px`};
  background-color: ${SHADES.WHITE};

  > div {
    max-width: 976px;
    & h2 {
      padding: 16px;
    }
  }
`;

const ImageFeaturesSection = styled.section`
  background-color: ${SHADES.WHITE};
  padding-bottom: ${({ isMobileBreakpoint }: { isMobileBreakpoint: boolean }) =>
    isMobileBreakpoint ? 48 : 192}px;
`;

const FeatherFloydFeature = styled(VariableImageFeature)`
  margin: 144px 0;
  @media ${BREAKPOINTS.MOBILE} {
    margin: 0 0 128px;
  }
`;

const FeatherFloydHeader = styled(Header2)`
  max-width: 472px;
  margin: 24px 0 32px;
`;

const trackCTAClick = (eventKey: AnalyticsEventKey) => () => {
  Analytics.trackEvent(
    HOMEPAGE.CLICK_CTA,
    homepageClickLinkPayloadMapping({ link: eventKey })
  );
};

const Homepage = () => {
  const dispatch = useDispatch();

  const isFloydCustomBreakpoint = useSelector(getWindowWidth) < 1148;
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);

  const isFetching = useSelector(getIsFetching);
  const error = useSelector(getError);
  const meta = useSelector(getHomepageMeta);
  const hero = useSelector(getHomepageHero);
  const textLockup = useSelector(getHomepageTextLockup);
  const sections = useSelector(getHomepageSections);
  const shopByRoom = useSelector(getHomepageShopByRoom);
  const reviews = useSelector(getHomepageReviews);

  useMount(() => {
    dispatch(getHomepageContent.request({ id: CONTENTFUL_IDS.HOMEPAGE }));
    Analytics.trackPage(PAGES.HOMEPAGE);
  });

  const HomepageMeta = meta && (
    <Helmet
      title={meta.title}
      description={meta.description}
      imageUrl={meta.imageUrl}
    />
  );

  if (error) {
    return <FullscreenErrorPage meta={meta} error={error} />;
  }

  if (isFetching) {
    return (
      <Layout>
        {HomepageMeta}
        <Loading />
      </Layout>
    );
  }

  const renderHorizontalImageWithText = (
    featureContent: ImageAndText,
    index: number
  ) => {
    // Temp until we look more into linking analytics and contentful - will be part of the coming spike
    const analyticsEvent =
      index === 0
        ? AnalyticsEventKey.sectionOneFurniture
        : AnalyticsEventKey.sectionThreeHowItWorks;

    return (
      featureContent && (
        <ImageWithText
          buttonText={featureContent.cta && featureContent.cta.label}
          isMobileBreakpoint={isMobileBreakpoint}
          imageUrl={featureContent.imageUrl}
          queryParams={{}}
          headerText={featureContent.header}
          paragraphText={featureContent.paragraph}
          external={
            featureContent.cta?.urlType === UrlType.EXTERNAL
              ? featureContent.cta?.url
              : undefined
          }
          to={
            featureContent.cta?.urlType === UrlType.INTERNAL
              ? featureContent.cta?.url
              : undefined
          }
          mailto={
            featureContent.cta?.urlType === UrlType.EMAIL
              ? featureContent.cta?.url
              : undefined
          }
          onClick={trackCTAClick(analyticsEvent)}
          imageSide="right"
          isParagraphRichText={true}
        />
      )
    );
  };

  const renderVerticalImageWithText = (
    featureContent: ImageAndText,
    index: number
  ) => {
    // Temp until we look more into linking analytics and contentful - will be part of the coming spike
    const analyticsEvent =
      index === 1
        ? AnalyticsEventKey.sectionTwoFurniture
        : AnalyticsEventKey.sectionFourQuiz;

    return (
      featureContent && (
        <ImageWithText
          buttonText={featureContent.cta && featureContent.cta.label}
          isMobileBreakpoint={isMobileBreakpoint}
          imageUrl={featureContent.imageUrl}
          queryParams={{}}
          headerText={featureContent.header}
          paragraphText={featureContent.paragraph}
          external={
            featureContent.cta?.urlType === UrlType.EXTERNAL
              ? featureContent.cta?.url
              : undefined
          }
          to={
            featureContent.cta?.urlType === UrlType.INTERNAL
              ? featureContent.cta?.url
              : undefined
          }
          mailto={
            featureContent.cta?.urlType === UrlType.EMAIL
              ? featureContent.cta?.url
              : undefined
          }
          onClick={trackCTAClick(analyticsEvent)}
          imageSide="left"
          isVertical={true}
          isParagraphRichText={true}
        />
      )
    );
  };

  return (
    <Layout>
      {HomepageMeta}
      <HomepageSection>
        <HomepageHeader
          isMobileBreakpoint={isMobileBreakpoint}
          heroContent={hero}
        />

        {shopByRoom && <ShopByRoom shopByRoom={shopByRoom} />}

        {textLockup && (
          <TextLockupSection isMobileBreakpoint={isMobileBreakpoint}>
            <div>
              <Header2>
                <span
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(textLockup.title),
                  }}
                />
              </Header2>
              <Subheader2>{textLockup.body}</Subheader2>
            </div>
          </TextLockupSection>
        )}

        {sections && (
          <ImageFeaturesSection isMobileBreakpoint={isMobileBreakpoint}>
            {renderHorizontalImageWithText(sections[0], 0)}
            {renderVerticalImageWithText(sections[1], 1)}
            {renderHorizontalImageWithText(sections[2], 2)}
            {renderVerticalImageWithText(sections[3], 3)}
          </ImageFeaturesSection>
        )}

        <Bestsellers />

        <FeatherFloydFeature
          image={{
            src: isFloydCustomBreakpoint
              ? "https://img.livefeather.com/pages-new/Homepage/floyd-homepage-mobile.png"
              : "https://img.livefeather.com/pages-new/Homepage/floyd-homepage-desktop.png",
            alt: "Floyd Furniture",
          }}
          imageWidthPercentage={65}
        >
          <FeatherFloydLogo width={144} color={SHADES.WHITE} />
          <FeatherFloydHeader color={SHADES.WHITE}>
            Floyd Furniture Meets Feather Flexibility
          </FeatherFloydHeader>
          <Button
            style={ButtonStyle.PRIMARY_INVERTED}
            onClick={trackCTAClick(AnalyticsEventKey.floydCTA)}
            to="/products?brands=floyd"
          >
            Explore Floyd Furniture
          </Button>
        </FeatherFloydFeature>
        {reviews && <HomepageReviews reviews={reviews} />}
        <HomepagePress />
        <LevitateContainer />
      </HomepageSection>
    </Layout>
  );
};

export default Homepage;
