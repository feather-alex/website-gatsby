import { validateEmail, validatePassword, validatePasswordConfirm, ValidationMessage } from './auth.validator';

describe('Authentication Form Validators', () => {
  describe('Email validation', () => {
    it('should return an email required error message', () => {
      const email = '';
      const validationMessage = validateEmail(email);
      expect(validationMessage).toEqual(ValidationMessage.requireEmail);
    });

    it('should return an invalid email error message', () => {
      const email = 'notvalidemail';
      const validationMessage = validateEmail(email);
      expect(validationMessage).toEqual(ValidationMessage.invalidEmail);
    });

    it('should return an invalid email error message', () => {
      const email = 'notvalid@n.c';
      const validationMessage = validateEmail(email);
      expect(validationMessage).toEqual(ValidationMessage.invalidEmail);
    });

    it('should pass when email is valid', () => {
      const email = 'test@email.com';
      const validationMessage = validateEmail(email);
      expect(validationMessage).toEqual(undefined);
    });
  });

  describe('Password validation', () => {
    it('should return the correct error message when no password is provided', () => {
      const password = '';
      const validationMessage = validatePassword(password);
      expect(validationMessage).toEqual(ValidationMessage.requirePassword);
    });

    it('should return the correct error message when there are no lowercase letters', () => {
      const password = '123NDK';
      const validationMessage = validatePassword(password);
      expect(validationMessage).toEqual(ValidationMessage.invalidPasswordLowercase);
    });

    it('should return the correct error message when there are no uppercase letters', () => {
      const password = '123cwek';
      const validationMessage = validatePassword(password);
      expect(validationMessage).toEqual(ValidationMessage.invalidPasswordUppercase);
    });

    it('should return the correct error message when there are no numbers', () => {
      const password = 'adkENL';
      const validationMessage = validatePassword(password);
      expect(validationMessage).toEqual(ValidationMessage.invalidPasswordNumber);
    });

    it('should return the correct error message when there are too few characters', () => {
      const password = 'No83D';
      const validationMessage = validatePassword(password);
      expect(validationMessage).toEqual(ValidationMessage.invalidPasswordLength);
    });

    it('should return no error message when it is a valid password', () => {
      const password = 'Accounts1';
      const validationMessage = validatePassword(password);
      expect(validationMessage).toEqual(undefined);
    });
  });

  describe('Password confirm validation', () => {
    const password = 'Accounts1';
    it('should return an error message that confirm password is required', () => {
      const passwordConfirm = '';
      const validationMessage = validatePasswordConfirm(password, passwordConfirm);
      expect(validationMessage).toEqual(ValidationMessage.requireConfirmPassword);
    });

    it('should return an error message that the confirm password does not match', () => {
      const passwordConfirm = 'Accounts2';
      const validationMessage = validatePasswordConfirm(password, passwordConfirm);
      expect(validationMessage).toEqual(ValidationMessage.passwordMismatch);
    });

    it('should return no error message when the confirm password matches the password', () => {
      const passwordConfirm = 'Accounts1';
      const validationMessage = validatePasswordConfirm(password, passwordConfirm);
      expect(validationMessage).toEqual(undefined);
    });
  });
});
