/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { BRAND } from "../variables";

interface Props {
  isFilled?: boolean;
}

const StarIcon = ({ isFilled }: Props) => {
  const fillColor = isFilled ? BRAND.PRIMARY_TEXT : "none";

  return (
    <div
      css={css`
        padding: 5px;
      `}
    >
      <svg width="21" height="19" viewBox="0 0 21 19" fill="none">
        <path
          fill={fillColor}
          stroke={BRAND.PRIMARY_TEXT}
          d="M10.5 0L13.4007 6.5075L20.4861 7.25532L15.1935 12.025L16.6717 18.9947L10.5 15.435L4.32825 18.9947L5.80654 12.025L0.513906 7.25532L7.59928 6.5075L10.5 0Z"
        />
      </svg>
    </div>
  );
};

export default StarIcon;
