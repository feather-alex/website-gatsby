import * as matchers from "redux-saga-test-plan/matchers";
import { expectSaga } from "redux-saga-test-plan";

import { contentfulClient } from "../../../contentful/contentful";
import { getContentfulPages } from "./pages.actions";
import { getPages } from "./pages.sagas";
import {
  mockContentfulResponse,
  mockError,
  mockSuccessPayload,
} from "./pages.fixtures";

describe("getPages", () => {
  it("should handle successfully fetching Contentful Pages.", () => {
    return expectSaga(getPages)
      .provide([
        [
          matchers.call(contentfulClient.getEntries, {
            content_type: "page",
            include: 0,
          }),
          mockContentfulResponse,
        ],
      ])
      .put(getContentfulPages.success(mockSuccessPayload))
      .run();
  });

  it("should handle unsuccessfully fetching Contentful Pages.", () => {
    return expectSaga(getPages)
      .provide([
        [
          matchers.call(contentfulClient.getEntries, {
            content_type: "page",
            include: 0,
          }),
          Promise.reject(mockError),
        ],
      ])
      .put(getContentfulPages.failure(mockError))
      .run();
  });
});
