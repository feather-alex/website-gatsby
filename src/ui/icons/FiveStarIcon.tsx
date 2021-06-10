/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { SHADES, BRAND, COLORS } from "../variables";

interface Props {
  onClick?: (event: React.MouseEvent) => void;
  isAccent?: boolean;
  isInverted?: boolean;
}

const StarIcon = ({ isAccent, isInverted, onClick }: Props) => {
  const pathColor = isInverted
    ? SHADES.WHITE
    : isAccent
    ? COLORS.CITRON
    : BRAND.PRIMARY_TEXT;

  return (
    <div
      css={css`
        padding: 5px;
      `}
    >
      <svg
        onClick={onClick}
        width="121"
        height="21"
        viewBox="0 0 121 21"
        fill="none"
      >
        <path
          fill={pathColor}
          d="M10.5 0L13.4007 6.5075L20.4861 7.25532L15.1935 12.025L16.6717 18.9947L10.5 15.435L4.32825 18.9947L5.80654 12.025L0.513906 7.25532L7.59928 6.5075L10.5 0Z"
        />
        <path
          fill={pathColor}
          d="M35.5 0L38.4007 6.5075L45.4861 7.25532L40.1935 12.025L41.6717 18.9947L35.5 15.435L29.3283 18.9947L30.8065 12.025L25.5139 7.25532L32.5993 6.5075L35.5 0Z"
        />
        <path
          fill={pathColor}
          d="M60.5 0L63.4007 6.5075L70.4861 7.25532L65.1935 12.025L66.6717 18.9947L60.5 15.435L54.3283 18.9947L55.8065 12.025L50.5139 7.25532L57.5993 6.5075L60.5 0Z"
        />
        <path
          fill={pathColor}
          d="M85.5 0L88.4007 6.5075L95.4861 7.25532L90.1935 12.025L91.6717 18.9947L85.5 15.435L79.3283 18.9947L80.8065 12.025L75.5139 7.25532L82.5993 6.5075L85.5 0Z"
        />
        <path
          fill={pathColor}
          d="M110.5 0L113.401 6.5075L120.486 7.25532L115.193 12.025L116.672 18.9947L110.5 15.435L104.328 18.9947L105.807 12.025L100.514 7.25532L107.599 6.5075L110.5 0Z"
        />
      </svg>
    </div>
  );
};

export default StarIcon;
