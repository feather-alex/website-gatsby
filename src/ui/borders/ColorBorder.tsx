/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { ReactNode } from "react";

import { BREAKPOINTS, COLORS, SHADES } from "../variables";

export const ColorBorderArray: [string, string][] = [
  [COLORS.POPPY, COLORS.LILAC],
  [COLORS.YVES, COLORS.DANDELION],
  [COLORS.BLACKBERRY, COLORS.MINT],
  [COLORS.CHERRY, COLORS.SUMAC],
  [COLORS.BLACKBERRY, COLORS.CITRON],
];

export enum ShadowAngle {
  TOP_LEFT = "TOP_LEFT",
  TOP_RIGHT = "TOP_RIGHT",
  BOTTOM_LEFT = "BOTTOM_LEFT",
  BOTTOM_RIGHT = "BOTTOM_RIGHT",
}

function getShadowAngle(shadowAngle?: ShadowAngle) {
  switch (shadowAngle) {
    case ShadowAngle.TOP_LEFT: {
      return "-8px -8px";
    }
    case ShadowAngle.TOP_RIGHT: {
      return "8px -8px";
    }
    case ShadowAngle.BOTTOM_LEFT: {
      return "-8px 8px";
    }
    case ShadowAngle.BOTTOM_RIGHT: {
      return "8px 8px";
    }
    default: {
      return "8px 8px";
    }
  }
}

function getBorder(shadowAngle?: ShadowAngle) {
  switch (shadowAngle) {
    case ShadowAngle.TOP_LEFT: {
      return "8px 0 0 8px";
    }
    case ShadowAngle.TOP_RIGHT: {
      return "8px 8px 0 0";
    }
    case ShadowAngle.BOTTOM_LEFT: {
      return "0 0 8px 8px";
    }
    case ShadowAngle.BOTTOM_RIGHT: {
      return "0 8px 8px 0";
    }
    default: {
      return "0 8px 8px 0";
    }
  }
}

interface BorderProps {
  borderColor: string;
  shadowColor: string;
  shadowAngle?: ShadowAngle;
  withAnimation?: boolean;
}

const Border = styled.div`
  border: 2px solid ${({ borderColor }: BorderProps) => borderColor};
  border-radius: 4px;
  box-shadow: ${({ shadowAngle }: BorderProps) => getShadowAngle(shadowAngle)} 0
    ${({ shadowColor }: BorderProps) => shadowColor};
  margin: ${({ shadowAngle }: BorderProps) => getBorder(shadowAngle)};
  display: inline-flex;
  flex-direction: column;
  background-color: ${SHADES.WHITE};

  @media ${BREAKPOINTS.DESKTOP} {
    ${({ withAnimation }: BorderProps) =>
      withAnimation &&
      `  position: relative;
  top: 0;
  transition: all 0.25s ease-in-out;
  &:hover {
    position: relative;
    top: -9px;
  }`}
  }
`;

interface Props {
  color: [string, string];
  children?: ReactNode;
  shadowAngle?: ShadowAngle;
  withAnimation?: boolean;
}

export default function ColorBorder({
  color,
  children,
  shadowAngle,
  withAnimation,
}: Props) {
  return (
    <Border
      borderColor={color[0]}
      shadowColor={color[1]}
      shadowAngle={shadowAngle}
      withAnimation={withAnimation}
    >
      {children}
    </Border>
  );
}
