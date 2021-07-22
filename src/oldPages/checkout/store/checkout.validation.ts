import isEmail from "validator/lib/isEmail";
import { validateLegalName, validateSSN } from "./checkout.service";
import {
  BillingAddressInfoFields,
  CustomerInfoFields,
  DeliveryInfoFields,
  SSNInfoFields,
} from "./checkoutForms.types";
import isMobilePhone from "validator/lib/isMobilePhone";

export interface CustomerInfoErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export const validateCustomerInfo = (
  values: CustomerInfoFields
): CustomerInfoErrors => {
  const errors: CustomerInfoErrors = {};

  if (!values.firstName) {
    errors.firstName = "*required";
  }

  if (!values.lastName) {
    errors.lastName = "*required";
  }

  if (!values.email) {
    errors.email = "*required";
  }

  if (values.email && !isEmail(values.email)) {
    errors.email = "*invalid email";
  }

  return errors;
};

export interface SSNInfoErrors {
  ssn?: string;
  legalFirstName?: string;
  legalLastName?: string;
}

export const validateSSNInfo = (values: SSNInfoFields) => {
  const errors: SSNInfoErrors = {};

  if (!validateSSN(values.ssn)) {
    errors.ssn =
      "Invalid SSN Format. Please make sure your number is accurate and contains 9 digits";
  }

  if (!validateLegalName(values.legalFirstName)) {
    errors.legalFirstName =
      "Legal first name is required and must be less than 250 characters";
  }

  if (!validateLegalName(values.legalLastName)) {
    errors.legalLastName =
      "Legal last name is required and must be less than 250 characters";
  }

  return errors;
};

export interface DeliveryInfoErrors {
  streetAddress?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  phone?: string;
}

export const validateDeliveryInfo = (
  values: DeliveryInfoFields
): DeliveryInfoErrors => {
  const errors: DeliveryInfoErrors = {};

  if (!values.streetAddress) {
    errors.streetAddress = "*required";
  }

  if (!values.city) {
    errors.city = "*required";
  }

  if (!values.state) {
    errors.state = "*required";
  }

  if (!values.zipcode) {
    errors.zipcode = "*required";
  }

  if (values.zipcode && !values.zipcode.match(/^\d{5}$/)) {
    errors.zipcode = "*invalid zip code";
  }

  if (!values.phone) {
    errors.phone = "*required";
  }

  if (values.phone && !isMobilePhone(values.phone, "en-US")) {
    errors.phone = "*invalid phone number";
  }

  return errors;
};

export interface BillingAddressErrors {
  billingStreetAddress?: string;
  billingCity?: string;
  billingState?: string;
  billingPostalCode?: string;
}

export const validateBillingAddressInfo = (
  values: BillingAddressInfoFields
): BillingAddressErrors => {
  const errors: BillingAddressErrors = {};

  if (!values.billingStreetAddress) {
    errors.billingStreetAddress = "*required";
  }

  if (!values.billingCity) {
    errors.billingCity = "*required";
  }

  if (!values.billingState) {
    errors.billingState = "*required";
  }

  if (!values.billingPostalCode) {
    errors.billingPostalCode = "*required";
  }

  return errors;
};
