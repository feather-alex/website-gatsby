import navbarReducer, { initialState } from './navbar.reducer';
import { showNavbarBanner, dismissNavbarBanner, resetNavbarBanner, getMobileNavContent } from './navbar.actions';
import { BannerType, NavbarState } from './navbar.types';
import { mockRequestPayload, mockSuccessPayload, mockError } from './navbar.fixtures';

describe('Navbar Reducer', () => {
  let state: NavbarState;

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should handle the show navbar action', () => {
    const testMessage = 'It works!';
    const testColor = '#0000ff';
    const action = showNavbarBanner({ bannerType: BannerType.Announcement, message: testMessage, color: testColor });
    const navbarState = navbarReducer(state, action);

    expect(navbarState.bannerType).toEqual(BannerType.Announcement);
    expect(navbarState.bannerMessage).toEqual(testMessage);
    expect(navbarState.bannerColor).toEqual(testColor);
    expect(navbarState.isBannerVisible).toEqual(true);
  });

  it('should handle the dismiss navbar action', () => {
    const testMessage = 'Dismiss me!';
    const testColor = '#0000ff';
    // give it an initial state to dismiss
    state = {
      isBannerVisible: true,
      bannerType: BannerType.Announcement,
      bannerMessage: testMessage,
      bannerColor: testColor,
      content: null,
      isContentLoading: false
    };
    const action = dismissNavbarBanner();
    const navbarState = navbarReducer(state, action);

    expect(navbarState.isBannerVisible).toEqual(false);
    expect(navbarState.bannerType).toEqual(BannerType.Announcement);
    expect(navbarState.bannerMessage).toEqual(testMessage);
    expect(navbarState.bannerColor).toEqual(testColor);
  });

  it('should handle the reset navbar action', () => {
    const testMessage = 'Reset me!';
    const testColor = '#0000ff';
    // give it an initial state to reset (always follows a dismiss action)
    state = {
      isBannerVisible: false,
      bannerType: BannerType.Announcement,
      bannerMessage: testMessage,
      bannerColor: testColor,
      content: null,
      isContentLoading: false
    };
    const action = resetNavbarBanner();
    const navbarState = navbarReducer(state, action);

    expect(navbarState).toEqual(initialState);
  });

  it('should handle action: GET_MOBILE_NAV_CONTENT_REQUEST', () => {
    const action = getMobileNavContent.request(mockRequestPayload);
    const reduced = navbarReducer(state, action);

    expect(reduced.isContentLoading).toEqual(true);
  });

  it('should handle action: GET_MOBILE_NAV_CONTENT_SUCCESS', () => {
    const action = getMobileNavContent.success(mockSuccessPayload);
    const reduced = navbarReducer(state, action);

    expect(reduced.content).toEqual(mockSuccessPayload);
    expect(reduced.isContentLoading).toEqual(false);
  });

  it('should handle action: GET_MOBILE_NAV_CONTENT_FAILURE', () => {
    const action = getMobileNavContent.failure(mockError);
    const reduced = navbarReducer(state, action);

    expect(reduced.content).toEqual(null);
    expect(reduced.isContentLoading).toEqual(false);
  });
});
