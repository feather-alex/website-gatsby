/** @jsx jsx */
import { jsx } from "@emotion/react";
import Title from "./Title";

interface Props {
  children: React.ReactNode;
  isBold?: boolean;
  isUnderline?: boolean;
  isAnimated?: boolean;
  color?: string;
  dataCy?: string;
}

const Title1 = ({ children, ...props }: Props) => (
  <Title fontSize={16} lineHeight={20} {...props}>
    {children}
  </Title>
);

export default Title1;
