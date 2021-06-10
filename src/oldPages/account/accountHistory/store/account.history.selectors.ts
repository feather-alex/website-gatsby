import { State as GlobalState } from '../../../../types/ReduxState';
import { createSelector } from 'reselect';
import { PaymentDetails } from './account.history.types';
import { getDefaultSource } from '../../planAndBilling/store/billing.information.selectors';
import { BillingResource } from '../../planAndBilling/store/billing.information.types';

export const isFetching = ({ accounts }: GlobalState) => accounts.accountHistory.isFetching;
export const getPaymentsData = ({ accounts }: GlobalState) => accounts.accountHistory.charges;
export const getError = ({ accounts }: GlobalState) => accounts.accountHistory.error;
export const getPerPage = ({ accounts }: GlobalState) => accounts.accountHistory.perPage;
export const getHasMoreAccountHistory = ({ accounts }: GlobalState) => accounts.accountHistory.hasMore;

export const getTotal = ({ accounts }: GlobalState) => accounts.accountHistory.charges.length;

export const getLastChargeId = createSelector(
  getTotal,
  getPaymentsData,
  (totalNumPayments: number, charges: PaymentDetails[]) => {
    return totalNumPayments > 0 ? charges[totalNumPayments - 1].id : undefined;
  }
);

export const getPastDue = createSelector(
  getPaymentsData,
  getDefaultSource,
  (payments: PaymentDetails[], defaultSource: BillingResource) => {
    return payments.length && payments[0].status === 'failed' && payments[0].sourceId === defaultSource.id;
  }
);
