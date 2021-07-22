import {
  HowItWorksSuccessPayload,
  HowItWorksPageContent,
} from "./howItWorks.types";
import {
  parseFAQCategory,
  parseHowItWorksSteps,
} from "../../../contentful/contentful.parsers";

export const formatHowItWorksContentResponse = (
  content: HowItWorksPageContent
): HowItWorksSuccessPayload => {
  const { fields } = content.items[0];

  return {
    header: fields.header,
    faqs: parseFAQCategory(fields.faqCategory),
    meta: fields.meta.fields,
    steps: parseHowItWorksSteps(fields.steps),
  };
};
