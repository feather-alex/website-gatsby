/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { BRAND } from "../variables";

interface Props {
  to?: string;
  isInverted?: boolean;
}

const FacebookLogo = ({
  to = "https://www.facebook.com/livefeather/",
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
      aria-label="Feather's facebook"
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
          d="M24.349 33.914v-9.47h3.319l.524-3.138H24.35v-1.573c0-.82.285-1.6 1.533-1.6h2.496V15h-3.543c-2.978 0-3.791 1.846-3.791 4.406v1.899H19v3.14h2.044v9.47h3.305z"
        />
      </svg>
    </a>
  );
};

export default FacebookLogo;
