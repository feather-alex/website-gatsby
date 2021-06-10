import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';

import { mockContentfulResponse, mockRequestPayload, mockSuccessPayload, mockError } from './featherPerks.fixtures';
import { contentfulClient } from '../../../../contentful/contentful';
import { getFeatherPerksContent } from './featherPerks.actions';
import { getFeatherPerks } from './featherPerks.sagas';

describe('getFeatherPerks', () => {
  const action = getFeatherPerksContent.request(mockRequestPayload);

  it('should handle successfully fetching the FeatherPerks content.', () => {
    return expectSaga(getFeatherPerks, action)
      .provide([
        [
          matchers.call(contentfulClient.getEntries, {
            content_type: 'featherPerks',
            include: 2,
            'sys.id': action.payload.id
          }),
          mockContentfulResponse
        ]
      ])
      .put(getFeatherPerksContent.success(mockSuccessPayload))
      .run();
  });

  it('should handle unsuccessfully fetching the FeatherPerks content.', () => {
    return expectSaga(getFeatherPerks, action)
      .provide([
        [
          matchers.call(contentfulClient.getEntries, {
            content_type: 'featherPerks',
            include: 2,
            'sys.id': action.payload.id
          }),
          Promise.reject(mockError)
        ]
      ])
      .put(getFeatherPerksContent.failure(mockError))
      .run();
  });
});
