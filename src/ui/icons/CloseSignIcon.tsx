/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { SHADES } from "../variables";
import getOnClickProps from "../../utils/on-click-props";

interface Props {
  onClick?: (event: React.MouseEvent) => void;
  size?: number;
  isInverted?: boolean;
  className?: string;
  dataCy?: string;
}

const CloseSignIcon = ({
  onClick,
  isInverted,
  size = 26,
  className,
  dataCy,
}: Props) => {
  return (
    <div
      data-cy={dataCy}
      css={css`
        ${onClick && `cursor: pointer;`}
      `}
      {...getOnClickProps(onClick)}
      className={className}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 6L6 20m14 0L6 6"
          stroke={isInverted ? SHADES.WHITE : SHADES.BLACK}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default CloseSignIcon;
