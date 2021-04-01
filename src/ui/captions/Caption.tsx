/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { FONTS, BRAND } from "../variables";

const Caption = ({
  color = BRAND.PRIMARY_TEXT,
  className,
  children,
  dataCy,
}: {
  color?: string;
  className?: string;
  children: React.ReactNode;
  dataCy?: string;
}) => (
  <small
    className={className}
    css={css`
      font-family: ${FONTS.PRIMARY};
      font-size: 14px;
      line-height: 20px;
      color: ${color};
    `}
    data-cy={dataCy}
  >
    {children}
  </small>
);

export default Caption;
