import { State as GlobalState } from '../../../types/ReduxState';
import * as selectors from './newsletter.signup.selectors';
import { NewsletterState } from './newsletter.signup.types';
import { initialState } from './newsletter.signup.reducer';

describe('Newsletter Signup - Selectors', () => {
  let state: NewsletterState;

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should return if we are currently fetching from the API', () => {
    const isFetching = selectors.getIsFetching({ app: { newsletter: state } } as GlobalState);
    expect(isFetching).toEqual(false);
  });

  it('should return the current error', () => {
    const error = selectors.getError({ app: { newsletter: state } } as GlobalState);
    expect(error).toEqual(null);
  });

  it('should return if we should display the success message', () => {
    const displaySuccess = selectors.getDisplaySuccessMessage({ app: { newsletter: state } } as GlobalState);
    expect(displaySuccess).toEqual(false);
  });

  it('should return the current email', () => {
    const email = 'eng@mail.com';

    state = {
      ...initialState,
      email
    };
    const emailSelector = selectors.getEmail({ app: { newsletter: state } } as GlobalState);
    expect(emailSelector).toEqual(email);
  });
});
