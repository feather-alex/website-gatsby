/** @jsx jsx */
import { jsx } from "@emotion/react";
import Title from "./Title";

interface Props {
  children: React.ReactNode;
  isUnderline?: boolean;
  isAnimated?: boolean;
  isItalic?: boolean;
  isBold?: boolean;
  color?: string;
  dataCy?: string;
  className?: string;
}

const Title3 = ({ children, ...props }: Props) => (
  <Title fontSize={14} lineHeight={20} {...props}>
    {children}
  </Title>
);

export default Title3;
