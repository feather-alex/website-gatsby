import { FeatherPerksContentState } from './featherPerks.types';
import { State as GlobalState } from '../../../../types/ReduxState';
import * as selectors from './featherPerks.selectors';
import { initialState } from './featherPerks.reducer';
import { mockError, mockSuccessPayload } from './featherPerks.fixtures';

describe('FeatherPerks - Selectors', () => {
  let state: FeatherPerksContentState;

  beforeAll(() => (state = { ...initialState }));

  it('Should return the value of: isFetching', () => {
    const value = true;

    state = {
      ...initialState,
      isFetching: value
    };

    const selected = selectors.getIsFetching({ featherPerks: state } as GlobalState);

    expect(selected).toEqual(value);
  });

  it('Should return the value of: error', () => {
    state = {
      ...initialState,
      error: mockError
    };

    const selected = selectors.getError({ featherPerks: state } as GlobalState);

    expect(selected).toEqual(mockError);
  });

  it('Should return the value of: perks', () => {
    state = {
      ...initialState,
      perks: mockSuccessPayload.perks
    };

    const selected = selectors.getPerks({ featherPerks: state } as GlobalState);

    expect(selected).toEqual(mockSuccessPayload.perks);
  });
});
