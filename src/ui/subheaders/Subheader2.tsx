/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FONTS, BRAND, BREAKPOINTS } from "../variables";

interface Props {
  dataCy?: string;
  color?: string;
  className?: string;
  children: React.ReactNode;
}

export const getStyles = ({ color = BRAND.PRIMARY_TEXT }) => css`
  font-family: ${FONTS.PRIMARY};
  font-size: 24px;
  line-height: 32px;
  color: ${color};
  @media ${BREAKPOINTS.MOBILE} {
    font-size: 18px;
    line-height: 24px;
  }
`;

const Subheader2 = ({
  color = BRAND.PRIMARY_TEXT,
  className,
  children,
  dataCy,
}: Props) => (
  <h6 className={className} css={getStyles({ color })} data-cy={dataCy}>
    {children}
  </h6>
);

export default Subheader2;
