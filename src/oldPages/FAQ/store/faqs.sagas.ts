import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';

import { contentfulClient } from '../../../contentful/contentful';
import { formatFAQContentResponse } from './faqs.service';
import { FaqContentRequestPayload } from './faqs.types';
import { getFaqContent } from './faqs.actions';

export function* getFaqs(action: PayloadAction<FaqContentRequestPayload>): SagaIterator {
  try {
    const response = yield call(contentfulClient.getEntries, {
      content_type: 'faqPage',
      include: 2,
      'sys.id': action.payload.id
    });

    yield put(getFaqContent.success(formatFAQContentResponse(response)));
  } catch (error) {
    yield put(getFaqContent.failure(error));
  }
}

export default function* faqsWatcher(): SagaIterator {
  yield takeLatest(getFaqContent.request, getFaqs);
}
