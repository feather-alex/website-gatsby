import { initialState } from "./checkout.reducer";
import { State as GlobalState } from "../../../types/ReduxState";
import { CheckoutState, CheckoutStep } from "./checkout.types";
import {
  getGenerateNewStripeToken,
  getIsPlacingOrder,
  getCardError,
  getItemsError,
  getServerError,
  getIsSSNNotValid,
  getIsSSNNotFound,
  getIsCreditNotFound,
  getMaxTCVError,
  getCustomerInfo,
  getDeliveryInfo,
  getBillingAddressInfo,
  getIsFetchingAmount,
  getAmountError,
  getTaxDueNow,
  getDeliveryFee,
  getMonthlyTotal,
  getMonthlyTax,
  getDueNow,
  getMembershipFee,
  getDepositAmount,
  getSSNInfo,
  getOrderTCV,
  getIsDeliverySameAsBilling,
  getCheckoutStep,
  getIsSubmittingDeposit,
  getDepositError,
} from "./checkout.selectors";

describe("Checkout selectors", () => {
  let state: CheckoutState;

  beforeEach(() => {
    state = { ...initialState };
  });

  it("should get whether we should generate a new stripe token", () => {
    expect(
      getGenerateNewStripeToken({ checkout: state } as GlobalState)
    ).toEqual(false);
  });

  it("should get whether an order is currently being placed", () => {
    expect(getIsPlacingOrder({ checkout: state } as GlobalState)).toEqual(
      false
    );
  });

  it("should get whether a deposit request is currently being submitted", () => {
    expect(getIsSubmittingDeposit({ checkout: state } as GlobalState)).toEqual(
      false
    );
  });

  it("should get the current card error", () => {
    expect(getCardError({ checkout: state } as GlobalState)).toEqual({
      error: null,
    });
  });

  it("should get the current items error", () => {
    expect(getItemsError({ checkout: state } as GlobalState)).toEqual(null);
  });

  it("should get the current server error", () => {
    expect(getServerError({ checkout: state } as GlobalState)).toEqual(null);
  });

  it("should get whether the SSN provided is invalid", () => {
    expect(getIsSSNNotValid({ checkout: state } as GlobalState)).toEqual(false);
  });

  it("should get whether the SSN provided was not found", () => {
    expect(getIsSSNNotFound({ checkout: state } as GlobalState)).toEqual(false);
  });

  it("should get whether an associated credit profile was not found", () => {
    expect(getIsCreditNotFound({ checkout: state } as GlobalState)).toEqual(
      false
    );
  });

  it("should get the max total cart value error", () => {
    expect(getMaxTCVError({ checkout: state } as GlobalState)).toEqual(null);
  });

  it("should get whether an amount is being fetched", () => {
    expect(getIsFetchingAmount({ checkout: state } as GlobalState)).toEqual(
      false
    );
  });

  it("should get amounts error", () => {
    expect(getAmountError({ checkout: state } as GlobalState)).toEqual(null);
  });

  it("should get tax due now", () => {
    const tax = 28;

    state = {
      ...state,
      taxDueNow: tax,
    };
    expect(getTaxDueNow({ checkout: state } as GlobalState)).toEqual(tax);
  });

  it("should get delivery fee", () => {
    const deliveryFee = 99;

    state = {
      ...state,
      deliveryFee,
    };

    expect(getDeliveryFee({ checkout: state } as GlobalState)).toEqual(
      deliveryFee
    );
  });

  it("should get monthly total", () => {
    const monthlyTotal = 256;

    state = {
      ...state,
      monthlyTotal,
    };

    expect(getMonthlyTotal({ checkout: state } as GlobalState)).toEqual(
      monthlyTotal
    );
  });

  it("should get monthly tax", () => {
    const tax = 28;

    state = {
      ...state,
      monthlyTax: tax,
    };
    expect(getMonthlyTax({ checkout: state } as GlobalState)).toEqual(tax);
  });

  it("should get amount due now", () => {
    const amount = 359;

    state = {
      ...state,
      dueNow: amount,
    };
    expect(getDueNow({ checkout: state } as GlobalState)).toEqual(amount);
  });

  it("should get membership fee", () => {
    const membershipFee = 19;

    state = {
      ...state,
      membershipFee,
    };

    expect(getMembershipFee({ checkout: state } as GlobalState)).toEqual(
      membershipFee
    );
  });

  it("should get deposit amount", () => {
    const depositAmount = 599;

    state = {
      ...state,
      depositAmount,
    };
    expect(getDepositAmount({ checkout: state } as GlobalState)).toEqual(
      depositAmount
    );
  });

  it("should get the Order TCV", () => {
    expect(getOrderTCV({ checkout: state } as GlobalState)).toEqual(0);
  });

  it("should get the customer info", () => {
    const info = {
      firstName: "me",
      lastName: "you",
      email: "me@mail.com",
      persona: null,
    };

    state = {
      ...state,
      customerInfo: info,
    };

    expect(getCustomerInfo({ checkout: state } as GlobalState)).toEqual(info);
  });

  it("should get the ssn info", () => {
    const info = {
      ssn: "078456633",
      legalFirstName: "Foo",
      legalLastName: "FooFoo",
    };

    state = {
      ...state,
      ssnInfo: info,
    };

    expect(getSSNInfo({ checkout: state } as GlobalState)).toEqual(info);
  });

  it("should get the delivery info", () => {
    const info = {
      streetAddress: "123 somewhere",
      city: "Here",
      state: "There",
      zipcode: "12345",
      phone: "1111111111",
      googleDeliveryStreetAddress: "123 somewhere, Here There",
    };

    state = {
      ...state,
      deliveryInfo: info,
    };

    expect(getDeliveryInfo({ checkout: state } as GlobalState)).toEqual(info);
  });

  it("should get the billing address info", () => {
    const info = {
      billingStreetAddress: "987 street",
      billingApt: "2b",
      billingCity: "New York",
      billingState: "NY",
      billingPostalCode: "10025",
      googleBillingStreetAddress: "987 street, New York NY",
    };

    state = {
      ...state,
      billingAddressInfo: info,
    };

    expect(getBillingAddressInfo({ checkout: state } as GlobalState)).toEqual(
      info
    );
  });

  it("should get if billing is the same as delivery", () => {
    expect(
      getIsDeliverySameAsBilling({ checkout: state } as GlobalState)
    ).toEqual(true);
  });

  it("should get the current Checkout step", () => {
    const step = CheckoutStep.BillingAddress;

    state = {
      ...state,
      step,
    };

    expect(getCheckoutStep({ checkout: state } as GlobalState)).toEqual(step);
  });

  it("should get the current deposit error", () => {
    expect(getDepositError({ checkout: state } as GlobalState)).toEqual(null);
  });
});
