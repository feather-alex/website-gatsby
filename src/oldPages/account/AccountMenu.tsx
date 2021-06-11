/** @jsx jsx */
import { State as GlobalState } from "../../types/ReduxState";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";
import React from "react";
import { navigate, Link } from "gatsby";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Location } from "@reach/router";
import Title2 from "../../ui/titles/Title2";
import Title3 from "../../ui/titles/Title3";
import * as selectors from "./accountOverview/store/account.overview.selectors";
import {
  logOut as logOutAction,
  LogOut,
} from "../auth/login/store/login.actions";
import {
  toggleOverlay as toggleOverlayAction,
  ToggleOverlay,
} from "../../app/store/overlay/overlay.actions";
import { BRAND, BREAKPOINTS } from "../../ui/variables";
// import { withRouter, RouteComponentProps } from 'react-router';
import { ACCOUNTS } from "../../analytics/accounts/events";
import Analytics from "../../analytics/analytics";
import { Overlays } from "../../app/store/overlay/overlay.types";
import { getFAQCategoryNames } from "../FAQ/store/faqs.selectors";
import { getEmail } from "./personalInformation/store/personal.information.selectors";
import { constructTypeformLinkData } from "../../app/navbar/components/navbar.link.data";

export enum DisplayMode {
  Navbar = "navbar",
  Sidebar = "sidebar",
  MobileOverlay = "mobile-overlay",
}

interface Props {
  displayMode: DisplayMode;
  logOut: LogOut;
  toggleMobileMenu?: () => void;
  toggleOverlay: ToggleOverlay;
  hasUpcomingDelivery: boolean;
  FAQCategoryNames: string[];
  orderNumber: number;
  email: string;
  location: Location;
}

interface State {
  isMembershipMenuOpen: boolean;
}

class AccountMenu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isMembershipMenuOpen: false,
    };
  }

  handleMobileOnClick = () => {
    if (this.props.toggleMobileMenu) {
      this.props.toggleMobileMenu();
    }
    this.props.toggleOverlay(Overlays.MobileNavOverlay, false);
  };

  toggleMembershipMenu = () => {
    this.handleMobileOnClick();

    if (this.props.displayMode === DisplayMode.Sidebar) {
      this.setState((prevState) => ({
        isMembershipMenuOpen: !prevState.isMembershipMenuOpen,
      }));
    } else {
      navigate("/account/membership");
      this.props.toggleOverlay(Overlays.MobileNavOverlay, false);
    }
  };

  handleMenuLinksClick = () => {
    this.handleMobileOnClick();
    this.setState({ isMembershipMenuOpen: false });
  };

  // isSubLinkActive = (link: string) =>
  //   this.props.location.hash.includes(link) ? "active" : "";

  faqCategoryClick = (eventName: string) => () =>
    Analytics.trackEvent(eventName);

  handleLogOut = () => {
    Analytics.trackEvent(ACCOUNTS.LOGOUT);
    this.props.logOut();
  };

  render() {
    const { isMembershipMenuOpen } = this.state;
    const { hasUpcomingDelivery, displayMode, email, orderNumber } = this.props;
    const isBold = displayMode !== DisplayMode.Navbar;
    const shareFeedbackTypeformData = constructTypeformLinkData({
      email,
      orderNumber,
    }).shareFeedback;

    return (
      <ul
        css={css`
          width: fit-content;
          ${displayMode === DisplayMode.Sidebar &&
          `@media ${BREAKPOINTS.DESKTOP} {
                padding-bottom: 60px;
              }`}

          li {
            margin-bottom: 12px;
          }

          li,
          div {
            > a,
            span {
              ${displayMode === DisplayMode.Navbar &&
              `justify-content: flex-end;`}

              &.active {
                > span {
                  > p {
                    position: relative;
                    &:after {
                      content: "";
                      position: absolute;
                      bottom: -1px;
                      width: 100%;
                      height: 1px;
                      opacity: 1;
                      background-color: ${BRAND.PRIMARY_TEXT};
                    }
                  }
                }

                > p {
                  position: relative;
                  &:after {
                    content: "";
                    position: absolute;
                    bottom: -1px;
                    width: 100%;
                    height: 1px;
                    opacity: 1;
                    background-color: ${BRAND.PRIMARY_TEXT};
                  }
                }
              }
            }
          }
        `}
      >
        {hasUpcomingDelivery && (
          <li>
            <Link
              onClick={this.handleMenuLinksClick}
              to="/account/delivery"
              className="Link"
              activeClassName="active"
              css={css`
                display: flex;
              `}
            >
              <Title2
                dataCy="delivery-details"
                isBold={isBold}
                isAnimated={true}
              >
                Your Upcoming Delivery
              </Title2>
            </Link>
          </li>
        )}
        <li>
          <Link
            onClick={this.handleMenuLinksClick}
            to="/account/furniture"
            activeClassName="active"
            css={css`
              display: flex;
            `}
          >
            <Title2
              dataCy="current-furniture"
              isBold={isBold}
              isAnimated={true}
            >
              Current Furniture
            </Title2>
          </Link>
        </li>

        <li>
          <Link
            onClick={this.handleMenuLinksClick}
            to="/account/perks"
            className="Link"
            activeClassName="active"
            css={css`
              display: flex;
            `}
          >
            <Title2 dataCy="feather-perks" isBold={isBold} isAnimated={true}>
              Feather Perks
            </Title2>
          </Link>
        </li>

        <li>
          <Link
            onClick={this.handleMenuLinksClick}
            to="/account/billing"
            activeClassName="active"
            css={css`
              display: flex;
            `}
          >
            <Title2 dataCy="plan-billing" isBold={isBold} isAnimated={true}>
              Plan and Billing
            </Title2>
          </Link>
        </li>

        <li>
          <Link
            onClick={this.toggleMembershipMenu}
            to="/account/membership"
            activeClassName="active"
            css={css`
              display: flex;
            `}
          >
            <Title2 dataCy="plan-faq" isBold={isBold} isAnimated={true}>
              Customer FAQ
            </Title2>
          </Link>
        </li>
        <div
          css={css`
            padding-left: 25px;
            transition: height 0.3s ease-out;
            overflow: auto;
            ${isMembershipMenuOpen ? `height: 100px;` : `height: 0;`}

            p {
              margin-bottom: 14px;
            }
          `}
        >
          {this.props.FAQCategoryNames.map((category) => (
            <AnchorLink
              key={category}
              to={`/account/membership#${category}`}
              css={css`
                display: flex;
              `}
              className=""
            >
              <span
                role="button"
                tabIndex={0}
                onClick={this.faqCategoryClick(
                  `Accounts ${category} FAQ Clicked`
                )}
                css={css`
                  &:focus {
                    outline: none;
                  }
                `}
              >
                <Title3 dataCy="plan-name-faq" isAnimated={true}>
                  {category}
                </Title3>
              </span>
            </AnchorLink>
          ))}
        </div>

        <li>
          <Link
            onClick={this.handleMenuLinksClick}
            to="/account/change-password"
            activeClassName="active"
            css={css`
              display: flex;
            `}
          >
            <Title2 isBold={isBold} isAnimated={true}>
              Change Password
            </Title2>
          </Link>
        </li>
        <li
          css={css`
            ${displayMode === DisplayMode.Sidebar && "margin-top: 28px;"}
          `}
        >
          <span
            role="button"
            tabIndex={0}
            onClick={this.handleLogOut}
            css={css`
              display: flex;
              cursor: pointer;
            `}
          >
            <Title2 isBold={isBold} isAnimated={true}>
              Logout
            </Title2>
          </span>
        </li>

        <li>
          <a
            href={shareFeedbackTypeformData.href}
            target="_blank"
            rel="noopener noreferrer"
            css={css`
              display: flex;
            `}
          >
            <Title2 isAnimated={true}>{shareFeedbackTypeformData.label}</Title2>
          </a>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  hasUpcomingDelivery: selectors.hasUpcomingDelivery(state),
  FAQCategoryNames: getFAQCategoryNames(state),
  orderNumber: selectors.getOrderNumber(state),
  email: getEmail(state),
});

const mapDispatchToProps = {
  logOut: logOutAction,
  toggleOverlay: toggleOverlayAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountMenu);
