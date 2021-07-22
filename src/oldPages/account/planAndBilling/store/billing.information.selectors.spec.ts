import { State as GlobalState } from "../../../../types/ReduxState";
import { BillingInformation } from "./billing.information.types";
import { initialState } from "./billing.information.reducer";
import * as selectors from "./billing.information.selectors";

describe("Billing info - Selectors", () => {
  const defaultSource = {
    id: "somecardno",
    sourceType: "card",
    lastFour: "5746",
    expMonth: 9,
    expYear: 22,
  };
  const billingInfo: BillingInformation = {
    isFetching: false,
    error: null,
    sources: [defaultSource],
    defaultSource,
    startDate: 1572274970,
  };

  let state: BillingInformation;

  beforeEach(() => {
    state = { ...initialState };
  });

  it("should return if we are currently fetching", () => {
    const isFetching = selectors.isFetching({
      accounts: { billingInformation: state },
    } as GlobalState);
    expect(isFetching).toEqual(billingInfo.isFetching);
    expect(isFetching).toEqual(false);
  });

  it("should return the current error", () => {
    const error = selectors.getError({
      accounts: { billingInformation: state },
    } as GlobalState);
    expect(error).toEqual(billingInfo.error);
    expect(error).toBeNull();
  });

  it("should return the default source", () => {
    state = {
      ...state,
      defaultSource,
      sources: [defaultSource],
    };
    const selectedDefaultSource = selectors.getDefaultSource({
      accounts: { billingInformation: state },
    } as GlobalState);
    expect(selectedDefaultSource).toEqual(defaultSource);
  });

  it("should return all sources", () => {
    state = {
      ...state,
      defaultSource,
      sources: [defaultSource],
    };
    const sources = selectors.getSources({
      accounts: { billingInformation: state },
    } as GlobalState);
    expect(sources).toEqual(billingInfo.sources);
  });

  it("should return the billing start date", () => {
    state = {
      ...state,
      startDate: 123456789,
    };
    const startDate = selectors.getBillingStartDate({
      accounts: { billingInformation: state },
    } as GlobalState);
    expect(startDate).toEqual("29th of the month");
  });
});
