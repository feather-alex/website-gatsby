/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { BRAND } from "../variables";

interface Props {
  to?: string;
  isInverted?: boolean;
}

const InstagramLogo = ({
  to = "https://www.instagram.com/livefeather/",
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
      aria-label="Feather's instagram"
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
          d="M24.134 13c-3.02 0-3.405.013-4.59.07-1.185.059-1.992.245-2.698.528a5.377 5.377 0 00-1.974 1.313 5.682 5.682 0 00-1.286 2.014c-.277.72-.466 1.55-.517 2.754l-.003.076C13.018 20.906 13 21.34 13 24.363c0 3.082.013 3.468.07 4.684.056 1.21.239 2.034.516 2.754a5.512 5.512 0 001.286 2.014 5.46 5.46 0 001.974 1.313c.706.283 1.52.47 2.698.527 1.185.058 1.564.071 4.59.071 3.02 0 3.398-.013 4.59-.07 1.184-.059 1.991-.245 2.704-.528a5.44 5.44 0 001.967-1.313 5.682 5.682 0 001.286-2.014c.271-.72.46-1.544.517-2.754l.003-.076c.048-1.151.066-1.585.066-4.608 0-3.082-.012-3.468-.07-4.684-.056-1.21-.245-2.033-.516-2.754a5.596 5.596 0 00-1.286-2.014 5.49 5.49 0 00-1.974-1.313c-.712-.283-1.519-.47-2.704-.527-1.185-.058-1.564-.071-4.583-.071zm-.992 2.042h.996c2.969 0 3.322.013 4.495.064 1.084.051 1.67.238 2.068.393.517.205.888.45 1.28.849.39.399.63.778.831 1.306.152.399.335 1.004.385 2.11.05 1.197.063 1.558.063 4.588 0 3.03-.012 3.391-.063 4.588-.05 1.107-.233 1.705-.385 2.11a3.54 3.54 0 01-.832 1.306c-.39.4-.756.644-1.28.85-.39.154-.983.34-2.067.392-1.173.052-1.526.065-4.495.065-2.97 0-3.323-.013-4.495-.065-1.085-.051-1.671-.238-2.068-.392a3.454 3.454 0 01-1.28-.85 3.54 3.54 0 01-.832-1.306c-.152-.399-.334-1.003-.385-2.11-.05-1.197-.063-1.557-.063-4.588 0-3.03.013-3.39.063-4.588.05-1.106.233-1.705.385-2.11.202-.528.441-.907.832-1.306.39-.4.763-.644 1.28-.85.39-.154.983-.34 2.068-.392 1.027-.051 1.424-.064 3.498-.064zm5.597 3.26c0-.754.599-1.365 1.336-1.365.738 0 1.337.611 1.337 1.364 0 .753-.6 1.364-1.337 1.364s-1.336-.611-1.336-1.364zm-4.61.23c-3.159 0-5.712 2.612-5.712 5.83 0 3.223 2.56 5.829 5.712 5.829 3.158 0 5.712-2.613 5.712-5.83 0-3.223-2.554-5.83-5.712-5.83zm3.712 5.822c0-2.09-1.658-3.783-3.707-3.783s-3.707 1.692-3.707 3.783 1.658 3.784 3.707 3.784c2.05 0 3.707-1.693 3.707-3.784z"
        />
      </svg>
    </a>
  );
};

export default InstagramLogo;
