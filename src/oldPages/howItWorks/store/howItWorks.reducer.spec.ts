import { mockRequestPayload, mockSuccessPayload, mockError } from './howItWorks.fixtures';
import faqsReducer, { initialState } from './howItWorks.reducer';
import { getHowItWorksContent } from './howItWorks.actions';
import { HowItWorksState } from './howItWorks.types';

describe('How It Works - Reducer', () => {
  let state: HowItWorksState;

  beforeEach(() => (state = { ...initialState }));

  it('Should handle action: HOW_IT_WORKS_CONTENT_REQUEST', () => {
    const action = getHowItWorksContent.request(mockRequestPayload);
    const reduced = faqsReducer(state, action);

    expect(reduced.isFetching).toEqual(true);
    expect(reduced.faqs).toEqual([]);
    expect(reduced.steps).toEqual([]);
    expect(reduced.header).toEqual('');
    expect(reduced.meta).toEqual({
      name: '',
      description: '',
      imageUrl: '',
      title: ''
    });
    expect(reduced.error).toBeNull();
  });

  it('Should handle action: HOW_IT_WORKS_CONTENT_SUCCESS', () => {
    const action = getHowItWorksContent.success(mockSuccessPayload);

    const reduced = faqsReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.faqs).toEqual(mockSuccessPayload.faqs);
    expect(reduced.steps).toEqual(mockSuccessPayload.steps);
    expect(reduced.header).toEqual(mockSuccessPayload.header);
    expect(reduced.meta).toEqual(mockSuccessPayload.meta);
    expect(reduced.error).toBeNull();
  });

  it('Should handle action: HOW_IT_WORKS_CONTENT_FAILURE', () => {
    const action = getHowItWorksContent.failure(mockError);

    const reduced = faqsReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.faqs).toEqual([]);
    expect(reduced.steps).toEqual([]);
    expect(reduced.header).toEqual('');
    expect(reduced.meta).toEqual({
      name: '',
      description: '',
      imageUrl: '',
      title: ''
    });
    expect(reduced.error).toEqual(mockError);
  });
});
