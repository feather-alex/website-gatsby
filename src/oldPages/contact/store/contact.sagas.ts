import Request, { RequestMethod } from '../../../api/request';
import { takeLeading, put, call } from 'redux-saga/effects';
import { FluxStandardAction } from '../../../types/FluxStandardActions';
import { ContactRequest } from './contact.types';
import { SagaIterator } from 'redux-saga';
import * as actions from './contact.actions';
import { reset } from 'redux-form';

import Analytics from '../../../analytics/analytics';
import { CONTACT } from '../../../analytics/contact/events';
import {
  sendContactFormMessagePayloadMapping,
  sendContactFormIdentifyPayloadMapping
} from '../../../analytics/contact/payload-mappings';

export function* handleInquiryRequest(action: FluxStandardAction): SagaIterator {
  try {
    const requestData: ContactRequest = {
      name: action.payload.fullName,
      email: action.payload.emailAddress,
      company: action.payload.companyName,
      message: action.payload.messageBody,
      reasonForInquiry: action.payload.reasonForInquiry
    };

    // Make API call.
    yield call([Request, 'send'], RequestMethod.POST, '/inquiry', undefined, requestData, true);

    // Handle successful inquiry request.
    yield put(actions.sendInquirySuccess());

    // Reset form on successful submission.
    yield put(reset('contact'));

    Analytics.trackEvent(
      CONTACT.MESSAGE,
      sendContactFormMessagePayloadMapping({
        name: action.payload.fullName,
        email: action.payload.emailAddress,
        company: action.payload.companyName,
        reasonForInquiry: action.payload.reasonForInquiry
      })
    );

    Analytics.trackUser({
      properties: sendContactFormIdentifyPayloadMapping({
        name: action.payload.fullName,
        email: action.payload.emailAddress,
        company: action.payload.companyName
      })
    });
  } catch (error) {
    // Handle failed inquiry request.
    yield put(actions.sendInquiryFailure(error));
  }
}

export default function* contactWatcher(): SagaIterator {
  // takeLeading blocks all successive calls until the spawned saga completes its task.
  yield takeLeading(actions.SEND_INQUIRY_REQUEST, handleInquiryRequest);
}
