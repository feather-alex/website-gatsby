import React from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import styled from "@emotion/styled";
import DOMPurify from "dompurify";
import Analytics from "../analytics/analytics";
import { homepageClickLinkPayloadMapping } from "../analytics/homepage/payload-mappings";
import Helmet from "../components/Helmet";
import Layout from "../components/Layout";
import { BRAND, SHADES } from "../ui/variables";
import Subheader2 from "../ui/subheaders/Subheader2";
import Header2 from "../ui/headers/Header2";
import ImageWithText from "../ui/pageElements/ImageWithText";
import HomepageHeader from "../components/homepage/HomepageHeader";
import ShopByRoom from "../components/homepage/ShopByRoom";
import {
  CONTENTFUL_IDS,
  ImageAndText,
  UrlType,
} from "../contentful/contentful.types";
import { HOMEPAGE, AnalyticsEventKey } from "../analytics/homepage/events";
import App from "../app/App";
// import { useSelector } from "react-redux";
// import { getIsMobileBreakpoint } from "../app/store/dimensions/dimensions.selectors";

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

const trackCTAClick = (eventKey: AnalyticsEventKey) => () => {
  Analytics.trackEvent(
    HOMEPAGE.CLICK_CTA,
    homepageClickLinkPayloadMapping({ link: eventKey })
  );
};

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
        isMobileBreakpoint={false}
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
        isMobileBreakpoint={false}
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

class RootIndex extends React.Component {
  render() {
    // const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const homepageData = get(this, "props.data.contentfulHomepage");
    console.log("homepage data: ", homepageData);
    const sections = homepageData.homepageSections;
    console.log("sections: ", sections);
    // const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);

    return [
      <App />,
      <Layout>
        <Helmet
          title={homepageData.meta.title}
          description={homepageData.meta.description.description}
          imageUrl={homepageData.meta.imageUrl}
        />
        <HomepageSection>
          <HomepageHeader
            heroContent={homepageData.hero}
            isMobileBreakpoint={false}
          />
          <ShopByRoom shopByRoom={homepageData.shopByRoom} />
          <TextLockupSection isMobileBreakpoint={false}>
            <div>
              <Header2>
                <span
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(homepageData.textLockup.title),
                  }}
                />
              </Header2>
              <Subheader2>{homepageData.textLockup.body}</Subheader2>
            </div>
          </TextLockupSection>
          <ImageFeaturesSection isMobileBreakpoint={false}>
            {renderHorizontalImageWithText(sections[0], 0)}
            {renderVerticalImageWithText(sections[1], 1)}
            {renderHorizontalImageWithText(sections[2], 2)}
            {renderVerticalImageWithText(sections[3], 3)}
          </ImageFeaturesSection>
        </HomepageSection>
      </Layout>,
    ];
  }
}

export default RootIndex;

export const pageQuery = graphql`
  query HomePageQuery {
    contentfulHomepage(homepageSections: { elemMatch: { paragraph: {} } }) {
      meta {
        title
        description {
          description
        }
        imageUrl
      }
      hero {
        desktopImage {
          title
          description
          file {
            url
          }
        }
        mobileImage {
          title
          description
          file {
            url
          }
        }
        header1
        header2
        paragraph
        cta {
          label
          style
          url
          urlType
        }
      }
      shopByRoom {
        rooms {
          name
          url
          image {
            title
            description
            file {
              url
            }
          }
        }
      }
      textLockup {
        title
        body
      }
      homepageSections {
        header
        cta {
          label
          style
          url
          urlType
        }
        imageUrl
        imagePosition
        isVertical
        paragraph {
          paragraph
        }
      }
    }
  }
`;
