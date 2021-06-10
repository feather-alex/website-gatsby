import { State as GlobalState } from '../../../../types/ReduxState';
import { AccountHistory, AccountHistoryResource } from './account.history.types';
import { initialState } from './account.history.reducer';
import * as selectors from './account.history.selectors';

describe('Account History - Selectors', () => {
  let state: AccountHistory;

  const accountHistoryResource: AccountHistoryResource = {
    charges: [
      {
        id: 'ch_2398y592bfnip23f',
        status: 'succeeded',
        amount: 160.05,
        sourceId: 'card_some7362regex',
        chargedAt: 1572274970,
        description: 'some charge boi here',
        reasonForFailure: null,
        amountRefunded: 0
      }
    ],
    hasMore: false
  };

  beforeAll(() => {
    state = {
      ...initialState,
      ...accountHistoryResource
    };
  });

  it('should return the total number of payments', () => {
    const total = selectors.getTotal({ accounts: { accountHistory: state } } as GlobalState);
    expect(total).toEqual(1);
  });

  it('should return an array of payments data', () => {
    const paymentsData = selectors.getPaymentsData({ accounts: { accountHistory: state } } as GlobalState);
    expect(Array.isArray(paymentsData)).toBe(true);
    expect(paymentsData.length).toEqual(1);
  });

  it('should return if we are currently fetching from the API', () => {
    const isFetching = selectors.isFetching({ accounts: { accountHistory: state } } as GlobalState);
    expect(isFetching).toEqual(false);
  });

  it('should return the current error', () => {
    const error = selectors.getError({ accounts: { accountHistory: state } } as GlobalState);
    expect(error).toBeNull();
  });

  it('should return the perPage value', () => {
    const perPage = selectors.getPerPage({ accounts: { accountHistory: state } } as GlobalState);
    expect(perPage).toBe(7);
  });

  it('should return true if there are more products to load', () => {
    state = {
      ...state,
      hasMore: true
    };

    const shouldLoadMoreAccountHistory = selectors.getHasMoreAccountHistory({
      accounts: { accountHistory: state }
    } as GlobalState);

    expect(shouldLoadMoreAccountHistory).toEqual(true);
  });

  it('should return false if all payment history has been fetched', () => {
    state = {
      ...state,
      hasMore: false
    };

    const shouldLoadMoreAccountHistory = selectors.getHasMoreAccountHistory({
      accounts: { accountHistory: state }
    } as GlobalState);

    expect(shouldLoadMoreAccountHistory).toEqual(false);
  });

  it('should return the value of the last charge id', () => {
    state = {
      ...state,
      charges: [
        ...state.charges,
        {
          id: 'ch_sdkjvngw84u20',
          status: 'succeeded',
          amount: 160.05,
          sourceId: 'card_some7362regex',
          chargedAt: 1572274970,
          description: 'some charge boi here',
          reasonForFailure: null,
          amountRefunded: 0
        }
      ]
    };

    const lastChargeId: string | undefined = selectors.getLastChargeId({
      accounts: { accountHistory: state }
    } as GlobalState);

    expect(lastChargeId).toEqual('ch_sdkjvngw84u20');
  });

  it('should return undefined for the lastChargeId if there are no charges', () => {
    state = {
      ...state,
      charges: []
    };

    const lastChargeId: string | undefined = selectors.getLastChargeId({
      accounts: { accountHistory: state }
    } as GlobalState);

    expect(lastChargeId).toBeUndefined();
  });
});
