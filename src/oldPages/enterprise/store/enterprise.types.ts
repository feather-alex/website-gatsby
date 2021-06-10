import { EntryCollection } from 'contentful';
import {
  FurnitureFeature,
  HeaderAndButtonSection,
  TitledTripleVerticalLockup,
  ImageAndTextContentful,
  FurnitureFeatureContentful,
  HeaderAndButtonSectionContentful,
  TitledTripleVerticalLockupContentful,
  ImageAndText,
  MetaContentful,
  FAQCategoryContentful,
  FAQ,
  Meta
} from '../../../contentful/contentful.types';
import { APIError } from '../../../api/error';

export interface EnterpriseRequestPayload {
  id: string;
}

export interface EnterpriseContentState {
  error: APIError | null;
  isFetching: boolean;
  faqs?: FAQ[];
  heroLockup?: ImageAndText | null;
  horizontalLockup?: ImageAndText | null;
  horizontalLockup2?: ImageAndText | null;
  productShowcase?: FurnitureFeature | null;
  titleButtonLockup?: HeaderAndButtonSection | null;
  titledTripleVerticalImageLockup?: TitledTripleVerticalLockup | null;
  meta: Meta | null;
}

export type EnterprisePageContent = EntryCollection<{
  faqs: FAQCategoryContentful;
  heroLockup: ImageAndTextContentful;
  horizontalLockup: ImageAndTextContentful;
  horizontalLockup2: ImageAndTextContentful;
  productShowcase: FurnitureFeatureContentful;
  titleButtonLockup: HeaderAndButtonSectionContentful;
  titledTripleVerticalImageLockup: TitledTripleVerticalLockupContentful;
  meta: MetaContentful;
}>;

export interface EnterpriseSuccessPayload {
  faqs: FAQ[];
  heroLockup: ImageAndText;
  horizontalLockup: ImageAndText;
  horizontalLockup2: ImageAndText;
  productShowcase: FurnitureFeature;
  titleButtonLockup: HeaderAndButtonSection;
  titledTripleVerticalImageLockup: TitledTripleVerticalLockup;
  meta: Meta;
}
