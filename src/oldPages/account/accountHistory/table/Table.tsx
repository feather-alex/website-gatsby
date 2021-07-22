import { MobileRow, DesktopRow } from "./Row";
import { PaymentDetails } from "../../accountHistory/store/account.history.types";
import { Headers } from "./Headers";
import React from "react";

interface Props {
  payments: PaymentDetails[];
  isMobileBreakpoint: boolean;
  formatCharge: (charge: number) => string | JSX.Element;
  formatDate: (date: number, isMobile?: boolean) => string;
}

export const AccountHistoryTable = ({
  payments,
  formatDate,
  formatCharge,
  isMobileBreakpoint,
}: Props) => {
  return (
    <React.Fragment>
      {!isMobileBreakpoint && <Headers />}
      {payments.map((payment) => {
        return isMobileBreakpoint ? (
          <MobileRow
            key={payment.chargedAt}
            formatDate={formatDate}
            paymentDetails={payment}
            formatCharge={formatCharge}
          />
        ) : (
          <DesktopRow
            key={payment.chargedAt}
            formatDate={formatDate}
            paymentDetails={payment}
            formatCharge={formatCharge}
          />
        );
      })}
    </React.Fragment>
  );
};
