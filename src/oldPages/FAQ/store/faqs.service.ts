import { FaqContentSuccessPayload, FAQPageContent } from './faqs.types';
import { parseFAQCategories } from '../../../contentful/contentful.parsers';

export const formatFAQContentResponse = (content: FAQPageContent): FaqContentSuccessPayload => {
  const { fields } = content.items[0];

  return {
    meta: fields.meta.fields,
    faqCategories: parseFAQCategories(fields.faqCategories)
  };
};
