import * as matchers from "redux-saga-test-plan/matchers";
import { expectSaga } from "redux-saga-test-plan";

import {
  mockContentfulResponse,
  mockRequestPayload,
  mockSuccessPayload,
  mockError,
} from "./homepage.fixtures";
import { contentfulClient } from "../../../contentful/contentful";
import { getHomepageContent } from "./homepage.actions";
import { getHomepage } from "./homepage.sagas";

describe("getHomepage", () => {
  const action = getHomepageContent.request(mockRequestPayload);

  it("should handle successfully fetching the Homepage content.", () => {
    return expectSaga(getHomepage, action)
      .provide([
        [
          matchers.call(contentfulClient.getEntries, {
            content_type: "homepageV2",
            include: 2,
            "sys.id": action.payload.id,
          }),
          mockContentfulResponse,
        ],
      ])
      .put(getHomepageContent.success(mockSuccessPayload))
      .run();
  });

  it("should handle unsuccessfully fetching the Homepage content.", () => {
    return expectSaga(getHomepage, action)
      .provide([
        [
          matchers.call(contentfulClient.getEntries, {
            content_type: "homepageV2",
            include: 2,
            "sys.id": action.payload.id,
          }),
          Promise.reject(mockError),
        ],
      ])
      .put(getHomepageContent.failure(mockError))
      .run();
  });
});
