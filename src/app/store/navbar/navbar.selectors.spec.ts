import {
  getIsNavbarBannerVisible,
  getNavbarBannerType,
  getNavbarBannerMessage,
  getNavbarBannerColor,
  getNavbarContent,
  getNavbarIsContentLoading
} from './navbar.selectors';
import { NavbarState, BannerType } from './navbar.types';
import { State as GlobalState } from '../../../types/ReduxState';

describe('Navbar Selectors', () => {
  let state: NavbarState;
  beforeAll(() => {
    state = {
      isBannerVisible: true,
      bannerType: BannerType.Announcement,
      bannerMessage: 'Select Banner Message',
      bannerColor: '#00ff00',
      content: null,
      isContentLoading: false
    };
  });
  it('should return whether the navbar banner is visible', () => {
    expect(getIsNavbarBannerVisible({ app: { navbar: state } } as GlobalState)).toEqual(true);
  });

  it('should return the current type of navbar banner', () => {
    expect(getNavbarBannerType({ app: { navbar: state } } as GlobalState)).toEqual(BannerType.Announcement);
  });

  it('should return the current navbar banner message', () => {
    expect(getNavbarBannerMessage({ app: { navbar: state } } as GlobalState)).toEqual('Select Banner Message');
  });

  it('should return the current navbar banner color', () => {
    expect(getNavbarBannerColor({ app: { navbar: state } } as GlobalState)).toEqual('#00ff00');
  });

  it('should return the current navbar content', () => {
    expect(getNavbarContent({ app: { navbar: state } } as GlobalState)).toEqual(null);
  });

  it('should return if the content is currently loading', () => {
    expect(getNavbarIsContentLoading({ app: { navbar: state } } as GlobalState)).toEqual(false);
  });
});
