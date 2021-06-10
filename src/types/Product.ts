import { DeliveryAreaIdentifier } from '../app/store/plan/plan.types';
import { Meta } from './ReduxState';

export enum Category {
  Bedroom = 'Bedroom',
  LivingRoom = 'Living Room',
  DiningRoom = 'Dining Room',
  HomeOffice = 'Home Office',
  BusinessOffice = 'Business Office'
}

export enum OptionType {
  Structure = 'structure',
  Color = 'color',
  Material = 'material'
}

export interface IdName {
  identifier: string;
  name: string;
}
export interface ProductOption {
  identifier: string;
  name: string;
  type: OptionType;
  values: IdName[];
}

export interface Image {
  desktop: string | null;
  mobile: string | null;
  zoom?: string | null;
}

export interface ProductBrand {
  identifier: string;
  name: string;
  image: {
    desktop: string | null;
    mobile: string | null;
  };
}

export type ProductMaterial = string;

export interface ProductDimension {
  image: Image;
  width: string;
  height: string;
  length: string;
  weight: string | null;
}

export interface RentalPrices {
  [length: string]: number;
}

export interface ProductVariant {
  identifier: string;
  options: ProductVariantOption[];
  availability: Availability[];
  dimensions: ProductDimension;
  retailPrice: number;
  rentalPrices: RentalPrices;
  mainImage: Image;
  swatchImage: Image;
  detailImages: Image[];
  otherImages: Image[];
  sceneImages: Image[];
}

export interface ProductVariantOption {
  identifier: string;
  name: string;
  type: OptionType;
  valueIdentifier: string;
  valueName: string;
}

export interface FullProductDetails {
  title: string;
  identifier: string;
  description: string;
  '3dAssetId': string | null;
  brand: ProductBrand;
  materials: ProductMaterial[];
  options: ProductOption[];
  categories: IdName[];
  subclass: IdName;
  styles: IdName[];
  variants: ProductVariant[];
  lifestyle: {
    summary: string;
    image: Image;
  };
  availability: Availability[];
}

export interface ProductListRequest {
  offset: number;
  numItems: number;
  sort: 'price' | 'title' | null;
  order: 'a' | 'd' | null;
  categories: string[];
  classes: string[];
  subclasses: string[];
  filter: {
    deliveryArea: DeliveryAreaIdentifier | null;
    brands: string[];
    classes: string[];
    subclasses: string[];
  };
}

export interface ProductForListing {
  title: string;
  identifier: string;
  brand: IdentifierAndName;
  variants: VariantDetails[];
  options: Option[];
  subclass: IdentifierAndName;
  categories: IdentifierAndName[];
}

export interface IdentifierAndName {
  identifier: string;
  name: string;
}

export interface VariantDetails {
  identifier: string;
  options: VariantOption[];
  availability: Availability[];
  retailPrice: number;
  rentalPrices: MembershipLengthToPriceMap;
  listingImage: Image;
  swatchImage: Image;
}

export interface MembershipLengthToPriceMap {
  '3': number;
  '12': number;
}

export interface Availability {
  deliveryArea: DeliveryAreaIdentifier | null;
  isEnabled: boolean;
  isInStock: boolean;
  stockExpectedDate?: string | null; // I don't think we support this yet, right??
}

export interface VariantOption {
  identifier: string;
  name: string;
  type: OptionType;
  valueIdentifier: string;
  valueName: string;
}

export interface Option {
  identifier: string;
  name: string;
  type: OptionType;
  values: IdentifierAndName[];
}

export interface ProductListResponse extends Meta {
  pageData: ProductForListing[];
}
