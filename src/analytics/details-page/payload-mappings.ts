import { ProductVariant, FullProductDetails } from "../../types/Product";
import {
  PackageVariant,
  FullPackageDetails,
  PkgItem,
} from "../../types/Package";
import {
  DeliveryAreaIdentifier,
  MembershipState,
  MembershipStateDisplayName,
} from "../../app/store/plan/plan.types";
import { QuizPackageInfo } from "../../oldPages/detailsPage/components/packages/quizResults/QuizResultsDetailsContainer";
import {
  QuizRoom,
  QuizPkgs,
} from "../../oldPages/detailsPage/components/packages/quizResults/store/quizResults.types";
import { AnalyticsProductFormatted } from "../types";

type ProductDetailPageViewedPayloadInput = {
  productData: FullProductDetails;
  selectedVariant: ProductVariant;
  membershipState: MembershipState;
  postal: string;
  deliveryAreaIdentifier: DeliveryAreaIdentifier;
};

type DetailPageViewedPayloadOutput = AnalyticsProductFormatted & {
  // segment e-commerce spec properties
  currency: string;
  value: number;
  // feather specific properties
  product_category_identifiers: string[] | null;
  product_price_per_month_member: number | null;
  product_price_per_month_non_member: number | null;
  product_price_retail: number | null;
  product_variant_selected_identifier: string | null;
  product_variant_options_identifiers: string[] | null;
  customer_delivery_zip_code: string | null;
  customer_delivery_area_identifier: string | null;
  customer_plan_type_selected: string;
};

export const productDetailPageViewedPayloadMapping = ({
  productData,
  selectedVariant,
  membershipState,
  postal,
  deliveryAreaIdentifier,
}: ProductDetailPageViewedPayloadInput): DetailPageViewedPayloadOutput => {
  const productCategoryIdentifiers = productData.categories.length
    ? productData.categories.map((cat) => cat.identifier)
    : null;
  const price =
    membershipState === MembershipState.NON_MEMBER
      ? selectedVariant.rentalPrices[3]
      : selectedVariant.rentalPrices[12];
  return {
    product_id: productData.identifier,
    sku: productData.identifier,
    category: productData.categories[0].identifier,
    name: productData.title,
    brand: productData.brand.identifier,
    variant: selectedVariant.identifier,
    price,
    quantity: 1,
    currency: "usd",
    position: 1,
    value: price,
    url: `${window.location.origin}/products/${productData.identifier}?variant=${selectedVariant.identifier}`,
    image_url: `${
      selectedVariant.mainImage.desktop || selectedVariant.mainImage.mobile
    }?auto=compress,format`,
    product_category_identifiers: productCategoryIdentifiers,
    product_price_per_month_member: selectedVariant.rentalPrices[12],
    product_price_per_month_non_member: selectedVariant.rentalPrices[3],
    product_price_retail: selectedVariant.retailPrice,
    product_variant_selected_identifier: selectedVariant.identifier,
    product_variant_options_identifiers: productData.variants
      ? productData.variants.map(
          (variant: ProductVariant) => variant.identifier
        )
      : null,
    customer_delivery_zip_code: postal,
    customer_delivery_area_identifier: deliveryAreaIdentifier,
    customer_plan_type_selected:
      membershipState === MembershipState.NONE
        ? "None"
        : MembershipStateDisplayName[membershipState],
  };
};

type PackageDetailPageViewedPayloadInput = {
  packageData: FullPackageDetails;
  membershipState: MembershipState;
  postal: string;
  deliveryAreaIdentifier: DeliveryAreaIdentifier;
};

export const packageDetailPageViewedPayloadMapping = ({
  packageData,
  membershipState,
  postal,
  deliveryAreaIdentifier,
}: PackageDetailPageViewedPayloadInput): DetailPageViewedPayloadOutput => {
  const firstVariant = packageData.variants[0];
  const price =
    membershipState === MembershipState.NON_MEMBER
      ? firstVariant.rentalPrices[3]
      : firstVariant.rentalPrices[12];

  return {
    product_id: packageData.identifier,
    sku: packageData.identifier,
    category: packageData.category.identifier,
    name: packageData.title,
    brand: "",
    variant: firstVariant.identifier,
    price,
    quantity: 1,
    currency: "usd",
    position: 1,
    value: price,
    url: `${window.location.origin}/packages/${packageData.identifier}`,
    image_url: "",
    product_category_identifiers: [packageData.category.identifier],
    product_price_per_month_member: firstVariant.rentalPrices[12],
    product_price_per_month_non_member: firstVariant.rentalPrices[3],
    product_price_retail: firstVariant.retailPrice,
    product_variant_selected_identifier: firstVariant.identifier,
    product_variant_options_identifiers: packageData.variants
      ? packageData.variants.map(
          (variant: PackageVariant) => variant.identifier
        )
      : null,
    customer_delivery_zip_code: postal,
    customer_delivery_area_identifier: deliveryAreaIdentifier,
    customer_plan_type_selected:
      membershipState === MembershipState.NONE
        ? "None"
        : MembershipStateDisplayName[membershipState],
  };
};

type QuizResultDetailPageViewedPayloadInput = {
  quizResults: QuizPkgs;
  packageInfo: QuizPackageInfo;
  selectedItems: PkgItem[];
  room: QuizRoom;
  membershipState: MembershipState;
  postalCode: string | null;
  deliveryAreaIdentifier: string | null;
};

type QuizResultDetailPageViewedPayloadOutput = {
  quiz_id: string;
  quiz_room: string;
  package_items: { identifier: string; variant_identifier: string }[];
  name: string;
  price: number;
  quantity: number;
  currency: string;
  position: number;
  url: string;
  customer_delivery_zip_code: string;
  customer_delivery_area_identifier: string;
  customer_plan_type_selected: string;
};

export const quizResultDetailPageViewedPayloadMapping = ({
  quizResults,
  room,
  selectedItems,
  packageInfo,
  membershipState,
  postalCode,
  deliveryAreaIdentifier,
}: QuizResultDetailPageViewedPayloadInput): QuizResultDetailPageViewedPayloadOutput => {
  return {
    quiz_id: quizResults.uuid!,
    quiz_room: room,
    package_items: selectedItems.map((item) => ({
      identifier: item.identifier,
      variant_identifier: item.variantIdentifier,
    })),
    name: packageInfo.title,
    price: 0,
    quantity: 1,
    currency: "usd",
    position: 1,
    url: `${window.location.origin}/quiz-results/${quizResults.uuid}`,
    customer_delivery_zip_code: postalCode ? postalCode : "N/A",
    customer_delivery_area_identifier: deliveryAreaIdentifier
      ? deliveryAreaIdentifier
      : "N/A",
    customer_plan_type_selected:
      membershipState === MembershipState.NONE
        ? "None"
        : MembershipStateDisplayName[membershipState],
  };
};

export const clickRelatedItemPayloadMapping = ({
  currentItemIdentifier,
  relatedItemIdentifier,
}: {
  currentItemIdentifier: string;
  relatedItemIdentifier: string;
}) => ({
  current_item_viewed_identifier: currentItemIdentifier,
  related_item_clicked_identifier: relatedItemIdentifier,
});

export const selectMemberPayloadMapping = ({
  product,
}: {
  product: string;
}) => ({
  product_identifier: product,
});

export const selectNonMemberPayloadMapping = ({
  product,
}: {
  product: string;
}) => ({
  product_identifier: product,
});

export const valuePropsViewedPayloadMapping = ({
  product,
  value,
}: {
  product: string;
  value: string | React.MouseEvent<string>;
}) => ({
  product_identifier: product,
  value_prop_viewed: value,
});

export const dimensionsInfoOpenedPayloadMapping = ({
  product,
}: {
  product: string;
}) => ({
  product_identifier: product,
});

export const productDetailImageViewedMapping = ({
  imageUrl,
  imageIndex,
}: {
  imageUrl: string;
  imageIndex: number;
}) => ({
  image_url: imageUrl,
  image_index: imageIndex,
});

export const threekitPlayerViewedMapping = ({
  productIdentifier,
  variant,
}: {
  productIdentifier: string;
  variant?: ProductVariant | null;
}) => ({
  product: productIdentifier,
  variant: variant ? variant.identifier : "",
});
