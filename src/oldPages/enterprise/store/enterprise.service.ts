import {
  EnterprisePageContent,
  EnterpriseSuccessPayload,
} from "./enterprise.types";
import {
  parseFurnitureFeature,
  parseHeaderAndButtonSection,
  parseTitledTripleVerticalLockup,
  parseFAQCategory,
  parseImageAndText,
} from "../../../contentful/contentful.parsers";

export function formatEnterpriseContentResponse(
  content: EnterprisePageContent
): EnterpriseSuccessPayload {
  const { fields } = content.items[0];
  return {
    meta: fields.meta.fields,
    faqs: fields.faqs && parseFAQCategory(fields.faqs),
    heroLockup: fields.heroLockup && parseImageAndText(fields.heroLockup),
    horizontalLockup:
      fields.horizontalLockup && parseImageAndText(fields.horizontalLockup),
    horizontalLockup2:
      fields.horizontalLockup2 && parseImageAndText(fields.horizontalLockup2),
    productShowcase:
      fields.productShowcase && parseFurnitureFeature(fields.productShowcase),
    titleButtonLockup:
      fields.titleButtonLockup &&
      parseHeaderAndButtonSection(fields.titleButtonLockup),
    titledTripleVerticalImageLockup:
      fields.titledTripleVerticalImageLockup &&
      parseTitledTripleVerticalLockup(fields.titledTripleVerticalImageLockup),
  };
}
