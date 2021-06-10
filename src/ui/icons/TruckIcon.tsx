/** @jsx jsx */
import { jsx } from "@emotion/core";
import { SHADES, BRAND } from "../variables";

interface Props {
  onClick?: (event: React.MouseEvent) => void;
  width?: string;
  height?: string;
}

const TruckIcon = ({ onClick, width, height }: Props) => {
  return (
    <svg
      onClick={onClick}
      width={width ? width : "184"}
      height={height ? height : "90"}
      viewBox="0 0 184 90"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M98.854 82.9816C101.62 82.9816 102.806 82.9816 102.41 82.9816C93.3893 82.9816 78.0796 82.9816 56.4806 82.9816C55.3169 82.9816 54.3735 82.0567 54.3735 80.9158V3.06581C54.3735 1.92489 55.3169 1 56.4806 1H148.339C149.502 1 150.446 1.92489 150.446 3.06581V80.9158C150.446 82.0567 149.502 82.9816 148.339 82.9816H125.266"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M98.854 82.9816C101.62 82.9816 102.806 82.9816 102.41 82.9816C93.3893 82.9816 78.0796 82.9816 56.4806 82.9816C55.3169 82.9816 54.3735 82.0567 54.3735 80.9158V3.06581C54.3735 1.92489 55.3169 1 56.4806 1H148.339C149.502 1 150.446 1.92489 150.446 3.06581V80.9158C150.446 82.0567 149.502 82.9816 148.339 82.9816H125.266"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54.3724 21.4922H29.4613L14.3423 43.2685"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M54.3724 21.4922H29.4613L14.3423 43.2685"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.2259 80.4197H1V44.5527H54.3735V80.4197H45.31"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M15.2259 80.4197H1V44.5527H54.3735V80.4197H45.31"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.3541 88.1056C37.7235 88.1056 43.6975 82.3705 43.6975 75.296C43.6975 68.2214 37.7235 62.4863 30.3541 62.4863C22.9848 62.4863 17.0107 68.2214 17.0107 75.296C17.0107 82.3705 22.9848 88.1056 30.3541 88.1056Z"
        fill={`${SHADES.WHITE}`}
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M113.085 88.1056C120.454 88.1056 126.428 82.3705 126.428 75.296C126.428 68.2214 120.454 62.4863 113.085 62.4863C105.716 62.4863 99.7417 68.2214 99.7417 75.296C99.7417 82.3705 105.716 88.1056 113.085 88.1056Z"
        fill={`${SHADES.WHITE}`}
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M113.086 29.1816H161.122H113.086Z"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M113.086 29.1816H161.122"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M134.434 13.8086H182.47H134.434Z"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M134.434 13.8086H182.47"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default TruckIcon;
