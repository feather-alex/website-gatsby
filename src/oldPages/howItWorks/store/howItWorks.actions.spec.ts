import { PayloadAction } from '@reduxjs/toolkit';

import { mockRequestPayload, mockSuccessPayload, mockError } from './howItWorks.fixtures';
import { HowItWorksRequestPayload, HowItWorksSuccessPayload } from './howItWorks.types';
import { APIError } from '../../../types/ReduxState';
import { getHowItWorksContent } from './howItWorks.actions';

describe('FAQs - Actions', () => {
  it('Should handle action: HOW_IT_WORKS_CONTENT_REQUEST', () => {
    const expectedAction: PayloadAction<HowItWorksRequestPayload> = {
      type: getHowItWorksContent.request.type,
      payload: mockRequestPayload
    };

    const actionAction = getHowItWorksContent.request(mockRequestPayload);

    expect(actionAction).toEqual(expectedAction);
  });

  it('Should handle action: HOW_IT_WORKS_CONTENT_SUCCESS', () => {
    const expectedAction: PayloadAction<HowItWorksSuccessPayload> = {
      type: getHowItWorksContent.success.type,
      payload: mockSuccessPayload
    };

    const actionAction = getHowItWorksContent.success(mockSuccessPayload);

    expect(actionAction).toEqual(expectedAction);
  });

  it('Should handle action: HOW_IT_WORKS_CONTENT_FAILURE', () => {
    const expectedAction: PayloadAction<APIError> = {
      type: getHowItWorksContent.failure.type,
      payload: mockError
    };

    const actualAction = getHowItWorksContent.failure(mockError);

    expect(actualAction).toEqual(expectedAction);
  });
});
