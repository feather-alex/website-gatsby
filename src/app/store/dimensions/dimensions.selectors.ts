import { State as GlobalState } from "../../../types/ReduxState";
import { createSelector } from "reselect";
import { getIsNavbarBannerVisible } from "../navbar/navbar.selectors";

export const BANNER_DESKTOP_HEIGHT = 56;
export const BANNER_MOBILE_HEIGHT = 140;
export const NAVBAR_DESKTOP_HEIGHT = 88;
export const NAVBAR_MOBILE_HEIGHT = 74;

export const getWindowWidth = ({ app }: GlobalState) =>
  app.windowDimensions.width;
export const getWindowHeight = ({ app }: GlobalState) =>
  app.windowDimensions.height;

// `createSelector` accepts an array of input-selectors and a transform function as its arguments.

// If the Redux state tree is mutated in a way that causes the value of an input-selector to change,
// the selector will call its transform function with the values of the input-selectors as arguments.

// If the values of the input-selectors are the same as the previous call to the selector, it will
// return the previously computed value instead of calling the transform function.

export enum GridBreakpoints {
  SMALL,
  MEDIUM,
  LARGE,
}

export const getGridBreakPoint = createSelector(
  getWindowWidth,
  (windowWidth: number) => {
    if (windowWidth < 667) {
      return GridBreakpoints.SMALL;
    }
    if (windowWidth < 1193) {
      return GridBreakpoints.MEDIUM;
    }
    return GridBreakpoints.LARGE;
  }
);

export const getIsMobileView = createSelector(
  getWindowWidth,
  (windowWidth: number) => windowWidth <= 667
);
export const getIsMobileBreakpoint = createSelector(
  getWindowWidth,
  (windowWidth: number) => windowWidth < 769
);
export const getIsDesktopBreakpoint = createSelector(
  getWindowWidth,
  (windowWidth: number) => windowWidth >= 769
);
export const getIsMobileDevice = createSelector(
  getWindowWidth,
  (windowWidth: number) => windowWidth <= 480
);
export const getIsNavbarBreakpoint = createSelector(
  getWindowWidth,
  (windowWidth: number) => windowWidth < 1118
);
export const getIsBannerBreakpoint = createSelector(
  getWindowWidth,
  (windowWidth: number) => windowWidth < 1118
);
export const getBannerHeight = createSelector(
  getIsBannerBreakpoint,
  (isBannerBreakpoint: boolean) =>
    isBannerBreakpoint ? BANNER_MOBILE_HEIGHT : BANNER_DESKTOP_HEIGHT
);
export const getNavbarHeight = createSelector(
  getIsNavbarBreakpoint,
  (isNavbarBreakpoint: boolean) =>
    isNavbarBreakpoint ? NAVBAR_MOBILE_HEIGHT : NAVBAR_DESKTOP_HEIGHT
);
export const getBodyMarginTop = createSelector(
  getNavbarHeight,
  getBannerHeight,
  getIsNavbarBannerVisible,
  (
    navbarHeight: number,
    bannerHeight: number,
    isNavbarBannerVisible: boolean
  ) => (isNavbarBannerVisible ? navbarHeight + bannerHeight : navbarHeight)
);
