import checkoutReducer, { initialState } from "./checkout.reducer";
import {
  processCheckout,
  processCheckoutAmounts,
  resetErrorsStateValues,
  checkoutStepCompleted,
  resetCheckoutForms,
  updateSSNInfo,
  toggleDeliverySameAsBilling,
  depositRequest,
} from "./checkout.actions";
import {
  CheckoutState,
  StripeErrorCodes,
  CheckoutErrors,
  UIErrorMessages,
  CheckoutStateStep,
  DepositRequestPayload,
  DepositOrigin,
} from "./checkout.types";
import {
  exampleAmountsRequestPayload,
  exampleAmountsSuccessPayload,
  exampleCheckoutRequestPayload,
} from "./checkout.fixtures";

describe("Checkout reducer", () => {
  let state: CheckoutState;

  beforeEach(() => {
    state = { ...initialState };
  });

  it("should handle a checkout request", () => {
    state = {
      ...state,
      itemsError: [
        {
          identifier: "ludlow-sofa",
          variantIdentifier: "default",
          type: "product",
        },
      ],
      serverError: {
        name: "Error",
        status: 500,
        error: "an error!",
        message: "",
      },
      cardError: { error: StripeErrorCodes.InsufficientFunds },
      generateNewStripeToken: true,
    };

    const action = processCheckout.request({
      ...exampleCheckoutRequestPayload,
    });
    const reduced = checkoutReducer(state, action);

    expect(reduced.itemsError).toEqual(null);
    expect(reduced.serverError).toEqual(null);
    expect(reduced.cardError).toEqual({ error: null });
    expect(reduced.generateNewStripeToken).toEqual(false);
    expect(reduced.isPlacingOrder).toEqual(true);
  });

  it("should handle a successful checkout", () => {
    state = {
      ...state,
      isPlacingOrder: true,
      itemsError: [
        {
          identifier: "ludlow-sofa",
          variantIdentifier: "default",
          type: "product",
        },
      ],
      serverError: {
        name: "Error",
        status: 500,
        error: "an error!",
        message: "",
      },
      cardError: { error: StripeErrorCodes.InsufficientFunds },
      isSSNNotFound: true,
      isSSNNotValid: true,
      isCreditNotFound: true,
    };

    const action = processCheckout.success({
      id: 10001000,
      ...exampleCheckoutRequestPayload,
    });
    const reduced = checkoutReducer(state, action);

    expect(reduced.itemsError).toEqual(null);
    expect(reduced.serverError).toEqual(null);
    expect(reduced.cardError).toEqual({ error: null });
    expect(reduced.depositError).toEqual(null);
    expect(reduced.isSSNNotFound).toEqual(false);
    expect(reduced.isSSNNotValid).toEqual(false);
    expect(reduced.isCreditNotFound).toEqual(false);
    expect(reduced.isPlacingOrder).toEqual(false);
  });

  describe("Handling unsuccessful checkout", () => {
    const unknownErrorCode = "unknown_code";
    it.each`
      errorCode                              | expectedErrorMessage
      ${StripeErrorCodes.InvalidExpiryMonth} | ${UIErrorMessages.InvalidExpirationDate}
      ${StripeErrorCodes.InvalidExpiryYear}  | ${UIErrorMessages.InvalidExpirationDate}
      ${StripeErrorCodes.InvalidCVC}         | ${UIErrorMessages.InvalidCVC}
      ${StripeErrorCodes.IncorrectCVC}       | ${UIErrorMessages.InvalidCVC}
      ${StripeErrorCodes.IncorrectNumber}    | ${UIErrorMessages.InvalidCreditCardNumber}
      ${StripeErrorCodes.IncorrectZip}       | ${UIErrorMessages.InvalidBillingZipCode}
      ${StripeErrorCodes.CardDeclined}       | ${UIErrorMessages.CardDeclined}
      ${StripeErrorCodes.InsufficientFunds}  | ${UIErrorMessages.InsufficientFunds}
      ${StripeErrorCodes.ProcessingError}    | ${UIErrorMessages.GenericError}
      ${StripeErrorCodes.ExpiredCard}        | ${UIErrorMessages.ExpiredCard}
      ${StripeErrorCodes.InvalidFunding}     | ${UIErrorMessages.InvalidFunding}
      ${StripeErrorCodes.NoToken}            | ${UIErrorMessages.CardTokenError}
      ${unknownErrorCode}                    | ${UIErrorMessages.GenericError}
    `(
      "should handle the stripe error $errorCode",
      ({ errorCode, expectedErrorMessage }) => {
        const action = processCheckout.failure({
          name: "Error",
          status: 400,
          error: "Stripe Processing Error",
          message: "A payment error",
          body: {
            data: { type: CheckoutErrors.StripeCardError, code: errorCode },
          },
        });
        const reduced = checkoutReducer(state, action);

        expect(reduced.isPlacingOrder).toBeFalsy();
        expect(reduced.generateNewStripeToken).toBeTruthy();
        expect(reduced.cardError.error).toEqual(expectedErrorMessage);
      }
    );

    it("should handle the items out of stock error", () => {
      const unavailableItems = [
        {
          identifier: "clarkson-side-table",
          variantIdentifier: "oak",
          type: "product",
        },
      ];

      const action = processCheckout.failure({
        name: "Error",
        status: 400,
        error: "Items out of stock",
        message: "some items are no longer available",
        body: {
          data: {
            items: unavailableItems,
          },
        },
      });
      const reduced = checkoutReducer(state, action);

      expect(reduced.isPlacingOrder).toBeFalsy();
      expect(reduced.generateNewStripeToken).toBeTruthy();
      expect(reduced.itemsError).toEqual(unavailableItems);
    });

    it("should handle the customer not approved error", () => {
      // set boolean values that we want to ensure we reset
      state = {
        ...state,
        isSSNNotFound: true,
        isSSNNotValid: true,
        isCreditNotFound: true,
      };
      const action = processCheckout.failure({
        name: "Error",
        status: 400,
        error: "not approved",
        message: "customer score does not exceed standards",
        body: {
          data: {
            message: CheckoutErrors.CustomerNotApproved,
          },
        },
      });
      const reduced = checkoutReducer(state, action);

      expect(reduced.isPlacingOrder).toBeFalsy();
      expect(reduced.generateNewStripeToken).toBeTruthy();
      expect(reduced.isSSNNotValid).toBeFalsy();
      expect(reduced.isSSNNotFound).toBeFalsy();
      expect(reduced.isCreditNotFound).toBeFalsy();
      expect(reduced.maxTCVError).toBeNull();
    });

    it("should handle the OFAC check failed error", () => {
      // set boolean values that we want to ensure we reset
      state = {
        ...state,
        isSSNNotFound: true,
        isSSNNotValid: true,
        isCreditNotFound: true,
      };
      const action = processCheckout.failure({
        name: "Error",
        status: 400,
        error: "OFAC check failed",
        message: "customer failed OFAC check",
        body: {
          data: {
            message: CheckoutErrors.OFACCheckFailed,
          },
        },
      });
      const reduced = checkoutReducer(state, action);

      expect(reduced.isPlacingOrder).toBeFalsy();
      expect(reduced.generateNewStripeToken).toBeTruthy();
      expect(reduced.isSSNNotValid).toBeFalsy();
      expect(reduced.isSSNNotFound).toBeFalsy();
      expect(reduced.isCreditNotFound).toBeFalsy();
      expect(reduced.maxTCVError).toBeNull();
    });

    it("should handle the additional information required error", () => {
      // set boolean values that we want to ensure we reset
      state = {
        ...state,
        isSSNNotFound: true,
        isSSNNotValid: true,
        isCreditNotFound: false,
      };
      const action = processCheckout.failure({
        name: "Error",
        status: 400,
        error: "Could not find credit report",
        message: "More information required",
        body: {
          data: {
            message: CheckoutErrors.AdditionalInformationRequired,
          },
        },
      });
      const reduced = checkoutReducer(state, action);

      expect(reduced.isPlacingOrder).toBeFalsy();
      expect(reduced.generateNewStripeToken).toBeTruthy();
      expect(reduced.isSSNNotValid).toBeFalsy();
      expect(reduced.isSSNNotFound).toBeFalsy();
      expect(reduced.isCreditNotFound).toBeTruthy();
      expect(reduced.maxTCVError).toBeNull();
    });

    it("should handle the max total cart value error", () => {
      // set boolean values that we want to ensure we reset
      state = {
        ...state,
        maxTCVError: null,
      };
      const action = processCheckout.failure({
        name: "Error",
        status: 400,
        error: "Max cart price threshold exceeded.",
        message: "More information required",
        body: {
          data: {
            message: CheckoutErrors.MaxTCVError,
            eligibleForDeposit: true,
            maxTCV: 4950,
          },
        },
      });
      const reduced = checkoutReducer(state, action);

      expect(reduced.isPlacingOrder).toBeFalsy();
      expect(reduced.generateNewStripeToken).toBeTruthy();
      expect(reduced.isSSNNotValid).toBeFalsy();
      expect(reduced.isSSNNotFound).toBeFalsy();
      expect(reduced.isCreditNotFound).toBeFalsy();
      expect(reduced.maxTCVError).toEqual({
        maxTCV: 4950,
        eligibleForDeposit: true,
      });
    });

    it("should handle the credit report not found error", () => {
      // set boolean values that we want to ensure we reset
      state = {
        ...state,
        isSSNNotFound: false,
        isSSNNotValid: true,
        isCreditNotFound: true,
      };
      const action = processCheckout.failure({
        name: "Error",
        status: 400,
        error: "Could not find credit report",
        message: "No more information will help find the report",
        body: {
          data: {
            message: CheckoutErrors.CreditReportNotFound,
          },
        },
      });
      const reduced = checkoutReducer(state, action);

      expect(reduced.isPlacingOrder).toBeFalsy();
      expect(reduced.generateNewStripeToken).toBeTruthy();
      expect(reduced.isSSNNotValid).toBeFalsy();
      expect(reduced.isSSNNotFound).toBeTruthy();
      expect(reduced.isCreditNotFound).toBeFalsy();
      expect(reduced.maxTCVError).toBeNull();
    });

    it("should handle the invalid SSN error", () => {
      // set boolean values that we want to ensure we reset
      state = {
        ...state,
        isSSNNotFound: true,
        isSSNNotValid: false,
        isCreditNotFound: false,
      };
      const action = processCheckout.failure({
        name: "Error",
        status: 400,
        error: "Invalid SSN format",
        message: "The SSN entered is invalid",
        body: {
          data: {
            message: CheckoutErrors.InvalidSSN,
          },
        },
      });
      const reduced = checkoutReducer(state, action);

      expect(reduced.isPlacingOrder).toBeFalsy();
      expect(reduced.generateNewStripeToken).toBeTruthy();
      expect(reduced.isSSNNotValid).toBeTruthy();
      expect(reduced.isSSNNotFound).toBeFalsy();
      expect(reduced.isCreditNotFound).toBeFalsy();
      expect(reduced.maxTCVError).toBeNull();
    });

    it("should handle an unknown 400 level error for which we do not have a case", () => {
      // set boolean values that we want to ensure we reset
      state = {
        ...state,
        isSSNNotFound: true,
        isSSNNotValid: true,
        isCreditNotFound: true,
      };
      const error = {
        name: "Error",
        status: 400,
        error: "Unknown Error",
        message: "An unknown error occurred on the server",
        body: {
          data: {
            message: `Request included something bad, m'kay`,
          },
        },
      };
      const action = processCheckout.failure(error);
      const reduced = checkoutReducer(state, action);

      expect(reduced.isPlacingOrder).toBeFalsy();
      expect(reduced.generateNewStripeToken).toBeTruthy();
      expect(reduced.isSSNNotValid).toBeFalsy();
      expect(reduced.isSSNNotFound).toBeFalsy();
      expect(reduced.isCreditNotFound).toBeFalsy();
      expect(reduced.maxTCVError).toBeNull();
      expect(reduced.serverError).toEqual(error);
    });

    it("should handle an unknown 500 level error", () => {
      // set boolean values that we want to ensure we reset
      state = {
        ...state,
        isSSNNotFound: true,
        isSSNNotValid: true,
        isCreditNotFound: true,
      };
      const error = {
        name: "Error",
        status: 500,
        error: "Server Error",
        message: "An unknown error occurred on the server",
        body: {
          data: {
            message: `Something real bad happened, m'kay`,
          },
        },
      };
      const action = processCheckout.failure(error);
      const reduced = checkoutReducer(state, action);

      expect(reduced.isPlacingOrder).toBeFalsy();
      expect(reduced.generateNewStripeToken).toBeTruthy();
      expect(reduced.isSSNNotValid).toBeFalsy();
      expect(reduced.isSSNNotFound).toBeFalsy();
      expect(reduced.isCreditNotFound).toBeFalsy();
      expect(reduced.maxTCVError).toBeNull();
      expect(reduced.serverError).toEqual(error);
    });
  });

  describe("Handling successful deposits", () => {
    it("should set isSubmittingDeposit flag to true", () => {
      const payload: DepositRequestPayload = {
        customer: {
          email: "email",
          firstName: "firstName",
          lastName: "lastName",
          phone: "11111111",
        },
        originator: DepositOrigin.AdditionalUnderwriting,
        delivery: {
          area: "nyc",
          address1: "somewhere over the rainbow",
          city: "ny",
          region: "",
          postal: "10001",
        },
        items: [],
        planMonths: 3,
        maxTCV: 0,
        depositAmount: 1500,
      };

      const action = depositRequest.request(payload);
      const reduced = checkoutReducer(state, action);

      expect(reduced.isSubmittingDeposit).toEqual(true);
    });

    it("should set isSubmittingDeposit flag to false after success", () => {
      state = {
        ...state,
        isSubmittingDeposit: true,
      };

      const action = depositRequest.success({});
      const reduced = checkoutReducer(state, action);

      expect(reduced.isSubmittingDeposit).toEqual(false);
    });
  });

  describe("Handling unsuccessful deposit request", () => {
    const error = {
      name: "Error",
      status: 500,
      error: "Unknown Error",
      message: "An unknown error occurred on the server",
      body: {
        data: {
          message: `Request included something bad, m'kay`,
        },
      },
    };

    it("should handle server error", () => {
      state = {
        ...state,
        depositError: null,
      };

      const action = depositRequest.failure(error);
      const reduced = checkoutReducer(state, action);

      expect(reduced.depositError).toEqual(error);
    });

    it("should only set server error to null after success", () => {
      state = {
        ...state,
        depositError: error,
      };

      const action = depositRequest.success({});
      const reduced = checkoutReducer(state, action);

      expect(reduced.depositError).toEqual(null);
    });
  });

  describe("Handling resetting of all error state properties", () => {
    it("should reset all possible errors to their defaults", () => {
      state = {
        ...state,
        isSSNNotFound: true,
        isSSNNotValid: true,
        isCreditNotFound: true,
        serverError: {
          name: "Error",
          error: "An error",
          message: "something bad happened",
          status: 500,
        },
        itemsError: [
          {
            type: "product",
            identifier: "ogden-bookcase",
            variantIdentifier: "honey",
          },
        ],
        depositError: {
          name: "Error",
          error: "An error",
          message: "something bad happened",
          status: 500,
        },
        maxTCVError: { eligibleForDeposit: false, maxTCV: 1000 },
        cardError: {
          error: "The security code was incorrect",
        },
      };

      const action = resetErrorsStateValues();
      const reduced = checkoutReducer(state, action);

      expect(reduced.isSSNNotFound).toBeFalsy();
      expect(reduced.isSSNNotValid).toBeFalsy();
      expect(reduced.isCreditNotFound).toBeFalsy();
      expect(reduced.serverError).toEqual(null);
      expect(reduced.itemsError).toEqual(null);
      expect(reduced.depositError).toEqual(null);
      expect(reduced.maxTCVError).toEqual(null);
      expect(reduced.cardError).toEqual({ error: null });
    });
  });

  it("should handle an amounts request", () => {
    const action = processCheckoutAmounts.request(exampleAmountsRequestPayload);
    const reduced = checkoutReducer(state, action);

    expect(reduced.isFetchingAmount).toEqual(true);
    expect(reduced.amountError).toEqual(null);
  });

  it("should handle a successful amounts request", () => {
    const action = processCheckoutAmounts.success(exampleAmountsSuccessPayload);
    const reduced = checkoutReducer(state, action);

    expect(reduced.isFetchingAmount).toEqual(false);
    expect(reduced.amountError).toEqual(null);
    expect(reduced.taxDueNow).toEqual(0);
    expect(reduced.deliveryFee).toEqual(0);
    expect(reduced.monthlyTotal).toEqual(185);
    expect(reduced.monthlyTax).toEqual(0);
    expect(reduced.dueNow).toEqual(185);
    expect(reduced.membershipFee).toEqual(19);
    expect(reduced.depositAmount).toEqual(300);
    expect(reduced.orderTCV).toEqual(555);
  });

  it("should handle a failed amounts request", () => {
    const mockError = {
      name: "Error",
      status: 500,
      message: "A lil copy pasta never hurt nobody!",
      error: "Server Error",
    };
    const action = processCheckoutAmounts.failure(mockError);
    const reduced = checkoutReducer(state, action);

    expect(reduced.isFetchingAmount).toEqual(false);
    expect(reduced.amountError).toEqual(mockError);
  });

  describe("Completing a checkout step", () => {
    it("should add the corresponding data", () => {
      const data = {
        firstName: "me",
        lastName: "you",
        email: "me@mail.com",
        persona: null,
      };

      const action = checkoutStepCompleted({
        step: CheckoutStateStep.CustomerInfo,
        data,
      });
      const reduced = checkoutReducer(state, action);

      expect(reduced.customerInfo.firstName).toEqual(data.firstName);
      expect(reduced.customerInfo.lastName).toEqual(data.lastName);
      expect(reduced.customerInfo.email).toEqual(data.email);
    });
  });

  describe("Handling resetting the Checkout forms values", () => {
    it("should reset SNN values to the initial state, empty strings", () => {
      state = {
        ...state,
        customerInfo: {
          firstName: "me",
          lastName: "you",
          email: "me@mail.com",
          company: "feather",
          persona: null,
        },
        deliveryInfo: {
          streetAddress: "123 somewhere",
          city: "Here",
          state: "There",
          zipcode: "12345",
          phone: "1111111111",
          googleDeliveryStreetAddress: "123 somewhere. Here There",
        },
        billingAddressInfo: {
          billingStreetAddress: "987 street",
          billingApt: "2b",
          billingCity: "New York",
          billingState: "NY",
          billingPostalCode: "10025",
          googleBillingStreetAddress: "987 street, New York NY",
        },
      };

      const action = resetCheckoutForms();
      const reduced = checkoutReducer(state, action);

      expect(reduced.customerInfo).toEqual(initialState.customerInfo);
      expect(reduced.deliveryInfo).toEqual(initialState.deliveryInfo);
      expect(reduced.billingAddressInfo).toEqual(
        initialState.billingAddressInfo
      );
    });
  });

  describe("Updating SSN Info", () => {
    it("should add the corresponding info", () => {
      const data = {
        ssn: "045678832",
        legalFirstName: "Bar",
        legalLastName: "Foo",
      };

      const action = updateSSNInfo(data);
      const reduced = checkoutReducer(state, action);

      expect(reduced.ssnInfo.ssn).toEqual(data.ssn);
      expect(reduced.ssnInfo.legalFirstName).toEqual(data.legalFirstName);
      expect(reduced.ssnInfo.legalLastName).toEqual(data.legalLastName);
    });
  });

  describe("Update Delivery is same as Billing", () => {
    it("should toggle isDeliverySameAsBilling correctly", () => {
      const action = toggleDeliverySameAsBilling();
      const reduced = checkoutReducer(state, action);

      expect(reduced.isDeliverySameAsBilling).toEqual(false);
    });
  });
});
