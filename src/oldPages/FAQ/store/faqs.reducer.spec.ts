import { mockRequestPayload, mockSuccessPayload, mockError } from './faqs.fixtures';
import faqsReducer, { initialState } from './faqs.reducer';
import { getFaqContent } from './faqs.actions';
import { FaqContentState } from './faqs.types';

describe('FAQs - Reducer', () => {
  let state: FaqContentState;

  beforeEach(() => (state = { ...initialState }));

  it('Should handle action: GET_FAQ_REQUEST', () => {
    const action = getFaqContent.request(mockRequestPayload);
    const reduced = faqsReducer(state, action);

    expect(reduced.isFetching).toEqual(true);
    expect(reduced.faqCategories).toEqual([]);
    expect(reduced.meta).toEqual({
      name: '',
      description: '',
      imageUrl: '',
      title: ''
    });
    expect(reduced.error).toBeNull();
  });

  it('Should handle action: GET_FAQ_SUCCESS', () => {
    const action = getFaqContent.success(mockSuccessPayload);

    const reduced = faqsReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.faqCategories).toEqual(mockSuccessPayload.faqCategories);
    expect(reduced.meta).toEqual(mockSuccessPayload.meta);
    expect(reduced.error).toBeNull();
  });

  it('Should handle action: GET_FAQ_FAILURE', () => {
    const action = getFaqContent.failure(mockError);

    const reduced = faqsReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.faqCategories).toEqual([]);
    expect(reduced.meta).toEqual({
      name: '',
      description: '',
      imageUrl: '',
      title: ''
    });
    expect(reduced.error).toEqual(mockError);
  });
});
