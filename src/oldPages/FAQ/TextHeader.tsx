/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { BREAKPOINTS } from "../../ui/variables";

interface Props {
  children?: React.ReactNode;
}

const TextHeader = ({ children }: Props): JSX.Element => (
  <header
    css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 512px;
      @media ${BREAKPOINTS.MOBILE} {
        height: 160px;
        padding-bottom: 40px;
        justify-content: flex-end;
      }
    `}
  >
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: baseline;
      `}
    >
      {children}
    </div>
  </header>
);

export default TextHeader;
