import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import { AccountHistoryResource } from './account.history.types';
import { AccountHistory } from '../../../../types/Account';
import accountHistory from './account.history.reducer';
import * as actions from './account.history.actions';
import { initialState } from './account.history.reducer';
import { APIError } from '../../../../types/ReduxState';

describe('Account History - Reducers', () => {
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

  const error: APIError = {
    error: 'error',
    message: 'message',
    status: 400
  };

  beforeEach(() => (state = { ...initialState }));

  it('should handle a request to get the account history', () => {
    const action: FluxStandardAction = actions.getAccountHistory();
    const reduced = accountHistory(state, action);

    expect(reduced.isFetching).toEqual(true);
    expect(reduced.error).toBeNull();
  });

  it('should handle successfully getting the account history data', () => {
    const action: FluxStandardAction = actions.getAccountHistorySuccess(accountHistoryResource);
    const reduced = accountHistory(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.charges.length).toEqual(1);
    expect(reduced.error).toBeNull();
  });

  it('should handle failing to get the account history data', () => {
    const action: FluxStandardAction = actions.getAccountHistoryFailure(error);
    const reduced = accountHistory(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.error).toEqual(error);
  });
});
