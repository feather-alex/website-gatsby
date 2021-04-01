/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { FONTS, BRAND, GRID_BREAKPOINTS } from "../variables";

interface Props {
  color?: string;
  children: React.ReactNode;
  dataCy?: string;
  dataAttentive?: string;
  className?: string;
}

export const getStyles = ({ color = BRAND.PRIMARY_TEXT }) => css`
  font-size: 24px;
  line-height: 32px;
  font-family: ${FONTS.PRIMARY};
  font-weight: 500;
  color: ${color};
  @media ${GRID_BREAKPOINTS.TABLET} {
    font-size: 18px;
    line-height: 24px;
  }
`;

const Header3 = ({
  color = BRAND.PRIMARY_TEXT,
  className,
  dataAttentive,
  dataCy,
  children,
}: Props) => (
  <h3
    css={getStyles({ color })}
    className={className}
    data-cy={dataCy}
    data-attentive={dataAttentive}
  >
    {children}
  </h3>
);

export default Header3;
