import {
  showNavbarBanner,
  dismissNavbarBanner,
  resetNavbarBanner,
  SHOW_NAVBAR_BANNER,
  DISMISS_NAVBAR_BANNER,
  RESET_NAVBAR_BANNER,
  getMobileNavContent
} from './navbar.actions';
import { BannerType } from './navbar.types';
import { mockRequestPayload, mockSuccessPayload, mockError } from './navbar.fixtures';

describe('Navbar actions', () => {
  it('should create an action for showing the navbar banner', () => {
    const testMessage = 'hello world';
    const testColor = '#ff0000';
    const expectedAction = {
      type: SHOW_NAVBAR_BANNER,
      payload: { bannerType: BannerType.Announcement, message: testMessage, color: testColor }
    };
    const action = showNavbarBanner({ bannerType: BannerType.Announcement, message: testMessage, color: testColor });

    expect(action).toEqual(expectedAction);
  });

  it('should create an action for dismissing the navbar banner', () => {
    const expectedAction = {
      type: DISMISS_NAVBAR_BANNER
    };

    const action = dismissNavbarBanner();

    expect(action).toEqual(expectedAction);
  });

  it('should create an action for hiding the navbar banner', () => {
    const expectedAction = {
      type: RESET_NAVBAR_BANNER
    };

    const action = resetNavbarBanner();

    expect(action).toEqual(expectedAction);
  });

  it('Should handle action: GET_MOBILE_NAV_CONTENT_REQUEST', () => {
    const expectedAction = {
      type: getMobileNavContent.request.type,
      payload: mockRequestPayload
    };

    const actionAction = getMobileNavContent.request(mockRequestPayload);

    expect(actionAction).toEqual(expectedAction);
  });

  it('Should handle action: GET_MOBILE_NAV_CONTENT_SUCCESS', () => {
    const expectedAction = {
      type: getMobileNavContent.success.type,
      payload: mockSuccessPayload
    };

    const actionAction = getMobileNavContent.success(mockSuccessPayload);

    expect(actionAction).toEqual(expectedAction);
  });

  it('Should handle action: GET_MOBILE_NAV_CONTENT_FAILURE', () => {
    const expectedAction = {
      type: getMobileNavContent.failure.type,
      payload: mockError
    };

    const actualAction = getMobileNavContent.failure(mockError);

    expect(actualAction).toEqual(expectedAction);
  });
});
