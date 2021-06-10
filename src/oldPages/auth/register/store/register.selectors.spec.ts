import { State as GlobalState } from '../../../../types/ReduxState';
import { initialState } from './register.reducer';
import * as selectors from './register.selectors';
import { Register } from './register.types';

describe('Register selectors', () => {
  let state: Register;

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should return whether we are currently fetching from the API', () => {
    const isFetching = selectors.getIsFetching({ auth: { register: state } } as GlobalState);
    expect(isFetching).toEqual(false);
  });

  it('should return email value', () => {
    const email = selectors.getEmail({ auth: { register: state } } as GlobalState);
    expect(email).toEqual('');
  });

  it('should return the current error', () => {
    const error = selectors.getError({ auth: { register: state } } as GlobalState);
    expect(error).toEqual(null);
  });

  it('should return the flag to track if the user has registered', () => {
    const hasRegistered = selectors.getHasRegistered({ auth: { register: state } } as GlobalState);
    expect(hasRegistered).toEqual(false);
  });
});
