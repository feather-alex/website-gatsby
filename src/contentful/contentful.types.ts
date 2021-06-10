import { Document } from "@contentful/rich-text-types";
import { Asset, Entry, EntryCollection, RichTextDataTarget } from "contentful";
import { ButtonStyle } from "../ui/buttons/Button";

export enum CONTENTFUL_IDS {
  FAQ = "19cSV4WCOoeAjMuK1l6VXz",
  ENTERPRISE = "5QY5my2EsNfJLm4cw143Xm",
  HOMEPAGE = "3FyP8FtyLseV2muxDc09y3",
  HOW_IT_WORKS = "9ohjtovljXEnuHLISmG6j",
  ACCOUNTS_FAQ_MEMBER = "04wSWz9EFZFwsUtsbXNxg",
  ACCOUNTS_FAQ_NON_MEMBER = "3OKHd2w2atsmxfRkLKL0F8",
  ACCOUNTS_FAQ_LEGACY = "4QFHbBqxqAhPSlCVfKdN2p",
  FEATHER_PERKS = "1rmRh5ZKjkCaD6E6duckQn",
  MOBILE_NAV = "5ar575rgJ5UJBAls6Purf8",
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: string;
  faqs: FAQ[];
}

export type FAQContentful = Entry<{
  question: string;
  answer: Document;
}>;

export type FAQCategoryContentful = Entry<{
  name: string;
  faqs: FAQContentful[];
}>;

export interface Meta {
  description: string;
  imageUrl?: string;
  name: string;
  title: string;
}

export type MetaContentful = Entry<Meta>;

export enum UrlType {
  INTERNAL = "internal",
  EXTERNAL = "external",
  EMAIL = "email",
}

export interface Button {
  style?: ButtonStyle;
  label: string;
  url: string;
  urlType: UrlType;
}

export type ButtonContentful = Entry<Button>;

export interface ImageAndTextBase {
  header: string;
  imageUrl: string;
  imagePosition?: "left" | "right" | "above" | "below";
  isVertical: boolean;
}

export interface ImageAndText extends ImageAndTextBase {
  paragraph?: string;
  cta?: Button;
}

export type ImageAndTextContentful = Entry<
  ImageAndTextBase & { cta: ButtonContentful; paragraph: Document }
>;

export interface TextLockup {
  title: string;
  body: string;
}

export type TextLockupContentful = Entry<TextLockup>;

export interface Review {
  quote: string;
  name: string;
  city: string;
  state: string;
}

export type ReviewContentful = Entry<Review>;

export interface ReviewsFeatureBase {
  title: string;
}

export interface ReviewsFeature extends ReviewsFeatureBase {
  reviews: Review[];
}

export type ReviewsFeatureContentful = Entry<
  ReviewsFeatureBase & { reviews: ReviewContentful[] }
>;
export interface FurnitureFeature {
  title: string;
  furnitureIdentifiers: string[];
  variantIdentifiers?: string[];
}

export type FurnitureFeatureContentful = Entry<FurnitureFeature>;

export interface HeaderAndButtonSection {
  title: string;
  ctaButton: Button;
}

export type HeaderAndButtonSectionContentful = Entry<
  HeaderAndButtonSection & { ctaButton: ButtonContentful }
>;

export interface TitledTripleVerticalLockupBase {
  title: string;
}

export interface TitledTripleVerticalLockup
  extends TitledTripleVerticalLockupBase {
  imageLockups: ImageAndText[];
}

export type TitledTripleVerticalLockupContentful = Entry<
  TitledTripleVerticalLockupBase & { imageLockups: ImageAndTextContentful[] }
>;

export interface ContentfulImage {
  url: string;
  details: {
    size: number;
    image?: {
      width: number;
      height: number;
    };
  };
  fileName: string;
  contentType: string;
}

export interface HomepageHeroBase {
  header1: string;
  header2?: string;
  paragraph: string;
}

export interface HomepageHero extends HomepageHeroBase {
  cta: Button[];
  desktopImage: ContentfulImage;
  mobileImage?: ContentfulImage;
}

export type HomepageHeroContentful = Entry<
  HomepageHeroBase & {
    cta: ButtonContentful[];
    desktopImage: Asset;
    mobileImage: Asset;
  }
>;

export interface RoomBase {
  name: string;
  url: string;
}
export interface Room extends RoomBase {
  image: ContentfulImage;
}

export type RoomContentful = Entry<RoomBase & { image: Asset }>;

export interface ShopByRoomBase {
  title: string;
}

export interface ShopByRoom extends ShopByRoomBase {
  rooms: Room[];
}

export type ShopByRoomContentful = Entry<
  ShopByRoomBase & { rooms: RoomContentful[] }
>;

export interface HowItWorksStep {
  step: string;
  order: number;
  headerText: string;
  headerImageUrl: string;
  detailText: string;
  detailImageUrl: string;
  detailImageSaturation: number;
  detailImageSharpness: number;
}

export type HowItWorksStepContentful = Entry<HowItWorksStep>;

export interface FeatherPerksCardBase {
  name: string;
  logo: string;
  website: string;
  discount: string;
  imageUrl: string;
}

export interface FeatherPerksCard extends FeatherPerksCardBase {
  caption: string;
}

export type FeatherPerksCardContentful = Entry<
  FeatherPerksCardBase & {
    caption: Document;
  }
>;

export interface BulletPoint {
  blurb: string;
  description: string;
}

export type BulletPointContentful = Entry<BulletPoint>;

export interface PointsBreakdown {
  title: string;
  description: string;
  bulletPoints: BulletPoint[];
  button: Button;
}

export type PointsBreakdownContentful = Entry<
  PointsBreakdown & {
    bulletPoints: BulletPointContentful[];
    button: ButtonContentful;
  }
>;

export interface HeaderParagraphButtonSection {
  header?: string;
  paragraph?: string;
  button?: Button;
}

export type HeaderParagraphButtonSectionContentful = Entry<
  HeaderParagraphButtonSection & {
    paragraph?: Document;
    button?: ButtonContentful;
  }
>;
export interface PagesBase {
  title: string;
  slug: string;
  template: string;
}

export interface NavSecondaryCategory {
  name: string;
  image: ContentfulImage;
  link: string;
  isFullscreen: boolean;
}

export type NavSecondaryCategoryContentful = Entry<
  NavSecondaryCategory & { image: Asset }
>;

export interface SecondaryGroup {
  title?: string;
  categories: NavSecondaryCategory[];
}

export type SecondaryGroupContentful = Entry<
  SecondaryGroup & { categories: NavSecondaryCategoryContentful[] }
>;

export interface NavCategoryWithSubmenu {
  name: string;
  image: ContentfulImage;
  secondaryMenuTitle: string;
  secondaryGroups: SecondaryGroup[];
  designWithArrow: boolean;
}

export type NavCategoryWithSubmenuContentful = Entry<
  NavCategoryWithSubmenu & {
    image: Asset;
    secondaryGroups: SecondaryGroupContentful[];
  }
>;

export interface NavCategoryDirectLink {
  name: string;
  image: ContentfulImage;
  link: string;
  designWithArrow: boolean;
}

export type NavCategoryDirectLinkContentful = Entry<
  NavCategoryDirectLink & { image: Asset }
>;

export interface MobileNav {
  categories: (NavCategoryWithSubmenu | NavCategoryDirectLink)[];
}

export type MobileNavContentful = Entry<MobileNav>;

export interface Pages extends PagesBase {
  pageId: string;
}

export interface ContentfulPages extends PagesBase {
  pageId: RichTextDataTarget;
}

export type PagesContent = EntryCollection<ContentfulPages>;

export type PageContent = Entry<ContentfulPages>;
