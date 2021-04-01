/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { FONTS, BRAND, BREAKPOINTS } from "../variables";

interface Props {
  color?: string;
  children: React.ReactNode;
  className?: string;
  dataCy?: string;
}

export const getStyles = ({ color = BRAND.PRIMARY_TEXT }) => css`
  font-family: ${FONTS.PRIMARY};
  font-size: 36px;
  line-height: 44px;
  color: ${color};
  @media ${BREAKPOINTS.MOBILE} {
    font-size: 24px;
    line-height: 32px;
  }
`;

const Subheader1 = ({
  color = BRAND.PRIMARY_TEXT,
  dataCy,
  className,
  children,
}: Props) => (
  <h5 className={className} data-cy={dataCy} css={getStyles({ color })}>
    {children}
  </h5>
);

export default Subheader1;
