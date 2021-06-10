import { ContactFormData } from './contact.types';
import isEmail from 'validator/lib/isEmail';

export const validateRequired = (value: string | undefined) => {
  if (!value) {
    return '*required';
  }

  return undefined;
};

export const validateEmailAddress = (emailAddress: string | undefined) => {
  if (!emailAddress) {
    return '*required';
  }

  if (emailAddress && !isEmail(emailAddress)) {
    return '*invalid email';
  }

  return undefined;
};

export const validateMessageBody = (messageBody: string | undefined) => {
  if (!messageBody) {
    return '*required';
  }

  if (messageBody.length < 10) {
    return '*must be more than 10 characters';
  }

  if (messageBody.length > 2000) {
    return '*must be fewer than 2,000 characters';
  }

  return undefined;
};

export const validateForm = (values: ContactFormData) => ({
  fullName: validateRequired(values.fullName),
  messageBody: validateMessageBody(values.messageBody),
  emailAddress: validateEmailAddress(values.emailAddress),
  reasonForInquiry: validateRequired(values.reasonForInquiry)
});
