/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FONTS, BRAND } from "../variables";

const Paragraph2 = ({
  color = BRAND.PRIMARY_TEXT,
  children,
  dataCy,
  className,
}: {
  color?: string;
  children: React.ReactNode;
  dataCy?: string;
  className?: string;
}) => (
  <p
    data-cy={dataCy}
    className={className}
    css={css`
      font-family: ${FONTS.PRIMARY};
      font-size: 16px;
      line-height: 24px;
      color: ${color};
    `}
  >
    {children}
  </p>
);

export default Paragraph2;
