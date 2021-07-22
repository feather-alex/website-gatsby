/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { BRAND, SHADES } from "../../ui/variables";
import Panel from "react-bootstrap/lib/Panel";
import Header3 from "../../ui/headers/Header3";
import CaratIcon, { Direction } from "../../ui/icons/small/CaratIcon";
import Caption from "../../ui/captions/Caption";

interface Props {
  header: string;
  children: React.ReactNode;
  numSelectedFilters: number;
}

const ProductFilterAccordion = ({
  header,
  children,
  numSelectedFilters,
}: Props) => {
  const defaultExpanded = true;
  const [isAccordionOpen, setIsAccordionOpen] = React.useState(defaultExpanded);

  const handleAccordionClick = React.useCallback(
    () => setIsAccordionOpen(!isAccordionOpen),
    [setIsAccordionOpen, isAccordionOpen]
  );

  return (
    <div
      css={css`
        .panel {
          border: none;
          box-shadow: none;

          .panel-heading {
            color: ${BRAND.PRIMARY_TEXT};
            background-color: ${SHADES.WHITE};
            border: none;
          }
        }
      `}
    >
      <Panel
        onToggle={handleAccordionClick}
        eventKey={header}
        defaultExpanded={defaultExpanded}
        css={css`
          margin: 0;
        `}
      >
        <Panel.Heading
          css={css`
            padding: 0;
          `}
        >
          <Panel.Title
            toggle={true}
            css={css`
              a {
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
              }
            `}
          >
            <Header3>{header}</Header3>
            <div
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              <div
                css={css`
                  margin-right: 12px;
                `}
              >
                <Caption color={BRAND.SECONDARY_TEXT}>
                  {numSelectedFilters > 0 && `${numSelectedFilters} Selected`}
                </Caption>
              </div>
              <CaratIcon
                direction={isAccordionOpen ? Direction.Up : Direction.Down}
                width={12}
              />
            </div>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body
          collapsible={true}
          css={css`
            font-size: 16px;
            padding: 0;
            text-align: left;
          `}
        >
          <div
            css={css`
              padding-top: 32px;
            `}
          >
            {children}
          </div>
        </Panel.Body>
      </Panel>
    </div>
  );
};

export default ProductFilterAccordion;
