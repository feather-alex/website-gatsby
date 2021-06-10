import { validateEmail } from '../../../auth/auth.validator';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { ValidationMessage, PersonalInfoRequestResource } from './personal.information.types';

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validatePhone = (phone: any) => {
  let error = undefined;

  if (!phone) {
    error = ValidationMessage.requirePhone;
  } else if (!isMobilePhone(phone, 'en-US')) {
    error = ValidationMessage.invalidPhone;
  }
  return error;
};

export const validate = (values: PersonalInfoRequestResource) => {
  return {
    email: validateEmail(values.email),
    phone: validatePhone(values.phone)
  };
};
