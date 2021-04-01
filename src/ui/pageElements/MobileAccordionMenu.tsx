/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import Panel from "react-bootstrap/lib/Panel";
import CaratIcon from "../icons/small/CaratIcon";
import { BRAND, MARGINS, BREAKPOINTS, SHADES } from "../variables";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

import Title1 from "../titles/Title1";
import { getBodyMarginTop } from "../../app/store/dimensions/dimensions.selectors";
import { Z_INDICIES } from "../zIndicies";
import { Direction } from "../icons/DecorativeArrowIcon";

interface Props {
  isMenuOpen: boolean;
  title: string | JSX.Element;
  onClick: () => void;
  children: ReactNode;
}

const MobileAccordionMenu = (props: Props) => {
  const bodyMarginTop = useSelector(getBodyMarginTop);

  return (
    <Panel
      expanded={props.isMenuOpen}
      onToggle={() => null}
      css={css`
        position: sticky;
        top: ${bodyMarginTop}px;
        z-index: ${Z_INDICIES.ACCORDION_MENU};
        width: 100%;
        background: ${BRAND.BACKGROUND};
        margin: 0;
        border-radius: 0;
        border: none;
        box-shadow: none;
        ${props.isMenuOpen
          ? `border-bottom: 1px solid ${SHADES.SHADE_LIGHTER};`
          : ""}

        .panel-heading {
          background-color: ${BRAND.BACKGROUND};
          /* Using box shadow will prevent the layout from changing when menu is open */
          box-shadow: inset 1px -10px 0px -9px ${SHADES.SHADE_LIGHTER},
            inset 0px 1px 0px 0px ${SHADES.SHADE_LIGHTER};
        }

        @media ${BREAKPOINTS.DESKTOP} {
          display: none;
        }
      `}
    >
      <Panel.Heading
        css={css`
          padding: 0;
          width: 100%;
          height: 57px;
          border: none;
        `}
      >
        <Panel.Title
          onClick={props.onClick}
          css={css`
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 ${MARGINS.MOBILE};
            color: ${BRAND.PRIMARY_TEXT};
          `}
        >
          <Title1 isBold={true}>{props.title}</Title1>
          <CaratIcon
            direction={props.isMenuOpen ? Direction.Up : Direction.Down}
          />
        </Panel.Title>
      </Panel.Heading>

      <Panel.Body
        collapsible={true}
        css={css`
          padding: ${MARGINS.MOBILE};
        `}
      >
        {props.children}
      </Panel.Body>
    </Panel>
  );
};

export default MobileAccordionMenu;
