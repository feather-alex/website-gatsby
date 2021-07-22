import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { APIError } from "../../../../api/error";
import {
  FeatherPerksContentState,
  FeatherPerksSuccessPayload,
} from "./featherPerks.types";
import { getFeatherPerksContent } from "./featherPerks.actions";

export const initialState: FeatherPerksContentState = {
  isFetching: false,
  error: null,
  perks: null,
};

export default createReducer(initialState, {
  [getFeatherPerksContent.request.type](state: FeatherPerksContentState) {
    state.isFetching = true;
    state.error = null;
  },

  [getFeatherPerksContent.success.type](
    state: FeatherPerksContentState,
    action: PayloadAction<FeatherPerksSuccessPayload>
  ) {
    state.isFetching = false;
    state.error = null;
    state.perks = action.payload.perks;
  },

  [getFeatherPerksContent.failure.type](
    state: FeatherPerksContentState,
    action: PayloadAction<APIError>
  ) {
    state.isFetching = false;
    state.error = action.payload;
  },
});
