/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FONTS, BRAND, GRID_BREAKPOINTS } from "../variables";

interface Props {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export const getStyles = ({ color = BRAND.PRIMARY_TEXT }) => css`
  text-transform: uppercase;
  font-size: 16px;
  line-height: 24px;
  font-family: ${FONTS.PRIMARY};
  font-weight: 500;
  color: ${color};
  letter-spacing: 0.08em;
  @media ${GRID_BREAKPOINTS.TABLET} {
    font-size: 14px;
    line-height: 20px;
  }
`;

const Header4 = ({
  color = BRAND.PRIMARY_TEXT,
  children,
  className,
}: Props) => (
  <h4 className={className} css={getStyles({ color })}>
    {children}
  </h4>
);

export default Header4;
