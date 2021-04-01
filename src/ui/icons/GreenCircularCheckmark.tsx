/** @jsx jsx */
import { jsx } from "@emotion/react";
import { COLORS } from "../variables";

interface Props {
  className?: string;
}

const GreenCircularCheckmark = ({ className }: Props) => (
  <span className={className}>
    <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="14" fill={COLORS.CITRON} />
      <path
        d="M9 13.385L12.548 18 19 10"
        stroke={COLORS.SHADOW}
        strokeWidth="2"
      />
    </svg>
  </span>
);

export default GreenCircularCheckmark;
