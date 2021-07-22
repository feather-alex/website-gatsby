import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  EnterpriseContentState,
  EnterpriseSuccessPayload,
} from "./enterprise.types";
import { getEnterpriseContent } from "./enterprise.actions";
import { APIError } from "../../../api/error";

export const initialState: EnterpriseContentState = {
  isFetching: false,
  error: null,
  faqs: [],
  heroLockup: null,
  horizontalLockup: null,
  horizontalLockup2: null,
  productShowcase: null,
  titleButtonLockup: null,
  titledTripleVerticalImageLockup: null,
  meta: null,
};

export default createReducer(initialState, {
  [getEnterpriseContent.request.type](state: EnterpriseContentState) {
    state.isFetching = true;
    state.error = null;
  },

  [getEnterpriseContent.success.type](
    state: EnterpriseContentState,
    action: PayloadAction<EnterpriseSuccessPayload>
  ) {
    state.isFetching = false;
    state.error = null;
    state.faqs = action.payload.faqs;
    state.heroLockup = action.payload.heroLockup;
    state.horizontalLockup = action.payload.horizontalLockup;
    state.horizontalLockup2 = action.payload.horizontalLockup2;
    state.meta = action.payload.meta;
    state.productShowcase = action.payload.productShowcase;
    state.titleButtonLockup = action.payload.titleButtonLockup;
    state.titledTripleVerticalImageLockup =
      action.payload.titledTripleVerticalImageLockup;
  },

  [getEnterpriseContent.failure.type](
    state: EnterpriseContentState,
    action: PayloadAction<APIError>
  ) {
    state.isFetching = false;
    state.error = action.payload;
  },
});
