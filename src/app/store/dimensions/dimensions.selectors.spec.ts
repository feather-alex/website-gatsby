import { State as GlobalState } from '../../../types/ReduxState';
import * as selectors from './dimensions.selectors';
import { initialState } from './dimensions.reducer';
import { DimensionsState } from './dimensions.types';
import { NavbarState } from '../navbar/navbar.types';

describe('Window Dimensions - Selectors', () => {
  describe('getWindowHeight', () => {
    it('Should return the value of: height', () => {
      const value = 265;

      const state: DimensionsState = {
        ...initialState,
        height: value
      };

      const selectedHeight = selectors.getWindowHeight({
        app: { windowDimensions: state }
      } as GlobalState);

      expect(selectedHeight).toEqual(value);
    });
  });

  describe('getWindowWidth', () => {
    it('Should return the value of: width', () => {
      const value = 358;

      const state: DimensionsState = {
        ...initialState,
        width: value
      };

      const selectedWidth = selectors.getWindowWidth({
        app: { windowDimensions: state }
      } as GlobalState);

      expect(selectedWidth).toEqual(value);
    });
  });

  describe('isMobileView', () => {
    it("Should return false if the user's viewport width is greater than 667", () => {
      const value = 979;

      const state: DimensionsState = {
        ...initialState,
        width: value
      };

      const isMobile = selectors.getIsMobileView({
        app: { windowDimensions: state }
      } as GlobalState);

      expect(isMobile).toEqual(false);
    });

    it("Should return true if the user's viewport width is less than 667", () => {
      const value = 323;

      const state: DimensionsState = {
        ...initialState,
        width: value
      };

      const isMobile = selectors.getIsMobileView({
        app: { windowDimensions: state }
      } as GlobalState);

      expect(isMobile).toEqual(true);
    });
  });

  describe('isMobileBreakpoint', () => {
    it("Should return false if the user's viewport width is greater than 667", () => {
      const value = 979;

      const state: DimensionsState = {
        ...initialState,
        width: value
      };

      const isMobile = selectors.getIsMobileBreakpoint({
        app: { windowDimensions: state }
      } as GlobalState);

      expect(isMobile).toEqual(false);
    });

    it("Should return true if the user's viewport width is less than our mobile breakpoint", () => {
      const value = 323;

      const state: DimensionsState = {
        ...initialState,
        width: value
      };

      const isMobile = selectors.getIsMobileBreakpoint({
        app: { windowDimensions: state }
      } as GlobalState);

      expect(isMobile).toEqual(true);
    });
  });

  describe('isDesktopBreakpoint', () => {
    it("Should return true if the user's viewport width is greater than our mobile breakpoint", () => {
      const value = 846;

      const state: DimensionsState = {
        ...initialState,
        width: value
      };

      const isDesktop = selectors.getIsDesktopBreakpoint({
        app: { windowDimensions: state }
      } as GlobalState);

      expect(isDesktop).toEqual(true);
    });

    it("Should return false if the user's viewport width is less than our mobile breakpoint", () => {
      const value = 264;

      const state: DimensionsState = {
        ...initialState,
        width: value
      };

      const isDesktop = selectors.getIsDesktopBreakpoint({
        app: { windowDimensions: state }
      } as GlobalState);

      expect(isDesktop).toEqual(false);
    });
  });

  describe('isBannerBreakpoint', () => {
    it("Should return false if the user's viewport width is greater than our banner breakpoint", () => {
      const value = 1200;

      const state: DimensionsState = {
        ...initialState,
        width: value
      };

      const isBannerBreakPoint = selectors.getIsBannerBreakpoint({
        app: { windowDimensions: state }
      } as GlobalState);

      expect(isBannerBreakPoint).toEqual(false);
    });

    it("Should return true if the user's viewport width is less than our banner breakpoint", () => {
      const value = 1100;

      const state: DimensionsState = {
        ...initialState,
        width: value
      };

      const isBannerBreakPoint = selectors.getIsBannerBreakpoint({
        app: { windowDimensions: state }
      } as GlobalState);

      expect(isBannerBreakPoint).toEqual(true);
    });
  });

  describe('getGridBreakpoint', () => {
    it("Should return mobile if the user's viewport width is in the mobile breakpoint", () => {
      const value = 579;

      const state: DimensionsState = {
        ...initialState,
        width: value
      };

      const breakpoint = selectors.getGridBreakPoint({
        app: { windowDimensions: state }
      } as GlobalState);

      expect(breakpoint).toEqual(selectors.GridBreakpoints.SMALL);
    });

    it("Should return tablet if the user's viewport width is in the tablet breakpoint", () => {
      const value = 1000;

      const state: DimensionsState = {
        ...initialState,
        width: value
      };

      const breakpoint = selectors.getGridBreakPoint({
        app: { windowDimensions: state }
      } as GlobalState);

      expect(breakpoint).toEqual(selectors.GridBreakpoints.MEDIUM);
    });

    it("Should return desktop if the user's viewport width is in the desktop breakpoint", () => {
      const value = 1700;

      const state: DimensionsState = {
        ...initialState,
        width: value
      };

      const breakpoint = selectors.getGridBreakPoint({
        app: { windowDimensions: state }
      } as GlobalState);

      expect(breakpoint).toEqual(selectors.GridBreakpoints.LARGE);
    });
  });

  describe('isMobileDevice', () => {
    it('Should return true if the users viewport is less than our defined mobile device value', () => {
      const value = 479;

      const state: DimensionsState = {
        ...initialState,
        width: value
      };

      const isMobileDevice = selectors.getIsMobileDevice({
        app: { windowDimensions: state }
      } as GlobalState);

      expect(isMobileDevice).toEqual(true);
    });

    it('Should return false if the users viewport is greater than our defined mobile device value', () => {
      const value = 481;

      const state: DimensionsState = {
        ...initialState,
        width: value
      };

      const isMobileDevice = selectors.getIsMobileDevice({
        app: { windowDimensions: state }
      } as GlobalState);

      expect(isMobileDevice).toEqual(false);
    });
  });

  describe('bodyMarginTop', () => {
    it('should return the margin top for the body depending of the current breakpoint and if the navbar banner is visible', () => {
      const value = 358;

      const state: DimensionsState = {
        ...initialState,
        width: value
      };

      const navbarState: NavbarState = {
        isBannerVisible: false,
        bannerType: null,
        bannerMessage: '',
        content: null,
        isContentLoading: false
      };

      const bodyMarginTop = selectors.getBodyMarginTop({
        app: { windowDimensions: state, navbar: navbarState }
      } as GlobalState);

      expect(bodyMarginTop).toEqual(selectors.NAVBAR_MOBILE_HEIGHT);
    });
  });

  describe('getting the height of the banner', () => {
    it('should return the current height of the navbar banner when in a desktop viewport width', () => {
      const state = {
        ...initialState,
        width: 1200
      };
      const navbarHeight = selectors.getBannerHeight({ app: { windowDimensions: state } } as GlobalState);

      expect(navbarHeight).toEqual(selectors.BANNER_DESKTOP_HEIGHT);
    });

    it('should return the current height of the navbar banner when in a mobile viewport width', () => {
      const state = {
        ...initialState,
        width: 400
      };
      const navbarHeight = selectors.getBannerHeight({ app: { windowDimensions: state } } as GlobalState);

      expect(navbarHeight).toEqual(selectors.BANNER_MOBILE_HEIGHT);
    });
  });

  describe('getting the height of the navbar', () => {
    it('should return the current height of the navbar when in a desktop viewport width', () => {
      const state = {
        ...initialState,
        width: 1200
      };
      const navbarHeight = selectors.getNavbarHeight({ app: { windowDimensions: state } } as GlobalState);

      expect(navbarHeight).toEqual(selectors.NAVBAR_DESKTOP_HEIGHT);
    });

    it('should return the current height of the navbar when in a mobile viewport width', () => {
      const state = {
        ...initialState,
        width: 400
      };
      const navbarHeight = selectors.getNavbarHeight({ app: { windowDimensions: state } } as GlobalState);

      expect(navbarHeight).toEqual(selectors.NAVBAR_MOBILE_HEIGHT);
    });
  });
});
