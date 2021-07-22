/** @jsx jsx */
import { PaymentDetails } from "../../accountHistory/store/account.history.types";
import { css, jsx } from "@emotion/core";
import { COLORS, BRAND } from "../../../../ui/variables";
import { Column } from "./Column";
import React from "react";
import Title2 from "../../../../ui/titles/Title2";

interface Props {
  paymentDetails: PaymentDetails;
  formatDate: (date: number, isMobile?: boolean) => string;
  formatCharge: (charge: number) => string | JSX.Element;
}

export const MobileRow = ({
  formatDate,
  formatCharge,
  paymentDetails,
}: Props) => {
  const isRefund = paymentDetails.amountRefunded > 0;
  const isFailedPayment = paymentDetails.status === "failed";
  const isFullRefund = paymentDetails.amount === paymentDetails.amountRefunded;

  const description = isFailedPayment
    ? paymentDetails.reasonForFailure!
    : paymentDetails.description;

  return (
    <div
      key={paymentDetails.chargedAt}
      css={css`
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid ${BRAND.ACCENT};
        ${isFullRefund && `color: ${COLORS.BRAND_GREEN};`}
        ${isFailedPayment && `color: ${BRAND.ERROR};`}
      `}
    >
      <div
        css={css`
          width: 80%;
        `}
      >
        <Title2 isBold={true}>
          {formatDate(paymentDetails.chargedAt, true)}
        </Title2>
        {description}
        {isRefund && (
          <span
            css={css`
              color: ${COLORS.BRAND_GREEN};
              margin-left: 5px;
            `}
          >
            (refunded {formatCharge(paymentDetails.amountRefunded)})
          </span>
        )}
      </div>
      <div
        css={css`
          width: 20%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          ${isFailedPayment && `text-decoration: line-through;`}
        `}
      >
        {formatCharge(paymentDetails.amount)}
      </div>
    </div>
  );
};

export const DesktopRow = ({
  formatDate,
  formatCharge,
  paymentDetails,
}: Props) => {
  const isRefund = paymentDetails.amountRefunded > 0;
  const isFailedPayment = paymentDetails.status === "failed";
  const isFullRefund = paymentDetails.amount === paymentDetails.amountRefunded;

  const description = () => {
    return (
      <React.Fragment>
        {isFailedPayment
          ? paymentDetails.reasonForFailure!
          : paymentDetails.description}
        {isRefund && (
          <span
            css={css`
              color: ${COLORS.BRAND_GREEN};
              margin-left: 5px;
            `}
          >
            (refunded {formatCharge(paymentDetails.amountRefunded)})
          </span>
        )}
      </React.Fragment>
    );
  };

  const chargeAmount = () => {
    return (
      <div
        css={css`
          ${isFailedPayment && `text-decoration: line-through;`}
        `}
      >
        {formatCharge(paymentDetails.amount)}
      </div>
    );
  };

  return (
    <div
      css={css`
        display: flex;
        ${isFullRefund && `color: ${COLORS.BRAND_GREEN};`}
        ${isFailedPayment && `color: ${BRAND.ERROR};`}
      `}
    >
      <Column
        width="20%"
        textAlign="start"
        value={formatDate(paymentDetails.chargedAt)}
      />
      <Column width="55%" textAlign="start" value={description()} />
      <Column
        dataCy="charge-amount"
        width="25%"
        textAlign="end"
        value={chargeAmount()}
      />
    </div>
  );
};
