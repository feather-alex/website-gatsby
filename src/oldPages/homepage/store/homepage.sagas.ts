import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";

import { contentfulClient } from "../../../contentful/contentful";
import { HomepageContentRequestPayload } from "./homepage.types";
import { getHomepageContent } from "./homepage.actions";
import { formatHomepageContentResponse } from "./homepage.service";

export function* getHomepage(
  action: PayloadAction<HomepageContentRequestPayload>
): SagaIterator {
  try {
    const response = yield call(contentfulClient.getEntries, {
      content_type: "homepageV2",
      include: 2,
      "sys.id": action.payload.id,
    });

    yield put(
      getHomepageContent.success(formatHomepageContentResponse(response))
    );
  } catch (error) {
    yield put(getHomepageContent.failure(error));
  }
}

export default function* contentfulHomepagesWatcher(): SagaIterator {
  yield takeLatest(getHomepageContent.request, getHomepage);
}
