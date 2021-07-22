import reducer, { initialState } from "./plan.reducer";
import * as actions from "./plan.actions";
import { APIError } from "../../../types/ReduxState";
import { Plan, MembershipState, DeliveryAreaIdentifier } from "./plan.types";
import { NEWSLETTER_SIGNUP_SUCCESS } from "../newsletter-signup/newsletter.signup.actions";

describe("Plan - Reducer", () => {
  let state: Plan;

  beforeEach(() => (state = { ...initialState }));

  it("should handle change membership action", () => {
    const action: actions.PlanActionTypes = {
      type: actions.CHANGE_MEMBERSHIP_SELECTION,
      payload: { membershipState: MembershipState.MEMBER },
    };

    const planState = reducer(state, action);

    expect(planState.membershipState).toEqual(MembershipState.MEMBER);
    expect(planState.cartMinimum).toEqual(29);
    expect(planState.rentalLength).toEqual(12);
    expect(planState.deliveryFee).toEqual(0);
    expect(planState.monthlyMembershipFee).toEqual(19);
  });

  it("should handle change to non membership action", () => {
    const action: actions.PlanActionTypes = {
      type: actions.CHANGE_MEMBERSHIP_SELECTION,
      payload: { membershipState: MembershipState.NON_MEMBER },
    };

    const planState = reducer(state, action);

    expect(planState.membershipState).toEqual(MembershipState.NON_MEMBER);
    expect(planState.cartMinimum).toEqual(99);
    expect(planState.rentalLength).toEqual(3);
    expect(planState.deliveryFee).toEqual(99);
    expect(planState.monthlyMembershipFee).toEqual(0);
  });

  it("should handle zip code submit request action", () => {
    const zipcode = "10023";

    const action: actions.PlanActionTypes = {
      type: actions.ZIPCODE_SUBMIT_REQUEST,
      payload: { zipcode },
    };

    const planState = reducer(state, action);

    expect(planState.isFetching).toEqual(true);
    expect(planState.error).toBeNull();
    expect(planState.deliveryZipcode).toEqual("10023");
  });

  it("should handle zip code submit success action", () => {
    const postalData = {
      postal: "10023",
      identifier: "new-york",
    };

    const action: actions.PlanActionTypes = {
      type: actions.ZIPCODE_SUBMIT_SUCCESS,
      payload: { postalData },
    };

    const planState = reducer(state, action);

    expect(planState.isFetching).toEqual(false);
    expect(planState.error).toBeNull();
    expect(planState.deliveryAreaIdentifier).toEqual("new-york");
    expect(planState.isInDeliveryZone).toEqual(true);
  });

  it("should handle zip code submit failure action", () => {
    const error: APIError = {
      error: "This is an error",
      message: "Something bad happened",
      status: 400,
    };

    const action: actions.PlanActionTypes = {
      type: actions.ZIPCODE_SUBMIT_FAILURE,
      payload: { error },
    };

    const planState = reducer(state, action);

    expect(planState.isFetching).toEqual(false);
    expect(planState.error).toEqual(error);
  });

  it("should handle reset zip code action", () => {
    state = {
      ...state,
      deliveryZipcode: "11201",
      deliveryAreaIdentifier: DeliveryAreaIdentifier.NY,
      isInDeliveryZone: true,
    };

    const action: actions.PlanActionTypes = {
      type: actions.RESET_ZIPCODE,
    };

    const planState = reducer(state, action);

    expect(planState).toEqual(initialState);
  });

  it("should handle reset plan selection action", () => {
    const newState = {
      ...state,
      deliveryZipcode: "11201",
      deliveryAreaIdentifier: DeliveryAreaIdentifier.NY,
      isInDeliveryZone: true,
    };

    state = {
      ...state,
      membershipState: MembershipState.MEMBER,
      rentalLength: 12,
      cartMinimum: 29,
      deliveryFee: 0,
      monthlyMembershipFee: 19,
      deliveryZipcode: "11201",
      deliveryAreaIdentifier: DeliveryAreaIdentifier.NY,
      isInDeliveryZone: true,
    };

    const action: actions.PlanActionTypes = {
      type: actions.RESET_PLAN,
    };

    const planState = reducer(state, action);

    expect(planState).toEqual(newState);
  });

  it("should handle reset plan state", () => {
    state = {
      ...state,
      membershipState: MembershipState.MEMBER,
      rentalLength: 12,
      cartMinimum: 29,
      deliveryFee: 0,
      monthlyMembershipFee: 19,
      deliveryZipcode: "11201",
      deliveryAreaIdentifier: DeliveryAreaIdentifier.NY,
      isInDeliveryZone: true,
    };

    const action: actions.PlanActionTypes = {
      type: actions.RESET_SELECTION,
    };

    const planState = reducer(state, action);

    expect(planState).toEqual(initialState);
  });

  it("should handle newsletter email submission", () => {
    state = {
      ...state,
      isEmailSubmitted: false,
    };

    const action: actions.PlanActionTypes = {
      type: NEWSLETTER_SIGNUP_SUCCESS,
    };

    const planState = reducer(state, action);

    expect(planState.isEmailSubmitted).toBe(true);
  });
});
