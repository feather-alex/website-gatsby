import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';

import { mockContentfulResponse, mockRequestPayload, mockSuccessPayload, mockError } from './enterprise.fixtures';
import { contentfulClient } from '../../../contentful/contentful';
import { getEnterpriseContent } from './enterprise.actions';
import { getEnterprise } from './enterprise.sagas';

describe('getEnterprise', () => {
  const action = getEnterpriseContent.request(mockRequestPayload);

  it('should handle successfully fetching Enterprise content.', () => {
    return expectSaga(getEnterprise, action)
      .provide([
        [
          matchers.call(contentfulClient.getEntries, {
            content_type: 'featherForBusinessPage',
            include: 2,
            'sys.id': action.payload.id
          }),
          mockContentfulResponse
        ]
      ])
      .put(getEnterpriseContent.success(mockSuccessPayload))
      .run();
  });

  it('should handle unsuccessfully fetching Enterprise content.', () => {
    return expectSaga(getEnterprise, action)
      .provide([
        [
          matchers.call(contentfulClient.getEntries, {
            content_type: 'featherForBusinessPage',
            include: 2,
            'sys.id': action.payload.id
          }),
          Promise.reject(mockError)
        ]
      ])
      .put(getEnterpriseContent.failure(mockError))
      .run();
  });
});
