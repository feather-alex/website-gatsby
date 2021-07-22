/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";
import Layout from "../../app/Layout";
import Analytics from "../../analytics/analytics";
import PAGES from "../../analytics/pages";
import Header2 from "../../ui/headers/Header2";
import Button from "../../ui/buttons/Button";
import { BRAND, BREAKPOINTS, MARGINS, SHADES } from "../../ui/variables";
import Caption from "../../ui/captions/Caption";
import Paragraph2 from "../../ui/paragraphs/Paragraph2";
import Header3 from "../../ui/headers/Header3";

const CheckoutSuccessPage = styled.section`
  padding: 140px 0;
  margin: auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${BREAKPOINTS.MOBILE} {
    padding: ${MARGINS.MOBILE};
  }
`;

const NextSteps = styled.div`
  background-color: ${SHADES.WHITE};
  width: 90%;
  padding: 64px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const NextStepsHeader = styled(Header3)`
  max-width: 370px;
  margin-bottom: 16px;
`;

const NextStepsParagraph = styled(Paragraph2)`
  margin-bottom: 32px;
`;

const OrderNumberText = styled(Caption)`
  margin: 16px 0 48px;
`;

interface MatchParams {
  confirmationNumber: string;
}

class CheckoutSuccess extends React.Component<
  RouteComponentProps<MatchParams>
> {
  componentDidMount() {
    Analytics.trackPage(PAGES.CHECKOUT_SUCCESS);
  }
  render() {
    const { confirmationNumber } = this.props.match.params;

    return (
      <Layout>
        <CheckoutSuccessPage>
          <Header2 dataCy="thank-for-your-order-header">
            Thank you for your order!
          </Header2>

          <OrderNumberText
            dataCy="confirmation-number"
            color={BRAND.SECONDARY_TEXT}
          >
            Order Number: {confirmationNumber}
          </OrderNumberText>

          <NextSteps>
            <NextStepsHeader>
              While you’re here, set up your Feather account!{" "}
            </NextStepsHeader>
            <NextStepsParagraph>
              Don’t forget to check your email for your lease.
            </NextStepsParagraph>
            <Button dataCy="create-account-button" to="/setup-account">
              Set Up Account
            </Button>
          </NextSteps>
        </CheckoutSuccessPage>
      </Layout>
    );
  }
}

export default withRouter(CheckoutSuccess);
