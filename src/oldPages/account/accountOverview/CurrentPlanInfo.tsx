/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import Paragraph2 from '../../../ui/paragraphs/Paragraph2';
import { PlanType } from './store/account.overview.types';
import * as accountOverviewSelectors from './store/account.overview.selectors';
import LoadingFeatherSymbol from '../../../ui/miscellaneous/LoadingFeatherArch';
import Title2 from '../../../ui/titles/Title2';
import { State as GlobalState } from '../../../types/ReduxState';
import { PlanPageTitle } from '../planAndBilling/PlanPageTitle';
import { BREAKPOINTS } from '../../../ui/variables';

interface Props {
  planName: string;
  planType: PlanType;
  planEndDate: string;
  billingStartDate: string;
  planStartDate: string;
  numberOfFreeTrips: number;
  isFetchingAccountOverview: boolean;
  isFetchingBillingInformation: boolean;
  subscriptionId: number;
}

const CurrentPlanInformation = ({
  planName,
  planType,
  planEndDate,
  planStartDate,
  billingStartDate,
  numberOfFreeTrips,
  isFetchingAccountOverview,
  isFetchingBillingInformation,
  subscriptionId
}: Props) => {
  const getMembershipDescription = () => {
    let membershipDescription = '';

    const memberDescription =
      'A Feather Membership lasts 12 months; during this time, you can swap, return, or buyout your items if you choose.';
    const legacyDescription =
      'You are currently on a Feather legacy plan. You may choose to upgrade to Membership if you would like, just reach out to your account manager.';
    const nonMemberDescription =
      'Short-Term Plan is a minimum 3-month commitment – you may choose to extend your plan if you would like. If you decide to buy anything, your furniture payments go toward buyout.';

    switch (planType) {
      case PlanType.Member:
        membershipDescription = memberDescription;
        break;
      case PlanType.NonMember:
        membershipDescription = nonMemberDescription;
        break;
      default:
        membershipDescription = legacyDescription;
        break;
    }

    return membershipDescription;
  };

  if (isFetchingAccountOverview || isFetchingBillingInformation) {
    return <LoadingFeatherSymbol />;
  }

  return (
    <div
      css={css`
        @media ${BREAKPOINTS.DESKTOP} {
          margin-left: 20px;
        }
      `}
    >
      <div
        css={css`
          margin-bottom: 32px;
        `}
      >
        <Paragraph2>{getMembershipDescription()}</Paragraph2>
      </div>

      <div
        css={css`
          margin-bottom: 24px;
        `}
      >
        <PlanPageTitle>
          <Title2 isBold={true}>Account ID:&nbsp;</Title2>
          <Title2>{subscriptionId}</Title2>
        </PlanPageTitle>
      </div>

      {planType !== PlanType.Legacy && (
        <PlanPageTitle>
          <Title2 isBold={true}>Plan type:&nbsp;</Title2>
          <Title2 dataCy="plan-name">{planName}</Title2>
        </PlanPageTitle>
      )}

      <PlanPageTitle>
        <Title2 isBold={true}>Billing date:&nbsp;</Title2>
        <Title2>{billingStartDate}</Title2>
      </PlanPageTitle>

      {numberOfFreeTrips !== undefined && planType === PlanType.Member && (
        <PlanPageTitle>
          <Title2 dataCy="free-trips" isBold={true}>
            Free trips available:&nbsp;
          </Title2>
          <Title2 dataCy="number-of-trips">{numberOfFreeTrips.toString()}</Title2>
        </PlanPageTitle>
      )}

      <div
        css={css`
          margin: 24px 0 24px;
        `}
      >
        <PlanPageTitle>
          <Title2 isBold={true}>Plan start date:&nbsp;</Title2>
          <Title2>{planStartDate}</Title2>
        </PlanPageTitle>

        <PlanPageTitle>
          <Title2 isBold={true}>Plan end date:&nbsp;</Title2>
          <Title2>{planEndDate}</Title2>
        </PlanPageTitle>
      </div>

      {planStartDate === 'Pending' && <Title2>Your delivery date will inform your plan start and end dates.</Title2>}
    </div>
  );
};

const mapStateToProps = (state: GlobalState) => ({
  planType: accountOverviewSelectors.getPlanType(state),
  planEndDate: accountOverviewSelectors.getEndDate(state),
  planStartDate: accountOverviewSelectors.getStartDate(state),
  isFetchingAccountOverview: accountOverviewSelectors.isFetching(state),
  numberOfFreeTrips: accountOverviewSelectors.getNumberOfFreeTrips(state),
  planName: accountOverviewSelectors.getPlanName(state),
  subscriptionId: accountOverviewSelectors.getOrderNumber(state)
});

export default connect(mapStateToProps)(CurrentPlanInformation);
