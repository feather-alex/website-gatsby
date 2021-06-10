/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Bold = ({ children }: { children: React.ReactNode }) => (
  <strong
    css={css`
      font-weight: 500;
    `}
  >
    {children}
  </strong>
);

export default Bold;
