/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FONTS, BRAND, GRID_BREAKPOINTS } from "../variables";

interface Props {
  color?: string;
  children: React.ReactNode;
  dataAttentive?: string;
  className?: string;
  dataCy?: string;
}

export const getStyles = ({ color = BRAND.PRIMARY_TEXT }) => css`
  font-size: 48px;
  line-height: 54px;
  font-family: ${FONTS.PRIMARY};
  font-weight: 500;
  color: ${color};
  @media ${GRID_BREAKPOINTS.TABLET} {
    font-size: 34px;
    line-height: 42px;
  }
`;

const Header1 = ({
  color = BRAND.PRIMARY_TEXT,
  className,
  dataAttentive,
  children,
  dataCy,
}: Props) => (
  <h1
    className={className}
    css={getStyles({ color })}
    data-cy={dataCy}
    data-attentive={dataAttentive}
  >
    {children}
  </h1>
);

export default Header1;
