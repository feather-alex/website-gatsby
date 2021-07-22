import * as validators from "./personal.information.validator";
import { ValidationMessage } from "./personal.information.types";
import {
  validateEmail,
  ValidationMessage as AuthValidationMessage,
} from "../../../auth/auth.validator";

describe("Personal information - Validators", () => {
  it("should require phone", () => {
    const phone = "";
    const validationMessage = validators.validatePhone(phone);
    expect(validationMessage).toEqual(ValidationMessage.requirePhone);
  });

  it("should fail if invalid phone is entered", () => {
    const phone = "1234";
    const validationMessage = validators.validatePhone(phone);
    expect(validationMessage).toEqual(ValidationMessage.invalidPhone);
  });

  it("should succeed if phone is valid", () => {
    const phone = "2345679887";
    const validationMessage = validators.validatePhone(phone);
    expect(validationMessage).toEqual(undefined);
  });

  it("should require email", () => {
    const email = "";
    const validationMessage = validateEmail(email);
    expect(validationMessage).toEqual(AuthValidationMessage.requireEmail);
  });

  it("should fail if email is invalid", () => {
    const email = "notvalidemail";
    const validationMessage = validateEmail(email);
    expect(validationMessage).toEqual(AuthValidationMessage.invalidEmail);
  });

  it("should pass if emai is valid", () => {
    const email = "test@email.com";
    const validationMessage = validateEmail(email);
    expect(validationMessage).toEqual(undefined);
  });

  it("should fail when phone and email are invalid", () => {
    const email = "notanemail";
    const phone = "123";
    const validationMessages = validators.validate({ email, phone });
    expect(validationMessages).toEqual({
      email: AuthValidationMessage.invalidEmail,
      phone: ValidationMessage.invalidPhone,
    });
  });

  it("should pass when phone and email are valid", () => {
    const email = "definately@nemail.address";
    const phone = "9876543442";
    const validationMessages = validators.validate({ email, phone });
    expect(validationMessages).toEqual({ email: undefined, phone: undefined });
  });
});
