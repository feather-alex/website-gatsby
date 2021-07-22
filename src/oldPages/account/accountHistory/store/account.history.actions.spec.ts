import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import * as actions from "./account.history.actions";
import { APIError } from "../../../../types/ReduxState";
import { AccountHistoryResource } from "./account.history.types";

describe("Account History - Actions", () => {
  describe("Get Account History", () => {
    const accountHistoryResource: AccountHistoryResource = {
      charges: [
        {
          id: "ch_2398y592bfnip23f",
          status: "succeeded",
          amount: 160.05,
          sourceId: "card_some7362regex",
          chargedAt: 1572274970,
          description: "some charge boi here",
          reasonForFailure: null,
          amountRefunded: 0,
        },
      ],
      hasMore: false,
    };

    const error: APIError = {
      error: "error",
      message: "message",
      status: 400,
    };

    it("should create a get account history request action", () => {
      const expectedAction: FluxStandardAction = {
        type: actions.GET_ACCOUNT_HISTORY_REQUEST,
      };

      const action = actions.getAccountHistory();
      expect(action).toEqual(expectedAction);
    });

    it("should create a get account history success action", () => {
      const expectedAction: FluxStandardAction = {
        type: actions.GET_ACCOUNT_HISTORY_SUCCESS,
        payload: accountHistoryResource,
      };

      const action = actions.getAccountHistorySuccess(accountHistoryResource);
      expect(action).toEqual(expectedAction);
    });

    it("should create a get account hisory failure action", () => {
      const expectedAction: FluxStandardAction = {
        type: actions.GET_ACCOUNT_HISTORY_FAILURE,
        payload: error,
        error: true,
      };

      const action = actions.getAccountHistoryFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });
});
