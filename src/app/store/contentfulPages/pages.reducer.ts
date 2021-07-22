import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { APIError } from "../../../api/error";
import { getContentfulPages } from "./pages.actions";
import {
  ContentfulPagesState,
  ContentfulPagesSuccessPayload,
} from "./pages.types";

export const initialState: ContentfulPagesState = {
  isFetching: false,
  error: null,
  pages: [],
};

export default createReducer(initialState, {
  [getContentfulPages.request.type](state: ContentfulPagesState) {
    state.isFetching = true;
    state.error = null;
  },

  [getContentfulPages.success.type](
    state: ContentfulPagesState,
    action: PayloadAction<ContentfulPagesSuccessPayload>
  ) {
    state.isFetching = false;
    state.error = null;
    state.pages = action.payload.pages;
  },

  [getContentfulPages.failure.type](
    state: ContentfulPagesState,
    action: PayloadAction<APIError>
  ) {
    state.isFetching = false;
    state.error = action.payload;
  },
});
