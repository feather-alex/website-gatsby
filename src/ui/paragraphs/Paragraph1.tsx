/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { FONTS, BRAND, GRID_BREAKPOINTS } from "../variables";

interface Props {
  color?: string;
  children: React.ReactNode;
  className?: string;
}

export const getStyles = ({ color = BRAND.PRIMARY_TEXT }) => css`
  font-family: ${FONTS.PRIMARY};
  font-size: 18px;
  line-height: 28px;
  color: ${color};
  @media ${GRID_BREAKPOINTS.TABLET} {
    font-size: 16px;
    line-height: 24px;
  }
`;

// Note: if you are changing these styles, also go and update the `RichTextWrapper` component
// styles that get applied to nested p tags, so that they match
// We cannot export and share the styles like we'd like due to a current issue with our
// storybook's build failing due to an unterminated string constant error thrown by Terser
const Paragraph1 = ({
  color = BRAND.PRIMARY_TEXT,
  className,
  children,
}: Props) => (
  <p className={className} css={getStyles({ color })}>
    {children}
  </p>
);

export default Paragraph1;
