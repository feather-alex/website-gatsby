import { AccountOverview } from './account.overview.types';
import reducer, { initialState } from './account.overview.reducer';
import { getAccountOverview } from './account.overview.actions';
import { mockAccountResource, mockAccountOverview, mockError } from './account.overview.fixtures';

describe('Account Overview - Reducers', () => {
  let state: AccountOverview;

  beforeEach(() => (state = { ...initialState }));

  it('should handle a request to get the account overview', () => {
    const action = getAccountOverview.request();
    const accountOverview = reducer(state, action);

    expect(accountOverview.isFetching).toEqual(true);
    expect(accountOverview.error).toBeNull();
  });

  it('should handle successfully getting the account overview data', () => {
    const action = getAccountOverview.success(mockAccountResource);
    const accountOverview = reducer(state, action);

    expect(accountOverview.isFetching).toEqual(false);
    expect(accountOverview.error).toBeNull();
    expect(accountOverview.overview).toEqual(mockAccountOverview);
  });

  it('should handle failing to get the account overview', () => {
    const action = getAccountOverview.failure(mockError);
    const accountOverview = reducer(state, action);

    expect(accountOverview.isFetching).toEqual(false);
    expect(accountOverview.error).toEqual(mockError);
  });
});
