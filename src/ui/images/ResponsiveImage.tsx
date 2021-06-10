/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Link } from "gatsby";

import BaseImage from "./BaseImage";

export type PositionOptions = "bottom" | "center" | "top" | "left" | "right";
export type FitOptions = "contain" | "cover";

interface Props {
  src: string;
  zoomUrl?: string | null;
  to?: string;
  target?: string;
  width: number;
  height: number;
  children?: JSX.Element;
  queryParams?: { [key: string]: string | string[] | number };
  objectPosition?: PositionOptions;
  objectFit?: FitOptions;
  alt?: string;
}

interface ContainerProps {
  height: number;
  width: number;
  objectPosition?: PositionOptions;
  objectFit?: FitOptions;
}

const ResponsiveContainer = styled.div`
  height: 0;
  position: relative;
  width: 100%;
  padding-bottom: calc(
    ${({ height, width }: ContainerProps) => height / width} * 100%
  );
  overflow: hidden;

  img {
    object-position: ${({ objectPosition = "center" }: ContainerProps) =>
      objectPosition};
    object-fit: ${({ objectFit }: ContainerProps) => objectFit};
    position: absolute;
  }
`;

const ResponsiveImage = ({
  to,
  target,
  src,
  zoomUrl,
  width,
  children,
  height,
  queryParams,
  objectPosition,
  objectFit,
  alt,
}: Props) =>
  to && target ? (
    <a href={to} target={target}>
      <ResponsiveContainer
        height={height}
        width={width}
        objectPosition={objectPosition}
        objectFit={objectFit}
      >
        <BaseImage
          alt={alt}
          imgUrl={src}
          zoomUrl={zoomUrl}
          width={width}
          height={height}
          queryParams={queryParams}
        />
      </ResponsiveContainer>
      {children}
    </a>
  ) : to ? (
    <Link to={to}>
      <ResponsiveContainer
        height={height}
        width={width}
        objectPosition={objectPosition}
        objectFit={objectFit}
      >
        <BaseImage
          alt={alt}
          imgUrl={src}
          zoomUrl={zoomUrl}
          width={width}
          height={height}
          queryParams={queryParams}
        />
      </ResponsiveContainer>
      {children}
    </Link>
  ) : (
    <div
      css={css`
        width: 100%;
      `}
    >
      <ResponsiveContainer
        height={height}
        width={width}
        objectPosition={objectPosition}
        objectFit={objectFit}
      >
        <BaseImage
          alt={alt}
          imgUrl={src}
          zoomUrl={zoomUrl}
          width={width}
          height={height}
          queryParams={queryParams}
        />
      </ResponsiveContainer>
      {children}
    </div>
  );

export default ResponsiveImage;
