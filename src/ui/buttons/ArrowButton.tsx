/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { BRAND, SHADES } from "../variables";
import getOnClickProps from "../../utils/on-click-props";

interface Props {
  onClick?: (event: React.MouseEvent) => void;
  prev?: boolean;
  next?: boolean;
}

const ArrowButton = ({ onClick, prev }: Props) => {
  return (
    <div
      {...getOnClickProps(onClick)}
      css={css`
        padding: 10px;
        cursor: pointer;
      `}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle opacity=".6" cx="16" cy="16" r="16" fill={SHADES.WHITE} />
        {prev ? (
          <path
            d="M18 10l-6 6 6 6"
            stroke={BRAND.PRIMARY_TEXT}
            strokeWidth="2"
          />
        ) : (
          <path
            d="M14 22l6-6-6-6"
            stroke={BRAND.PRIMARY_TEXT}
            strokeWidth="2"
          />
        )}
      </svg>
    </div>
  );
};

export default ArrowButton;
