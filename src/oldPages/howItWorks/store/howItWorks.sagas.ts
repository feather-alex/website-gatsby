import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';

import { getHowItWorksContent } from './howItWorks.actions';
import { contentfulClient } from '../../../contentful/contentful';
import { HowItWorksRequestPayload } from './howItWorks.types';
import { formatHowItWorksContentResponse } from './howItWorks.service';

export function* getHowItWorks(action: PayloadAction<HowItWorksRequestPayload>): SagaIterator {
  try {
    const response = yield call(contentfulClient.getEntries, {
      content_type: 'howItWorksPage',
      include: 2,
      'sys.id': action.payload.id
    });
    yield put(getHowItWorksContent.success(formatHowItWorksContentResponse(response)));
  } catch (error) {
    yield put(getHowItWorksContent.failure(error));
  }
}

export default function* howItWorksWatcher(): SagaIterator {
  yield takeLatest(getHowItWorksContent.request, getHowItWorks);
}
