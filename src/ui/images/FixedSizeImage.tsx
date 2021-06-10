/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Link } from "gatsby";
import BaseImage from "./BaseImage";
import { PositionOptions } from "./ResponsiveImage";

interface Props {
  src: string;
  to?: string;
  target?: string;
  width: number;
  height: number;
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  queryParams?: { [key: string]: string | string[] | number };
  objectPosition?: PositionOptions;
}

interface ContainerProps {
  height: number;
  width: number;
  objectPosition?: PositionOptions;
}

const FixedContainer = styled.div`
  height: ${({ height }: ContainerProps) => height}px;
  width: ${({ width }: ContainerProps) => width}px;
  position: relative;
  overflow: hidden;

  img {
    object-position: ${({ objectPosition = "bottom" }: ContainerProps) =>
      objectPosition};
    position: absolute;
  }
`;

const FixedSizeImage = ({
  src,
  height,
  width,
  to,
  target,
  children,
  queryParams,
  objectPosition,
}: Props) => {
  // if the width is under 200px don't bother with a LQIP
  const shouldPreload = width > 200;
  return to && target ? (
    <a href={to} target={target}>
      <FixedContainer
        height={height}
        width={width}
        objectPosition={objectPosition}
      >
        <BaseImage
          imgUrl={src}
          width={width}
          height={height}
          queryParams={queryParams}
          shouldPreload={shouldPreload}
        />
      </FixedContainer>
      {children}
    </a>
  ) : to ? (
    <Link to={to}>
      <FixedContainer
        height={height}
        width={width}
        objectPosition={objectPosition}
      >
        <BaseImage
          imgUrl={src}
          width={width}
          height={height}
          queryParams={queryParams}
          shouldPreload={shouldPreload}
        />
      </FixedContainer>
      {children}
    </Link>
  ) : (
    <div>
      <FixedContainer
        height={height}
        width={width}
        objectPosition={objectPosition}
      >
        <BaseImage
          imgUrl={src}
          width={width}
          height={height}
          queryParams={queryParams}
          shouldPreload={shouldPreload}
        />
      </FixedContainer>
      {children}
    </div>
  );
};

export default FixedSizeImage;
