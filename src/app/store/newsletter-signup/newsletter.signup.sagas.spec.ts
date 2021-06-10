import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { FluxStandardAction } from '../../../types/FluxStandardActions';
import Request, { RequestMethod } from '../../../api/request';
import { APIError } from '../../../types/ReduxState';
import { NewsletterSignupRequestResource, NewsletterInputOrigin } from './newsletter.signup.types';
import { newsletterSignupRequest, newsletterSignupSuccess, newsletterSignupFailure } from './newsletter.signup.actions';
import { handleNewsletterSignup } from './newsletter.signup.sagas';
import Analytics from '../../../analytics/analytics';
import { NEWSLETTER } from '../../../analytics/newsletter/events';
import { signupPayloadMapping, trackEmailUserPayloadMapping } from '../../../analytics/newsletter/payload-mappings';

import { noop } from '../../../utils/ui-helpers';
import { dismissNavbarBanner } from '../navbar/navbar.actions';

describe('Newsletter Signup - Sagas', () => {
  it('should handle successfully signing up for the newsletter', () => {
    const email = 'eng@mail.com';
    const origin = NewsletterInputOrigin.FOOTER;
    const requestData: NewsletterSignupRequestResource = {
      email,
      origin
    };

    const action: FluxStandardAction = newsletterSignupRequest(requestData);

    return expectSaga(handleNewsletterSignup, action)
      .provide([
        [matchers.call([Request, 'send'], RequestMethod.POST, '/signup', undefined, { email }, true), {}],
        [matchers.call(Analytics.trackEvent, NEWSLETTER.SIGNUP, signupPayloadMapping({ email, origin })), noop],
        [matchers.call(Analytics.trackUser, { properties: trackEmailUserPayloadMapping({ email }) }), noop]
      ])
      .put(newsletterSignupSuccess())
      .run();
  });

  it('should handle successfully signing up for the newsletter from the nav bar', () => {
    const email = 'eng@mail.com';
    const origin = NewsletterInputOrigin.NAVBAR;
    const requestData: NewsletterSignupRequestResource = {
      email,
      origin
    };

    const action: FluxStandardAction = newsletterSignupRequest(requestData);

    return expectSaga(handleNewsletterSignup, action)
      .provide([
        [matchers.call([Request, 'send'], RequestMethod.POST, '/signup', undefined, { email }, true), {}],
        [matchers.call(Analytics.trackEvent, NEWSLETTER.SIGNUP, signupPayloadMapping({ email, origin })), noop],
        [matchers.call(Analytics.trackUser, { properties: trackEmailUserPayloadMapping({ email }) }), noop]
      ])
      .put(newsletterSignupSuccess())
      .put(dismissNavbarBanner())
      .run(2500);
  });

  it('should handle unsuccessfully signing up for the newsletter', () => {
    const email = 'eng@mail.com';
    const requestData: NewsletterSignupRequestResource = {
      email,
      origin: NewsletterInputOrigin.NAVBAR
    };

    const error: APIError = {
      error: 'This is an error',
      message: 'Bad, very bad',
      status: 400
    };

    const action: FluxStandardAction = newsletterSignupRequest(requestData);

    return expectSaga(handleNewsletterSignup, action)
      .provide([
        [
          matchers.call([Request, 'send'], RequestMethod.POST, '/signup', undefined, { email }, true),
          Promise.reject(error)
        ]
      ])
      .put(newsletterSignupFailure(error))
      .run();
  });
});
