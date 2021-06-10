import { CheckoutStep, CheckoutStateStep } from '../../pages/checkout/store/checkout.types';
import { CartItem, PromoType, PromoInfo as Promo } from '../../pages/cart/store/cart.types';
import { Numbers } from '../../utils/numbers';
import { DeliveryAreaIdentifier } from '../../app/store/plan/plan.types';
import { AnalyticsProductFormatted } from '../types';

interface ImpactOnlineSaleProduct {
  sku: string;
  category: string;
  quantity: number;
  price: number;
  name: string;
}

interface ImpactOnlineSalePayload {
  orderId: string | number;
  coupon: string;
  shipping: number;
  discount: number;
  products: ImpactOnlineSaleProduct[];
  ClickId?: string;
  currency: string;
}

export const customerInfoPayloadMapping = ({
  company,
  email,
  firstName,
  lastName,
  cartUuid
}: {
  company: string;
  email: string;
  firstName: string;
  lastName: string;
  cartUuid: string;
}) => ({
  customer_company: company,
  customer_email: email,
  customer_first_name: firstName,
  customer_last_name: lastName,
  cart_id: cartUuid
});

export const deliveryInfoPayloadMapping = ({
  streetAddress,
  apartment,
  city,
  state,
  zipcode,
  phone,
  deliveryAreaIdentifier,
  cartUuid,
  googleScriptFailed
}: {
  streetAddress: string;
  apartment: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  deliveryAreaIdentifier: DeliveryAreaIdentifier;
  cartUuid: string;
  googleScriptFailed: boolean;
}) => ({
  customer_delivery_apartment: apartment,
  customer_delivery_city: city,
  customer_delivery_phone: phone,
  customer_delivery_state: state,
  customer_delivery_street_address: streetAddress,
  customer_delivery_zip_code: zipcode,
  customer_delivery_area_identifier: deliveryAreaIdentifier,
  cart_id: cartUuid,
  google_places_error: googleScriptFailed
});

export const enterPromoCodePayloadMapping = ({ promoCode, cartUuid }: { promoCode: string; cartUuid: string }) => ({
  cart_id: cartUuid,
  coupon_id: promoCode
});

const CheckoutStepsOrder = [
  CheckoutStep.CustomerInfo,
  CheckoutStep.DeliveryInfo,
  CheckoutStep.BillingAddress,
  CheckoutStep.BillingInfo
];

export const stepViewedPayloadMapping = ({ step, cartUuid }: { step: CheckoutStep; cartUuid: string }) => ({
  checkout_id: cartUuid,
  step_viewed: step,
  step: CheckoutStepsOrder.indexOf(step) + 1 // Segment expects a number
});

const stepCompleted = {
  customerInfo: CheckoutStep.CustomerInfo,
  deliveryInfo: CheckoutStep.DeliveryInfo,
  billingAddressInfo: CheckoutStep.BillingAddress,
  billingInfo: CheckoutStep.BillingInfo
};

export const stepCompletedPayloadMapping = ({ step, cartUuid }: { step: CheckoutStateStep; cartUuid: string }) => ({
  checkout_id: cartUuid,
  step_completed: stepCompleted[step], // step here is coming from the action payload and needs to be formatted to match Data expectations
  step: CheckoutStepsOrder.indexOf(stepCompleted[step]) + 1 // Segment expects a number
});

export const maxTCVExceededPayloadMapping = ({
  cartUuid,
  eligibleForDeposit
}: {
  cartUuid: string;
  eligibleForDeposit: boolean;
}) => ({
  cart_id: cartUuid,
  eligible_for_deposit: eligibleForDeposit
});

export const checkoutActionsCartUuidPayloadMapping = ({ cartUuid }: { cartUuid: string }) => ({
  cart_id: cartUuid
});

export const calculateTotalContractValue = ({
  dueNow,
  dueMonthly,
  rentalLength
}: {
  dueNow: number;
  dueMonthly: number;
  rentalLength: number;
}) => {
  const firstMonthTotal = dueNow;
  const remainingContractTotal = dueMonthly * (rentalLength - 1);
  return Numbers.toDecimal(firstMonthTotal + remainingContractTotal);
};

type SuccessfulCheckoutPayloadInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  transactionId: number;
  transactionTotal: number;
  transactionTax: number;
  cartItems: CartItem[];
  utmData: string | undefined;
  monthlyTotal: number;
  membershipFee: number;
  deliveryFee: number;
  rentalLength: number;
  subtotal: number;
  promo: Promo | null;
  cartUuid: string;
};

type SuccessfulCheckoutPayloadOutput = {
  checkout_id: string;
  order_id: string;
  affiliation: string;
  subtotal: number;
  total: number;
  tax: number;
  discount: number;
  coupon: string;
  products: AnalyticsProductFormatted[];
  checkout_charge_total: number;
  cart_monthly_amount: number;
  cart_membership_fee: number;
  coupon_type_used: string | null;
  cart_items_selected_identifiers: string[];
  cart_number_items: number;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_delivery_phone: string;
  tcv: number;
  rental_length: number;
  shipping: number;
};

export const successfulCheckoutPayloadMapping = ({
  firstName,
  lastName,
  email,
  phone,
  transactionId,
  transactionTotal,
  transactionTax,
  cartItems,
  utmData,
  monthlyTotal,
  membershipFee,
  deliveryFee,
  rentalLength,
  subtotal,
  promo,
  cartUuid
}: SuccessfulCheckoutPayloadInput): SuccessfulCheckoutPayloadOutput => {
  const successfulCheckoutProducts: AnalyticsProductFormatted[] = [];
  const cartIds: string[] = [];
  let cartQuantity = 0;
  const cartItemsIdentifier: string[] = [];
  if (cartItems) {
    cartItems.forEach((item) => {
      const thisIdentifier = `${item.identifier}/${item.variantIdentifier}`;
      const thisAmount = item.rentalPrices[item.rentalLength];

      cartIds.push(thisIdentifier);

      successfulCheckoutProducts.push({
        product_id: item.identifier,
        sku: item.identifier,
        category: (item.categories && item.categories[0] && item.categories[0].identifier) || '',
        name: item.title,
        brand: item.brand,
        variant: item.variantIdentifier,
        price: thisAmount,
        quantity: 1,
        position: 1,
        url: `${window.location.origin}/products/${item.identifier}`,
        image_url: `${item.image.desktop || item.image.mobile}?auto=compress,format`
      });

      cartQuantity += item.quantity;

      cartItemsIdentifier.push(item.identifier);
    });
  }

  const tcv = calculateTotalContractValue({ dueNow: transactionTotal, dueMonthly: monthlyTotal, rentalLength });

  return {
    // Segment expected properties
    checkout_id: cartUuid,
    order_id: transactionId.toString(),
    affiliation: utmData || '',
    subtotal,
    total: tcv, // we pass tcv as total because this is the property that many 3rd parties pull and our marketing team wants to be looking at tcv
    tax: transactionTax,
    discount: promo ? promo.amount : 0,
    coupon: (promo && promo.code) || '',
    products: successfulCheckoutProducts,

    // Feather properties
    checkout_charge_total: transactionTotal,
    customer_first_name: firstName,
    customer_last_name: lastName,
    customer_email: email,
    customer_delivery_phone: phone,
    cart_items_selected_identifiers: cartItemsIdentifier,
    cart_monthly_amount: monthlyTotal,
    cart_membership_fee: membershipFee,
    cart_number_items: cartQuantity,
    coupon_type_used: promo && promo.type,
    tcv,
    rental_length: rentalLength,
    shipping: deliveryFee
  };
};

export const trackCheckoutUserPayloadMapping = ({
  firstName,
  lastName,
  email,
  company
}: {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
}) => ({
  name: `${firstName} ${lastName}`,
  email,
  company
});

// Order Completed Event Mappings

const determineDiscountAmount = ({
  promo,
  subtotal,
  rentalLength
}: {
  promo?: Promo | null;
  subtotal: number; // subtotal is solely the furniture cost
  rentalLength: number;
}) => {
  let discount = 0;

  if (promo && promo.type) {
    if (promo.type === PromoType.Percentage) {
      discount = Numbers.toDecimal(promo.amount * 0.01 * (rentalLength * subtotal));
    } else if (promo.amount > subtotal) {
      discount = subtotal;
    } else {
      discount = promo.amount;
    }
  }

  return discount;
};

const determineDiscountCode = (promo?: Promo | null) => {
  let promoCode = '';
  if (promo && promo.code) {
    promoCode = promo.code;
  }
  return promoCode;
};

type ImpactRadiusClickIDContext = {
  context: {
    referrer: {
      type: string;
      id: string;
    };
  };
};

export const impactClickIdContextMapping = (impactClickId?: string): ImpactRadiusClickIDContext | undefined => {
  if (!impactClickId) {
    return undefined;
  }
  return {
    context: {
      referrer: {
        type: 'impactRadius',
        id: impactClickId
      }
    }
  };
};

export const formatCartItemsForImpactOnlineSale = ({
  cartItems,
  rentalLength
}: {
  cartItems: CartItem[];
  rentalLength: number;
}): ImpactOnlineSaleProduct[] => {
  const products = cartItems.map((cartItem) => ({
    sku: cartItem.identifier,
    category:
      cartItem.categories && cartItem.categories.length > 0
        ? cartItem.categories.map((category: { identifier: string }) => category.identifier).join(',')
        : 'unknown',
    quantity: 1,
    price: cartItem.rentalPrices[cartItem.rentalLength] * cartItem.rentalLength,
    name: cartItem.title
  }));

  // if a membership, add membership fee as a product
  if (rentalLength === 12) {
    products.push({
      sku: 'membership-fee',
      category: 'non-products',
      quantity: 1,
      price: 19 * rentalLength,
      name: 'Membership Fee'
    });
  }

  return products;
};

export const impactOnlineSalePayloadMapping = ({
  impactClickId,
  promo,
  orderId,
  cartItems,
  subtotal,
  rentalLength,
  deliveryFee
}: {
  impactClickId?: string;
  promo: Promo | null;
  orderId: number;
  cartItems: CartItem[];
  subtotal: number;
  rentalLength: number;
  deliveryFee: number;
}): ImpactOnlineSalePayload => {
  const discountAmount = determineDiscountAmount({ promo, subtotal, rentalLength });
  return {
    orderId,
    coupon: determineDiscountCode(promo),
    shipping: deliveryFee,
    products: formatCartItemsForImpactOnlineSale({ cartItems, rentalLength }),
    ClickId: impactClickId,
    currency: 'USD',
    discount: discountAmount
  };
};
