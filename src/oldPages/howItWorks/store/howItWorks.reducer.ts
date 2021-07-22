import { createReducer, PayloadAction } from "@reduxjs/toolkit";

import { APIError } from "../../../types/ReduxState";
import { getHowItWorksContent } from "./howItWorks.actions";
import { HowItWorksState, HowItWorksSuccessPayload } from "./howItWorks.types";

export const initialState: HowItWorksState = {
  isFetching: false,
  error: null,
  header: "",
  faqs: [],
  steps: [],
  meta: {
    name: "",
    description: "",
    imageUrl: "",
    title: "",
  },
};

export default createReducer(initialState, {
  [getHowItWorksContent.request.type](state: HowItWorksState) {
    state.isFetching = true;
    state.error = null;
  },

  [getHowItWorksContent.success.type](
    state: HowItWorksState,
    action: PayloadAction<HowItWorksSuccessPayload>
  ) {
    state.header = action.payload.header;
    state.steps = action.payload.steps;
    state.meta = action.payload.meta;
    state.faqs = action.payload.faqs;
    state.isFetching = false;
    state.error = null;
  },

  [getHowItWorksContent.failure.type](
    state: HowItWorksState,
    action: PayloadAction<APIError>
  ) {
    state.error = action.payload;
    state.isFetching = false;
  },
});
