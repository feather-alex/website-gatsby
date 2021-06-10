import { State as GlobalState } from '../../../types/ReduxState';
import { mockError, mockSuccessPayload } from './pages.fixtures';
import { initialState } from './pages.reducer';
import { getIsFetchingPages, getPages, getPagesError, getCityPages } from './pages.selectors';
import { ContentfulPagesState } from './pages.types';

describe('Contentful Pages - Selectors', () => {
  let state: ContentfulPagesState;

  beforeAll(() => (state = { ...initialState }));

  it('Should return a list of: Contentful pages', () => {
    state = {
      ...initialState,
      pages: mockSuccessPayload.pages
    };

    expect(getPages({ app: { contentfulPages: state } } as GlobalState)).toEqual(mockSuccessPayload.pages);
    expect(getPages({ app: { contentfulPages: state } } as GlobalState).length).toEqual(2);
  });

  it('Should return a list of: City pages', () => {
    state = {
      ...initialState,
      pages: mockSuccessPayload.pages
    };

    expect(getCityPages({ app: { contentfulPages: state } } as GlobalState)).toEqual([mockSuccessPayload.pages[0]]);
    expect(getCityPages({ app: { contentfulPages: state } } as GlobalState).length).toEqual(1);
  });

  it('Should return the value of: isFetching', () => {
    state = {
      ...initialState,
      isFetching: true
    };
    expect(getIsFetchingPages({ app: { contentfulPages: state } } as GlobalState)).toBeTruthy();
  });

  it('Should return the value of: error', () => {
    state = {
      ...initialState,
      error: mockError
    };

    expect(getPagesError({ app: { contentfulPages: state } } as GlobalState)).toEqual(mockError);
  });
});
