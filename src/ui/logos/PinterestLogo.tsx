/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { BRAND } from "../variables";

interface Props {
  to?: string;
  isInverted?: boolean;
}

const PinterestLogo = ({
  to = "https://www.pinterest.com/feather1478/pins/",
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
      aria-label="Feather's pinterest"
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.489 27.727c-.615 3.066-1.366 6.005-3.59 7.54-.687-4.633 1.008-8.113 1.795-11.807-1.342-2.149.161-6.472 2.992-5.406 3.483 1.31-3.016 7.986 1.347 8.82 4.555.87 6.415-7.515 3.59-10.243-4.081-3.938-11.88-.09-10.922 5.548.234 1.379 1.731 1.797.599 3.7-2.613-.552-3.392-2.51-3.292-5.122.162-4.275 4.04-7.268 7.93-7.682 4.92-.524 9.536 1.717 10.174 6.117.717 4.966-2.22 10.345-7.481 9.958-1.426-.105-2.024-.777-3.142-1.422z"
          fill={pathColor}
        />
      </svg>
    </a>
  );
};

export default PinterestLogo;
