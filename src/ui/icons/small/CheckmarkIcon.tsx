/** @jsx jsx */
import { jsx } from "@emotion/core";
import { BRAND } from "../../variables";

const CheckmarkIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 4l2.667 4L9 1" stroke={BRAND.PRIMARY_TEXT} strokeWidth="2" />
  </svg>
);

export default CheckmarkIcon;
