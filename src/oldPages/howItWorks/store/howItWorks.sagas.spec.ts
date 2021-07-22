import * as matchers from "redux-saga-test-plan/matchers";
import { expectSaga } from "redux-saga-test-plan";

import {
  mockContentfulResponse,
  mockRequestPayload,
  mockSuccessPayload,
  mockError,
} from "./howItWorks.fixtures";
import { contentfulClient } from "../../../contentful/contentful";
import { getHowItWorksContent } from "./howItWorks.actions";
import { getHowItWorks } from "./howItWorks.sagas";

describe("getFaqs", () => {
  const action = getHowItWorksContent.request(mockRequestPayload);

  it("should handle successfully fetching How It Works content.", () => {
    return expectSaga(getHowItWorks, action)
      .provide([
        [
          matchers.call(contentfulClient.getEntries, {
            content_type: "howItWorksPage",
            include: 2,
            "sys.id": action.payload.id,
          }),
          mockContentfulResponse,
        ],
      ])
      .put(getHowItWorksContent.success(mockSuccessPayload))
      .run();
  });

  it("should handle unsuccessfully fetching How It Works content.", () => {
    return expectSaga(getHowItWorks, action)
      .provide([
        [
          matchers.call(contentfulClient.getEntries, {
            content_type: "howItWorksPage",
            include: 2,
            "sys.id": action.payload.id,
          }),
          Promise.reject(mockError),
        ],
      ])
      .put(getHowItWorksContent.failure(mockError))
      .run();
  });
});
