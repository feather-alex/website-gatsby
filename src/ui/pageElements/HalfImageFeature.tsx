/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

import ResponsiveImage from "../../ui/images/ResponsiveImage";
import { COLORS, GRID_BREAKPOINTS } from "../../ui/variables";
import { GridContainer, getGridStyle } from "../grid/Grid";
import { useSelector } from "react-redux";
import {
  getGridBreakPoint,
  GridBreakpoints,
} from "../../app/store/dimensions/dimensions.selectors";

export enum ImagePosition {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

const GridItem = styled.div`
  ${({ imgPosition }: { imgPosition: ImagePosition }) =>
    getGridStyle({
      large: { start: imgPosition === ImagePosition.LEFT ? 1 : 7, columns: 6 },
      medium: { start: imgPosition === ImagePosition.LEFT ? 1 : 5, columns: 4 },
      small: { start: 1, columns: 4 },
    })}
`;

interface Props {
  image: {
    src: string;
    height: number;
    width: number;
    alt?: string;
  };
  imgPosition: ImagePosition;
  children: React.ReactNode;
  className?: string;
}

const HalfImageFeature = ({
  image,
  imgPosition,
  children,
  className,
}: Props) => {
  const breakpoint = useSelector(getGridBreakPoint);
  const gridItems = [
    <GridItem
      css={css`
        display: flex;
        align-items: center;
      `}
      key="image"
      imgPosition={imgPosition}
    >
      <ResponsiveImage
        src={image.src}
        height={image.height}
        width={image.width}
        alt={image.alt}
        objectFit="cover"
      />
    </GridItem>,
    <GridItem
      key="text"
      imgPosition={
        imgPosition === ImagePosition.LEFT
          ? ImagePosition.RIGHT
          : ImagePosition.LEFT
      }
    >
      {children}
    </GridItem>,
  ];

  return (
    <GridContainer
      className={className}
      css={css`
        background-color: ${COLORS.CLOUD};
        max-width: 100%;
        padding: 0px;
        @media ${GRID_BREAKPOINTS.TABLET} {
          padding: 0px;
        }
        @media ${GRID_BREAKPOINTS.MOBILE} {
          padding: 0px;
        }
      `}
    >
      {imgPosition === ImagePosition.LEFT ||
      breakpoint === GridBreakpoints.SMALL
        ? gridItems
        : gridItems.reverse()}
    </GridContainer>
  );
};

export default HalfImageFeature;
