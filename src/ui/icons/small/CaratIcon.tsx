/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { BRAND } from "../../variables";
import { Direction } from "../ArrowIcon";

export { Direction };

interface Props {
  color?: string;
  direction?: Direction;
  width?: number;
}

const getRotateEffect = (direction: Direction) => {
  switch (direction) {
    case Direction.Up:
      return "rotate(180deg)";
    case Direction.Right:
      return "rotate(-90deg)";
      break;
    case Direction.Left:
      return "rotate(90deg)";
    default:
      return "";
  }
};

export default function CaratIcon({
  color = BRAND.PRIMARY_TEXT,
  direction = Direction.Down,
  width = 14,
}: Props) {
  return (
    <svg
      css={css`
        transform: ${getRotateEffect(direction)};
      `}
      width={width}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 4l6 6 6-6" stroke={color} strokeWidth="2" />
    </svg>
  );
}
