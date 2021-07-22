import { State as GlobalState } from "../../../types/ReduxState";

export const getIsNavbarBannerVisible = ({ app }: GlobalState) =>
  app.navbar.isBannerVisible;
export const getNavbarBannerType = ({ app }: GlobalState) =>
  app.navbar.bannerType;
export const getNavbarBannerMessage = ({ app }: GlobalState) =>
  app.navbar.bannerMessage;
export const getNavbarBannerColor = ({ app }: GlobalState) =>
  app.navbar.bannerColor;
export const getNavbarContent = ({ app }: GlobalState) => app.navbar.content;
export const getNavbarIsContentLoading = ({ app }: GlobalState) =>
  app.navbar.isContentLoading;
