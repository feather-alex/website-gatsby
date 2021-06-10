/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { PastDue } from './PastDue';
import { connect } from 'react-redux';
import PaymentSources from './PaymentSources';
import AccountHistory from '../accountHistory/AccountHistory';
import { BillingResource } from './store/billing.information.types';
import { State as GlobalState } from '../../../types/ReduxState';
import { getIsMobileBreakpoint } from '../../../app/store/dimensions/dimensions.selectors';
import * as billingSelectors from './store/billing.information.selectors';
import { Discount } from '../accountOverview/store/account.overview.types';
import * as accountHistorySelectors from '../accountHistory/store/account.history.selectors';
import * as accountOverviewSelectors from '../accountOverview/store/account.overview.selectors';
import Analytics from '../../../analytics/analytics';
import PAGES from '../../../analytics/pages';
import { ACCOUNTS } from '../../../analytics/accounts/events';
import PersonalInfo from '../personalInformation/PersonalInfo';

// components
import Title2 from '../../../ui/titles/Title2';
import Header1 from '../../../ui/headers/Header1';
import { PlanPageTitle } from './PlanPageTitle';
import CurrentPlanInformation from '../accountOverview/CurrentPlanInfo';
import DividingHeader from '../../../ui/textLockups/DividingHeader';
import Button, { ButtonStyle } from '../../../ui/buttons/Button';
import { BREAKPOINTS } from '../../../ui/variables';

export interface Props {
  taxAmount: string;
  grandTotal: string;
  billingStartDate: string;
  isPastDue: boolean;
  isFetchingBillingInfo: boolean;
  membershipFee: number;
  monthlySubTotal: number;
  isMobileBreakpoint: boolean;
  defaultPaymentSource: BillingResource;
  discounts: Discount[];
}

export interface State {
  showBillingActions: boolean;
  showNewCardForm: boolean;
  shouldDisplayThankYou: boolean;
}

class PlanAndBilling extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showBillingActions: false,
      showNewCardForm: false,
      shouldDisplayThankYou: false
    };
  }

  componentDidMount() {
    Analytics.trackPage(PAGES.ACCOUNT_BILLING);
  }

  componentDidUpdate(prevProps: Props) {
    const wasPastDue = prevProps.isPastDue === true && this.props.isPastDue === false;
    const hasDefaultSourceChanged = this.props.defaultPaymentSource.id !== prevProps.defaultPaymentSource.id;

    if (wasPastDue && hasDefaultSourceChanged) {
      this.setState({
        shouldDisplayThankYou: true
      });
    }
  }

  toggleEditBilling = () => {
    // if going from view-only to edit mode, track it
    if (!this.state.showBillingActions) {
      Analytics.trackEvent(ACCOUNTS.EDIT_BILLING_INFO);
    }
    this.setState((prevState) => ({
      showBillingActions: !prevState.showBillingActions,
      showNewCardForm: false
    }));
  };

  toggleNewForm = () => {
    this.setState((prevState) => ({
      showNewCardForm: !prevState.showNewCardForm
    }));
  };

  render() {
    const {
      isMobileBreakpoint,
      billingStartDate,
      monthlySubTotal,
      membershipFee,
      taxAmount,
      grandTotal,
      isPastDue,
      discounts,
      isFetchingBillingInfo
    } = this.props;

    return (
      <div className="plan-billing-page">
        {!isMobileBreakpoint && <Header1>Plan and Billing</Header1>}
        {/* PAST DUE POP_UP */}
        {!isFetchingBillingInfo && (
          <PastDue
            shouldDisplayPastDue={this.props.isPastDue}
            shouldDisplayThankYou={this.state.shouldDisplayThankYou}
          />
        )}
        {/* MEMBERSHIP PLAN */}
        <DividingHeader>Current Plan Information</DividingHeader>
        <CurrentPlanInformation
          billingStartDate={billingStartDate}
          isFetchingBillingInformation={isFetchingBillingInfo}
        />
        {/* CURRENT SUBSCRIPTION */}
        <DividingHeader>Billing Details</DividingHeader>
        <div
          css={css`
            @media ${BREAKPOINTS.DESKTOP} {
              margin-left: 20px;
            }
          `}
        >
          <PlanPageTitle spaceBetween={true}>
            <Title2 isBold={true}>Current furniture:</Title2>
            <Title2 dataCy="monthly-subtotal">{`$${monthlySubTotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}/mo`}</Title2>
          </PlanPageTitle>

          {membershipFee !== 0 && (
            <PlanPageTitle spaceBetween={true}>
              <Title2 isBold={true}>Membership:</Title2>
              <Title2 dataCy="membership-fee">{`$${membershipFee.toFixed(2)}/mo`}</Title2>
            </PlanPageTitle>
          )}

          <div
            css={css`
              margin-bottom: 24px;
            `}
          >
            <PlanPageTitle spaceBetween={true}>
              <Title2 isBold={true}>Tax:</Title2>
              <Title2 dataCy="tax-amount">{`$${taxAmount}/mo`}</Title2>
            </PlanPageTitle>
          </div>

          <PlanPageTitle spaceBetween={true}>
            <Title2 isBold={true}>Current total rent:</Title2>
            <Title2 dataCy="grand-total" isBold={true}>{`$${grandTotal}/mo`}</Title2>
          </PlanPageTitle>
        </div>
        {/* DISCOUNTS */}
        {discounts.length ? (
          <React.Fragment>
            <DividingHeader>Discounts</DividingHeader>
            <div
              css={css`
                @media ${BREAKPOINTS.DESKTOP} {
                  margin-left: 20px;
                }
              `}
            >
              {discounts.map((discount, index) => (
                <div key={index}>{discount.description}</div>
              ))}
            </div>
          </React.Fragment>
        ) : null}
        {/* YOUR INFORMATION */}
        <DividingHeader>Your Information</DividingHeader>
        <PersonalInfo />
        {/* PAYMENT INFORMATION */}
        <div id="payment-information" /> {/* Needed for scroll to container */}
        <div
          css={css`
            position: relative;
          `}
        >
          <DividingHeader>Payment Methods</DividingHeader>

          <div
            data-cy="edit-card"
            css={css`
              position: absolute;
              right: 0;
              top: 10px;

              @media ${BREAKPOINTS.MOBILE} {
                top: 0;
              }
            `}
          >
            <Button style={ButtonStyle.TEXT} isUnderline={false} onClick={this.toggleEditBilling}>
              {this.state.showBillingActions
                ? `Close`
                : `Edit${isMobileBreakpoint ? '/' : ' or '}add${isMobileBreakpoint ? '' : ' new card'}`}
            </Button>
          </div>
        </div>
        <div
          css={css`
            @media ${BREAKPOINTS.DESKTOP} {
              margin-left: 20px;
            }
          `}
        >
          <PaymentSources
            isPastDue={isPastDue}
            showBillingActions={this.state.showBillingActions}
            showNewCardForm={this.state.showNewCardForm}
            toggleNewCardForm={this.toggleNewForm}
          />
        </div>
        {/* ACCOUNT HISTORY */}
        <DividingHeader>Account History</DividingHeader>
        <div
          css={css`
            @media ${BREAKPOINTS.DESKTOP} {
              margin-left: 20px;
            }
          `}
        >
          <AccountHistory />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  isPastDue: accountHistorySelectors.getPastDue(state),
  billingStartDate: billingSelectors.getBillingStartDate(state),
  taxAmount: accountOverviewSelectors.getTaxAmount(state),
  grandTotal: accountOverviewSelectors.getGrandTotal(state),
  discounts: accountOverviewSelectors.getDiscounts(state),
  isFetchingBillingInfo: billingSelectors.isFetching(state),
  defaultPaymentSource: billingSelectors.getDefaultSource(state),
  membershipFee: accountOverviewSelectors.getMembershipFee(state),
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  monthlySubTotal: accountOverviewSelectors.getMonthlySubtotal(state)
});

export default connect(mapStateToProps)(PlanAndBilling);
