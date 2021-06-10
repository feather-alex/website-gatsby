/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { BRAND, FONTS } from "../variables";
import {
  underlineStyle,
  animatedUnderlineStyle,
} from "../../utils/underline-styles";

interface Props {
  children: React.ReactNode;
  fontSize: number;
  lineHeight: number;
  isBold?: boolean;
  isUnderline?: boolean;
  isItalic?: boolean;
  isAnimated?: boolean;
  color?: string;
  dataCy?: string;
  className?: string;
}

const Title = ({
  fontSize = 16,
  lineHeight = 24,
  isBold = false,
  isUnderline = false,
  isItalic = false,
  isAnimated = false,
  color = BRAND.PRIMARY_TEXT,
  children,
  dataCy,
  className,
}: Props) => (
  <p
    data-cy={dataCy}
    className={className}
    css={css`
      position: relative;
      width: fit-content;
      font-family: ${FONTS.PRIMARY};
      font-size: ${fontSize}px;
      line-height: ${lineHeight}px;
      ${isBold && "font-weight: 500;"}
      ${isItalic && "font-style: italic;"}
        color: ${color};

      ${isUnderline && underlineStyle}
      ${isAnimated && animatedUnderlineStyle}
    `}
  >
    {children}
  </p>
);

export default Title;
