import { State as GlobalState } from '../../../types/ReduxState';
import * as selectors from './enterprise.selectors';
import { EnterpriseContentState } from './enterprise.types';
import { initialState } from './enterprise.reducer';
import { makeMockFaqs } from '../../FAQ/store/faqs.fixtures';
import { mockError, mockSuccessPayload } from './enterprise.fixtures';

describe('Enterprise - Selectors', () => {
  let state: EnterpriseContentState;

  beforeAll(() => (state = { ...initialState }));

  it('Should select: heroLockup', () => {
    state = {
      ...initialState,
      heroLockup: mockSuccessPayload.heroLockup
    };
    const selected = selectors.getEnterpriseHeroLockup({ enterprise: state } as GlobalState);

    expect(selected).toEqual(mockSuccessPayload.heroLockup);
  });

  it('Should select: horizontalLockup', () => {
    state = {
      ...initialState,
      horizontalLockup: mockSuccessPayload.horizontalLockup
    };
    const selected = selectors.getEnterpriseHorizontalLockup({ enterprise: state } as GlobalState);

    expect(selected).toEqual(mockSuccessPayload.horizontalLockup);
  });

  it('Should select: horizontalLockup2', () => {
    state = {
      ...initialState,
      horizontalLockup2: mockSuccessPayload.horizontalLockup2
    };
    const selected = selectors.getEnterpriseHorizontalLockup2({ enterprise: state } as GlobalState);

    expect(selected).toEqual(mockSuccessPayload.horizontalLockup2);
  });

  it('Should select: productShowcase', () => {
    state = {
      ...initialState,
      productShowcase: mockSuccessPayload.productShowcase
    };
    const selected = selectors.getEnterpriseProductShowcase({ enterprise: state } as GlobalState);

    expect(selected).toEqual(mockSuccessPayload.productShowcase);
  });

  it('Should select: titleButtonLockup', () => {
    state = {
      ...initialState,
      titleButtonLockup: mockSuccessPayload.titleButtonLockup
    };
    const selected = selectors.getEnterpriseTitleButtonLockup({ enterprise: state } as GlobalState);

    expect(selected).toEqual(mockSuccessPayload.titleButtonLockup);
  });

  it('Should select: titledTripleVerticalImageLockup', () => {
    state = {
      ...initialState,
      titledTripleVerticalImageLockup: mockSuccessPayload.titledTripleVerticalImageLockup
    };
    const selected = selectors.getEnterpriseTitledTripleVerticalImageLockup({ enterprise: state } as GlobalState);

    expect(selected).toEqual(mockSuccessPayload.titledTripleVerticalImageLockup);
  });

  it('Should select: faqs', () => {
    state = {
      ...initialState,
      faqs: makeMockFaqs(5)
    };
    const selected = selectors.getEnterpriseFAQs({ enterprise: state } as GlobalState);

    expect(selected!.length).toEqual(5);
  });

  it('Should select: meta', () => {
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

    const selected = selectors.getEnterpriseMeta({ enterprise: state } as GlobalState);

    expect(selected).toEqual(value);
  });

  it('Should select: isFetching', () => {
    const value = true;

    state = {
      ...initialState,
      isFetching: value
    };

    const selected = selectors.getEnterpriseIsFetching({ enterprise: state } as GlobalState);

    expect(selected).toEqual(value);
  });

  it('Should return the value of: error', () => {
    state = {
      ...initialState,
      error: mockError
    };

    const selected = selectors.getEnterpriseError({ enterprise: state } as GlobalState);

    expect(selected).toEqual(mockError);
  });
});
