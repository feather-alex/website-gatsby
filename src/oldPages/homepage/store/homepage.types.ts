import { EntryCollection } from "contentful";

import {
  Meta,
  MetaContentful,
  ImageAndText,
  ImageAndTextContentful,
  TextLockup,
  TextLockupContentful,
  HomepageHero,
  HomepageHeroContentful,
  FurnitureFeature,
  FurnitureFeatureContentful,
  ShopByRoom,
  ShopByRoomContentful,
  ReviewsFeature,
  ReviewsFeatureContentful,
} from "../../../contentful/contentful.types";
import { APIError } from "../../../types/ReduxState";

export interface HomepageContentRequestPayload {
  id: string;
}

export type HomepageContent = EntryCollection<{
  meta: MetaContentful;
  hero: HomepageHeroContentful;
  homepageSections: ImageAndTextContentful[];
  textLockup: TextLockupContentful;
  bestSellers: FurnitureFeatureContentful;
  shopByRoom: ShopByRoomContentful;
  reviews: ReviewsFeatureContentful;
}>;

export interface HomepageContentSuccessPayload {
  meta: Meta;
  hero: HomepageHero;
  homepageSections: ImageAndText[];
  textLockup: TextLockup;
  bestSellers: FurnitureFeature;
  shopByRoom: ShopByRoom;
  reviews: ReviewsFeature;
}

export interface HomepageContentState {
  error: APIError | null;
  isFetching: boolean;
  meta: Meta | null;
  hero: HomepageHero | null;
  sections: ImageAndText[] | null;
  textLockup: TextLockup | null;
  bestSellers: FurnitureFeature | null;
  shopByRoom: ShopByRoom | null;
  reviews: ReviewsFeature | null;
}
