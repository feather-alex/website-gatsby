/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Panel from "react-bootstrap/lib/Panel";
import Minus from "../../icons/MinusSignIcon";
import Plus from "../../icons/PlusSignIcon";
import { BRAND, SHADES, COLORS } from "../../variables";
import Title1 from "../../titles/Title1";

interface Props {
  children: JSX.Element | string;
  title: string;
  activeKey: React.MouseEvent<string> | string;
}

const MobileCollapsibleFooterLink = ({ title, children, activeKey }: Props) => {
  return (
    <div
      css={css`
        padding: 0 0 20px;

        .panel {
          border: none;
          box-shadow: none;

          .panel-heading {
            color: ${BRAND.PRIMARY_TEXT};
            background-color: ${COLORS.CLOUD};
            border: none;
            padding: 0;
          }
        }
      `}
    >
      <Panel eventKey={title}>
        <Panel.Heading>
          <Panel.Title
            toggle={true}
            css={css`
              padding: 0 0 8px 0;

              a {
                text-decoration: none;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 100%;
              }
            `}
          >
            <Title1 isBold={true}>{title}</Title1>
            {activeKey === title ? <Minus /> : <Plus />}
          </Panel.Title>

          <Panel.Body
            collapsible={true}
            css={css`
              padding: 0 0 8px;
              background-color: ${COLORS.CLOUD};
              text-align: left;
            `}
          >
            {children}
          </Panel.Body>
          <div
            css={css`
              margin-top: 8px;
              height: 1px;
              width: 100%;
              background-color: ${SHADES.SHADE_LIGHTER};
            `}
          />
        </Panel.Heading>
      </Panel>
    </div>
  );
};

export default MobileCollapsibleFooterLink;
