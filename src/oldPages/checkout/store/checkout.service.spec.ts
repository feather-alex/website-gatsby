import {
  validateLegalName,
  validateSSN,
  getMaxTCVMonthlyCartTotal,
  getRemovalAmountToMeetMaxTCV,
  cartItemTotalMinimumMet,
  formatCurrency,
  getTaxDeliveryInfo,
} from "./checkout.service";

describe("Checkout service", () => {
  describe("Validating legal names", () => {
    it("should return false if the name is undefined", () => {
      const name = undefined;
      expect(validateLegalName(name)).toBeFalsy();
    });

    it("should return false if the name is longer than 250 characters", () => {
      const name =
        "value that is supposed to be longer than two hundred and fifty characters long so I will just keep typing out characters until I reach that limit. turns out it is a lot of characters, but using the word characters really helps in reaching that length!";
      expect(name.length).toEqual(251);
      expect(validateLegalName(name)).toBeFalsy();
    });

    it("should return false if the name is an empty string", () => {
      const name = "";
      expect(validateLegalName(name)).toBeFalsy();
    });

    it("should return true if the name is 1 character", () => {
      const name = "a";
      expect(validateLegalName(name)).toBeTruthy();
    });

    it("should return false if the name is 250 characters", () => {
      const name =
        "value that is supposed to be longer than two hundred and fifty characters long so I will just keep typing out characters until I reach that limit. turns out it is a lot of characters, but using the word characters really helps in reaching that length";
      expect(name.length).toEqual(250);
      expect(validateLegalName(name)).toBeFalsy();
    });
  });

  describe("Validating SSN", () => {
    it("should return false if the SSN is undefined", () => {
      const ssn = undefined;
      expect(validateSSN(ssn)).toBeFalsy();
    });

    it("should return false if the SSN is not 9 digits", () => {
      const ssn = "12345678";
      expect(validateSSN(ssn)).toBeFalsy();
    });

    it("should return true if the SSN is 9 digits", () => {
      const ssn = "123456789";
      expect(validateSSN(ssn)).toBeTruthy();
    });
  });

  describe("getMaxTCVMonthlyCartTotal()", () => {
    it("should return the monthly max for a max total cart value (12 months of payments)", () => {
      const maxTotalContractValue = 2100;
      const rentalLength = 12;

      const actual = getMaxTCVMonthlyCartTotal(
        maxTotalContractValue,
        rentalLength
      );

      expect(actual).toBe(175);
    });
  });

  describe("getRemovalAmountToMeetMaxTCV()", () => {
    it("should return the value that needs to be removed from a monthly cart total to meet TCV", () => {
      const maxMonthlyTotal = 175;
      const cartTotal = 200;

      const actual = getRemovalAmountToMeetMaxTCV(maxMonthlyTotal, cartTotal);

      expect(actual).toBe(25);
    });
  });

  describe("cartItemTotalMinimumMet()", () => {
    it("should return false if the rental length is 12 months and monthly total is less than 29", () => {
      const cartTotal = 28;
      const rentalLength = 12;

      const actual = cartItemTotalMinimumMet(rentalLength, cartTotal);

      expect(actual).toBeFalsy();
    });

    it("should return true if the rental length is 12 months and monthly total is greater than or equal to 29", () => {
      const cartTotal = 29;
      const rentalLength = 12;

      const actual = cartItemTotalMinimumMet(rentalLength, cartTotal);

      expect(actual).toBeTruthy();
    });

    it("should return false if the rental length is less than 12 months and monthly total is less than 99", () => {
      const cartTotal = 98;
      const rentalLength = 3;

      const actual = cartItemTotalMinimumMet(rentalLength, cartTotal);

      expect(actual).toBeFalsy();
    });

    it("should return true if the rental length is less than 12 months and monthly total is greater than or equal to 99", () => {
      const cartTotal = 99;
      const rentalLength = 3;

      const actual = cartItemTotalMinimumMet(rentalLength, cartTotal);

      expect(actual).toBeTruthy();
    });
  });

  describe("formatCurrency()", () => {
    it("should return a value with 2 decimal places", () => {
      expect(formatCurrency(1215.33333)).toBe("1,215.33");
      expect(formatCurrency(150215)).toBe("150,215.00");
      expect(formatCurrency(337)).toBe("337.00");
    });
  });

  describe("getTaxDeliveryInfo()", () => {
    it("should return a non-empty object if all input strings are present and not empty", () => {
      const address = "5 Front St.";
      const city = "NYC";
      const region = "NY";
      const postal = "10012";
      expect(getTaxDeliveryInfo(address, city, region, postal)).toEqual({
        address1: address,
        city,
        region,
        postal,
      });
    });

    it("should return a empty object if input strings are empty", () => {
      const address = "";
      const city = "";
      const region = "";
      const postal = "";
      expect(getTaxDeliveryInfo(address, city, region, postal)).toEqual({});
    });

    it("should return a empty object if there is no input", () => {
      expect(getTaxDeliveryInfo()).toEqual({});
    });
  });
});
