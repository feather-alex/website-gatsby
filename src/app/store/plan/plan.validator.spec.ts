import { validateZipcode, ValidationMessage } from "./plan.validator";

describe("Plan - Validators", () => {
  describe("Zipcode validations", () => {
    it("should return a zip code required error message", () => {
      const zipcode = "";
      const validationMessage = validateZipcode(zipcode);

      expect(validationMessage).toEqual(ValidationMessage.requireZipcode);
    });

    it("should return an invalid zip code message", () => {
      const zipcode = "notvalid";
      const validationMessage = validateZipcode(zipcode);

      expect(validationMessage).toEqual(ValidationMessage.invalidZipcode);
    });

    it("should return an invalid zip code message", () => {
      const zipcode = "12";
      const validationMessage = validateZipcode(zipcode);

      expect(validationMessage).toEqual(ValidationMessage.invalidZipcode);
    });

    it("should not return an error when zip code is valid", () => {
      const zipcode = "12345";
      const validationMessage = validateZipcode(zipcode);

      expect(validationMessage).toEqual(undefined);
    });
  });
});
