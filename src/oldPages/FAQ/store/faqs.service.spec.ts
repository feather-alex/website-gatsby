import { mockFormattedResponse, mockContentfulResponse } from "./faqs.fixtures";
import { formatFAQContentResponse } from "./faqs.service";

describe("FAQ Page Services", () => {
  describe("Convert an FAQ Page content from Contentful in to FAQ Page state data", () => {
    it("should return FAQs and meta information", () => {
      const faqContent = formatFAQContentResponse(mockContentfulResponse);
      expect(faqContent).toEqual(mockFormattedResponse);
    });
  });
});
