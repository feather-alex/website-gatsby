import { APIError } from "../../../types/ReduxState";
import * as actions from "./plan.actions";
import {
  ZipcodeRequestResource,
  ZipcodeResponseResource,
  MembershipState,
} from "./plan.types";

describe("Plan - Actions", () => {
  it("should create an action to select the membership plan", () => {
    const membershipState = MembershipState.MEMBER;

    const expectedAction: actions.PlanActionTypes = {
      type: actions.CHANGE_MEMBERSHIP_SELECTION,
      payload: { membershipState },
    };

    const action = actions.changeMembershipSelection(membershipState);

    expect(action).toEqual(expectedAction);
  });

  it("should create an action to select the non membership plan", () => {
    const membershipState = MembershipState.NON_MEMBER;

    const expectedAction: actions.PlanActionTypes = {
      type: actions.CHANGE_MEMBERSHIP_SELECTION,
      payload: { membershipState },
    };

    const action = actions.changeMembershipSelection(membershipState);

    expect(action).toEqual(expectedAction);
  });

  it("should create a zipcode submit action", () => {
    const zipcode: ZipcodeRequestResource = {
      zipcode: "10023",
    };

    const expectedAction: actions.PlanActionTypes = {
      type: actions.ZIPCODE_SUBMIT_REQUEST,
      payload: zipcode,
    };

    const action = actions.zipcodeSubmit(zipcode);

    expect(action).toEqual(expectedAction);
  });

  it("should create a zipcode submit success action", () => {
    const postalData: ZipcodeResponseResource = {
      postal: "10023",
      identifier: "new-york",
    };

    const expectedAction: actions.PlanActionTypes = {
      type: actions.ZIPCODE_SUBMIT_SUCCESS,
      payload: { postalData },
    };

    const action = actions.zipcodeSubmitSuccess(postalData);

    expect(action).toEqual(expectedAction);
  });

  it("should create a zipcode submit failure action", () => {
    const error: APIError = {
      error: "This is an error",
      message: "Something bad happened",
      status: 400,
    };

    const expectedAction: actions.PlanActionTypes = {
      type: actions.ZIPCODE_SUBMIT_FAILURE,
      payload: { error },
    };

    const action = actions.zipcodeSubmitFailure(error);

    expect(action).toEqual(expectedAction);
  });

  it("should create a reset zipcode action", () => {
    const expectedAction: actions.PlanActionTypes = {
      type: actions.RESET_ZIPCODE,
    };

    const action = actions.resetZipcode();

    expect(action).toEqual(expectedAction);
  });

  it("should create a reset plan selection action", () => {
    const expectedAction: actions.PlanActionTypes = {
      type: actions.RESET_SELECTION,
    };

    const action = actions.resetSelection();

    expect(action).toEqual(expectedAction);
  });
});
