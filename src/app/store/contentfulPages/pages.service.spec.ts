import { mockContentfulResponse, mockSuccessPayload } from "./pages.fixtures";
import { formatContentfulPagesResponse } from "./pages.service";

describe("Convert Contentful Page Response into pages state data", () => {
  it("should return pages state data", () => {
    expect(formatContentfulPagesResponse(mockContentfulResponse)).toEqual(
      mockSuccessPayload
    );
  });
});
