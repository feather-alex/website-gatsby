/** @jsx jsx **/
import { Component, Fragment } from "react";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import HowItWorksDropdown from "./components/HowItWorksDropdown";
import FurnitureDropdown from "./components/FurnitureDropdown";
import AccountDropdown from "./components/AccountDropdown";
import CartNavListItem from "./components/CartNavListItem";
import PlanNavListItem, { UILocations } from "./components/PlanNavListItem";
import NavListItemMenu from "./components/NavListItemMenu";
import FeatherLogo from "../../ui/logos/FeatherWordMarkLogo";
import { BRAND } from "../../ui/variables";
import Title2 from "../../ui/titles/Title2";
import { NAVBAR_DESKTOP_HEIGHT } from "../store/dimensions/dimensions.selectors";
// import Analytics from '../../analytics/analytics';
// import { NAVBAR } from '../../analytics/navbar/events';
import { Z_INDICIES } from "../../ui/zIndicies";

export const NavVerticalDivider = styled.div`
  min-width: 1px;
  width: 1px;
  height: 100%;
  margin: 7px 32px 36px 3%;
  background: ${BRAND.ACCENT};
`;

export const NavLinkGroup = styled.div`
  width: fit-content;
  min-width: 152px;
  margin-top: 25px;
  ${({ columns }: { columns?: number }) =>
    `grid-column-start: span ${columns || 3};`}
  margin-left: 32px;
`;

export const NavImageLinkGroup = styled.div`
  display: flex;
  ${({ isFullWidth }: { isFullWidth?: boolean; columns?: number }) =>
    isFullWidth ? "width: 100%;" : ""}
  margin: 32px 0 80px 32px;
  ${({ columns }: { isFullWidth?: boolean; columns?: number }) =>
    `grid-column-start: span ${columns || 3};`}
`;

const NavListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 16px;
  height: 100%;
  cursor: pointer;
`;

enum DropdownMenus {
  howItWorks = "isHowItWorksVisible",
  furniture = "isFurnitureVisible",
  account = "isAccountVisible",
}

interface Props {
  toggleMiniCartOverlay: () => void;
  handleNavLinkClick: (currentLink: string) => () => void;
  isBannerVisible: boolean;
  bodyMarginTop: number;
  bannerHeight: number;
  isAuthenticated: boolean;
  isMiniCartOpen: boolean;
  isQuizOverlayOpen: boolean;
  totalItems: number;
}

interface State {
  isHowItWorksVisible: boolean;
  isFurnitureVisible: boolean;
  isAccountVisible: boolean;
  isNavbarDropShadowVisible: boolean;
  isDropdownMouseOverEnabled: boolean;
}

class DesktopNavbar extends Component<Props, State> {
  public readonly state: Readonly<State> = {
    isHowItWorksVisible: false,
    isFurnitureVisible: false,
    isAccountVisible: false,
    isNavbarDropShadowVisible: false,
    isDropdownMouseOverEnabled: true,
  };

  componentDidMount() {
    document.addEventListener("scroll", this.handleScroll, false);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll, false);
  }

  handleScroll = () => {
    if (!this.state.isNavbarDropShadowVisible && window.scrollY > 0) {
      this.setState({
        isNavbarDropShadowVisible: true,
      });
    } else if (this.state.isNavbarDropShadowVisible && window.scrollY === 0) {
      this.setState({
        isNavbarDropShadowVisible: false,
      });
    }
  };

  handleMouseOver = (navMenu: DropdownMenus) => () => {
    if (
      this.state.isDropdownMouseOverEnabled &&
      this.state[navMenu] === false
    ) {
      this.setState({ [`${navMenu}`]: true });
    }
  };

  handleMouseOut = (navMenu: DropdownMenus) => () => {
    if (this.state[navMenu] === true) {
      this.setState({ [`${[navMenu]}`]: false });
    }
  };

  handleNavLinkClick = (currentLink: string) => () => {
    this.props.handleNavLinkClick(currentLink)();
    this.setState(
      {
        isAccountVisible: false,
        isFurnitureVisible: false,
        isHowItWorksVisible: false,
        isDropdownMouseOverEnabled: false,
      },
      () =>
        setTimeout(
          () => this.setState({ isDropdownMouseOverEnabled: true }),
          450
        )
    );
  };

  render() {
    const {
      totalItems,
      isAuthenticated,
      isBannerVisible,
      toggleMiniCartOverlay,
      bodyMarginTop,
      bannerHeight,
    } = this.props;
    const {
      isHowItWorksVisible,
      isFurnitureVisible,
      isAccountVisible,
      isNavbarDropShadowVisible,
    } = this.state;

    return (
      <Fragment>
        <div
          css={css`
            position: fixed;
            display: flex;
            height: 88px;
            top: ${isBannerVisible ? `${bannerHeight}px` : "0"};
            width: 100%;
            background-color: ${BRAND.BACKGROUND};
            transition: top 400ms linear, box-shadow 200ms linear;
            z-index: ${Z_INDICIES.NAVBAR};
            ${isNavbarDropShadowVisible &&
            !isHowItWorksVisible &&
            !isFurnitureVisible &&
            !isAccountVisible
              ? "box-shadow: 0px 4px 8px rgba(0,0,0, 0.08);"
              : ""}
          `}
        >
          {/* Navigation Links */}
          <ul
            css={css`
              display: flex;
              align-items: stretch;
              justify-content: flex-start;
              flex: 2;
              margin-left: 32px;
            `}
          >
            <NavListItemMenu
              dataCy="nav-furniture"
              handleMouseOver={this.handleMouseOver(DropdownMenus.furniture)}
              handleMouseOut={this.handleMouseOut(DropdownMenus.furniture)}
              linkText="Furniture"
            />

            <NavListItemMenu
              dataCy="nav-why-feather"
              handleMouseOver={this.handleMouseOver(DropdownMenus.howItWorks)}
              handleMouseOut={this.handleMouseOut(DropdownMenus.howItWorks)}
              linkText="Why Feather"
            />

            <NavListItem data-cy="nav-quiz">
              <Link
                to="/style-quiz"
                // onClick={() => Analytics.trackEvent(NAVBAR.STYLE_QUIZ)}
              >
                <Title2 isAnimated={true}>Take our Style Quiz</Title2>
              </Link>
            </NavListItem>
          </ul>

          <ul
            css={css`
              display: flex;
              align-items: stretch;
            `}
          >
            <NavListItem>
              <FeatherLogo dataCy="feather-logo" to="/" />
            </NavListItem>
          </ul>

          <ul
            css={css`
              display: flex;
              align-items: stretch;
              justify-content: flex-end;
              flex: 2;
              margin-right: 32px;
            `}
          >
            {/* Plan and Location */}
            <NavListItem>
              <PlanNavListItem uiLocation={UILocations.Navbar} />
            </NavListItem>

            {/* Search */}
            <NavListItem data-cy="nav-search">
              <Link to="/search">
                <Title2 isAnimated={true}>Search</Title2>
              </Link>
            </NavListItem>

            {/* Account */}
            <NavListItemMenu
              dataCy="nav-account"
              handleMouseOver={this.handleMouseOver(DropdownMenus.account)}
              handleMouseOut={this.handleMouseOut(DropdownMenus.account)}
              linkText="Account"
            />

            <NavListItem data-cy="nav-cart">
              <CartNavListItem
                totalItems={totalItems}
                toggleMiniCart={toggleMiniCartOverlay}
              />
            </NavListItem>
          </ul>
        </div>
        {/* Navigation Menus */}
        <FurnitureDropdown
          isVisible={isFurnitureVisible}
          bodyMarginTop={bodyMarginTop}
          handleMouseOver={this.handleMouseOver(DropdownMenus.furniture)}
          handleMouseOut={this.handleMouseOut(DropdownMenus.furniture)}
          handleNavLinkClick={this.handleNavLinkClick}
        />
        <HowItWorksDropdown
          isVisible={isHowItWorksVisible}
          bodyMarginTop={bodyMarginTop}
          handleMouseOver={this.handleMouseOver(DropdownMenus.howItWorks)}
          handleMouseOut={this.handleMouseOut(DropdownMenus.howItWorks)}
          handleNavLinkClick={this.handleNavLinkClick}
        />
        <AccountDropdown
          isVisible={isAccountVisible}
          bodyMarginTop={bodyMarginTop}
          isAuthenticated={isAuthenticated}
          handleMouseOver={this.handleMouseOver(DropdownMenus.account)}
          handleMouseOut={this.handleMouseOut(DropdownMenus.account)}
        />
      </Fragment>
    );
  }
}

export default DesktopNavbar;
