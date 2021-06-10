/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { BRAND } from "../variables";
import getOnClickProps from "../../utils/on-click-props";

interface Props {
  color?: string;
  onClick?: (event: React.MouseEvent) => void;
}

const PlusSignIcon = ({ color = BRAND.PRIMARY_TEXT, onClick }: Props) => {
  return (
    <div
      {...getOnClickProps(onClick)}
      css={css`
        padding: 5px;
        display: flex;
        ${onClick && `cursor: pointer;`}
      `}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 7h14M7 0v14" stroke={color} strokeWidth="2" />
      </svg>
    </div>
  );
};

export default PlusSignIcon;
