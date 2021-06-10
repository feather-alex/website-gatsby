/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FONTS, BRAND, GRID_BREAKPOINTS } from "../variables";

interface Props {
  color?: string;
  children: React.ReactNode;
  dataCy?: string;
  dataAttentive?: string;
  className?: string;
}

export const getStyles = ({ color = BRAND.PRIMARY_TEXT }) => css`
  font-size: 36px;
  line-height: 44px;
  font-family: ${FONTS.PRIMARY};
  font-weight: 500;
  color: ${color};
  @media ${GRID_BREAKPOINTS.TABLET} {
    font-size: 26px;
    line-height: 34px;
  }
`;

const Header2 = ({
  color = BRAND.PRIMARY_TEXT,
  className,
  dataCy,
  dataAttentive,
  children,
}: Props) => (
  <h2
    className={className}
    css={getStyles({ color })}
    data-cy={dataCy}
    data-attentive={dataAttentive}
  >
    {children}
  </h2>
);

export default Header2;
