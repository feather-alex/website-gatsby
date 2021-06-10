import { PayloadAction } from '@reduxjs/toolkit';

import { mockRequestPayload, mockSuccessPayload, mockError } from './homepage.fixtures';
import { APIError } from '../../../types/ReduxState';
import { HomepageContentRequestPayload, HomepageContentSuccessPayload } from './homepage.types';
import { getHomepageContent } from './homepage.actions';

describe('Homepage - Actions', () => {
  it('Should handle action: GET_HOMEPAGE_REQUEST', () => {
    const expectedAction: PayloadAction<HomepageContentRequestPayload> = {
      type: getHomepageContent.request.type,
      payload: mockRequestPayload
    };

    const actionAction = getHomepageContent.request(mockRequestPayload);

    expect(actionAction).toEqual(expectedAction);
  });

  it('Should handle action: GET_HOMEPAGE_SUCCESS', () => {
    const expectedAction: PayloadAction<HomepageContentSuccessPayload> = {
      type: getHomepageContent.success.type,
      payload: mockSuccessPayload
    };

    const actionAction = getHomepageContent.success(mockSuccessPayload);

    expect(actionAction).toEqual(expectedAction);
  });

  it('Should handle action: GET_HOMEPAGE_FAILURE', () => {
    const expectedAction: PayloadAction<APIError> = {
      type: getHomepageContent.failure.type,
      payload: mockError
    };

    const actualAction = getHomepageContent.failure(mockError);

    expect(actualAction).toEqual(expectedAction);
  });
});
