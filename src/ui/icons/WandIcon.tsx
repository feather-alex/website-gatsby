/** @jsx jsx */
import { jsx } from "@emotion/core";
import { SHADES, BRAND } from "../variables";

interface Props {
  onClick?: (event: React.MouseEvent) => void;
}

const WandIcon = ({ onClick }: Props) => {
  return (
    <svg
      onClick={onClick}
      width="100"
      height="110"
      viewBox="0 0 100 110"
      fill="none"
    >
      <path
        d="M76.1527 17.4009L2.90891 101.629C2.40693 102.206 2.46796 103.081 3.04521 103.583L6.71929 106.778C7.29655 107.28 8.17144 107.219 8.67341 106.641L81.9172 22.4137C82.4192 21.8365 82.3582 20.9616 81.7809 20.4596L78.1069 17.2646C77.5296 16.7627 76.6547 16.8237 76.1527 17.4009Z"
        fill={`${SHADES.WHITE}`}
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M63.4775 31.9375L69.2406 36.9466L63.4775 31.9375Z"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M63.4775 31.9375L69.2406 36.9466"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M85.105 31.9707L92.5022 38.4204L85.105 31.9707Z"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M85.105 31.9707L92.5022 38.4204"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M74.4926 7.07862L74.46 1L74.4926 7.07862Z"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M74.4926 7.07862L74.46 1"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M92.8403 23.0673L98.8649 22.2598L92.8403 23.0673Z"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M92.8403 23.0673L98.8649 22.2598"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M58.8925 25.0391L52.8789 25.8466L58.8925 25.0391Z"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M58.8925 25.0391L52.8789 25.8466"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M77.2388 41.0293L77.2823 47.1079L77.2388 41.0293Z"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M77.2388 41.0293L77.2823 47.1079"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M58.8022 9.05469L66.1995 15.5044L58.8022 9.05469Z"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M58.8022 9.05469L66.1995 15.5044"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M87.4995 10.9217L93.938 3.51172L87.4995 10.9217Z"
        fill={`${SHADES.WHITE}`}
      />
      <path
        d="M87.4995 10.9217L93.938 3.51172"
        stroke={`${BRAND.PRIMARY_TEXT}`}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default WandIcon;
