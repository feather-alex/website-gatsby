/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { BREAKPOINTS } from "../variables";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const HeaderContainer = ({ children, className }: Props) => (
  <div
    className={className}
    css={css`
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100%;
      padding: 112px 0;
      @media ${BREAKPOINTS.MOBILE} {
        height: 152px;
        padding: 0 40px;
      }
    `}
  >
    <div
      css={css`
        max-width: 600px;
        display: flex;
        align-items: baseline;
        margin: 0 24px;
      `}
    >
      {children}
    </div>
  </div>
);

export default HeaderContainer;
