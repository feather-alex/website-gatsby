import { HomepageContent, HomepageContentSuccessPayload } from './homepage.types';
import {
  parseImageAndText,
  parseHomepageHero,
  parseReviewsFeature,
  parseShopByRoom
} from '../../../contentful/contentful.parsers';

export function formatHomepageContentResponse(content: HomepageContent): HomepageContentSuccessPayload {
  const { fields } = content.items[0];

  return {
    meta: fields.meta.fields,
    hero: parseHomepageHero(fields.hero),
    homepageSections: fields.homepageSections.map((section) => parseImageAndText(section)),
    bestSellers: fields.bestSellers.fields,
    textLockup: fields.textLockup.fields,
    shopByRoom: parseShopByRoom(fields.shopByRoom),
    reviews: parseReviewsFeature(fields.reviews)
  };
}
