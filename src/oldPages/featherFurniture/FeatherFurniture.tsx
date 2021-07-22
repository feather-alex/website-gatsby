/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import Layout from "../../app/Layout";
import LevitateIllustration from "../../ui/miscellaneous/LevitateIllustration";
import Header3 from "../../ui/headers/Header3";
import Button from "../../ui/buttons/Button";
import Paragraph1 from "../../ui/paragraphs/Paragraph1";
import { SHADES, COLORS, BREAKPOINTS } from "../../ui/variables";
import { useSelector } from "react-redux";
import {
  getIsMobileBreakpoint,
  getWindowWidth,
} from "../../app/store/dimensions/dimensions.selectors";
import Header1 from "../../ui/headers/Header1";
import Subheader2 from "../../ui/subheaders/Subheader2";
import BaseImage from "../../ui/images/BaseImage";
import { getIsNavbarBannerVisible } from "../../app/store/navbar/navbar.selectors";
import Caption from "../../ui/captions/Caption";
import ImageWithText from "../../ui/pageElements/ImageWithText";

const features = [
  {
    imageUrl:
      "https://img.livefeather.com/pages-new/Feather%20Furniture/furniture-components.png",
    text: "We focused on developing a system of component parts so that damage can be isolated and addressed in targeted dose.",
  },
  {
    imageUrl:
      "https://img.livefeather.com/pages-new/Feather%20Furniture/design-process.png",
    text: `We consciously selected materials and performance fabrics that are easy to care for, stain resistant, and can be
        cleaned with just soap and warm water—no harsh chemicals needed.`,
  },
  {
    imageUrl:
      "https://img.livefeather.com/pages-new/Feather%20Furniture/furniture-materials.png",
    text: `We used more sustainable materials such as FSC certified wood and indigenous woods that are more abundantly available.
    Our furniture features natural finishes in woods, water-based finishes, and glues and stains with low or no VOC emissions. All
    these details ultimately add up to a more sustainable product that we can keep in circulation for longer periods of time.`,
  },
];

// We want the margin to match the line-height
const Paragraph = styled(Paragraph1)`
  margin-bottom: 28px;
  @media ${BREAKPOINTS.MOBILE} {
    margin-bottom: 24px;
  }
`;

const FeatherFurniture = () => {
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  const windowWidth = useSelector(getWindowWidth);
  const isNavbarVisible = useSelector(getIsNavbarBannerVisible);
  const imageAttributes = {
    height: isMobileBreakpoint ? 370 : 812,
    width: isMobileBreakpoint ? 376 : 1440,
    h: isMobileBreakpoint ? 600 : 1624,
    w: isMobileBreakpoint ? 376 : 1024,
    top: isMobileBreakpoint ? 122 : 240,
    topNavbar: isMobileBreakpoint ? 262 : 286,
    // in case you're wondering, this was done by:
    // 1. manually picking out values in the inspector
    // 2. graphing them
    // 3. calculating the line
    objectPosition: isMobileBreakpoint
      ? "50% 50.5%"
      : `50% -${0.89 * windowWidth - 456.9}px`,
    padding: isMobileBreakpoint ? "148px 48px" : " 0 40px",
  };
  const Header = isMobileBreakpoint ? Header3 : Header1;
  const SecondaryText = isMobileBreakpoint ? Caption : Subheader2;

  const renderHorizontalImageWithText = (
    feature: { imageUrl: string; text: string },
    imageSide: "left" | "right"
  ) => {
    return (
      <ImageWithText
        isMobileBreakpoint={isMobileBreakpoint}
        imageUrl={feature.imageUrl}
        paragraphText={feature.text}
        imageSide={imageSide}
      />
    );
  };

  return (
    <Layout>
      <section
        css={css`
          ${!isMobileBreakpoint
            ? `
          max-height: 696px;
          min-height: 480px;
          overflow: hidden;
          `
            : ""}
        `}
      >
        <div
          css={css`
            position: absolute;
            margin: 0 auto;
            top: ${isNavbarVisible
              ? imageAttributes.topNavbar
              : imageAttributes.top}px;
            transition: top 400ms linear;
            left: 0;
            right: 0;
            z-index: 1;
            max-width: ${isMobileBreakpoint ? 448 : 844}px;
            padding: ${imageAttributes.padding};
            text-align: center;

            @media screen and (max-width: 425px) {
              padding: 0 48px;
            }
          `}
        >
          <Header>
            Feather Furniture—Built to last and Designed to be Lived in{" "}
          </Header>
          <div
            css={css`
              margin-top: ${isMobileBreakpoint ? 8 : 16}px;
            `}
          >
            <SecondaryText>
              Designed with versatility and comfort in mind. Mix-and-match to
              your heart’s content without feeling overwhelmed.
            </SecondaryText>
          </div>
        </div>
        <div
          css={css`
            height: 0;
            position: relative;
            width: 100%;
            padding-bottom: calc(
              ${imageAttributes.height / imageAttributes.width} * 100%
            );
            overflow: hidden;

            img {
              object-position: ${imageAttributes.objectPosition};
              position: absolute;
            }
          `}
        >
          <BaseImage
            height={imageAttributes.h}
            width={imageAttributes.w}
            imgUrl="https://img.livefeather.com/pages-new/Feather%20Furniture/brooklyn-townhouse-1.jpg"
          />
        </div>
      </section>
      <section
        css={css`
          padding: ${isMobileBreakpoint ? "0" : "115px 20.625% 155px"};
          position: relative;
        `}
      >
        {!isMobileBreakpoint && (
          <div
            css={css`
              position: absolute;
              background-color: ${COLORS.SUMAC};
              height: 80px;
              width: 160px;
              border-radius: 180px 180px 0 0;
              margin: 0 auto;
              left: 0;
              right: 0;
              top: 65px;
            `}
          />
        )}
        {!isMobileBreakpoint && (
          <div
            css={css`
              position: absolute;
              width: 160px;
              height: 80px;
              background-color: ${COLORS.SUMAC};
              margin: 0 auto;
              left: 0;
              right: 0;
              bottom: 115px;
            `}
          />
        )}
        <div
          css={css`
            max-width: 846px;
            width: 100%;
            background-color: ${isMobileBreakpoint
              ? "transparent"
              : SHADES.WHITE};
            padding: ${isMobileBreakpoint ? "48px 24px" : "98px 50px 80px"};
            margin: auto;
          `}
        >
          <Paragraph>
            When Feather first launched in 2017, we offered a curated selection
            of furniture from top brands that we loved and trusted. Over the
            years, we learned so much from listening to our customers as they
            lived with these items. We heard firsthand about the specific
            challenges that came with city living—small spaces, awkward floor
            plans, limited storage. People liked the furniture, but they wanted
            more selection, more variety, more versatility. And we wanted more
            durability so we could continue to redeploy our furniture and keep
            it out of landfills. We decided it was time for us to develop our
            own furniture, something that would offer immense style while also
            performing to our standards of durability and reuse. So we set out
            on a journey.
          </Paragraph>
          <Paragraph>
            Over the last year, we’ve logged countless hours looking at fabric
            swatches, evaluating different species of woods and metals, and
            drawing inspiration from Scandinavian designs—neutral palettes
            punctuated by pops of color, unique textiles, and prints. We’ve
            personally visited dozens of factories, met with manufacturing
            partners who share our values, and forged partnerships with people
            who helped us articulate this vision. The result is a collection of
            furniture unlike any other, an assortment of pieces that can bring
            your apartment to life overnight.
          </Paragraph>
          <Paragraph>
            Most of our pieces are designed with performance fabrics and a
            component part system that makes it easy to clean and refurbish.
            Additionally, the use of sustainable materials, including FSC
            certified wood, more natural and water-based finishes, and glues and
            stains with low to no VOC emissions contribute to a more
            environmentally responsible product.
          </Paragraph>
          <Paragraph1>
            As we send this furniture out into the world, it feels like the
            first part of the journey is over...but another is just beginning.
            Each piece of Feather Furniture is destined for a future with
            multiple lives in multiple homes, a kind of reincarnation that we’re
            incredibly excited to carry out and catalogue through the coming
            years. Our intention has always been to keep more furniture in homes
            and out of landfills. And with this furniture, we’re closer than
            we’ve ever been to achieving that goal.
          </Paragraph1>
        </div>
      </section>
      <section
        css={css`
          background-color: ${COLORS.CLOUD};

          > div:first-child {
            padding-top: ${isMobileBreakpoint ? 32 : 0}px;
          }

          > div:last-child {
            padding-bottom: ${isMobileBreakpoint ? 96 : 0}px;
          }
        `}
      >
        {features.map((feature, index) =>
          renderHorizontalImageWithText(
            feature,
            index % 2 === 0 ? "right" : "left"
          )
        )}
      </section>
      <section
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 144px 0;
        `}
      >
        <LevitateIllustration />

        <div
          css={css`
            max-width: 345px;
            padding: 32px 0;
          `}
        >
          <Header3>Feather is the stress‑free way to furnish your home</Header3>
        </div>

        <Button to={"/products"}>Shop Furniture</Button>
      </section>
    </Layout>
  );
};

export default FeatherFurniture;
