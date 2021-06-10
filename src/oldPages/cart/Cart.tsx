/** @jsx jsx */
import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";
import { withRouter, RouteComponentProps } from "react-router-dom";

import {
  normalizeCartPrices,
  NormalizeCartPrices,
  getUnavailableProductsRequest,
  GetUnavailableProductsRequest,
  getRecommendationsRequest,
  GetRecommendationsRequest,
} from "./store/cart.actions";
import {
  displayNavigationBanner,
  DisplayNavigationBanner,
} from "../../reducers/navigation";
import { APIError, State as GlobalState } from "../../types/ReduxState";
import CartProductsList from "./components/CartProductsList";
import {
  CartItem,
  CartTotals,
  ProductIdentifiers,
  ProductRecommendation,
} from "./store/cart.types";
import { CART } from "../../analytics/cart/events";
import Analytics from "../../analytics/analytics";
import { Overlays } from "../../app/store/overlay/overlay.types";
import {
  toggleOverlay,
  ToggleOverlay,
} from "../../app/store/overlay/overlay.actions";
import {
  startCheckoutPayloadMapping,
  cartViewedPayloadMapping,
} from "../../analytics/cart/payload-mappings";
import {
  getCartItems,
  getCartUuid,
  getUnavailableItems,
  getIsFetching,
  getCartTotals,
  getNumberOfItemsInCart,
  getIsRecommendationsFetching,
  getRecommendations,
  getRecommendationsError,
} from "./store/cart.selectors";
import { checkoutActionsCartUuidPayloadMapping } from "../../analytics/checkout/payload-mappings";
import { getIsAuthenticated } from "../auth/login/store/login.selectors";
import {
  getCartMinimum,
  getDeliveryFee,
  getRentalLength,
  getMonthlyMembershipFee,
  getMembershipState,
  getIsInDeliveryZone,
  getDeliveryAreaIdentifier,
  getDeliveryZipCode,
} from "../../app/store/plan/plan.selectors";
import Loading from "../../components/Loading";
import { BREAKPOINTS, SHADES } from "../../ui/variables";
import { getIsMobileBreakpoint } from "../../app/store/dimensions/dimensions.selectors";
import {
  DeliveryAreaIdentifier,
  MembershipState,
} from "../../app/store/plan/plan.types";
import Header2 from "../../ui/headers/Header2";
import Button, { ButtonStyle } from "../../ui/buttons/Button";
import Layout from "../../app/Layout";
import CartOrderSummary from "./components/CartOrderSummary";
import Subheader1 from "../../ui/subheaders/Subheader1";
import CartRecommendations from "./components/Recommendations";

const Container = styled.div`
  background-color: ${SHADES.WHITE};
  padding: 0 96px;
  padding-bottom: 112px;

  @media ${BREAKPOINTS.MOBILE} {
    padding: 0;
    padding-bottom: 80px;
  }
`;

const Recommendations = styled(CartRecommendations)`
  padding: 40px 96px;

  @media ${BREAKPOINTS.MOBILE} {
    padding: 40px 0;
  }
`;

const LoadingScreen = styled(Loading)`
  background-color: ${SHADES.WHITE};
  padding: 48px;
  margin: 0 -80px;
`;

const CartContainer = styled.div`
  max-width: 1248px;
  margin: 0 auto;
`;

const CartPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 48px;
  margin-bottom: 26px;

  @media ${BREAKPOINTS.MOBILE} {
    flex-direction: column;
    align-items: flex-start;
    padding-top: 32px;
    margin-left: 24px;
    a {
      margin-top: 8px;
    }
  }
`;

const CartInfo = styled.div`
  display: flex;
`;

const CartContentAndSummary = styled.div`
  display: flex;
  align-items: flex-start;

  @media ${BREAKPOINTS.BANNER} {
    flex-direction: column;
    align-items: flex-end;
  }
`;

const EmptyCartPage = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const EmptyCartTextArea = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 70vh;
  width: 100%;

  @media ${BREAKPOINTS.MOBILE} {
    padding: 30% 0;
  }
`;

const EmptyCartHeader2 = styled(Header2)`
  margin-bottom: 50px;
`;

interface StateProps {
  cartUuid: string;
  cartItems: CartItem[];
  cartTotals: CartTotals;
  cartMinimum: number | null;
  numberOfItemsInCart: number;
  deliveryFee: number | null;
  rentalLength: number | null;
  membershipFee: number | null;
  membershipState: MembershipState;
  validZipcode: boolean | null;
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null;
  postal: string | null;
  isAuthenticated: boolean;
  unavailableCartItems: ProductIdentifiers[];
  isFetchingUnavailableItems: boolean;
  isMobileBreakpoint: boolean;
  recommendations: ProductRecommendation[];
  isRecommendationsLoading: boolean;
  recommendationsError: APIError | null;
}

interface DispatchProps {
  normalizeCartPrices: NormalizeCartPrices;
  displayNavigationBanner: DisplayNavigationBanner;
  toggleOverlay: ToggleOverlay;
  getUnavailableProductsRequest: GetUnavailableProductsRequest;
  getRecommendationsRequest: GetRecommendationsRequest;
}

type Props = RouteComponentProps & StateProps & DispatchProps;

interface State {
  isTncChecked: boolean;
  showTncError: boolean;
}

class Cart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isTncChecked: false,
      showTncError: false,
    };
  }

  componentDidMount() {
    const {
      cartUuid,
      cartItems,
      membershipFee,
      deliveryFee,
      membershipState,
      postal,
      deliveryAreaIdentifier,
      cartTotals,
    } = this.props;

    if (!deliveryAreaIdentifier) {
      return;
    }

    // Fetch unavailable cart items (if any)
    this.props.getUnavailableProductsRequest();
    // Fetch product recommendations
    this.props.getRecommendationsRequest();
    // Hide the navigation banner. Don't need it here.
    this.props.displayNavigationBanner(false);
    // Send analytics event for cart viewed
    if (membershipFee === null || deliveryFee === null || !postal) {
      return;
    }

    Analytics.trackEvent(
      CART.VIEW,
      cartViewedPayloadMapping({
        cartTotals,
        membershipState,
        membershipFee,
        deliveryFee,
        deliveryZipCode: postal,
        deliveryAreaIdentifier,
        cartItems,
        cartUuid,
      })
    );
  }

  handleTncCheck = () => {
    this.setState(
      (prevState) => ({
        isTncChecked: !prevState.isTncChecked,
        showTncError: false,
      }),
      () => {
        if (this.state.isTncChecked) {
          Analytics.trackEvent(
            CART.TERMS_CONDITIONS_CLICK,
            checkoutActionsCartUuidPayloadMapping({
              cartUuid: this.props.cartUuid,
            })
          );
        }
      }
    );
  };

  handleCheckoutClick = () => {
    if (this.props.isAuthenticated) {
      this.props.toggleOverlay(Overlays.AddItemsToCurrentPlanOverlay, true);
      return;
    }

    const { cartItems, cartUuid, rentalLength } = this.props;

    if (!this.state.isTncChecked) {
      this.setState({
        showTncError: true,
      });
    } else {
      Analytics.trackEvent(
        CART.CHECKOUT,
        startCheckoutPayloadMapping({ cartItems, cartUuid, rentalLength })
      );

      this.props.history.push({ pathname: "/checkout" });
    }
  };

  renderEmptyCart = () => {
    return (
      <EmptyCartPage>
        <EmptyCartTextArea>
          <EmptyCartHeader2>
            Your cart looks a little bit light
          </EmptyCartHeader2>
          <Button style={ButtonStyle.TEXT} to="/products">
            Continue Shopping
          </Button>
        </EmptyCartTextArea>
      </EmptyCartPage>
    );
  };

  handleTrackTncClick = () => {
    Analytics.trackEvent(
      CART.TERMS_CONDITIONS_TOOLTIP,
      checkoutActionsCartUuidPayloadMapping({ cartUuid: this.props.cartUuid })
    );
  };

  render() {
    const { showTncError, isTncChecked } = this.state;

    const {
      cartUuid,
      cartItems,
      cartTotals,
      cartMinimum,
      membershipFee,
      isMobileBreakpoint,
      membershipState,
      unavailableCartItems,
      isFetchingUnavailableItems,
      numberOfItemsInCart,
      validZipcode,
      recommendations,
      isRecommendationsLoading,
      recommendationsError,
      rentalLength,
    } = this.props;

    if (numberOfItemsInCart < 1) {
      return this.renderEmptyCart();
    }

    return (
      <Layout>
        <Recommendations
          products={recommendations || []}
          loading={isRecommendationsLoading}
          error={recommendationsError}
          cartUuid={cartUuid}
          rentalLength={rentalLength}
        />
        <Container>
          <CartContainer>
            <CartPageHeader>
              <CartInfo>
                <Header2>Your Cart&nbsp;</Header2>
                <Subheader1 color={SHADES.SHADE_LIGHT}>
                  {`(${numberOfItemsInCart} Item${
                    numberOfItemsInCart === 1 ? "" : "s"
                  })`}
                </Subheader1>
              </CartInfo>
              <Button style={ButtonStyle.COMPACT_TEXT} to="/products">
                Continue Shopping
              </Button>
            </CartPageHeader>

            {isFetchingUnavailableItems ? (
              <LoadingScreen />
            ) : (
              <CartContentAndSummary>
                <CartProductsList
                  products={cartItems}
                  unavailableItems={unavailableCartItems}
                  isMobileBreakpoint={isMobileBreakpoint}
                />
                <CartOrderSummary
                  membershipState={membershipState}
                  membershipFee={membershipFee}
                  subtotal={cartTotals.subtotal}
                  total={cartTotals.total}
                  showTncError={showTncError}
                  isTncChecked={isTncChecked}
                  unavailableCartItems={unavailableCartItems}
                  validZipcode={validZipcode}
                  cartMinimum={cartMinimum}
                  handleCheckoutClick={this.handleCheckoutClick}
                  handleTncCheck={this.handleTncCheck}
                  handleTrackTncClick={this.handleTrackTncClick}
                />
              </CartContentAndSummary>
            )}
          </CartContainer>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  cartUuid: getCartUuid(state),
  cartItems: getCartItems(state),
  cartTotals: getCartTotals(state),
  cartMinimum: getCartMinimum(state),
  numberOfItemsInCart: getNumberOfItemsInCart(state),
  deliveryFee: getDeliveryFee(state),
  rentalLength: getRentalLength(state),
  membershipFee: getMonthlyMembershipFee(state),
  membershipState: getMembershipState(state),
  validZipcode: getIsInDeliveryZone(state),
  deliveryAreaIdentifier: getDeliveryAreaIdentifier(state),
  postal: getDeliveryZipCode(state),
  isAuthenticated: getIsAuthenticated(state),
  unavailableCartItems: getUnavailableItems(state),
  isFetchingUnavailableItems: getIsFetching(state),
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  recommendations: getRecommendations(state),
  isRecommendationsLoading: getIsRecommendationsFetching(state),
  recommendationsError: getRecommendationsError(state),
});

const mapDispatchToProps: DispatchProps = {
  toggleOverlay,
  normalizeCartPrices,
  displayNavigationBanner,
  getUnavailableProductsRequest,
  getRecommendationsRequest,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Cart);
