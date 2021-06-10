/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";
import { Link } from "gatsby";
// import Analytics from '../../../analytics/analytics';
// import { FOOTER } from '../../../analytics/footer/events';
// import { footerLinkClickedPayloadMapping } from '../../../analytics/footer/payload-mappings';
import Paragraph2 from "../../paragraphs/Paragraph2";
import Header4 from "../../headers/Header4";
import PinterestLogo from "../../logos/PinterestLogo";
import TwitterLogo from "../../logos/TwitterLogo";
import FacebookLogo from "../../logos/FacebookLogo";
import LinkedInLogo from "../../logos/LinkedInLogo";
import InstagramLogo from "../../logos/InstagramLogo";
import { BREAKPOINTS } from "../../variables";
import { ProductCategories } from "../../../utils/productCategories";

const handleTrackLink = (link: string) => () => {
  // Analytics.trackEvent(FOOTER.CLICK_CTA, footerLinkClickedPayloadMapping({ link }));
};

const LinksSection = styled.div`
  margin-top: 24px;

  @media ${BREAKPOINTS.MOBILE} {
    margin-top: 16px;
  }

  p {
    padding-bottom: 8px;
    &:hover {
      opacity: 0.45;
    }
  }
`;

export const FurnitureLinks = () => (
  <LinksSection>
    <Link to="/packages" onClick={handleTrackLink("Packages")}>
      <Paragraph2>Packages</Paragraph2>
    </Link>
    <Link to="/products/living-room" onClick={handleTrackLink("Living Room")}>
      <Paragraph2>{ProductCategories.LivingRoom}</Paragraph2>
    </Link>
    <Link to="/products/bedroom" onClick={handleTrackLink("Bedroom")}>
      <Paragraph2>{ProductCategories.Bedroom}</Paragraph2>
    </Link>
    <Link to="/products/dining-room" onClick={handleTrackLink("Dining Room")}>
      <Paragraph2>{ProductCategories.Dining}</Paragraph2>
    </Link>
    <Link to="/products/home-office" onClick={handleTrackLink("Home Office")}>
      <Paragraph2>{ProductCategories.HomeOffice}</Paragraph2>
    </Link>
    <Link to="/products/decor" onClick={handleTrackLink("Decor")}>
      <Paragraph2>{ProductCategories.Decor}</Paragraph2>
    </Link>
    <Link to="/products/lighting" onClick={handleTrackLink("Lighting")}>
      <Paragraph2>{ProductCategories.Lighting}</Paragraph2>
    </Link>
    <Link to="/products" onClick={handleTrackLink("All Furniture")}>
      <Paragraph2>All Furniture</Paragraph2>
    </Link>
  </LinksSection>
);

export const AboutLinks = () => (
  <LinksSection>
    <Link to="/how-it-works" onClick={handleTrackLink("How It Works")}>
      <Paragraph2>How it Works</Paragraph2>
    </Link>
    <Link to="/about" onClick={handleTrackLink("About Feather")}>
      <Paragraph2>About Feather</Paragraph2>
    </Link>
    <Link
      to="/feather-furniture"
      onClick={handleTrackLink("Feather Furniture")}
    >
      <Paragraph2>Feather Furniture</Paragraph2>
    </Link>
    <Link to="/reviews" onClick={handleTrackLink("Reviews")}>
      <Paragraph2>Reviews</Paragraph2>
    </Link>
    <Link to="/contact" onClick={handleTrackLink("Contact")}>
      <Paragraph2>Contact us</Paragraph2>
    </Link>
    <Link to="/office" onClick={handleTrackLink("Feather for Office")}>
      <Paragraph2>Feather for Office</Paragraph2>
    </Link>
    <a
      href="https://try.livefeather.com/home-staging"
      rel="noopener noreferrer"
      target="_blank"
    >
      <Paragraph2>Feather for Staging</Paragraph2>
    </a>
    <a
      href="https://app.impact.com/advertiser-advertiser-info/Feather-Home-Inc.brand"
      rel="noopener noreferrer"
      target="_blank"
    >
      <Paragraph2>Affiliate Program</Paragraph2>
    </a>
    <Link to="/about/#careers" onClick={handleTrackLink("Careers")}>
      <Paragraph2>Careers</Paragraph2>
    </Link>
    <Link to="/in-your-area" onClick={handleTrackLink("In Your Area")}>
      <Paragraph2>In Your Area</Paragraph2>
    </Link>
  </LinksSection>
);

export const HelpLinks = () => (
  <LinksSection>
    <Link to="/faqs" onClick={handleTrackLink("FAQs")}>
      <Paragraph2>FAQs</Paragraph2>
    </Link>
    <Link to="/privacy-policy" onClick={handleTrackLink("Privacy Policy")}>
      <Paragraph2>Privacy Policy</Paragraph2>
    </Link>
    <Link
      to="/terms-and-conditions"
      onClick={handleTrackLink("Terms And Conditions")}
    >
      <Paragraph2>Terms</Paragraph2>
    </Link>
  </LinksSection>
);

const LogoContainer = styled.div`
  margin-right: 16px;
`;

export const FooterSocialMediaIcons = () => (
  <React.Fragment>
    <Header4>Feather on Social Media</Header4>
    <div
      css={css`
        display: flex;
        margin-top: 24px;
      `}
    >
      <LogoContainer
        role="button"
        tabIndex={0}
        onClick={handleTrackLink("Pinterest")}
      >
        <PinterestLogo />
      </LogoContainer>
      <LogoContainer
        role="button"
        tabIndex={0}
        onClick={handleTrackLink("Twitter")}
      >
        <TwitterLogo />
      </LogoContainer>
      <LogoContainer
        role="button"
        tabIndex={0}
        onClick={handleTrackLink("Instagram")}
      >
        <InstagramLogo />
      </LogoContainer>
      <LogoContainer
        role="button"
        tabIndex={0}
        onClick={handleTrackLink("LinkedIn")}
      >
        <LinkedInLogo />
      </LogoContainer>
      <LogoContainer
        role="button"
        tabIndex={0}
        onClick={handleTrackLink("Facebook")}
      >
        <FacebookLogo />
      </LogoContainer>
    </div>
  </React.Fragment>
);
