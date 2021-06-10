/** @jsx jsx */
import { jsx } from "@emotion/core";
import Title from "./Title";

interface Props {
  children: React.ReactNode;
  isBold?: boolean;
  isUnderline?: boolean;
  isItalic?: boolean;
  isAnimated?: boolean;
  color?: string;
  dataCy?: string;
  className?: string;
}

const Title2 = ({ children, ...props }: Props) => (
  <Title fontSize={16} lineHeight={20} {...props}>
    {children}
  </Title>
);

export default Title2;
