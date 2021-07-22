import { PayloadAction } from "@reduxjs/toolkit";
import { getContentfulPages } from "./pages.actions";
import { mockError, mockSuccessPayload } from "./pages.fixtures";
import { ContentfulPagesSuccessPayload } from "./pages.types";

describe("Contentful Pages - Actions", () => {
  it("Should handle action: CONTENTFUL_PAGES_REQUEST", () => {
    const expectedAction = {
      type: getContentfulPages.request.type,
    };

    expect(getContentfulPages.request()).toEqual(expectedAction);
  });

  it("Should handle action: CONTENTFUL_PAGES_SUCCESS", () => {
    const expectedAction: PayloadAction<ContentfulPagesSuccessPayload> = {
      type: getContentfulPages.success.type,
      payload: mockSuccessPayload,
    };

    expect(getContentfulPages.success(mockSuccessPayload)).toEqual(
      expectedAction
    );
  });

  it("Should handle action: CONTENTFUL_PAGES_FAILURE", () => {
    const expectedAction = {
      type: getContentfulPages.failure.type,
      payload: mockError,
    };

    expect(getContentfulPages.failure(mockError)).toEqual(expectedAction);
  });
});
