import { CartItem, CartPkgItem } from '../../pages/cart/store/cart.types';
import { IdName } from '../../app/store/entities/entities.types';
import { IdentifierAndName, Image } from '../../types/Product';
import { DeliveryAreaIdentifier, MembershipState } from '../../app/store/plan/plan.types';
import { AnalyticsProductFormatted } from '../types';

type CheckoutStartedPayloadInput = {
  cartItems: CartItem[];
  cartUuid: string;
  rentalLength: number | null;
};

type CheckoutStartedPayloadOutput = {
  order_id: string;
  cart_id: string;
  products: AnalyticsProductFormatted[];
};

export const startCheckoutPayloadMapping = ({
  cartItems,
  cartUuid,
  rentalLength
}: CheckoutStartedPayloadInput): CheckoutStartedPayloadOutput => ({
  order_id: cartUuid, // expected by Segment but we don't have an order/subscription ID at that point so reusing the cart_id
  cart_id: cartUuid,
  products: cartItems.map((item) => ({
    product_id: item.identifier,
    sku: item.identifier,
    category: item.categories ? item.categories[0].identifier : '',
    name: item.title,
    brand: item.brand,
    variant: item.variantIdentifier,
    price: item.rentalPrices[rentalLength!], // we know for sure that by the time this function is called, the rentalLength will be set up
    quantity: item.quantity,
    position: 0,
    url: `${window.location.origin}/products/${item.identifier}`,
    image_url: `${item.image.desktop || item.image.mobile}?auto=compress,format`
  }))
});

type ProductAddedPayloadInput = {
  cartUuid: string;
  identifier: string;
  variantIdentifier: string;
  rentalPrice: number;
  cartItems: CartItem[];
  categories?: IdentifierAndName[];
  brand: string;
  title: string;
  image: Image;
  bundleIdentifier?: string;
  bundleVariantIdentifier?: string;
};

type ProductAddedPayloadOutput = AnalyticsProductFormatted & {
  // segment e-commerce spec properties
  cart_id: string;
  // feather specific properties
  item_added_type: string;
  cart_items_selected_identifiers: string[];
  package_identifier?: string;
  package_variant_identifier?: string;
};

export const addItemPayloadMapping = ({
  identifier,
  variantIdentifier,
  rentalPrice,
  cartItems,
  cartUuid,
  categories,
  brand,
  title,
  image,
  bundleIdentifier,
  bundleVariantIdentifier
}: ProductAddedPayloadInput): ProductAddedPayloadOutput => {
  return {
    cart_id: cartUuid,
    product_id: identifier,
    sku: identifier,
    category: categories ? categories[0].identifier : 'unknown',
    name: title,
    variant: variantIdentifier,
    price: rentalPrice,
    quantity: 1,
    brand,
    cart_items_selected_identifiers: cartItems.map((item) => item.identifier),
    item_added_type: 'product',
    position: 1,
    url: `${window.location.origin}/products/${identifier}`,
    image_url: `${image.desktop || image.mobile}?auto=compress,format`,
    package_identifier: bundleIdentifier,
    package_variant_identifier: bundleVariantIdentifier
  };
};

export const addPackagePayloadMapping = ({
  packageIdentifier,
  packageVariantIdentifier,
  itemsRemoved,
  itemsOOS,
  itemsAdded,
  retailPrice,
  monthlyPrice,
  cartUuid
}: {
  packageIdentifier: string;
  packageVariantIdentifier: string;
  itemsRemoved: string[];
  itemsOOS: string[];
  itemsAdded: CartPkgItem[];
  retailPrice: number;
  monthlyPrice: number;
  cartUuid: string;
}) => {
  const itemsAddedFromPackage = itemsAdded.map((item: CartPkgItem) => ({
    item_identifier: item.identifier,
    item_variant: item.variantIdentifier,
    item_quantity: item.quantity,
    item_unit_price: item.monthlyPrice
  }));

  return {
    package_identifier: packageIdentifier,
    package_variant_identifier: packageVariantIdentifier,
    items_removed_from_package: itemsRemoved,
    items_oos_from_package: itemsOOS,
    items_added_from_package: itemsAddedFromPackage,
    retail_added: retailPrice,
    monthly_price_added: monthlyPrice,
    cart_id: cartUuid
  };
};

type ProductRemovedPayloadInput = {
  cartUuid: string;
  identifier: string;
  variantIdentifier: string;
  rentalPrice: number;
  categories?: IdentifierAndName[];
  brand: string;
  title: string;
  image: Image;
};

type ProductRemovedPayloadOutput = AnalyticsProductFormatted & {
  // segment e-commerce spec properties
  cart_id: string;
};

export const removeItemPayloadMapping = ({
  identifier,
  cartUuid,
  categories,
  title,
  brand,
  variantIdentifier,
  rentalPrice,
  image
}: ProductRemovedPayloadInput): ProductRemovedPayloadOutput => ({
  product_id: identifier,
  cart_id: cartUuid,
  sku: identifier,
  category: categories ? categories[0].identifier : 'unknown',
  name: title,
  brand,
  variant: variantIdentifier,
  price: rentalPrice,
  quantity: 1,
  position: 1,
  url: `${window.location.origin}/products/${identifier}`,
  image_url: `${image.desktop || image.mobile}?auto=compress,format`
});

type CartViewedPayloadInput = {
  cartTotals: { subtotal: number; total: number };
  membershipState: MembershipState;
  membershipFee: number;
  deliveryFee: number;
  deliveryZipCode: string;
  deliveryAreaIdentifier: string;
  cartItems: CartItem[];
  cartUuid: string;
};

type CartViewedPayloadOutput = {
  // segment e-commerce spec properties
  cart_id: string;
  products: AnalyticsProductFormatted[];
  // feather specific properties
  cart_monthly_membership_fee: number;
  cart_monthly_items_subtotal: number;
  cart_delivery_fee: number;
  cart_monthly_total: number;
  cart_total_due_now: number;
  customer_plan_type: string;
  customer_delivery_zip_code: string;
  customer_delivery_area_identifier: string;
};

export const cartViewedPayloadMapping = ({
  cartTotals,
  membershipState,
  membershipFee,
  deliveryFee,
  deliveryZipCode,
  deliveryAreaIdentifier,
  cartItems,
  cartUuid
}: CartViewedPayloadInput): CartViewedPayloadOutput => ({
  cart_id: cartUuid,
  products: cartItems.map((cartItem) => ({
    product_id: cartItem.identifier,
    sku: cartItem.identifier,
    category: cartItem.categories ? cartItem.categories[0].identifier : 'unknown',
    name: cartItem.title,
    brand: cartItem.brand,
    variant: cartItem.variantIdentifier,
    price: cartItem.rentalPrices[cartItem.rentalLength],
    quantity: 1,
    position: 1,
    url: `${window.location.origin}/products/${cartItem.identifier}`,
    image_url: `${cartItem.image.desktop || cartItem.image.mobile}?auto=compress,format`
  })),
  cart_monthly_membership_fee: membershipFee,
  cart_monthly_items_subtotal: cartTotals.subtotal,
  cart_delivery_fee: deliveryFee,
  cart_monthly_total: cartTotals.subtotal + membershipFee,
  cart_total_due_now: cartTotals.total,
  customer_plan_type: membershipState === MembershipState.MEMBER ? 'member' : 'non-member',
  customer_delivery_zip_code: deliveryZipCode,
  customer_delivery_area_identifier: deliveryAreaIdentifier
});

export const updateCartPayloadMapping = ({
  membershipFee,
  cartSubtotal,
  deliveryFee,
  monthlyTotal,
  totalDueNow,
  planType,
  deliveryZipCode,
  deliveryAreaIdentifier,
  cartItems,
  cartUuid
}: {
  membershipFee: number;
  cartSubtotal: number;
  deliveryFee: number;
  monthlyTotal: number;
  totalDueNow: number;
  planType: string;
  deliveryZipCode: string;
  deliveryAreaIdentifier: DeliveryAreaIdentifier;
  cartItems: CartItem[];
  cartUuid: string;
}) => {
  const cartItemsSelected = cartItems.map((item) => ({
    product_title: item.title,
    product_identifier: item.identifier,
    product_brand: item.brand,
    product_category_identifiers:
      item.categories && item.categories.length ? item.categories.map((cat: IdName) => cat.identifier) : null,
    product_price_per_unit_selected: item.rentalPrices[item.rentalLength],
    product_variant_identifier: item.variantIdentifier
  }));

  return {
    cart_monthly_membership_fee: membershipFee,
    cart_monthly_items_subtotal: cartSubtotal,
    cart_delivery_fee: deliveryFee,
    cart_monthly_total: monthlyTotal,
    cart_total_due_now: totalDueNow,
    customer_plan_type: planType,
    customer_delivery_zip_code: deliveryZipCode,
    customer_delivery_area_identifier: deliveryAreaIdentifier,
    cart_items_selected: cartItemsSelected,
    cart_id: cartUuid
  };
};

export const upsellItemClickedPayloadMapping = ({
  clickedProductIdentifier,
  cartUuid
}: {
  clickedProductIdentifier: string;
  cartUuid: string;
}) => ({
  product_identifier: clickedProductIdentifier,
  cart_id: cartUuid
});
