/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { ReactNode } from "react";
import ResponsiveImage from "../images/ResponsiveImage";
import TextSectionForImageComponent from "./TextSectionForImageComponent";
import { Z_INDICIES } from "../zIndicies";
import { ButtonStyle } from "../buttons/Button";

interface Props {
  isMobileBreakpoint: boolean;
  imageUrl: string;
  headerText?: string;
  paragraphText: ReactNode;
  buttonText?: string;
  buttonStyle?: ButtonStyle;
  onClick?: (event: React.MouseEvent) => void;
  to?: string;
  mailto?: string;
  external?: string;
  queryParams?: { [key: string]: string | string[] | number };
  imageSide?: "left" | "right";
  isVertical?: boolean;
  isParagraphRichText?: boolean;
}

const getFlexDirection = (isMobileBreakpoint: boolean, isSideLeft: boolean) => {
  if (isMobileBreakpoint) {
    return "column";
  }
  if (isSideLeft) {
    return "row";
  }
  return "row-reverse";
};

const getHeightAndWidth = (
  isMobileBreakpoint: boolean,
  isVertical: boolean
) => {
  if (isMobileBreakpoint && isVertical) {
    return { width: 400, height: 600 };
  }
  if (isMobileBreakpoint) {
    return { width: 400, height: 267 };
  }
  if (isVertical) {
    return { width: 1200, height: 1200 };
  }
  return { width: 1200, height: 800 };
};

const ImageWithText = ({
  isMobileBreakpoint,
  imageUrl,
  headerText,
  paragraphText,
  buttonText,
  buttonStyle,
  onClick,
  mailto,
  to,
  external,
  queryParams,
  imageSide = "right",
  isVertical = false,
  isParagraphRichText = false,
}: Props) => (
  <div
    css={css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin: 0;
      padding: ${isMobileBreakpoint ? "32px 24px 60px" : "32px 0"};
    `}
  >
    <div
      css={css`
        display: flex;
        flex-direction: ${getFlexDirection(
          isMobileBreakpoint,
          imageSide === "left"
        )};
        width: 100%;
        align-items: center;
        margin: 0;
      `}
    >
      <div
        css={css`
          display: flex;
          overflow: hidden;
          align-items: center;
          justify-content: center;
          width: ${isMobileBreakpoint ? "100%" : "50%"};
          height: 100%;
          z-index: ${Z_INDICIES.IMAGE_WITH_TEXT_CONTENT};
        `}
      >
        <ResponsiveImage
          src={imageUrl}
          {...getHeightAndWidth(isMobileBreakpoint, isVertical)}
          queryParams={queryParams}
          alt={headerText || ""}
          objectFit="contain"
        />
      </div>
      {!isMobileBreakpoint && (
        <div
          css={css`
            width: 48px;
          `}
        />
      )}
      <div
        css={css`
          ${isMobileBreakpoint
            ? `width: 100%;
          padding-top: 32px;`
            : `width: 50%;
          display: flex;
          align-content: center;
          justify-content: center;
          padding: 24px;
          `}
        `}
      >
        <TextSectionForImageComponent
          headerText={headerText}
          paragraphText={paragraphText}
          buttonStyle={buttonStyle}
          buttonText={buttonText}
          onClick={onClick}
          mailto={mailto}
          to={to}
          external={external}
          isMobileBreakpoint={isMobileBreakpoint}
          isParagraphRichText={isParagraphRichText}
        />
      </div>
    </div>
  </div>
);

export default ImageWithText;
