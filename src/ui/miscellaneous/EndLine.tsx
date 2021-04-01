/** @jsx jsx */
import { css, jsx } from "@emotion/react";

interface Props {
  color: string;
  marginBottom?: string;
}

const EndLine = ({ color, marginBottom }: Props) => (
  <div
    css={css`
      width: 100%;
      border: 1px solid ${color};
      margin-top: 2px;
      ${marginBottom && `margin-bottom: ${marginBottom};`}
    `}
  />
);

export default EndLine;
