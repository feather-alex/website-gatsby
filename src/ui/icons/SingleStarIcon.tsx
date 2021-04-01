/** @jsx jsx */
import { jsx } from "@emotion/react";
import { COLORS } from "../variables";

export default function Star({ color = COLORS.POPPY }: { color: string }) {
  return (
    <svg width="24" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.198 0l3.37 7.437 8.232.855-6.149 5.45 1.717 7.966-7.17-4.068-7.17 4.068 1.718-7.965L.597 8.292l8.231-.855L12.198 0z"
        fill={color}
      />
    </svg>
  );
}
