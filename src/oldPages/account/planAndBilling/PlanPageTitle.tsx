/** @jsx jsx */
import { css, jsx } from "@emotion/core";

interface Props {
  spaceBetween?: boolean;
  children: React.ReactNode;
}

export const PlanPageTitle = ({ children, spaceBetween }: Props) => {
  return (
    <div
      css={css`
        display: flex;
        ${spaceBetween ? `justify-content: space-between;` : ""}
        margin-bottom: 10px;
      `}
    >
      {children}
    </div>
  );
};
