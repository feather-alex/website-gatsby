/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getIsMobileBreakpoint } from "../../app/store/dimensions/dimensions.selectors";
import useMount from "../../utils/useMount";
import Helmet from "../../components/Helmet";
import CompanyLogos from "./CompanyLogos";
import { trackCTAClick } from "./enterprise.features";
import Layout from "../../app/Layout";
import ImageWithText from "../../ui/pageElements/ImageWithText";
import FAQSPreFooter from "../../ui/footers/FAQSPreFooter";
import Button, { ButtonStyle } from "../../ui/buttons/Button";
import { COLORS, BREAKPOINTS, SHADES } from "../../ui/variables";
import Header1 from "../../ui/headers/Header1";
import Header2 from "../../ui/headers/Header2";
import Header3 from "../../ui/headers/Header3";
import ResponsiveImage from "../../ui/images/ResponsiveImage";
import Subheader2 from "../../ui/subheaders/Subheader2";
import Analytics from "../../analytics/analytics";
import PAGES from "../../analytics/pages";
import { AnalyticsEventKey } from "../../analytics/enterprise/events";
import HalfImageFeature, {
  ImagePosition,
} from "../../ui/pageElements/HalfImageFeature";
import { getEnterpriseContent } from "./store/enterprise.actions";
import {
  getEnterpriseMeta,
  getEnterpriseHeroLockup,
  getEnterpriseIsFetching,
  getEnterpriseError,
  getEnterpriseTitledTripleVerticalImageLockup,
  getEnterpriseTitleButtonLockup,
  getEnterpriseHorizontalLockup,
  getEnterpriseHorizontalLockup2,
  getEnterpriseFAQs,
  getEnterpriseProductShowcase,
} from "./store/enterprise.selectors";
import Loading from "../../components/Loading";
import {
  ImageAndText,
  CONTENTFUL_IDS,
  UrlType,
} from "../../contentful/contentful.types";
import ProductShowcase from "../../ui/miscellaneous/ProductShowcase";
import RichTextWrapper from "../../contentful/RichTextWrapper";
import FullscreenErrorPage from "../../ui/miscellaneous/FullscreenErrorPage";
import TemplateButton from "../../templates/components/TemplateButton";

const ImageWithTextContainer = styled.div`
  background-color: ${COLORS.CLOUD};
  > div {
    padding: 0;
    @media ${BREAKPOINTS.MOBILE} {
      padding: 32px 24px 60px;
    }
  }
`;

const renderCards = (feature: ImageAndText, isMobileBreakpoint: boolean) => {
  return (
    <div
      css={css`
        height: 100%;
        width: ${isMobileBreakpoint ? "100%" : "33.33%"};
        max-width: 406px;
        padding: ${isMobileBreakpoint ? "0 0 64px" : "0 16px"};
      `}
    >
      <div
        css={css`
          height: 100%;
        `}
      >
        <ResponsiveImage src={feature.imageUrl} width={800} height={500} />
      </div>
      <div
        css={css`
          margin: ${isMobileBreakpoint ? "32px 0 8px" : "16px 0"};
        `}
      >
        <Header3>{feature.header}</Header3>
      </div>
      <RichTextWrapper text={feature.paragraph || ""} />
    </div>
  );
};

const Enterprise = () => {
  const dispatch = useDispatch();
  const enterpriseFAQs = useSelector(getEnterpriseFAQs);
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  const isFetching = useSelector(getEnterpriseIsFetching);
  const error = useSelector(getEnterpriseError);
  const meta = useSelector(getEnterpriseMeta);
  const heroLockup = useSelector(getEnterpriseHeroLockup);
  const titledTripleVerticalImageLockup = useSelector(
    getEnterpriseTitledTripleVerticalImageLockup
  );
  const titleButtonLockup = useSelector(getEnterpriseTitleButtonLockup);
  const horizontalLockup = useSelector(getEnterpriseHorizontalLockup);
  const horizontalLockup2 = useSelector(getEnterpriseHorizontalLockup2);
  const productShowcase = useSelector(getEnterpriseProductShowcase);

  useMount(() => {
    dispatch(getEnterpriseContent.request({ id: CONTENTFUL_IDS.ENTERPRISE }));

    Analytics.trackPage(PAGES.ENTERPRISE);
  });

  if (isFetching) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  if (error) {
    return <FullscreenErrorPage meta={meta} error={error} />;
  }

  return (
    <Layout>
      {meta && (
        <Helmet
          title={meta.title}
          description={meta.description}
          imageUrl={meta.imageUrl}
        />
      )}

      {heroLockup && (
        <HalfImageFeature
          image={{
            src: heroLockup.imageUrl,
            height: 616,
            width: 720,
            alt: "Feather's office",
          }}
          imgPosition={
            heroLockup.imagePosition === "right"
              ? ImagePosition.RIGHT
              : ImagePosition.LEFT
          }
        >
          <div
            css={css`
              height: 100%;
              padding: 32px 80px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              @media ${BREAKPOINTS.MOBILE} {
                text-align: center;
                align-items: center;
                padding: 64px 24px 80px 24px;
              }
            `}
          >
            <Header1>{heroLockup.header}</Header1>
            <div
              css={css`
                margin: 24px 0;
              `}
            >
              <RichTextWrapper text={heroLockup?.paragraph || ""} />
            </div>
            {heroLockup.cta && (
              <TemplateButton
                {...heroLockup.cta}
                onClickAnalytics={trackCTAClick(
                  AnalyticsEventKey.headerGetStarted
                )}
              />
            )}
          </div>
        </HalfImageFeature>
      )}

      <section
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: ${SHADES.WHITE};
          padding: ${isMobileBreakpoint
            ? "48px 24px 80px"
            : "116px 88px 192px"};
        `}
      >
        {titledTripleVerticalImageLockup && (
          <Fragment>
            <Header2>{titledTripleVerticalImageLockup.title}</Header2>
            <div
              css={css`
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: ${isMobileBreakpoint ? "center" : "flex-start"};
                flex-direction: ${isMobileBreakpoint ? "column" : "row"};
                padding: ${isMobileBreakpoint ? "32px 0 0" : "76px 0 64px"};

                > div:last-child {
                  ${isMobileBreakpoint && "padding: 0"};
                }
              `}
            >
              {titledTripleVerticalImageLockup.imageLockups.map(
                (lockup) => lockup && renderCards(lockup, isMobileBreakpoint)
              )}
            </div>
          </Fragment>
        )}
        <CompanyLogos />
        {titleButtonLockup && (
          <Fragment>
            <div
              css={css`
                margin: ${isMobileBreakpoint ? "0 0 24px" : "80px 0 40px"};
                text-align: center;
              `}
            >
              <Subheader2>{titleButtonLockup.title}</Subheader2>
            </div>
            <Button
              style={titleButtonLockup.ctaButton.style || ButtonStyle.SECONDARY}
              external={titleButtonLockup.ctaButton.url}
              onClick={trackCTAClick(AnalyticsEventKey.sectionGetStarted)}
            >
              {titleButtonLockup?.ctaButton.label}
            </Button>
          </Fragment>
        )}
      </section>
      {horizontalLockup && (
        <ImageWithTextContainer>
          <ImageWithText
            isMobileBreakpoint={isMobileBreakpoint}
            imageUrl={horizontalLockup.imageUrl}
            paragraphText={horizontalLockup.paragraph}
            headerText={horizontalLockup.header}
            buttonText={horizontalLockup.cta?.label || ""}
            buttonStyle={horizontalLockup.cta?.style || ButtonStyle.SECONDARY}
            isVertical={horizontalLockup.isVertical}
            imageSide={
              horizontalLockup.imagePosition === "left" ||
              horizontalLockup.imagePosition === "right"
                ? horizontalLockup.imagePosition
                : "left"
            }
            external={
              horizontalLockup.cta?.urlType === UrlType.EXTERNAL
                ? horizontalLockup.cta?.url
                : undefined
            }
            to={
              horizontalLockup.cta?.urlType === UrlType.INTERNAL
                ? horizontalLockup.cta?.url
                : undefined
            }
            mailto={
              horizontalLockup.cta?.urlType === UrlType.EMAIL
                ? horizontalLockup.cta?.url
                : undefined
            }
            onClick={trackCTAClick(AnalyticsEventKey.exploreFurniture)}
            isParagraphRichText={true}
          />
        </ImageWithTextContainer>
      )}
      {productShowcase && (
        <ProductShowcase
          title={productShowcase.title}
          productIdentifiers={productShowcase.furnitureIdentifiers}
          variants={productShowcase.variantIdentifiers}
          showCTA={true}
          CTAOnClick={trackCTAClick(
            AnalyticsEventKey.bestsellersExploreFurniture
          )}
        />
      )}
      {horizontalLockup2 && (
        <ImageWithTextContainer>
          <ImageWithText
            isMobileBreakpoint={isMobileBreakpoint}
            imageUrl={horizontalLockup2.imageUrl}
            paragraphText={horizontalLockup2.paragraph}
            headerText={horizontalLockup2.header}
            buttonText={horizontalLockup2.cta?.label || ""}
            buttonStyle={horizontalLockup2.cta?.style || ButtonStyle.SECONDARY}
            isVertical={horizontalLockup2.isVertical}
            imageSide={
              horizontalLockup2.imagePosition === "left" ||
              horizontalLockup2.imagePosition === "right"
                ? horizontalLockup2.imagePosition
                : "left"
            }
            external={
              horizontalLockup2.cta?.urlType === UrlType.EXTERNAL
                ? horizontalLockup2.cta?.url
                : undefined
            }
            to={
              horizontalLockup2.cta?.urlType === UrlType.INTERNAL
                ? horizontalLockup2.cta?.url
                : undefined
            }
            mailto={
              horizontalLockup2.cta?.urlType === UrlType.EMAIL
                ? horizontalLockup2.cta?.url
                : undefined
            }
            onClick={trackCTAClick(AnalyticsEventKey.sectionSpecialProject)}
            isParagraphRichText={true}
          />
        </ImageWithTextContainer>
      )}
      {enterpriseFAQs && <FAQSPreFooter faqs={enterpriseFAQs} />}
    </Layout>
  );
};

export default Enterprise;
