import { SagaIterator } from "redux-saga";
import { takeLatest, put, call } from "redux-saga/effects";
import Analytics from "../../../analytics/analytics";
import { NEWSLETTER } from "../../../analytics/newsletter/events";
import {
  signupPayloadMapping,
  trackEmailUserPayloadMapping,
} from "../../../analytics/newsletter/payload-mappings";
import Request, { RequestMethod } from "../../../api/request";
import * as actions from "./newsletter.signup.actions";
import { FluxStandardAction } from "../../../types/FluxStandardActions";
import { NewsletterInputOrigin } from "./newsletter.signup.types";
import { dismissNavbarBanner } from "../navbar/navbar.actions";

export function* handleNewsletterSignup(
  action: FluxStandardAction
): SagaIterator {
  try {
    const email = action.payload.requestData.email;
    const origin = action.payload.requestData.origin;

    yield call(
      [Request, "send"],
      RequestMethod.POST,
      "/signup",
      undefined,
      { email },
      true
    );
    yield put(actions.newsletterSignupSuccess());

    // Handle banner transition when entering email after outside of zone zip code
    if (origin === NewsletterInputOrigin.NAVBAR) {
      yield put(dismissNavbarBanner());
    }

    yield call(
      Analytics.trackEvent,
      NEWSLETTER.SIGNUP,
      signupPayloadMapping({ email, origin })
    );
    yield call(Analytics.trackUser, {
      properties: trackEmailUserPayloadMapping({ email }),
    });
  } catch (error) {
    yield put(actions.newsletterSignupFailure(error));
  }
}

export default function* newsletterWatcher(): SagaIterator {
  yield takeLatest(actions.NEWSLETTER_SIGNUP_REQUEST, handleNewsletterSignup);
}
