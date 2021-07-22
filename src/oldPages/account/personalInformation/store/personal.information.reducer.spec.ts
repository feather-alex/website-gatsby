import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import { APIError } from "../../../../types/ReduxState";
import reducer from "./personal.information.reducer";
import * as actions from "./personal.information.actions";
import {
  PersonalInformation,
  PersonalInfoResource,
} from "./personal.information.types";
import {
  initialState,
  getAddressInfoFromSubscription,
} from "./personal.information.reducer";

describe("Personal Info - Reducers", () => {
  let state: PersonalInformation;

  const personalInfoResource: PersonalInfoResource = {
    subscriptions: [],
    accountLastAccessedAt: "",
    firstName: "Eng",
    lastName: "Feather",
    phone: "1231231231",
    email: "eng@livefeather.com",
  };

  const updatedPersonalInfoResource: PersonalInfoResource = {
    subscriptions: [],
    accountLastAccessedAt: "",
    firstName: "Eng",
    lastName: "Feather",
    phone: "4564564564",
    email: "new.eng@livefeather.com",
  };

  const error: APIError = {
    error: "Some error message",
    message: "Look what we have here",
    status: 500,
  };

  beforeEach(() => (state = { ...initialState }));

  describe("Get personal information", () => {
    it("should handle a request to get personal info", () => {
      const action: FluxStandardAction = actions.loadPersonalInfo();
      const personalInfo = reducer(state, action);

      expect(personalInfo.isFetching).toEqual(true);
      expect(personalInfo.error).toBeNull();
    });

    it("should return personal information", () => {
      state = {
        ...state,
        accountLastAccessedAt: "",
        firstName: "Eng",
        lastName: "Feather",
        phone: "1231231231",
        email: "eng@livefeather.com",
      };

      const action: FluxStandardAction =
        actions.loadPersonalInfoSuccess(personalInfoResource);
      const personalInfo = reducer(state, action);

      expect(personalInfo.isFetching).toEqual(false);
      expect(personalInfo).toEqual(state);
      expect(personalInfo.error).toBeNull();
    });

    it("should fail to fetch with an error", () => {
      const action: FluxStandardAction = actions.loadPersonalInfoFailure(error);
      const personalInfo = reducer(state, action);

      expect(personalInfo.isFetching).toEqual(false);
      expect(personalInfo.error).toEqual(error);
    });
  });

  describe("Update personal information", () => {
    const email = "new.eng@livefeather.com";
    const phone = "4564564564";

    it("should handle a request to update the personal info", () => {
      const action: FluxStandardAction = actions.updatePersonalInfo(
        email,
        phone
      );
      const personalInfo = reducer(state, action);

      expect(personalInfo.isFetching).toEqual(true);
      expect(personalInfo.error).toBeNull();
    });

    it("should handle successfully updating the personal info", () => {
      state = {
        ...state,
        email,
        phone,
        firstName: "Eng",
        lastName: "Feather",
      };

      const action: FluxStandardAction = actions.updatePersonalInfoSuccess(
        updatedPersonalInfoResource
      );
      const personalInfo = reducer(state, action);

      expect(personalInfo.isFetching).toEqual(false);
      expect(personalInfo).toEqual(state);
      expect(personalInfo.error).toBeNull();
    });

    it("should handle failing to update personal information", () => {
      const action: FluxStandardAction =
        actions.updatePersonalInfoFailure(error);
      const personalInfo = reducer(state, action);

      expect(personalInfo.isFetching).toEqual(false);
      expect(personalInfo.error).toEqual(error);
    });
  });

  describe("Personal Info Reducer Helper", () => {
    it("should map over address properties from a subscription", () => {
      const subscription = {
        address1: "115 Grand",
        address2: "Floor 5",
        city: "New York",
        region: "NY",
        postal: "11111",
        otherProperty: "not relevant",
      };
      const expectedAddressInfo = {
        address1: subscription.address1,
        address2: subscription.address2,
        city: subscription.city,
        region: subscription.region,
        postal: subscription.postal,
      };
      const addressInfo = getAddressInfoFromSubscription(subscription);
      expect(addressInfo).toEqual(expectedAddressInfo);
    });
  });
});
