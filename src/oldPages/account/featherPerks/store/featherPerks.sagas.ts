import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";

import { contentfulClient } from "../../../../contentful/contentful";
import { FeatherPerksRequestPayload } from "./featherPerks.types";
import { getFeatherPerksContent } from "./featherPerks.actions";
import { formatFeatherPerksContentResponse } from "./featherPerks.service";

export function* getFeatherPerks(
  action: PayloadAction<FeatherPerksRequestPayload>
): SagaIterator {
  try {
    const response = yield call(contentfulClient.getEntries, {
      content_type: "featherPerks",
      include: 2,
      "sys.id": action.payload.id,
    });

    yield put(
      getFeatherPerksContent.success(
        formatFeatherPerksContentResponse(response)
      )
    );
  } catch (error) {
    yield put(getFeatherPerksContent.failure(error));
  }
}

export default function* featherPerksWatcher(): SagaIterator {
  yield takeLatest(getFeatherPerksContent.request, getFeatherPerks);
}
