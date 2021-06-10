import { CheckoutInfo, IdentifierAndVariantIdentifier, CheckoutItemType, CheckoutItem } from './checkout.types';
import { CartItem, PromoInfo } from '../../cart/store/cart.types';
import { getSearchParamsString } from '../../../utils/url-parser';
import { TrackingParameters } from '../../../types/TrackingParameters';
import { DeliveryAreaIdentifier } from '../../../app/store/plan/plan.types';
import { Token } from '@stripe/stripe-js';

export const getCheckoutItems = (items: CartItem[]): CheckoutItem[] => {
  const finalCart: CheckoutItem[] = [];

  const customBundle: CheckoutItem = {
    type: CheckoutItemType.CustomBundle,
    items: []
  };

  for (let i = 0; i < items.length; i++) {
    switch (items[i].type) {
      case 'product':
        finalCart.push({
          type: CheckoutItemType.Product,
          identifier: items[i].identifier,
          variantIdentifier: items[i].variantIdentifier
        });
        break;

      case 'bundle':
        finalCart.push({
          type: CheckoutItemType.Bundle,
          identifier: items[i].identifier,
          variantIdentifier: items[i].variantIdentifier
        });
        break;

      case 'custom-bundle':
        customBundle.items!.push({
          identifier: items[i].identifier,
          variantIdentifier: items[i].variantIdentifier
        });
        break;

      case 'product-of-bundle': {
        // Define the bundle item object.
        const bundleItem: IdentifierAndVariantIdentifier = {
          identifier: items[i].identifier,
          variantIdentifier: items[i].variantIdentifier
        };

        // Is this bundle already initialized in the final cart?
        let indexOfCorrespondingBundle = -1;
        for (let j = 0; j < finalCart.length; j++) {
          if (
            finalCart[j].identifier === items[i].bundleIdentifier &&
            finalCart[j].variantIdentifier === items[i].bundleVariantIdentifier
          ) {
            indexOfCorrespondingBundle = j;
          }
        }

        // Did we find an initialized bundle in the final cart?
        if (indexOfCorrespondingBundle >= 0) {
          // Add the current item to the corresponding bundle.
          finalCart[indexOfCorrespondingBundle].items!.push(bundleItem);

          // Otherwise, initialize this bundle in the final cart.
          // Add the current item to this bundle.
        } else {
          finalCart.push({
            type: CheckoutItemType.Bundle,
            identifier: items[i].bundleIdentifier!,
            variantIdentifier: items[i].bundleVariantIdentifier,
            items: [bundleItem]
          });
        }
        break;
      }
      default:
        break;
    }
  }

  // Do we have Custom Bundle items in the cart?
  // Add them to the final cart.
  if (customBundle.items && customBundle.items.length) {
    finalCart.push(customBundle);
  }

  return finalCart;
};

export const getValidItems = (cartItems: CheckoutItem[]): CheckoutItem[] => {
  const result: CheckoutItem[] = [];

  for (let i = 0; i < cartItems.length; i++) {
    const currentItem: CheckoutItem = cartItems[i];

    // Is the current item a bundle, and does that bundle only have 1 item associated with it?
    if (currentItem.type === 'bundle' && currentItem.items && currentItem.items.length === 1) {
      // Destructure the bundle into an individual product, and add it to the result.
      result.push({
        type: CheckoutItemType.Product,
        identifier: currentItem.items[0].identifier,
        variantIdentifier: currentItem.items[0].variantIdentifier
      });

      // Otherwise, add the item to the result.
    } else {
      result.push(currentItem);
    }
  }

  return result;
};

interface RawCheckoutData {
  cartItems: CartItem[];
  rentalLength: number;
  promo: PromoInfo | null;
  email: string;
  firstName: string;
  lastName: string;
  persona: string | null;
  phone: string;
  deliveryAreaIdentifier: DeliveryAreaIdentifier;
  company?: string;
  streetAddress: string;
  apt?: string;
  city: string;
  state: string;
  zipcode: string;
  billingStreetAddress: string;
  billingApt?: string;
  billingCity: string;
  billingState: string;
  billingPostalCode: string;
  stripeToken: Token | null;
  trackingParams: TrackingParameters;
  ssn?: string | null;
  legalFirstName?: string | null;
  legalLastName?: string | null;
  statedIncome?: string;
}

export const normalizeCheckoutData = ({
  deliveryAreaIdentifier,
  cartItems,
  rentalLength,
  promo,
  email,
  firstName,
  lastName,
  persona,
  phone,
  company,
  streetAddress,
  apt,
  city,
  state,
  zipcode,
  billingStreetAddress,
  billingApt,
  billingCity,
  billingState,
  billingPostalCode,
  stripeToken,
  trackingParams,
  ssn,
  legalFirstName,
  legalLastName,
  statedIncome
}: RawCheckoutData): CheckoutInfo => {
  const utmStr = getSearchParamsString(trackingParams);

  const checkoutInfo = {
    items: getValidItems(getCheckoutItems(cartItems)),
    planMonths: rentalLength,
    promoCode: promo && promo.code ? promo.code : undefined,
    customer: {
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      persona,
      phone: phone.replace(/[^0-9]+/g, '').trim(),
      statedIncome: statedIncome?.trim()
    },
    delivery: {
      area: deliveryAreaIdentifier,
      company: company ? company.trim() : '',
      address1: streetAddress.trim(),
      address2: apt ? apt.trim() : '',
      city: city.trim(),
      region: state.trim(),
      postal: zipcode.trim()
    },
    billing: {
      address1: billingStreetAddress.trim(),
      address2: billingApt ? billingApt.trim() : '',
      city: billingCity.trim(),
      region: billingState.trim(),
      postal:
        stripeToken?.card && stripeToken.card.address_zip ? stripeToken.card.address_zip : billingPostalCode.trim()
    },
    cardToken: stripeToken?.id || '',
    utmData: utmStr || utmStr !== '' ? utmStr : undefined
  };

  if (ssn && legalFirstName && legalLastName) {
    checkoutInfo['ssn'] = ssn;
    checkoutInfo['legalFirstName'] = legalFirstName;
    checkoutInfo['legalLastName'] = legalLastName;
  }

  return checkoutInfo;
};

export const validateLegalName = (name?: string): boolean => !!name && name.length >= 1 && name.length < 250;

export const validateSSN = (ssn?: string): boolean => !!ssn && ssn.length === 9;

export const getMaxTCVMonthlyCartTotal = (maxTCV: number, rentalLength: number): number => {
  return maxTCV / rentalLength;
};

export const getRemovalAmountToMeetMaxTCV = (maxMonthlyCartTotal: number, cartTotal: number): number => {
  return cartTotal - maxMonthlyCartTotal;
};

// used in UnderwritingReduceCartDeposit before change is validated so we cannot use the
// getIsCartTotalMet selector instead
export const cartItemTotalMinimumMet = (rentalLength: number, cartTotal: number): boolean => {
  if (rentalLength === 12) {
    return cartTotal >= 29;
  }
  return cartTotal >= 99;
};

export const formatCurrency = (amount: number) =>
  amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

export const getTaxDeliveryInfo = (address1?: string, city?: string, region?: string, postal?: string) =>
  address1 && city && region && postal && postal.length > 4
    ? { address1: address1.trim(), city: city.trim(), region: region.trim(), postal: postal.trim() }
    : {};

export const statesUS: string[] = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY'
];

export const provincesCA: string[] = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];
