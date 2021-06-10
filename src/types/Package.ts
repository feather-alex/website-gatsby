import {
  FullProductDetails,
  Image,
  IdName,
  ProductOption,
  RentalPrices,
  ProductDimension,
  Availability,
  ProductVariantOption
} from './Product';

export default interface Package {
  products: FullProductDetails[];
}

export { ProductOption as PackageOption };
export { ProductVariantOption as PackageVariantOption };

export interface PkgItem {
  identifier: string;
  title: string;
  variantIdentifier: string;
  brand: IdName;
  retailPrice: number;
  image: Image;
  rentalPrices: RentalPrices;
  options: ProductVariantOption[];
  selected?: boolean;
  type?: 'package';
  description: string;
  dimensions: ProductDimension;
  availability: Availability[];
  displayOrder: number;
}

export interface PackageVariant {
  identifier: string;
  totalProducts: number;
  rentalPrices: RentalPrices;
  retailPrice: number;
  items: PkgItem[];
  mainImage: Image;
  options: ProductVariantOption[];
  availability: Availability[];
}

export interface PackageForListing {
  identifier: string;
  title: string;
  category: IdName;
  listingImage: Image;
  variants: PackageVariant[];
  availability: Availability[];
}

export interface FullPackageDetails extends PackageForListing {
  description: string;
  lifestyle: {
    summary: string;
    image: Image;
  };
  otherImages: Image[];
  options: ProductOption[];
}
