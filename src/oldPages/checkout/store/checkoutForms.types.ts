import { CheckoutStateStep } from './checkout.types';

export interface CustomerInfoFields {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  persona: string | null;
}

export interface DeliveryInfoFields {
  streetAddress: string;
  apt?: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  googleDeliveryStreetAddress: string;
}

export interface BillingAddressInfoFields {
  billingStreetAddress: string;
  billingApt?: string;
  billingCity: string;
  billingState: string;
  billingPostalCode: string;
  googleBillingStreetAddress: string;
}

export interface SSNInfoFields {
  ssn?: string;
  legalFirstName?: string;
  legalLastName?: string;
}

export type CheckoutStepDataOptions = CustomerInfoFields | DeliveryInfoFields | BillingAddressInfoFields;

export type CheckoutStepAction<T = CheckoutStateStep, C = CheckoutStepDataOptions> = {
  step: T;
  data: C;
};

export type CheckoutFormDataPayload =
  | CheckoutStepAction<CheckoutStateStep.CustomerInfo, CustomerInfoFields>
  | CheckoutStepAction<CheckoutStateStep.DeliveryInfo, DeliveryInfoFields>
  | CheckoutStepAction<CheckoutStateStep.BillingAddress, BillingAddressInfoFields>;
