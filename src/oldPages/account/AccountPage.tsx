import { Switch, Route, withRouter, RouteComponentProps } from "react-router";
import MobileAccordionMenu from "../../ui/pageElements/MobileAccordionMenu";
import PlanAndBilling from "./planAndBilling/PlanAndBillingPage";
import CurrentFurniture from "./CurrentFurniturePage";
import UpcomingDelivery from "./upcomingDelivery/UpcomingDelivery";
import FixedSidebarMenu from "../../ui/pageElements/FixedSidebarMenu";
import { ActionCreator } from "../../types/FluxStandardActions";
import { State as GlobalState } from "../../types/ReduxState";
import MembershipInformation from "./MembershipFAQPage";
import {
  getHasViewedWelcomeModal,
  getIsFirstLogIn,
} from "../auth/login/store/login.selectors";
import { dismissWelcomeModal } from "../auth/login/store/login.actions";
import Helmet from "../../components/Helmet";
import AccountMenu, { DisplayMode } from "./AccountMenu";
import { connect } from "react-redux";
import { compose } from "redux";
import React from "react";
import { getAccountOverview } from "./accountOverview/store/account.overview.actions";
import { WelcomeModal } from "../../components/WelcomeModal";
import { isFetching as isFetchingPersonalInfo } from "./personalInformation/store/personal.information.selectors";
import LazyLoading from "../../components/LazyLoading";
import {
  isFetching,
  getPlanName,
  hasUpcomingDelivery,
} from "./accountOverview/store/account.overview.selectors";
import { loadPersonalInfo } from "./personalInformation/store/personal.information.actions";
import ChangePassword from "./changePassword/ChangePasswordPage";
import FeatherPerks from "./featherPerks/FeatherPerksPage";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

interface DispatchProps {
  getAccountOverviewRequest: ActionCreatorWithoutPayload;
  loadPersonalInfo: ActionCreator;
  dismissWelcomeModal: ActionCreator;
}

interface StateProps {
  hasViewedWelcomeModal: boolean;
  isFirstLogin: boolean;
  isFetchingAccountOverview: boolean;
  isFetchingPersonalInfo: boolean;
  planName: string;
  hasUpcomingDelivery: boolean;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

interface State {
  isMobileMenuOpen: boolean;
  isWelcomeModalOpen: boolean;
  mobileMenuTitle: string;
}

class AccountPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isMobileMenuOpen: false,
      isWelcomeModalOpen: props.isFirstLogin && !props.hasViewedWelcomeModal,
      mobileMenuTitle: "",
    };
  }

  componentDidMount() {
    this.props.loadPersonalInfo();
    this.props.getAccountOverviewRequest();

    this.setMobileMenuTitle();
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.location.pathname !== prevProps.location.pathname ||
      this.props.planName !== prevProps.planName
    ) {
      window.scrollTo(0, 0);

      this.setMobileMenuTitle();
    }
  }

  setMobileMenuTitle = () => {
    const pathname = this.props.location.pathname;

    let mobileMenuTitle = "";

    if (pathname.includes("delivery")) {
      mobileMenuTitle = "Your upcoming delivery";
    } else if (pathname.includes("billing")) {
      mobileMenuTitle = "Plan and billing";
    } else if (pathname.includes("membership")) {
      mobileMenuTitle = this.props.planName + " FAQ";
    } else if (pathname.includes("furniture")) {
      mobileMenuTitle = "Current furniture";
    } else if (pathname.includes("password")) {
      mobileMenuTitle = "Change password";
    } else {
      mobileMenuTitle = "Account menu";
    }

    this.setState({ mobileMenuTitle });
  };

  toggleMobileMenu = () => {
    this.setState((prevState) => ({
      isMobileMenuOpen: !prevState.isMobileMenuOpen,
    }));
  };

  closeWelcomeModal = () => {
    this.setState({
      isWelcomeModalOpen: false,
    });
    this.props.dismissWelcomeModal();
  };

  render() {
    const isPageLoading =
      this.props.isFetchingAccountOverview && this.props.isFetchingPersonalInfo;

    return isPageLoading ? (
      <LazyLoading />
    ) : (
      <div className="body">
        <Helmet
          title="Account"
          description="My account"
          imageUrl="https://img.livefeather.com/pages-new/Contact/grey.png?auto=compress&sat=35&q=50&sharp=15&w=800"
        />
        <div className="account-page">
          <div className="account-page-navigation">
            {/* DESKTOP MENU */}
            <FixedSidebarMenu
              sidebarWidth="100%"
              top={109}
              enableTransforms={false}
              bottomBoundary=".account-page"
            >
              <AccountMenu displayMode={DisplayMode.Sidebar} />
            </FixedSidebarMenu>

            {/* MOBILE MENU */}
            <MobileAccordionMenu
              onClick={this.toggleMobileMenu}
              isMenuOpen={this.state.isMobileMenuOpen}
              title={this.state.mobileMenuTitle}
            >
              <AccountMenu
                toggleMobileMenu={this.toggleMobileMenu}
                displayMode={DisplayMode.Sidebar}
              />
            </MobileAccordionMenu>
          </div>
          <div className="account-page-body">
            <WelcomeModal
              isWelcomeModalOpen={this.state.isWelcomeModalOpen}
              handleCloseModal={this.closeWelcomeModal}
            />
            <Switch>
              <Route path="/account/perks" component={FeatherPerks} />
              <div className="account-content">
                <Route path="/account/billing" component={PlanAndBilling} />
                <Route path="/account/delivery" component={UpcomingDelivery} />
                <Route path="/account/furniture" component={CurrentFurniture} />
                <Route
                  path="/account/membership"
                  component={MembershipInformation}
                />
                <Route
                  path="/account/change-password"
                  component={ChangePassword}
                />
              </div>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  hasViewedWelcomeModal: getHasViewedWelcomeModal(state),
  isFirstLogin: getIsFirstLogIn(state),
  isFetchingAccountOverview: isFetching(state),
  isFetchingPersonalInfo: isFetchingPersonalInfo(state),
  planName: getPlanName(state),
  hasUpcomingDelivery: hasUpcomingDelivery(state),
});

const mapDispatchToProps: DispatchProps = {
  getAccountOverviewRequest: getAccountOverview.request,
  loadPersonalInfo,
  dismissWelcomeModal,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AccountPage);
