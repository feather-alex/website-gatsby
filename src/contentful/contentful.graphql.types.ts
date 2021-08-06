import { ButtonStyle } from "../ui/buttons/Button";

export enum UrlType {
  INTERNAL = "internal",
  EXTERNAL = "external",
  EMAIL = "email",
}

export interface Button {
  style?: ButtonStyle;
  label: string;
  url: string;
  urlType: UrlType;
}

export interface ImageAndTextBase {
  header: string;
  imageUrl: string;
  imagePosition?: "left" | "right" | "above" | "below";
  isVertical: boolean;
}

export interface ImageAndText extends ImageAndTextBase {
  paragraph?: {
    content?: Array<{ content: Array<{ value: string }> }>;
  };
  cta?: Button;
}
