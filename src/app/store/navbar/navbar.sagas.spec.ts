import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { handleDismissNavbarBanner, getMobileNavContent } from './navbar.sagas';
import { resetNavbarBanner, getMobileNavContent as getMobileNavContentAction } from './navbar.actions';
import { mockRequestPayload, mockContentfulResponse, mockSuccessPayload, mockError } from './navbar.fixtures';
import { contentfulClient } from '../../../contentful/contentful';

describe('Navbar Sagas', () => {
  it('should handle the dismiss navbar banner action and dispatch the reset action after a delay', () => {
    return expectSaga(handleDismissNavbarBanner).put(resetNavbarBanner()).run(410); // force saga to run 10ms longer than the delay before resetNavbarBanner
  });

  describe('Navbar Content', () => {
    const action = getMobileNavContentAction.request(mockRequestPayload);

    it('should handle successfully fetching the Mobile Nav content', () => {
      return expectSaga(getMobileNavContent, action)
        .provide([
          [
            matchers.call(contentfulClient.getEntries, {
              content_type: 'mobileNavigation',
              include: 10,
              'sys.id': action.payload.id
            }),
            mockContentfulResponse
          ]
        ])
        .put(getMobileNavContentAction.success(mockSuccessPayload))
        .run();
    });

    it('should handle unsuccessfully fetching the Mobile Nav content', () => {
      return expectSaga(getMobileNavContent, action)
        .provide([
          [
            matchers.call(contentfulClient.getEntries, {
              content_type: 'mobileNavigation',
              include: 10,
              'sys.id': action.payload.id
            }),
            Promise.reject(mockError)
          ]
        ])
        .put(getMobileNavContentAction.failure(mockError))
        .run();
    });
  });
});
