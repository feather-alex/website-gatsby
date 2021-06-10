import { takeLatest, put, delay, call } from 'redux-saga/effects';
import {
  resetNavbarBanner,
  getMobileNavContent as getMobileNavContentAction,
  dismissNavbarBanner
} from './navbar.actions';
import { SagaIterator } from 'redux-saga';
import { FluxStandardAction } from '../../../types/FluxStandardActions';
import { contentfulClient } from '../../../contentful/contentful';
import { formatMobileNavContentResponse } from './navbar.service';

export function* handleDismissNavbarBanner() {
  yield delay(400);
  yield put(resetNavbarBanner());
}

export function* getMobileNavContent(action: FluxStandardAction): SagaIterator {
  try {
    const response = yield call(contentfulClient.getEntries, {
      content_type: 'mobileNavigation',
      include: 10,
      'sys.id': action.payload.id
    });

    yield put(getMobileNavContentAction.success(formatMobileNavContentResponse(response)));
  } catch (error) {
    yield put(getMobileNavContentAction.failure(error));
  }
}

export default function* navbarBannerWatcher() {
  yield takeLatest(dismissNavbarBanner, handleDismissNavbarBanner);
  yield takeLatest(getMobileNavContentAction.request, getMobileNavContent);
}
