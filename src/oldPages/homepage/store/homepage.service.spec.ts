import { formatHomepageContentResponse } from "./homepage.service";
import {
  mockContentfulResponse,
  mockSuccessPayload,
} from "./homepage.fixtures";

describe("Homepage Services", () => {
  it("should format the Homepage Content from Contentful into Homepage state data", () => {
    const homepageContent = formatHomepageContentResponse(
      mockContentfulResponse
    );

    expect(homepageContent).toEqual(mockSuccessPayload);
  });
});
