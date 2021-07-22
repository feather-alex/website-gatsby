/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { BRAND } from "../../../ui/variables";
import { Link } from "react-router-dom";
import { CheckoutCTAErrorContent } from "./CheckoutCTAErrors.content";

type Props = CheckoutCTAErrorContent & { onClick?: () => void };

export const CheckoutCTAError = ({
  dataCy,
  to,
  error,
  ctaMessage,
  onClick,
}: Props) => {
  return (
    <div
      css={css`
        width: 80%;
        margin-top: 17px;
        text-align: center;
        color: ${BRAND.ERROR};

        @media screen and (min-width: 1050px) {
          width: 60%;
        }
      `}
      data-cy={dataCy}
    >
      {error}
      <Link
        to={to}
        onClick={onClick}
        css={css`
          color: ${BRAND.ERROR};
          margin-left: 4px;
          text-decoration: underline;
          &:hover {
            color: ${BRAND.ERROR};
            text-decoration: underline;
          }
        `}
      >
        {ctaMessage}
      </Link>
    </div>
  );
};
