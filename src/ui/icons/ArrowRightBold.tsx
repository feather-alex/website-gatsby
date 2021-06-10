/** @jsx jsx */
import { jsx } from "@emotion/core";
import { SHADES } from "../variables";

interface Props {
  color?: string;
  className?: string;
}

const ArrowRightBold = ({ color = SHADES.SHADE_DARKER, className }: Props) => (
  <svg
    className={className}
    width="19"
    height="10"
    viewBox="0 0 19 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 5H17" stroke={color} strokeWidth="2" />
    <path d="M13 9L17 5L15 3L13 1" stroke={color} strokeWidth="2" />
  </svg>
);

export default ArrowRightBold;
