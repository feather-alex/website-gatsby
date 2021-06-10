/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { BREAKPOINTS, BRAND } from "../variables";
import Header4 from "../headers/Header4";
import PanelGroup from "react-bootstrap/lib/PanelGroup";
import Accordion from "../miscellaneous/Accordion";
import Button, { ButtonStyle } from "../buttons/Button";
import { howItWorksClickQuestionPayloadMapping } from "../../analytics/how-it-works/payload-mappings";
import Analytics from "../../analytics/analytics";
import { HOW_IT_WORKS } from "../../analytics/how-it-works/events";
import { FAQ } from "../../contentful/contentful.types";
import RichTextWrapper from "../../contentful/RichTextWrapper";

interface Props {
  faqs: FAQ[];
}

interface State {
  activeKey: React.MouseEvent<string> | string;
}

class FAQSPreFooter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeKey: "",
    };
  }

  handleSelect = (activeKey: React.MouseEvent<string>) => {
    this.setState({ activeKey });

    if (activeKey) {
      Analytics.trackEvent(
        HOW_IT_WORKS.CLICK_FAQ,
        howItWorksClickQuestionPayloadMapping({ question: activeKey })
      );
    }
  };

  render() {
    const { faqs } = this.props;
    const { activeKey } = this.state;

    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: ${BRAND.BACKGROUND};
          padding: 112px 24px 144px;
          text-align: center;

          @media ${BREAKPOINTS.MOBILE} {
            padding: 64px 24px 80px;
          }
        `}
      >
        <div
          css={css`
            width: 100%;
            max-width: 880px;
          `}
        >
          <Header4>Frequently asked questions</Header4>
          <PanelGroup
            css={css`
              width: 100%;
              margin: 48px 0;
            `}
            accordion={true}
            activeKey={activeKey}
            id="panel-group-faqs-pre-footer"
            onSelect={this.handleSelect}
          >
            {faqs.map((faq) => (
              <Accordion
                key={faq.question}
                header={faq.question}
                activeKey={activeKey}
              >
                <RichTextWrapper
                  css={css`
                    & p {
                      font-size: inherit;
                    }
                  `}
                  text={faq.answer}
                />
              </Accordion>
            ))}
          </PanelGroup>
          <Button style={ButtonStyle.TEXT} to="/faqs">
            See all FAQs
          </Button>
        </div>
      </div>
    );
  }
}

export default FAQSPreFooter;
