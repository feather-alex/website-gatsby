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
  queryParams?: { [key: string]: string | string[] | number };
}

const VerticalImageWithText = (props: Props) => (
  <ImageWithText {...props} imageSide="left" isVertical={true} />
);

export default VerticalImageWithText;
