import {
  NavbarState,
  ShowNavbarBannerPayload,
  MobileNavContentSuccessPayload,
} from "./navbar.types";
import {
  showNavbarBanner,
  dismissNavbarBanner,
  resetNavbarBanner,
  getMobileNavContent,
} from "./navbar.actions";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";

export const initialState: NavbarState = {
  isBannerVisible: false,
  bannerType: null,
  bannerMessage: "",
  bannerColor: "",
  content: null,
  isContentLoading: false,
};

export default createReducer(initialState, {
  [showNavbarBanner.type](
    state: NavbarState,
    action: PayloadAction<ShowNavbarBannerPayload>
  ) {
    state.isBannerVisible = true;
    state.bannerType = action.payload.bannerType;
    state.bannerMessage = action.payload.message;
    state.bannerColor = action.payload.color;
  },

  [dismissNavbarBanner.type](state: NavbarState) {
    state.isBannerVisible = false;
  },

  [resetNavbarBanner.type](state: NavbarState) {
    state.isBannerVisible = false;
    state.bannerType = null;
    state.bannerMessage = "";
    state.bannerColor = "";
  },

  [getMobileNavContent.request.type](state: NavbarState) {
    state.isContentLoading = true;
  },

  [getMobileNavContent.success.type](
    state: NavbarState,
    action: PayloadAction<MobileNavContentSuccessPayload>
  ) {
    state.isContentLoading = false;
    state.content = action.payload;
  },

  [getMobileNavContent.failure.type](state: NavbarState) {
    state.isContentLoading = false;
    state.content = null;
  },
});
