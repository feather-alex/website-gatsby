/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import Analytics from "../../analytics/analytics";
import Helmet from "../../components/Helmet";
import Layout from "../../app/Layout";
import PAGES from "../../analytics/pages";
import ContactForm from "./ContactForm";
import {
  getDisplayErrorMessage,
  getIsProcessingRequest,
  getDisplaySuccessMessage,
} from "./store/contact.selectors";
import { sendInquiryRequest } from "./store/contact.actions";
import { ContactFormData } from "./store/contact.types";
import Header2 from "../../ui/headers/Header2";
import Button, { ButtonStyle } from "../../ui/buttons/Button";
import HorizontalImageWithText from "../../ui/pageElements/HorizontalImageWithText";
import { getIsMobileBreakpoint } from "../../app/store/dimensions/dimensions.selectors";
import VerticalImageWithText from "../../ui/pageElements/VerticalImageWithText";
import { BRAND } from "../../ui/variables";

const IMG_BASE = `https://img.livefeather.com`;
const TITLE = `Need help? Chat with us now`;
const DESCRIPTION = `Contact us via Freshchat, email or call 347-352-8599. Located in New York City, San Francisco & Los Angeles.`;

const Contact = () => {
  useEffect(() => {
    Analytics.trackPage(PAGES.CONTACT);
  }, []);
  const displayErrorMessage = useSelector(getDisplayErrorMessage);
  const isProccessingRequest = useSelector(getIsProcessingRequest);
  const displaySuccessMessage = useSelector(getDisplaySuccessMessage);
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    (values: ContactFormData) => {
      dispatch(sendInquiryRequest(values));
    },
    [dispatch]
  );

  return (
    <Layout>
      <Helmet
        title={TITLE}
        description={DESCRIPTION}
        imageUrl={`${IMG_BASE}/pages-new/Contact/grey.png?auto=compress&sat=35&q=50&sharp=15&w=800`}
      />

      <div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            height: 352px;
          `}
        >
          <div
            css={css`
              max-width: 386px;
              text-align: center;
            `}
          >
            <Header2>Chat with a helpful Feather expert</Header2>
          </div>
          <div
            css={css`
              padding: 48px 0;
            `}
          >
            <Button
              style={ButtonStyle.SECONDARY}
              onClick={() => {
                if (window.fcWidget) {
                  window.fcWidget.open();
                }
              }}
            >
              Chat now
            </Button>
          </div>
          <div
            css={css`
              width: 80%;
              height: 1px;
              background-color: ${BRAND.ACCENT};
            `}
          />
        </div>

        <div
          css={css`
            margin-bottom: 200px;
          `}
        >
          <ContactForm
            displayErrorMessage={displayErrorMessage}
            isProccessingRequest={isProccessingRequest}
            displaySuccessMessage={displaySuccessMessage}
            onSubmit={handleSubmit}
          />
        </div>

        <HorizontalImageWithText
          isMobileBreakpoint={isMobileBreakpoint}
          imageUrl="https://img.livefeather.com/pages-new/Contact/unnamed%20(2).png"
          headerText="Feather for business"
          paragraphText="We’ve worked with a variety of clients, from short term rental units to corporate offices. Let us know what you need and we’ll create a plan just for you."
          buttonText="Get in touch"
          mailto="enterprise@livefeather.com"
          queryParams={{
            sat: 50,
            sharp: 10,
          }}
        />
        <VerticalImageWithText
          isMobileBreakpoint={isMobileBreakpoint}
          imageUrl="https://img.livefeather.com/pages-new/Contact/kinglet2.png"
          headerText="In the press"
          paragraphText={
            <span>
              For all inquiries, please reach out directly to{" "}
              <Button style={ButtonStyle.TEXT} mailto="press@livefeather.com">
                press@livefeather.com
              </Button>
            </span>
          }
          queryParams={{
            sat: 24,
            sharp: 10,
          }}
        />
      </div>
    </Layout>
  );
};

export default Contact;
