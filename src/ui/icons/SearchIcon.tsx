/** @jsx jsx */
import { jsx } from "@emotion/react";
import { BRAND, SHADES } from "../variables";

interface Props {
  size?: number;
  isInverted?: boolean;
  color?: string;
}

const SearchIcon = ({
  isInverted,
  size = 26,
  color = BRAND.PRIMARY_TEXT,
}: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={isInverted ? SHADES.WHITE : color}
        d="M25.133 22.73l-7.11-7.11a8.995 8.995 0 00-.67-11.98A8.95 8.95 0 0010.992 1c-2.3 0-4.61.88-6.36 2.64-3.51 3.51-3.51 9.21 0 12.73a8.98 8.98 0 006.36 2.63c1.99 0 3.98-.66 5.62-1.97l7.11 7.11 1.41-1.41zM10.992 17a6.96 6.96 0 01-4.95-2.05 7.007 7.007 0 010-9.9A6.96 6.96 0 0110.992 3c1.87 0 3.63.73 4.95 2.05a7.007 7.007 0 010 9.9 6.96 6.96 0 01-4.95 2.05z"
      />
    </svg>
  );
};

export default SearchIcon;
