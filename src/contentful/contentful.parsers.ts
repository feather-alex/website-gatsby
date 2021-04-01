import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Asset } from 'contentful';

import {
  ButtonContentful,
  Button,
  ImageAndTextContentful,
  FurnitureFeature,
  FurnitureFeatureContentful,
  HeaderAndButtonSectionContentful,
  HeaderAndButtonSection,
  TitledTripleVerticalLockupContentful,
  TitledTripleVerticalLockup,
  ImageAndText,
  FAQContentful,
  FAQ,
  FAQCategoryContentful,
  FAQCategory,
  HomepageHero,
  HomepageHeroContentful,
  HowItWorksStepContentful,
  HowItWorksStep,
  FeatherPerksCardContentful,
  FeatherPerksCard,
  BulletPointContentful,
  BulletPoint,
  PointsBreakdownContentful,
  PointsBreakdown,
  HeaderParagraphButtonSectionContentful,
  HeaderParagraphButtonSection,
  Pages,
  PageContent,
  ContentfulImage,
  ShopByRoomContentful,
  ShopByRoom,
  RoomContentful,
  Room,
  ReviewsFeatureContentful,
  ReviewsFeature,
  ReviewContentful,
  Review
} from './contentful.types';

export const parseFAQs = (data: FAQContentful[]): FAQ[] =>
  data.reduce((faqs: FAQ[], contentfulFAQ: FAQContentful): FAQ[] => {
    if (contentfulFAQ.fields.question && contentfulFAQ.fields.answer) {
      return [
        ...faqs,
        {
          ...contentfulFAQ.fields,
          answer: documentToHtmlString(contentfulFAQ.fields.answer)
        }
      ];
    }
    return [...faqs];
  }, []);

export const parseButton = (data: ButtonContentful): Button => ({
  ...data.fields
});

export const parseFAQCategories = (faqCategories: FAQCategoryContentful[]) =>
  faqCategories.reduce((categories: FAQCategory[], contentfulCategory: FAQCategoryContentful): FAQCategory[] => {
    if (contentfulCategory.fields.name && contentfulCategory.fields.faqs) {
      return [
        ...categories,
        {
          ...contentfulCategory.fields,
          faqs: parseFAQs(contentfulCategory.fields.faqs)
        }
      ];
    }
    return [...categories];
  }, []);

export const parseFAQCategory = (faqCategory: FAQCategoryContentful) => parseFAQs(faqCategory.fields.faqs);

export const parseImageAndText = (data: ImageAndTextContentful): ImageAndText => ({
  ...data.fields,
  cta: data.fields.cta ? parseButton(data.fields.cta) : undefined,
  paragraph: data.fields.paragraph ? documentToHtmlString(data.fields.paragraph) : undefined
});

export const parseFurnitureFeature = (data: FurnitureFeatureContentful): FurnitureFeature => ({
  ...data.fields
});

export const parseHeaderAndButtonSection = (data: HeaderAndButtonSectionContentful): HeaderAndButtonSection => ({
  ...data.fields,
  ctaButton: parseButton(data.fields.ctaButton)
});

export const parseTitledTripleVerticalLockup = (
  data: TitledTripleVerticalLockupContentful
): TitledTripleVerticalLockup => ({
  ...data.fields,
  imageLockups: data.fields.imageLockups.map(parseImageAndText)
});

export const parseImage = (data: Asset): ContentfulImage => ({
  ...data.fields.file
});

export const parseHomepageHero = (data: HomepageHeroContentful): HomepageHero => ({
  ...data.fields,
  desktopImage: parseImage(data.fields.desktopImage),
  mobileImage: data.fields.mobileImage && parseImage(data.fields.mobileImage),
  cta: data.fields.cta.map((button) => parseButton(button))
});

export const parseRoom = (data: RoomContentful): Room => ({
  ...data.fields,
  image: parseImage(data.fields.image)
});

export const parseShopByRoom = (data: ShopByRoomContentful): ShopByRoom => ({
  ...data.fields,
  rooms: data.fields.rooms.map((room) => parseRoom(room))
});

export const parseReview = (data: ReviewContentful): Review => ({
  ...data.fields
});

export const parseReviewsFeature = (data: ReviewsFeatureContentful): ReviewsFeature => ({
  ...data.fields,
  reviews: data.fields.reviews.map((review) => parseReview(review))
});

export const parseHowItWorksSteps = (data: HowItWorksStepContentful[]): HowItWorksStep[] =>
  data.sort((a, b) => a.fields.order - b.fields.order).map((step) => ({ ...step.fields }));

export const parseFeatherPerks = (data: FeatherPerksCardContentful[]): FeatherPerksCard[] =>
  data.map((perk) => ({
    ...perk.fields,
    caption: perk.fields.caption && documentToHtmlString(perk.fields.caption)
  }));

export const parseBulletPoint = (data: BulletPointContentful): BulletPoint => ({ ...data.fields });

export const parsePointsBreakdown = (data: PointsBreakdownContentful): PointsBreakdown => ({
  ...data.fields,
  bulletPoints: data.fields.bulletPoints.map(parseBulletPoint),
  button: parseButton(data.fields.button)
});

export const parseHeaderParagraphButtonSection = (
  data: HeaderParagraphButtonSectionContentful
): HeaderParagraphButtonSection => ({
  ...data.fields,
  paragraph: data.fields.paragraph && documentToHtmlString(data.fields.paragraph),
  button: data.fields.button && parseButton(data.fields.button)
});

export const parseContentfulPages = (data: PageContent[]): Pages[] =>
  data.reduce((pages: Pages[], contentfulPage: PageContent): Pages[] => {
    const { title, slug, template, pageId } = contentfulPage.fields;
    return title && slug && template && pageId
      ? [
          ...pages,
          {
            title,
            slug,
            template,
            pageId: pageId.sys.id
          }
        ]
      : pages;
  }, []);
