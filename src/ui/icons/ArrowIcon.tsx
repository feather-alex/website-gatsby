/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { BRAND } from "../variables";
import getOnClickProps from "../../utils/on-click-props";
import CaratIcon from "./small/CaratIcon";

export enum Direction {
  Down = "down",
  Up = "up",
  Right = "right",
  Left = "left",
}

interface Props {
  onClick?: (event: React.MouseEvent) => void;
  direction: Direction;
  color?: string;
  width?: number;
}

const ArrowIcon = ({
  color = BRAND.PRIMARY_TEXT,
  onClick,
  direction,
  width = 25,
}: Props) => (
  <div
    css={css`
      padding: 0 5px;
      width: fit-content;
      height: fit-content;
    `}
    {...getOnClickProps(onClick)}
  >
    <CaratIcon direction={direction} color={color} width={width} />
  </div>
);

export default ArrowIcon;
