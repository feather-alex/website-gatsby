import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";

import { contentfulClient } from "../../../contentful/contentful";
import { EnterpriseRequestPayload } from "./enterprise.types";
import { getEnterpriseContent } from "./enterprise.actions";
import { formatEnterpriseContentResponse } from "./enterprise.service";

export function* getEnterprise(
  action: PayloadAction<EnterpriseRequestPayload>
): SagaIterator {
  try {
    const response = yield call(contentfulClient.getEntries, {
      content_type: "featherForBusinessPage",
      include: 2,
      "sys.id": action.payload.id,
    });
    yield put(
      getEnterpriseContent.success(formatEnterpriseContentResponse(response))
    );
  } catch (error) {
    yield put(getEnterpriseContent.failure(error));
  }
}

export default function* contentfulEnterpriseWatcher(): SagaIterator {
  yield takeLatest(getEnterpriseContent.request, getEnterprise);
}
