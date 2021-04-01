/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { BRAND } from "../variables";

interface Props {
  to?: string;
  isInverted?: boolean;
}

const LinkedInLogo = ({
  to = "https://www.linkedin.com/company/feather1/",
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
      aria-label="Feather's linkedin"
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.076 19.108c1.296 0 2.103-.913 2.103-2.055-.024-1.166-.807-2.053-2.077-2.053S15 15.887 15 17.053c0 1.142.807 2.055 2.054 2.055h.022zM32.33 32.622v-6.816c0-3.651-1.833-5.351-4.277-5.351-1.973 0-2.856 1.154-3.35 1.963v-1.683h-3.715c.05 1.115 0 11.887 0 11.887h3.716v-6.639c0-.355.024-.71.122-.963.268-.71.88-1.445 1.905-1.445 1.346 0 1.883 1.09 1.883 2.688v6.36l3.716-.001zm-13.4-11.89v11.887h-3.716V20.732h3.715z"
        />
      </svg>
    </a>
  );
};

export default LinkedInLogo;
