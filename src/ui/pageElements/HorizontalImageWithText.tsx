/** @jsx jsx */
import { jsx } from "@emotion/react";
import { ReactNode } from "react";
import ImageWithText from "./ImageWithText";

interface Props {
  isMobileBreakpoint: boolean;
  imageUrl: string;
  headerText: string;
  paragraphText: ReactNode;
  buttonText?: string;
  onClick?: (event: React.MouseEvent) => void;
  to?: string;
  mailto?: string;
  queryParams?: { [key: string]: string | string[] | number };
}

const HorizontalImageWithText = (props: Props) => (
  <ImageWithText {...props} imageSide="right" />
);

export default HorizontalImageWithText;
