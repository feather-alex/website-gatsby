import { put, call, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { getContentfulPages } from "./pages.actions";
import { contentfulClient } from "../../../contentful/contentful";
import { formatContentfulPagesResponse } from "./pages.service";

export function* getPages(): SagaIterator {
  try {
    const response = yield call(contentfulClient.getEntries, {
      content_type: "page",
      include: 0,
    });
    yield put(
      getContentfulPages.success(formatContentfulPagesResponse(response))
    );
  } catch (error) {
    yield put(getContentfulPages.failure(error));
  }
}

export default function* contentfulPagesWatcher(): SagaIterator {
  yield takeLatest(getContentfulPages.request, getPages);
}
