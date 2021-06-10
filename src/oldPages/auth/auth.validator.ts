import isEmail from 'validator/lib/isEmail';

export enum ValidationMessage {
  requireEmail = 'Email is required',
  requirePassword = 'Password is required',
  requireConfirmPassword = 'Confirm password is required',
  invalidEmail = 'Invalid email',
  invalidPasswordLowercase = 'Must contain at least one lowercase letter',
  invalidPasswordUppercase = 'Must contain at least one uppercase letter',
  invalidPasswordNumber = 'Must contain at least one number (0-9)',
  invalidPasswordLength = 'Must be at least 8 characters',
  passwordMismatch = 'Passwords do not match'
}

export const validateEmail = (email: string) => {
  let error = undefined;

  if (!email) {
    error = ValidationMessage.requireEmail;
  } else if (!isEmail(email)) {
    error = ValidationMessage.invalidEmail;
  }
  return error;
};

const containsLowercaseLetter = (password: string) => /[a-z]+/.test(password);

const containsUppercaseLetter = (password: string) => /[A-Z]+/.test(password);

const containsNumber = (password: string) => /[0-9]+/.test(password);

const meetsLength = (password: string) => password.length >= 8;

export const validatePassword = (password: string) => {
  let error = undefined;

  if (!password) {
    error = ValidationMessage.requirePassword;
  } else if (!containsLowercaseLetter(password)) {
    error = ValidationMessage.invalidPasswordLowercase;
  } else if (!containsUppercaseLetter(password)) {
    error = ValidationMessage.invalidPasswordUppercase;
  } else if (!containsNumber(password)) {
    error = ValidationMessage.invalidPasswordNumber;
  } else if (!meetsLength(password)) {
    error = ValidationMessage.invalidPasswordLength;
  }

  return error;
};

export const validatePasswordConfirm = (password: string, passwordConfirm: string) => {
  let error = undefined;

  if (!passwordConfirm) {
    error = ValidationMessage.requireConfirmPassword;
  } else if (passwordConfirm !== password) {
    error = ValidationMessage.passwordMismatch;
  }

  return error;
};
