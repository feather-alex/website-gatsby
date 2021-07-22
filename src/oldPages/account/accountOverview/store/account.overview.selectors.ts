import { parseISO, format as formatDate, isSameDay, isAfter } from "date-fns";

import { State as GlobalState } from "../../../../types/ReduxState";
import { createSelector } from "reselect";
import { Lease, PlanType } from "./account.overview.types";
import { CONTENTFUL_IDS } from "../../../../contentful/contentful.types";
import {
  MembershipState,
  MembershipStateDisplayName,
} from "../../../../app/store/plan/plan.types";

export const isFetching = ({ accounts }: GlobalState) =>
  accounts.accountOverview.isFetching;
export const getError = ({ accounts }: GlobalState) =>
  accounts.accountOverview.error;
export const getItems = ({ accounts }: GlobalState) =>
  accounts.accountOverview.overview.items;
export const getMonthlySubtotal = ({ accounts }: GlobalState) =>
  accounts.accountOverview.overview.monthlySubtotal;
export const getMembershipFee = ({ accounts }: GlobalState) =>
  accounts.accountOverview.overview.currentPlan.membershipFee;
export const getPlanType = ({ accounts }: GlobalState) =>
  accounts.accountOverview.overview.currentPlan.type;
export const getOrderNumber = ({ accounts }: GlobalState) =>
  accounts.accountOverview.overview.subscriptionId;
export const getNumberOfFreeTrips = ({ accounts }: GlobalState) =>
  accounts.accountOverview.overview.numberOfFreeTrips;
export const getTaxRate = ({ accounts }: GlobalState) =>
  accounts.accountOverview.overview.taxRate;
export const getDeliveryArea = ({ accounts }: GlobalState) =>
  accounts.accountOverview.overview.deliveryAreaIdentifier;
export const getLeases = ({ accounts }: GlobalState) =>
  accounts.accountOverview.overview.leases;

export const getTaxAmount = createSelector(
  getMonthlySubtotal,
  getMembershipFee,
  getTaxRate,
  (monthlySubtotal: number, membershipFee: number, taxRate: number) =>
    ((monthlySubtotal + membershipFee) * (taxRate * 0.01)).toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )
);

export const getGrandTotal = createSelector(
  getMonthlySubtotal,
  getMembershipFee,
  getTaxAmount,
  (monthlySubtotal: number, membershipFee: number, taxAmount: string) =>
    (monthlySubtotal + membershipFee + parseFloat(taxAmount)).toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )
);

export const getDiscounts = ({ accounts }: GlobalState) =>
  accounts.accountOverview.overview.discounts;

export const getEndDate = ({ accounts }: GlobalState) => {
  const endDate = accounts.accountOverview.overview.endDate;
  return endDate ? formatDate(parseISO(endDate), "MMMM d, yyyy") : "Pending";
};

export const getStartDate = ({ accounts }: GlobalState) => {
  const startDate = accounts.accountOverview.overview.startDate;
  return startDate
    ? formatDate(parseISO(startDate), "MMMM d, yyyy")
    : "Pending";
};

export const getRawStartDate = ({ accounts }: GlobalState) =>
  accounts.accountOverview.overview.startDate;
export const getRequestedDeliveryDate = ({ accounts }: GlobalState) =>
  accounts.accountOverview.overview.requestedDeliveryDate;

export const getRawDeliveryDate = ({ accounts }: GlobalState) => {
  const { requestedDeliveryDate } = accounts.accountOverview.overview;
  const deliveryDate =
    accounts.accountOverview.overview.startDate === null
      ? requestedDeliveryDate
      : accounts.accountOverview.overview.startDate;
  return deliveryDate;
};

export const getConfirmedDeliveryDate = ({ accounts }: GlobalState) => {
  const startDate = accounts.accountOverview.overview.startDate;
  return startDate ? formatDate(parseISO(startDate), "MMMM d, yyyy") : null;
};

export const hasUpcomingDelivery = createSelector(
  getRawStartDate,
  (startDate: string | null) => {
    const today = new Date();

    if (startDate) {
      const parsed = parseISO(startDate);
      return isSameDay(parsed, today) || isAfter(parsed, today);
    }

    return true;
  }
);

export const getPlanName = createSelector(getPlanType, (planType: PlanType) => {
  let planName: string;
  switch (planType) {
    case PlanType.Member:
      planName = MembershipStateDisplayName[MembershipState.MEMBER];
      break;
    case PlanType.NonMember:
      planName = MembershipStateDisplayName[MembershipState.NON_MEMBER];
      break;
    default:
      planName = "Subscription";
  }
  return planName;
});

export const getMembershipPageFAQsID = createSelector(
  getPlanType,
  (planType: PlanType) =>
    planType === "Member"
      ? CONTENTFUL_IDS.ACCOUNTS_FAQ_MEMBER
      : planType === PlanType.NonMember
      ? CONTENTFUL_IDS.ACCOUNTS_FAQ_NON_MEMBER
      : CONTENTFUL_IDS.ACCOUNTS_FAQ_LEGACY
);

export const hasSignedLease = createSelector(getLeases, (leases: Lease[]) => {
  const activeLeases = leases.filter((lease) =>
    ["Pending", "Signed"].includes(lease.status)
  );
  if (!activeLeases.length) {
    return false;
  }

  const sortedActiveLeases = activeLeases.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  if (sortedActiveLeases[0].status === "Signed") {
    return true;
  }

  return false;
});
