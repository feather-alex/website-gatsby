/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Sticky from "react-stickynode";
import { BREAKPOINTS } from "../variables";

interface Props {
  children: JSX.Element;
  sidebarWidth: string;
  top: number;
  bottomBoundary?: string; // needs to be the className of the main parent container
  enableTransforms?: boolean;
}

const FixedSidebarMenu = (props: Props) => {
  return (
    <Sticky
      css={css`
        width: ${props.sidebarWidth};

        @media ${BREAKPOINTS.MOBILE} {
          display: none;
        }
      `}
      enabled={true}
      top={props.top}
      bottomBoundary={props.bottomBoundary}
      enableTransforms={props.enableTransforms}
    >
      {props.children}
    </Sticky>
  );
};

export default FixedSidebarMenu;
