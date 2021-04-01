/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FONTS, BRAND } from "../variables";
import {
  underlineStyle,
  animatedUnderlineStyle,
} from "../../utils/underline-styles";
import getOnClickProps from "../../utils/on-click-props";

interface Props {
  children: JSX.Element | string;
  onClick?: (event: React.MouseEvent) => void;
  color?: string;
  isUnderline?: boolean;
  isAnimated?: boolean;
}

/**
 * @deprecated
 */
const AllCaps = ({
  children,
  isUnderline,
  isAnimated,
  onClick,
  color = BRAND.PRIMARY_TEXT,
}: Props) => {
  return (
    <h6
      css={css`
        position: relative;
        font-size: 13px;
        line-height: 15px;
        font-family: ${FONTS.PRIMARY};
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 2.23px;
        color: ${color};

        ${isUnderline && underlineStyle}
        ${isAnimated && animatedUnderlineStyle}
      `}
      {...getOnClickProps(onClick)}
    >
      {children}
    </h6>
  );
};

export default AllCaps;
