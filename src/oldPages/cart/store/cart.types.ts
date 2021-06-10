import { RentalPrices, Image, Availability, MembershipLengthToPriceMap } from '../../../types/Product';
import { APIError } from '../../../types/ReduxState';

export interface CartItem {
  type: 'product' | 'bundle' | 'custom-bundle' | 'product-of-bundle';
  title: string;
  brand: string;
  categories?: { identifier: string; name: string }[];
  identifier: string;
  variantIdentifier: string;
  variantName: string;
  rentalPrices: RentalPrices;
  image: Image;
  quantity: number;
  rentalLength: number;
  location: string | null;
  bundleVariantIdentifier?: string;
  bundleIdentifier?: string;
  packageQuantity?: number;
  availability: Array<Availability>;
}

export interface ProductRecommendation {
  title: string;
  identifier: string;
  listingImage: Image;
  rentalPrices: MembershipLengthToPriceMap;
  variantCounts: {
    structure: number;
    color: number;
  };
}

export enum PromoState {
  VALID = 'valid',
  INVALID = 'invalid',
  FETCHING = 'fetching',
  EMPTY = 'empty'
}

export enum PromoType {
  Fixed = 'Fixed',
  Percentage = 'Percentage'
}

export interface PromoInfo {
  amount: number;
  code: string;
  special: boolean;
  type: PromoType;
}

export interface Cart {
  promo: PromoInfo | null;
  promoError: APIError | null;
  promoState: PromoState;
  items: CartItem[];
  isFetching: boolean;
  unavailableItems: ProductIdentifiers[];
  error: APIError | null;
  uuid: string;
  recommendations: ProductRecommendation[];
  isRecommendationsFetching: boolean;
  recommendationsError: APIError | null;
}

export interface ProductIdentifiers {
  productIdentifier: string;
  variantIdentifier: string;
}

export interface CartPkg {
  packageIdentifier: string;
  packageVariantIdentifier: string;
  itemsRemoved: string[];
  itemsOOS: string[];
  itemsAdded: CartPkgItem[];
  retailPrice: number;
  monthlyPrice: number;
  cartUuid: string;
}

export interface CartPkgItem {
  identifier: string;
  variantIdentifier: string;
  quantity: number;
  monthlyPrice: number;
}

export interface CartTotals {
  subtotal: number;
  total: number;
}

export type HandleRemoveCartItem = (
  productIdentifier: string | undefined,
  variantIdentifier: string | undefined
) => () => void;
