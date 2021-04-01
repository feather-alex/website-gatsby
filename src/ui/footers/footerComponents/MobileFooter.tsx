/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
// import EmailInput from "../../../components/EmailInput";
import {
  FurnitureLinks,
  AboutLinks,
  HelpLinks,
  FooterSocialMediaIcons,
} from "./FooterElements";
import Header4 from "../../headers/Header4";
import PanelGroup from "react-bootstrap/lib/PanelGroup";
import MobileCollapsibleFooterLink from "./MobileCollapsibleFooterLink";
// import { NewsletterInputOrigin } from "../../../app/store/newsletter-signup/newsletter.signup.types";

interface State {
  activeKey: React.MouseEvent<string> | string;
}

class MobileFooter extends React.Component<{}, State> {
  readonly state = { activeKey: "" };

  handleSelect = (activeKey: React.MouseEvent<string>) => {
    this.setState({ activeKey });
  };

  render() {
    const { activeKey } = this.state;

    return (
      <React.Fragment>
        <Header4>Join our newsletter</Header4>

        <div
          css={css`
            margin: 24px 0 64px;
            width: 100%;
          `}
        >
          {/* <EmailInput
            isFullWidth={true}
            origin={NewsletterInputOrigin.FOOTER}
            placeholder="Enter your email to join our newsletter"
            buttonText="Subscribe"
          /> */}
        </div>

        <PanelGroup
          accordion={true}
          activeKey={activeKey}
          id="panel-group-mobile-footer"
          onSelect={this.handleSelect}
          css={css`
            width: 100%;
            position: relative;
            padding-top: 20px;
            margin-bottom: 50px;
          `}
        >
          <MobileCollapsibleFooterLink activeKey={activeKey} title="Furniture">
            <FurnitureLinks />
          </MobileCollapsibleFooterLink>

          <MobileCollapsibleFooterLink activeKey={activeKey} title="About">
            <AboutLinks />
          </MobileCollapsibleFooterLink>

          <MobileCollapsibleFooterLink activeKey={activeKey} title="Help">
            <HelpLinks />
          </MobileCollapsibleFooterLink>
        </PanelGroup>

        <FooterSocialMediaIcons />
      </React.Fragment>
    );
  }
}

export default MobileFooter;
