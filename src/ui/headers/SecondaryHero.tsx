/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { BRAND, FONTS, GRID_BREAKPOINTS } from "../variables";

const SecondaryHero = ({
  color = BRAND.PRIMARY_TEXT,
  children,
}: {
  color?: string;
  children: React.ReactNode;
}) => (
  <h1
    css={css`
      font-family: ${FONTS.PRIMARY};
      font-weight: 700;
      font-size: 64px;
      line-height: 76px;
      color: ${color};
      @media ${GRID_BREAKPOINTS.TABLET} {
        font-size: 40px;
        line-height: 48px;
      }
    `}
  >
    {children}
  </h1>
);

export default SecondaryHero;
