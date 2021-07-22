/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { format as formatDate, fromUnixTime } from "date-fns";
import { connect } from "react-redux";
import { BRAND } from "../../../ui/variables";
import Title2 from "../../../ui/titles/Title2";
import Button, { ButtonStyle } from "../../../ui/buttons/Button";
import { AccountHistoryTable } from "./table/Table";
import { State as GlobalState } from "../../../types/ReduxState";
import { getIsMobileBreakpoint } from "../../../app/store/dimensions/dimensions.selectors";
import { PaymentDetails } from "../accountHistory/store/account.history.types";
import { getAccountHistory, resetState } from "./store/account.history.actions";
import * as accountHistorySelectors from "../accountHistory/store/account.history.selectors";
import LoadingFeatherSymbol from "../../../ui/miscellaneous/LoadingFeatherArch";
import { ActionCreator } from "../../../types/FluxStandardActions";
import Analytics from "../../../analytics/analytics";
import { ACCOUNTS } from "../../../analytics/accounts/events";

export interface Props {
  isFetching: boolean;
  resetState: ActionCreator;
  isMobileBreakpoint: boolean;
  paymentsData: PaymentDetails[];
  hasMoreAccountHistory: boolean;
  getAccountHistory: ActionCreator;
}

class AccountHistory extends React.Component<Props> {
  componentDidMount() {
    this.props.getAccountHistory();
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  handleSeeMoreHistory = () => {
    Analytics.trackEvent(ACCOUNTS.SEE_MORE_PAYMENT_HISTORY);
    this.props.getAccountHistory();
  };

  formatDate = (date: number, isMobile = false) => {
    if (isMobile) {
      return formatDate(fromUnixTime(date), "MM.dd");
    }

    return formatDate(fromUnixTime(date), "MM.dd.yyyy");
  };

  formatCharge = (charge: number) => {
    const { isMobileBreakpoint } = this.props;
    const formattedCharge =
      Math.round(charge) !== charge ? `$${charge.toFixed(2)}` : `$${charge}`;
    return isMobileBreakpoint ? (
      <Title2 isBold={true}>{formattedCharge}</Title2>
    ) : (
      formattedCharge
    );
  };

  render() {
    const {
      isFetching,
      paymentsData,
      isMobileBreakpoint,
      hasMoreAccountHistory,
    } = this.props;

    return (
      <React.Fragment>
        <AccountHistoryTable
          payments={paymentsData}
          formatDate={this.formatDate}
          formatCharge={this.formatCharge}
          isMobileBreakpoint={isMobileBreakpoint}
        />

        <div
          css={css`
            text-align: right;
            margin: 10px 0 15px;
            color: ${BRAND.ACCENT_2};
          `}
        >
          {!isFetching && hasMoreAccountHistory && (
            <Button
              style={ButtonStyle.TEXT}
              onClick={this.handleSeeMoreHistory}
            >
              see more
            </Button>
          )}
        </div>

        {isFetching && <LoadingFeatherSymbol />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  isFetching: accountHistorySelectors.isFetching(state),
  paymentsData: accountHistorySelectors.getPaymentsData(state),
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  hasMoreAccountHistory:
    accountHistorySelectors.getHasMoreAccountHistory(state),
});

const mapDispatchToProps = {
  resetState,
  getAccountHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountHistory);
