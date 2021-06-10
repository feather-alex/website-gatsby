/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { BRAND, FONTS, GRID_BREAKPOINTS } from "../variables";

const Hero = ({
  color = BRAND.PRIMARY_TEXT,
  children,
}: {
  color?: string;
  children: React.ReactNode;
}) => (
  <h1
    css={css`
      font-family: ${FONTS.ACCENT};
      font-weight: normal;
      font-size: 88px;
      line-height: 100px;
      color: ${color};
      @media ${GRID_BREAKPOINTS.TABLET} {
        font-size: 40px;
        line-height: 52px;
      }
    `}
  >
    {children}
  </h1>
);

export default Hero;
