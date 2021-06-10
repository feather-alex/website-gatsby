/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import Header4 from "../../headers/Header4";
// import EmailInput from "../../../components/EmailInput";
import {
  FurnitureLinks,
  AboutLinks,
  HelpLinks,
  FooterSocialMediaIcons,
} from "./FooterElements";
// import { NewsletterInputOrigin } from "../../../app/store/newsletter-signup/newsletter.signup.types";

const DesktopFooter = () => (
  <React.Fragment>
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        width: 55%;
        padding-right: 7%;
      `}
    >
      <div>
        <Header4>Furniture</Header4>
        <FurnitureLinks />
      </div>

      <div>
        <Header4>About</Header4>
        <AboutLinks />
      </div>

      <div>
        <Header4>Help</Header4>
        <HelpLinks />
      </div>
    </div>

    <div
      css={css`
        width: 45%;
      `}
    >
      <FooterSocialMediaIcons />

      <div
        css={css`
          margin: 48px 0 24px;
        `}
      >
        <Header4>Join our newsletter</Header4>
      </div>
      {/* <EmailInput
        origin={NewsletterInputOrigin.FOOTER}
        placeholder="Enter your email to join our newsletter"
        buttonText="Subscribe"
      /> */}
    </div>
  </React.Fragment>
);

export default DesktopFooter;
