import { CartItem, PromoInfo } from "../../cart/store/cart.types";
import { APIError } from "../../../api/error";
import {
  CustomerInfoFields,
  DeliveryInfoFields,
  BillingAddressInfoFields,
  SSNInfoFields,
} from "./checkoutForms.types";
import { Token } from "@stripe/stripe-js";

export type CheckoutState = {
  isPlacingOrder: boolean;
  isSubmittingDeposit: boolean;
  isSSNNotValid: boolean;
  isCreditNotFound: boolean;
  isSSNNotFound: boolean;
  itemsError: ItemUnavailableError[] | null;
  serverError: APIError | null;
  maxTCVError: MaxTCVError | null;
  depositError: APIError | null;
  cardError: { error: string | null };
  generateNewStripeToken: boolean;
  isFetchingAmount: boolean;
  amountError: APIError | null;
  taxDueNow: number;
  deliveryFee: number;
  monthlyTotal: number;
  monthlyTax: number;
  dueNow: number;
  membershipFee: number;
  depositAmount: number;
  orderTCV: number;
  step: CheckoutStep | string;
  customerInfo: CustomerInfoFields;
  ssnInfo: SSNInfoFields;
  deliveryInfo: DeliveryInfoFields;
  billingAddressInfo: BillingAddressInfoFields;
  isDeliverySameAsBilling: boolean;
};

export enum CheckoutStateStep {
  CustomerInfo = "customerInfo",
  DeliveryInfo = "deliveryInfo",
  BillingAddress = "billingAddressInfo",
}

export enum CheckoutStep {
  Checkout = "checkout",
  CustomerInfo = "customer-info",
  DeliveryInfo = "delivery-info",
  BillingAddress = "billing-address",
  BillingInfo = "billing-info",
  Eligibility = "eligibility",
}

export enum CheckoutItemType {
  Product = "product",
  Bundle = "bundle",
  CustomBundle = "custom-bundle",
}

export interface IdentifierAndVariantIdentifier {
  identifier: string;
  variantIdentifier: string;
}

export interface CheckoutItem {
  type: CheckoutItemType;
  identifier?: string;
  variantIdentifier?: string;
  items?: IdentifierAndVariantIdentifier[];
}

export type CheckoutDelivery = {
  area: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  region: string;
  postal: string;
};

export type CheckoutBilling = {
  address1: string;
  address2?: string;
  city: string;
  region: string;
  postal: string;
};

export type CheckoutCustomer = {
  email: string;
  firstName: string;
  lastName: string;
  persona: string | null;
  phone: string;
  statedIncome?: string;
};

export type CheckoutInfo = {
  items: CheckoutItem[];
  planMonths: number;
  customer: CheckoutCustomer;
  delivery: CheckoutDelivery;
  billing: CheckoutBilling;
  cardToken: string;
  promoCode?: string;
  utmData?: string;
  legalFirstName?: string;
  legalLastName?: string;
  ssn?: string;
};

export type CheckoutCartInfo = {
  cartItems: CartItem[];
  cartUuid: string;
  impactClickId?: string;
};

export type CheckoutAmounts = {
  dueNow: number;
  taxDueNow: number;
  monthlyTotal: number;
  monthlyTax: number;
  subtotal: number;
  membershipFee: number;
  deliveryFee: number;
  promo: PromoInfo | null;
};

export interface CheckoutRequestPayload {
  checkoutInfo: CheckoutInfo;
  cartInfo: CheckoutCartInfo;
  amounts: CheckoutAmounts;
  stripeToken: Token | null;
}

export interface CheckoutSuccessResponse {
  id: number;
  type?: string;
}

export interface CheckoutSuccessPayload extends CheckoutSuccessResponse {
  checkoutInfo: CheckoutInfo;
  cartInfo: CheckoutCartInfo;
  amounts: CheckoutAmounts;
}

// Checkout Errors

export enum CheckoutErrors {
  StripeCardError = "StripeCardError",
  CustomerNotApproved = "Customer not approved.",
  SelfReportedIncomeRequiredError = "Self reported income required.",
  MaxTCVError = "Max cart price threshold exceeded.",
  OFACCheckFailed = "OFAC check failed.",
  AdditionalInformationRequired = "Additional customer details required.",
  CreditReportNotFound = "A matching credit report could not be found.",
  InvalidSSN = "Invalid ssn",
}

export enum StripeErrorCodes {
  CardDeclined = "card_declined",
  ExpiredCard = "expired_card",
  IncompleteCVC = "incomplete_cvc",
  IncompleteExpiry = "incomplete_expiry",
  IncompleteNumber = "incomplete_number",
  IncorrectCVC = "incorrect_cvc",
  IncorrectNumber = "incorrect_number",
  IncorrectZip = "incorrect_zip",
  InsufficientFunds = "insufficient_funds",
  InvalidCVC = "invalid_cvc",
  InvalidCardType = "invalid_card_type",
  InvalidExpiryMonth = "invalid_expiry_month",
  InvalidExpiryYear = "invalid_expiry_year",
  InvalidExpiryYearPast = "invalid_expiry_year_past",
  InvalidFunding = "invalid_funding",
  InvalidNumber = "invalid_number",
  NoToken = "no_token",
  PostalCodeInvalid = "postal_code_invalid",
  ProcessingError = "processing_error",
}

export const StripeCardZipErrors = {
  [StripeErrorCodes.PostalCodeInvalid]: true,
  [StripeErrorCodes.IncorrectZip]: true,
};

export enum UIErrorMessages {
  InvalidExpirationDate = "Invalid expiration month or year",
  InvalidCVC = "Invalid CVC / security code",
  InvalidCreditCardNumber = "Invalid credit card number",
  InvalidBillingZipCode = "Invalid billing zip code",
  CardDeclined = "The card was declined",
  InsufficientFunds = "The card has insufficient funds",
  GenericError = "An error occurred while processing your card. Please call us at (347) 352-8599 and we'll make it right.",
  ExpiredCard = "Your credit card is expired",
  InvalidFunding = "Prepaid cards are not accepted",
  CardTokenError = "Card token error. Please reload the checkout page. Your card has not been charged yet.",
}

export interface ItemUnavailableError {
  identifier: string;
  variantIdentifier: string;
  type: string;
}

export interface MaxTCVError {
  maxTCV: number;
  eligibleForDeposit: boolean;
}
export enum DepositOrigin {
  AdditionalUnderwriting = "Additional Underwriting",
  NoSSN = "No SSN",
}

export interface DepositRequestPayload {
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  originator: DepositOrigin;
  delivery: CheckoutDelivery;
  items: {
    title: string;
    variantName: string;
    rentalPrice: number;
  }[];
  planMonths: number; // currently 3 | 12
  promoCode?: string;
  maxTCV: number;
  depositAmount: number;
}

export interface AmountsRequestPayload {
  planMonths: number;
  promoCode?: string;
  subtotal: number;
  delivery: {
    area?: string;
    address1?: string;
    city?: string;
    region?: string;
    postal?: string;
  };
}

export interface AmountsSuccessPayload {
  deliveryFee: number;
  depositAmount: number;
  discountInfo: PromoInfo | null;
  displayTaxRate: number;
  monthlyFee: number;
  monthlySubtotal: number;
  taxDueMonthly: number;
  taxDueNow: number;
  totalDueMonthly: number;
  totalDueNow: number;
  orderTCV: number;
}

export interface ChangeStepPayload {
  step: CheckoutStep;
}
