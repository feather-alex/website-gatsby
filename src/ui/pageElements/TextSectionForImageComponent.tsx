/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { ReactNode } from "react";

import Header2 from "../headers/Header2";
import Paragraph1 from "../paragraphs/Paragraph1";
import Button, { ButtonStyle } from "../buttons/Button";
import RichTextWrapper from "../../contentful/RichTextWrapper";

interface Props {
  headerText?: string;
  paragraphText: ReactNode;
  buttonText?: string;
  buttonStyle?: ButtonStyle;
  onClick?: (event: React.MouseEvent) => void;
  to?: string;
  mailto?: string;
  external?: string;
  isMobileBreakpoint: boolean;
  isParagraphRichText?: boolean;
}

const TextSectionForImageComponent = ({
  headerText,
  paragraphText,
  buttonText,
  buttonStyle = ButtonStyle.TEXT,
  onClick,
  to,
  mailto,
  external,
  isMobileBreakpoint,
  isParagraphRichText = false,
}: Props) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      max-width: ${isMobileBreakpoint ? "100%" : "448px"};
    `}
  >
    {headerText && <Header2>{headerText}</Header2>}

    <div
      css={css`
        margin-top: 10px;
        ${buttonText &&
        `margin-bottom: ${isMobileBreakpoint ? "30px" : "35px"};`}
      `}
    >
      {isParagraphRichText && typeof paragraphText === "string" ? (
        <RichTextWrapper
          css={css`
            & p {
              margin-top: 28px;
            }
            & p:first-of-type {
              margin-top: 8px;
            }
          `}
          text={paragraphText}
        />
      ) : typeof paragraphText === "string" ? (
        <Paragraph1>{paragraphText}</Paragraph1>
      ) : (
        paragraphText
      )}
    </div>

    {buttonText && (
      <Button
        style={buttonStyle}
        onClick={onClick}
        to={to}
        mailto={mailto}
        external={external}
      >
        {buttonText}
      </Button>
    )}
  </div>
);

export default TextSectionForImageComponent;
