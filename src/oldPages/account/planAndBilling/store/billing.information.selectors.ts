import { State as GlobalState } from '../../../../types/ReduxState';
import { format as formatDate, fromUnixTime } from 'date-fns';

export const getDefaultSource = ({ accounts }: GlobalState) => accounts.billingInformation.defaultSource;
export const isFetching = ({ accounts }: GlobalState) => accounts.billingInformation.isFetching;
export const getError = ({ accounts }: GlobalState) => accounts.billingInformation.error;
export const getSources = ({ accounts }: GlobalState) => accounts.billingInformation.sources;

export const getBillingStartDate = ({ accounts }: GlobalState) => {
  const startDate = accounts.billingInformation.startDate;
  if (!startDate) {
    return 'Pending';
  }
  return `${formatDate(fromUnixTime(startDate), 'do')} of the month`;
};
