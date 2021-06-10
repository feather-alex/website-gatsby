/** @jsx jsx */
import { jsx, css, Global } from "@emotion/core";
import { createPortal } from "react-dom";
import { BRAND } from "../variables";
import { useCallback, useRef } from "react";
import useMount from "../../utils/useMount";
import CloseSignIcon from "../icons/CloseSignIcon";
import minusCursor1x from "../../assets/images/minus-cursor-1x.png";
import minusCursor2x from "../../assets/images/minus-cursor-2x.png";
import { Z_INDICIES } from "../zIndicies";

interface Props {
  imgUrl: string;
  closeZoom: () => void;
  isMobileBreakpoint: boolean;
}

const ImageZoom = ({ imgUrl, closeZoom, isMobileBreakpoint }: Props) => {
  const portalElement = document.getElementById("image-zoom-portal");
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const scrollElement = scrollRef.current;
      if (scrollElement && !isMobileBreakpoint) {
        const scrollAreaX = scrollElement.scrollWidth - window.innerWidth;
        const scrollAreaY = scrollElement.scrollHeight - window.innerHeight;
        const left = scrollAreaX * (e.clientX / window.innerWidth);
        const top = scrollAreaY * (e.clientY / window.innerHeight);

        scrollElement.scrollTo({ top, left });
      }
    },
    [isMobileBreakpoint]
  );

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeZoom();
    }
  };

  const maxDimension = Math.min(window.innerWidth * 1.4, 2880);

  useMount(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.addEventListener("mousemove", handleMouseMove);
      document.removeEventListener("keydown", handleEscape);
    };
  });

  if (!portalElement) {
    return null;
  }

  return createPortal(
    <div
      ref={scrollRef}
      css={css`
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        display: flex;
        background-color: ${BRAND.BACKGROUND};
        z-index: ${Z_INDICIES.ZOOM_IMAGE_OVERLAY};
        cursor: url(${minusCursor1x}) 24 24, auto;
        cursor: -webkit-image-set(
              url(${minusCursor2x}) 2x,
              url(${minusCursor1x}) 1x
            )
            24 24,
          auto;
      `}
      onClick={closeZoom}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      role="button"
      tabIndex={0}
    >
      <Global
        styles={css`
          body {
            overflow: hidden !important;
          }
        `}
      />
      {isMobileBreakpoint && (
        <div
          css={css`
            position: fixed;
            top: 32px;
            left: 32px;
          `}
        >
          <CloseSignIcon onClick={closeZoom} />
        </div>
      )}
      <div
        css={css`
          width: max-content;
          height: max-content;
          align-self: center;
          justify-self: center;
          margin: auto;
        `}
      >
        <img
          alt=""
          width={isMobileBreakpoint ? 910 : maxDimension}
          css={css`
            ${!isMobileBreakpoint &&
            `
          height: min-content;
          width: min-content;
          max-width: ${maxDimension}px;
          max-height: ${maxDimension}px;
        `}
            padding: 3%;
            object-fit: contain;
            ${isMobileBreakpoint && "align-self: baseline;"}
          `}
          src={imgUrl}
        />
      </div>
    </div>,
    portalElement
  );
};

export default ImageZoom;
