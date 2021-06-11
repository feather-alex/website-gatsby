import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import NavbarBanner from "./NavbarBanner";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import MiniCart from "../../oldPages/cart/MiniCart";
import { State as GlobalState } from "../../types/ReduxState";
import {
  toggleOverlay as toggleOverlayAction,
  ToggleOverlay,
} from "../store/overlay/overlay.actions";
import {
  getIsMiniCartOpen,
  getIsQuizOverlayOpen,
  getIsMobileNavOpen,
} from "../store/overlay/overlay.selectors";
import { getNumberOfItemsInCart } from "../../oldPages/cart/store/cart.selectors";
import { getIsAuthenticated } from "../../oldPages/auth/login/store/login.selectors";
import { getIsNavbarBannerVisible } from "../store/navbar/navbar.selectors";
import {
  getIsNavbarBreakpoint,
  getBodyMarginTop,
  getBannerHeight,
} from "../store/dimensions/dimensions.selectors";
import { Overlays } from "../store/overlay/overlay.types";
import Analytics from "../../analytics/analytics";
import { NAVBAR } from "../../analytics/navbar/events";
import { clickNavBarLinkPayloadMappings } from "../../analytics/navbar/payload-mappings";

interface StateProps {
  isNavbarBreakpoint: boolean;
  isAuthenticated: boolean;
  isBannerVisible: boolean;
  isMiniCartOpen: boolean;
  isMobileNavOpen: boolean;
  isQuizOverlayOpen: boolean;
  totalItems: number;
  bodyMarginTop: number;
  bannerHeight: number;
}

interface DispatchProps {
  toggleOverlay: ToggleOverlay;
}

type Props = StateProps & DispatchProps;

class Navbar extends Component<Props> {
  toggleMiniCartOverlay = () => {
    const { isMiniCartOpen, toggleOverlay } = this.props;
    // toggle mini cart overlay.
    toggleOverlay(Overlays.MiniCartOverlay, !isMiniCartOpen);
    // track opening of the mini-cart
    if (!isMiniCartOpen) {
      Analytics.trackEvent(NAVBAR.MINI_CART);
    }
  };

  toggleMobileNavOverlay = () => {
    const { isMobileNavOpen, toggleOverlay } = this.props;
    // toggle mobile nav overlay
    toggleOverlay(Overlays.MobileNavOverlay, !isMobileNavOpen);
    // track opening of the nav overlay
    if (!isMobileNavOpen) {
      Analytics.trackEvent(NAVBAR.MOBILE_NAV);
    }
  };

  closeMobileNavOverlay = () => {
    this.props.toggleOverlay(Overlays.MobileNavOverlay, false);
  };

  handleNavLinkClick = (currentLink: string) => () => {
    Analytics.trackEvent(
      NAVBAR.CLICK_LINK,
      clickNavBarLinkPayloadMappings({ currentLink })
    );
  };

  handleMobileNavLinkClick = (currentLink: string) => () => {
    Analytics.trackEvent(
      NAVBAR.MOBILE_CLICK_LINK,
      clickNavBarLinkPayloadMappings({ currentLink })
    );
    // close mobile nav overlay
    this.closeMobileNavOverlay();
  };

  render() {
    const {
      isAuthenticated,
      totalItems,
      isBannerVisible,
      isMiniCartOpen,
      isQuizOverlayOpen,
      isMobileNavOpen,
      isNavbarBreakpoint,
      bodyMarginTop,
      bannerHeight,
    } = this.props;

    return (
      <Fragment>
        {/* Navigation Banner */}
        <NavbarBanner />
        <nav>
          {isNavbarBreakpoint ? (
            <MobileNavbar
              toggleMiniCartOverlay={this.toggleMiniCartOverlay}
              toggleMobileNavOverlay={this.toggleMobileNavOverlay}
              handleNavLinkClick={this.handleMobileNavLinkClick}
              isMobileNavOpen={isMobileNavOpen}
              isMiniCartOpen={isMiniCartOpen}
              isAuthenticated={isAuthenticated}
              isBannerVisible={isBannerVisible}
              totalItems={totalItems}
              bodyMarginTop={bodyMarginTop}
              bannerHeight={bannerHeight}
            />
          ) : (
            <DesktopNavbar
              toggleMiniCartOverlay={this.toggleMiniCartOverlay}
              handleNavLinkClick={this.handleNavLinkClick}
              isMiniCartOpen={isMiniCartOpen}
              isQuizOverlayOpen={isQuizOverlayOpen}
              totalItems={totalItems}
              isAuthenticated={isAuthenticated}
              isBannerVisible={isBannerVisible}
              bodyMarginTop={bodyMarginTop}
              bannerHeight={bannerHeight}
            />
          )}
        </nav>
        <MiniCart />
      </Fragment>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  totalItems: getNumberOfItemsInCart(state),
  isAuthenticated: getIsAuthenticated(state),
  isBannerVisible: getIsNavbarBannerVisible(state),
  isMiniCartOpen: getIsMiniCartOpen(state),
  isMobileNavOpen: getIsMobileNavOpen(state),
  isQuizOverlayOpen: getIsQuizOverlayOpen(state),
  isNavbarBreakpoint: getIsNavbarBreakpoint(state),
  bodyMarginTop: getBodyMarginTop(state),
  bannerHeight: getBannerHeight(state),
});

const mapDispatchToProps: DispatchProps = {
  toggleOverlay: toggleOverlayAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
