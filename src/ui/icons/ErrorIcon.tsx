/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { BRAND } from "../variables";

interface Props {
  onClick?: (event: React.MouseEvent) => void;
  widthAndHeight?: number;
}

const ErrorIcon = ({ onClick, widthAndHeight }: Props) => {
  return (
    <span
      css={css`
        padding: 5px;
        display: flex;
        align-items: center;
      `}
    >
      <svg
        onClick={onClick}
        width={`${widthAndHeight ? widthAndHeight : "24"}`}
        height={`${widthAndHeight ? widthAndHeight : "24"}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="11.5" stroke={`${BRAND.ERROR}`} />
        <path
          d="M12.9314 14.865V5.327H11.0694V14.865H12.9314ZM10.8604 17.088C10.8604 17.715 11.3734 18.228 12.0004 18.228C12.6274 18.228 13.1404 17.715 13.1404 17.088C13.1404 16.461 12.6274 15.948 12.0004 15.948C11.3734 15.948 10.8604 16.461 10.8604 17.088Z"
          fill={`${BRAND.ERROR}`}
        />
      </svg>
    </span>
  );
};

export default ErrorIcon;
