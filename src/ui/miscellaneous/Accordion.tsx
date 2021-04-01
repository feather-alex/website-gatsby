/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { BRAND, COLORS } from "../../ui/variables";
import Title2 from "../../ui/titles/Title1";
import Panel from "react-bootstrap/lib/Panel";
import MinusSignIcon from "../icons/MinusSignIcon";
import PlusSignIcon from "../icons/PlusSignIcon";

interface Props {
  header: string;
  activeKey: React.MouseEvent<string> | string | null;
  backgroundColor?: string;
  isHeaderBold?: boolean;
  children: React.ReactNode;
}

const Accordion = ({
  header,
  activeKey,
  children,
  backgroundColor = COLORS.CLOUD,
  isHeaderBold = false,
}: Props) => {
  return (
    <div
      css={css`
        padding: 2px 0;

        .panel {
          border: none;
          box-shadow: none;

          .panel-heading {
            color: ${BRAND.PRIMARY_TEXT};
            background: ${backgroundColor};
            border: none;
            padding: 0;
          }

          .panel-heading + .panel-collapse > .panel-body {
            border-top-color: transparent;
          }

          .panel-body a {
            text-decoration: underline;
            font-weight: 500;
          }
        }
      `}
    >
      <Panel eventKey={header}>
        <Panel.Heading
          css={css`
            padding: 0;
          `}
        >
          <Panel.Title
            toggle={true}
            css={css`
              a {
                padding: 16px;
                text-decoration: none;
                display: flex;
                flex-direction: row;
                text-align: left;
                align-items: center;
                width: 100%;
                color: ${BRAND.PRIMARY_TEXT};
                transition: all 150ms ease;

                &:hover {
                  background-color: ${COLORS.CLOUD_HOVER};
                }
              }
            `}
          >
            {activeKey === header ? <MinusSignIcon /> : <PlusSignIcon />}
            <div
              css={css`
                margin-left: 11px;
              `}
            >
              <Title2 isBold={isHeaderBold}>{header}</Title2>
            </div>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body
          collapsible={true}
          css={css`
            font-size: 16px;
            padding: 16px 24px 24px;
            background-color: ${backgroundColor};
            text-align: left;
            color: ${BRAND.PRIMARY_TEXT};
          `}
        >
          {children}
        </Panel.Body>
      </Panel>
    </div>
  );
};

export default Accordion;
