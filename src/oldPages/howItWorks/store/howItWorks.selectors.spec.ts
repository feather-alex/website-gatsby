import { HowItWorksState } from './howItWorks.types';
import { State as GlobalState } from '../../../types/ReduxState';
import * as selectors from './howItWorks.selectors';
import { initialState } from './howItWorks.reducer';
import { mockError } from './howItWorks.fixtures';
import { makeMockFaqs } from '../../FAQ/store/faqs.fixtures';

describe('How It Works - Selectors', () => {
  let state: HowItWorksState;

  beforeAll(() => (state = { ...initialState }));

  it('Should select all the How It Works FAQ questions', () => {
    state = {
      ...initialState,
      faqs: makeMockFaqs(3)
    };
    const selected = selectors.getFAQs({ howItWorks: state } as GlobalState);

    expect(selected.length).toEqual(3);
  });

  it('Should return the value of: meta', () => {
    const value = {
      name: 'a',
      description: 'b',
      imageUrl: 'c',
      title: 'd'
    };

    state = {
      ...initialState,
      meta: value
    };

    const selected = selectors.getMeta({ howItWorks: state } as GlobalState);

    expect(selected).toEqual(value);
  });

  it('Should return the value of: steps', () => {
    const value = {
      step: 'one',
      order: 1,
      headerText: 'a',
      headerImageUrl: 'b',
      detailText: 'c',
      detailImageUrl: 'd',
      detailImageSaturation: 55,
      detailImageSharpness: 9
    };

    state = {
      ...initialState,
      steps: [value]
    };

    const selected = selectors.getSteps({ howItWorks: state } as GlobalState);

    expect(selected).toEqual([value]);
  });

  it('Should return the value of: header', () => {
    const value = 'Deer gawd';

    state = {
      ...initialState,
      header: value
    };

    const selected = selectors.getHeader({ howItWorks: state } as GlobalState);

    expect(selected).toEqual(value);
  });

  it('Should return the value of: isFetching', () => {
    const value = true;

    state = {
      ...initialState,
      isFetching: value
    };

    const selected = selectors.getIsFetching({ howItWorks: state } as GlobalState);

    expect(selected).toEqual(value);
  });

  it('Should return the value of: error', () => {
    state = {
      ...initialState,
      error: mockError
    };

    const selected = selectors.getError({ howItWorks: state } as GlobalState);

    expect(selected).toEqual(mockError);
  });
});
