import {
  CheckoutRequestPayload,
  CheckoutItemType,
  AmountsRequestPayload,
  AmountsSuccessPayload
} from './checkout.types';
import { PromoType } from '../../cart/store/cart.types';

export const exampleCheckoutRequestPayload: CheckoutRequestPayload = {
  checkoutInfo: {
    items: [
      {
        type: CheckoutItemType.Product,
        identifier: 'test-product',
        variantIdentifier: 'default',
        items: []
      },
      {
        type: CheckoutItemType.Product,
        identifier: 'test-product-2',
        variantIdentifier: 'default',
        items: []
      }
    ],
    planMonths: 12,
    customer: {
      email: 'test@test.com',
      firstName: 'Tester',
      lastName: 'Testerson',
      phone: '1234567890',
      persona: null
    },
    delivery: {
      area: 'new-york',
      company: 'Test Co.',
      address1: '123 Test Street',
      address2: 'Apt 1',
      city: 'Test Town',
      region: 'NY',
      postal: '10001'
    },
    billing: {
      address1: '123 Test Street',
      address2: 'Apt 1',
      city: 'Test Town',
      region: 'NY',
      postal: '10001'
    },
    cardToken: '12345',
    promoCode: 'TESTPROMO',
    utmData: ''
  },
  amounts: {
    dueNow: 1000,
    taxDueNow: 10,
    monthlyTotal: 1000,
    monthlyTax: 10,
    subtotal: 990,
    membershipFee: 19,
    deliveryFee: 0,
    promo: {
      amount: 10,
      code: 'TESTPROMO',
      type: PromoType.Fixed,
      special: false
    }
  },
  cartInfo: {
    cartItems: [
      {
        type: 'product',
        title: 'Test Product',
        brand: 'Test Brand',
        categories: [],
        identifier: 'test-product',
        variantIdentifier: 'default',
        variantName: 'Test Variant',
        rentalPrices: {
          3: 100,
          12: 10
        },
        image: {
          desktop: '',
          mobile: ''
        },
        quantity: 1,
        rentalLength: 12,
        location: 'new-york',
        availability: []
      },
      {
        type: 'product',
        title: 'Test Product 2',
        brand: 'Test Brand',
        categories: [],
        identifier: 'test-product-2',
        variantIdentifier: 'default',
        variantName: 'Test Variant',
        rentalPrices: {
          3: 100,
          12: 10
        },
        image: {
          desktop: '',
          mobile: ''
        },
        quantity: 1,
        rentalLength: 12,
        location: 'new-york',
        availability: []
      }
    ],
    cartUuid: '12345'
  },
  stripeToken: {
    id: 'fake_token',
    object: 'token',
    client_ip: '',
    type: '',
    created: 1,
    livemode: false,
    used: false
  }
};

export const exampleAmountsRequestPayload: AmountsRequestPayload = {
  planMonths: 3,
  subtotal: 100,
  promoCode: undefined,
  delivery: {
    area: 'new-york',
    address1: '5 Front St.',
    city: 'NYC',
    region: 'NY',
    postal: '10012'
  }
};

export const exampleAmountsSuccessPayload: AmountsSuccessPayload = {
  deliveryFee: 0,
  depositAmount: 300,
  discountInfo: null,
  displayTaxRate: 0,
  monthlyFee: 19,
  monthlySubtotal: 166,
  taxDueMonthly: 0,
  taxDueNow: 0,
  totalDueMonthly: 185,
  totalDueNow: 185,
  orderTCV: 555
};
