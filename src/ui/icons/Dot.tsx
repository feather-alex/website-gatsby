/** @jsx jsx */
import { jsx } from "@emotion/react";
import { SHADES } from "../variables";

export default function Dot({
  color = SHADES.SHADE_DARKER,
}: {
  color?: string;
}) {
  return (
    <span>
      <svg width="5" height="5" viewBox="0 0 5 5" fill="none">
        <circle cx="2.5" cy="2.5" r="2.5" fill={color} />
      </svg>
    </span>
  );
}
