/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { BRAND } from "../variables";

interface Props {
  to?: string;
  isInverted?: boolean;
}

const TwitterLogo = ({
  to = "https://twitter.com/livefeather",
  isInverted,
}: Props) => {
  const circleColor = isInverted ? BRAND.BACKGROUND : BRAND.PRIMARY_TEXT;
  const pathColor = isInverted ? BRAND.BACKGROUND : BRAND.PRIMARY_TEXT;
  const pathHoverColor = isInverted ? BRAND.PRIMARY_TEXT : BRAND.BACKGROUND;

  const hoverStyle = `> circle { fill: ${circleColor}; }
    > path { fill: ${pathHoverColor}; }`;

  return (
    <a
      href={to}
      aria-label="Feather's twitter"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        css={css`
          &:hover {
            ${hoverStyle}
          }
        `}
      >
        <circle cx="24" cy="24" r="23" stroke={circleColor} strokeWidth="2" />
        <path
          fill={pathColor}
          d="M32.589 20.01c0-.192-.004-.383-.013-.572a8.894 8.894 0 002.233-2.26 8.991 8.991 0 01-2.57.662 4.368 4.368 0 001.968-2.42 8.923 8.923 0 01-2.84 1.031 4.567 4.567 0 00-3.267-1.45 4.385 4.385 0 00-4.474 4.39c0 .35.038.69.116 1.018-3.721-.226-7.019-2.05-9.225-4.798a4.451 4.451 0 00-.605 2.253c0 1.56.79 2.947 1.99 3.765a4.476 4.476 0 01-2.027-.584v.057a4.531 4.531 0 003.59 4.434 4.485 4.485 0 01-2.02.064 4.502 4.502 0 004.18 3.136 8.965 8.965 0 01-5.557 1.905c-.361 0-.718-.023-1.068-.064a12.599 12.599 0 006.86 2.024c8.229.002 12.729-6.74 12.729-12.59z"
        />
      </svg>
    </a>
  );
};

export default TwitterLogo;
