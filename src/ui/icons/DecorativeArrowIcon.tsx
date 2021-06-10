/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { BRAND } from "../variables";

export enum Direction {
  Down = "down",
  Up = "up",
  Right = "right",
  Left = "left",
}

interface Props {
  onClick?: (event: React.MouseEvent) => void;
  color?: string;
  direction?: string;
}

const DecorativeArrowIcon = ({
  onClick,
  color = BRAND.PRIMARY,
  direction,
}: Props) => {
  let rotateEffect = "";

  switch (direction) {
    case Direction.Up:
      rotateEffect = `rotate(180deg)`;
      break;
    case Direction.Left:
      rotateEffect = `rotate(90deg)`;
      break;
    case Direction.Right:
      rotateEffect = `rotate(-90deg)`;
      break;
    default:
      break;
  }

  return (
    <div
      css={css`
        padding: 5px;
        transform: ${rotateEffect};
      `}
    >
      <svg
        onClick={onClick}
        width="6"
        height="16"
        viewBox="0 0 6 16"
        fill="none"
      >
        <path
          fill={color}
          d="M0 11.1314C0.80303 11.4362 1.49242 11.8095 2.06818 12.2514L2.06818 0L3.93182 0L3.93182 12.2514C4.50758 11.8248 5.19697 11.459 6 11.1543V12.8914C4.89394 13.8362 4.05303 14.8724 3.47727 16H2.5C1.95455 14.8724 1.12121 13.8362 0 12.8914V11.1314Z"
        />
      </svg>
    </div>
  );
};

export default DecorativeArrowIcon;
