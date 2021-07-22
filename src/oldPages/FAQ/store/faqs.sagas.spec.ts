import * as matchers from "redux-saga-test-plan/matchers";
import { expectSaga } from "redux-saga-test-plan";

import {
  mockContentfulResponse,
  mockRequestPayload,
  mockSuccessPayload,
  mockError,
} from "./faqs.fixtures";
import { contentfulClient } from "../../../contentful/contentful";
import { getFaqContent } from "./faqs.actions";
import { getFaqs } from "./faqs.sagas";

describe("getFaqs", () => {
  const action = getFaqContent.request(mockRequestPayload);

  it("should handle successfully fetching FAQ content.", () => {
    return expectSaga(getFaqs, action)
      .provide([
        [
          matchers.call(contentfulClient.getEntries, {
            content_type: "faqPage",
            include: 2,
            "sys.id": action.payload.id,
          }),
          mockContentfulResponse,
        ],
      ])
      .put(getFaqContent.success(mockSuccessPayload))
      .run();
  });

  it("should handle unsuccessfully fetching FAQ content.", () => {
    return expectSaga(getFaqs, action)
      .provide([
        [
          matchers.call(contentfulClient.getEntries, {
            content_type: "faqPage",
            include: 2,
            "sys.id": action.payload.id,
          }),
          Promise.reject(mockError),
        ],
      ])
      .put(getFaqContent.failure(mockError))
      .run();
  });
});
