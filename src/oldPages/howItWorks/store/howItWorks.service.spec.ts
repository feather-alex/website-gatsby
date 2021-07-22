import {
  mockFormattedResponse,
  mockContentfulResponse,
} from "./howItWorks.fixtures";
import { formatHowItWorksContentResponse } from "./howItWorks.service";

describe("How It Works Page Services", () => {
  describe("Convert How It Works Page content from Contentful into expected redux form", () => {
    it("should return FAQs, meta, header, steps data", () => {
      const content = formatHowItWorksContentResponse(mockContentfulResponse);
      expect(content).toEqual(mockFormattedResponse);
    });
  });
});
