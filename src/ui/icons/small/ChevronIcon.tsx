/** @jsx jsx */
import { jsx } from "@emotion/react";
import { SHADES } from "../../variables";

export default function ChevronIcon({
  color = SHADES.SHADE_DARKER,
}: {
  color?: string;
}) {
  return (
    <svg width="10" height="7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 1L5 5 1 1" stroke={color} strokeWidth="2" />
    </svg>
  );
}
