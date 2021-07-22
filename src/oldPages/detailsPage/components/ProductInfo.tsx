/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useState, ReactNode } from "react";
import PanelGroup from "react-bootstrap/lib/PanelGroup";
import Accordion from "../../..//ui/miscellaneous/Accordion";
import Paragraph2 from "../../../ui/paragraphs/Paragraph2";
import Title2 from "../../../ui/titles/Title2";
import { DETAILS_PAGE } from "../../../analytics/details-page/events";
import Analytics from "../../../analytics/analytics";

interface Props {
  description?: string;
  isMobileBreakpoint: boolean;
  deliveryTimelineText: string;
  customDetails?: { header: string; description: ReactNode }[];
}

const ProductInfo = ({
  isMobileBreakpoint,
  description,
  deliveryTimelineText,
  customDetails,
}: Props) => {
  const [activeKey, setActiveKey] = useState<
    React.MouseEvent<string> | string | null
  >(null);

  const handleAnalytics = (key: string | null) => {
    // Make sure we only fire the analytics when opening an accordion
    // not closing one
    if (!key) {
      return;
    }

    let eventToFire = "";
    const firstWord = key.split(" ")[0];

    if (firstWord === "Product") {
      eventToFire = DETAILS_PAGE.DETAILS_AND_DIMENSIONS;
    } else if (firstWord === "Free" || firstWord === "Delivery") {
      eventToFire = DETAILS_PAGE.DELIVERY_AND_ASSEMBLY;
    } else if (firstWord === "Furniture") {
      eventToFire = DETAILS_PAGE.FURNITURE_WITH_FUTURE;
    }

    if (eventToFire !== "") {
      Analytics.trackEvent(eventToFire);
    }
  };

  const handleOpen = (newKey: React.MouseEvent<string>) => {
    setActiveKey(newKey);

    // activeKey really is just a string
    handleAnalytics(newKey as unknown as string);
  };

  return (
    <section
      css={css`
        width: 100%;
        margin-top: 20px;
      `}
    >
      {isMobileBreakpoint && description && (
        <React.Fragment>
          <div
            css={css`
              margin: 40px 0 10px;
            `}
          >
            <Title2 isBold={true}>Description</Title2>
          </div>
          <div
            css={css`
              margin-bottom: 40px;
            `}
          >
            <Paragraph2>{description}</Paragraph2>
          </div>
        </React.Fragment>
      )}
      <PanelGroup
        css={css`
          margin-bottom: 0;

          > div {
            padding: 4px 0;
          }
        `}
        accordion={true}
        activeKey={activeKey}
        // needed to avoid warning from Bootstrap
        id="panel-group-product-info"
        onSelect={handleOpen}
      >
        {customDetails &&
          customDetails.map((detail) => (
            <Accordion
              header={detail.header}
              key={detail.header}
              activeKey={activeKey}
              isHeaderBold={true}
            >
              <Paragraph2>{detail.description}</Paragraph2>
            </Accordion>
          ))}

        {!isMobileBreakpoint && description && (
          <Accordion
            header="Package details"
            activeKey={activeKey}
            isHeaderBold={true}
          >
            <Paragraph2>{description}</Paragraph2>
          </Accordion>
        )}

        <Accordion
          header={deliveryTimelineText}
          activeKey={activeKey}
          isHeaderBold={true}
        >
          <Paragraph2>
            Our team handles all the heavy lifting so you can go from empty
            apartment to fully furnished home overnight.
          </Paragraph2>
        </Accordion>
        <Accordion
          header="Furniture with a future"
          activeKey={activeKey}
          isHeaderBold={true}
        >
          <Paragraph2>
            By renting with Feather, you're helping keep more furniture in homes
            and out of landfills.
          </Paragraph2>
        </Accordion>
      </PanelGroup>
    </section>
  );
};

export default ProductInfo;
