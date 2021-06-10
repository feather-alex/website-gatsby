/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { BRAND } from "../variables";

interface Props {
  onClick?: (event: React.MouseEvent) => void;
  color?: string;
}

const CheckmarkIcon = ({ onClick, color = BRAND.PRIMARY_TEXT }: Props) => {
  return (
    <div
      css={css`
        padding: 5px;
      `}
    >
      <svg
        onClick={onClick}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.91535 13.5593C4.90544 13.5745 4.89461 13.5893 4.88285 13.6036C4.70934 13.8152 4.40038 13.8422 4.19278 13.664L0.2275 10.2603C0.0198954 10.0821 -0.00773962 9.76614 0.165775 9.55461C0.33929 9.34307 0.648248 9.31605 0.855852 9.49425L4.43694 12.5682L13.13 1.38837C13.2972 1.17336 13.604 1.13842 13.8153 1.31032C14.0265 1.48222 14.0623 1.79588 13.8951 2.01089L4.91535 13.5593Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default CheckmarkIcon;
