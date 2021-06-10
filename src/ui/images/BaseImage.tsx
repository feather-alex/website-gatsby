/** @jsx jsx */
import { Fragment, useRef } from "react";
import { jsx, css } from "@emotion/core";
import * as qs from "query-string";
import { useState, useCallback } from "react";
import useIntersect from "../../utils/use-intersection-observer";
import ImageZoom from "./ImageZoom";
import { useSelector } from "react-redux";
import { getIsMobileBreakpoint } from "../../app/store/dimensions/dimensions.selectors";
import plusCursor1x from "../../assets/images/plus-cursor-1x.png";
import plusCursor2x from "../../assets/images/plus-cursor-2x.png";

const LQIP_QUERY = "?q=30&w=40&auto=compress,format&cs=srgb";
const createQuery = ({
  multiplier,
  src,
  width,
  height,
  queryParams,
}: {
  multiplier: number;
  src: string;
  width?: number;
  height?: number;
  queryParams?: { [key: string]: string | string[] | number };
}) =>
  `${src}?${qs.stringify(
    {
      q: 80,
      w: width,
      h: height,
      dpr: multiplier,
      auto: ["compress", "format"],
      fit: "max",
      cs: "srgb",
      ...queryParams,
    },
    { arrayFormat: "comma" }
  )}`;

// This will start the image download in a separate thread, so that it is pre-cached when/if the user zooms
const preloadImage = (url: string) => {
  const img = new Image();
  img.src = url;
};

interface Props {
  alt?: string;
  imgUrl: string;
  zoomUrl?: string | null;
  width?: number;
  height?: number;
  isRounded?: boolean;
  shouldPreload?: boolean;
  queryParams?: { [key: string]: string | string[] | number };
}

const BaseImage = ({
  alt = "",
  imgUrl,
  zoomUrl,
  width,
  height,
  isRounded = false,
  shouldPreload = false,
  queryParams,
}: Props): JSX.Element => {
  const imgRef = useRef<HTMLImageElement>(null);
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  const [isLoaded, setIsLoaded] = useState(false);
  const handleLoad = useCallback(() => setIsLoaded(true), [setIsLoaded]);

  const [isZoomEnabled, setIsZoomEnabled] = useState(false);
  const handleToggleZoom = useCallback(() => setIsZoomEnabled(!isZoomEnabled), [
    setIsZoomEnabled,
    isZoomEnabled,
  ]);

  const [shouldLoad, setShouldLoad] = useState(shouldPreload);

  const isContentfulImage = imgUrl.includes("ctfassets");

  const handleOnScreen = useCallback(() => {
    if (!shouldLoad && !isContentfulImage) {
      setShouldLoad(true);
    }
  }, [setShouldLoad, shouldLoad, isContentfulImage]);

  useIntersect({ callback: handleOnScreen, ref: imgRef });

  const isZoom = Boolean(zoomUrl);
  const baseQuery = { multiplier: 1, src: imgUrl, width, height, queryParams };
  const src1x = createQuery(baseQuery);
  const src2x = createQuery({ ...baseQuery, multiplier: 2 });

  const baseZoomQuery = {
    multiplier: 1,
    src: zoomUrl || "",
    width: isMobileBreakpoint ? 910 : 2880,
    height: isMobileBreakpoint ? 910 : 2880,
    queryParams: { q: 50 },
  };
  const srcZoom = createQuery(baseZoomQuery);

  if (isZoom) {
    preloadImage(srcZoom);
  }

  const srcUrl = isContentfulImage ? imgUrl : `${imgUrl}${LQIP_QUERY}`;

  return (
    <Fragment>
      {!isLoaded && (
        <img
          data-cy="base-image-loading"
          data-testid="base-image-loading"
          ref={imgRef}
          css={css`
            ${isContentfulImage ? "" : `filter: blur(7px)`};
            height: 100%;
            width: 100%;
            display: inherit;
            object-fit: cover;
            ${isRounded ? "border-radius: 50%;" : ""}
          `}
          src={srcUrl}
          alt={alt}
          height={height}
          width={width}
        />
      )}
      {shouldLoad && (
        // disabling this non-interactive element click-handler as the zoom is not accessible
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <img
          data-cy="base-image-loaded"
          data-testid="base-image-loaded"
          onLoad={handleLoad}
          onClick={isZoom ? handleToggleZoom : undefined}
          css={css`
            width: 100%;
            height: 100%;
            display: ${isLoaded ? "inherit" : "none"};
            object-fit: cover;
            ${isRounded ? "border-radius: 50%;" : ""}
            ${isZoom
              ? `cursor: url(${plusCursor1x}) 24 24, auto;
              cursor: -webkit-image-set(url(${plusCursor2x}) 2x, url(${plusCursor1x}) 1x) 24 24, auto;
              `
              : ""}
          `}
          src={src1x}
          srcSet={`
            ${src1x} 1x,
            ${src2x} 2x
          `}
          alt={alt}
        />
      )}
      {isZoom && isZoomEnabled && (
        <ImageZoom
          imgUrl={srcZoom}
          closeZoom={handleToggleZoom}
          isMobileBreakpoint={isMobileBreakpoint}
        />
      )}
    </Fragment>
  );
};

export default BaseImage;
