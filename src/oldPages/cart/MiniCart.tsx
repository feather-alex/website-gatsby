/** @jsx jsx */
import { Component, Fragment } from "react";
import { css, jsx } from "@emotion/core";
import { normalizeCartPrices, NormalizeCartPrices } from "./store/cart.actions";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { State as GlobalState } from "../../types/ReduxState";
import MiniCartProductsList from "./components/MiniCartProductsList";
import {
  CartItem,
  ProductIdentifiers,
} from "../../oldPages/cart/store/cart.types";
import { connect } from "react-redux";
import Analytics from "../../analytics/analytics";
import { MINI_CART } from "../../analytics/cart/events";
import { Overlays } from "../../app/store/overlay/overlay.types";
import {
  toggleOverlay,
  ToggleOverlay,
} from "../../app/store/overlay/overlay.actions";
import { getIsMiniCartOpen } from "../../app/store/overlay/overlay.selectors";
import { cartViewedPayloadMapping } from "../../analytics/cart/payload-mappings";
import {
  getCartItems,
  getCartUuid,
  getCartTotals,
} from "./store/cart.selectors";
import {
  getDeliveryZipCode,
  getRentalLength,
  getIsInDeliveryZone,
  getMembershipState,
  getMonthlyMembershipFee,
  getDeliveryFee,
  getDeliveryAreaIdentifier,
} from "../../app/store/plan/plan.selectors";
import {
  getBodyMarginTop,
  getIsMobileBreakpoint,
} from "../../app/store/dimensions/dimensions.selectors";
import {
  DeliveryAreaIdentifier,
  MembershipState,
} from "../../app/store/plan/plan.types";
import CloseSignIcon from "../../ui/icons/CloseSignIcon";
import MiniCartFooter from "./components/MiniCartFooter";
import MiniCartEmpty from "./components/MiniCartEmpty";
import { SHADES } from "../../ui/variables";
import { Z_INDICIES } from "../../ui/zIndicies";

interface StateProps {
  rentalLength: 3 | 12 | null;
  deliverToPostal: boolean | null;
  cartItems: CartItem[];
  cartTotals: { subtotal: number; total: number };
  postalCode: string | null;
  membershipState: MembershipState;
  isMiniCartOpen: boolean;
  membershipFee: 19 | 0 | null;
  deliveryFee: 0 | 99 | null;
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null;
  cartUuid: string;
  bodyMarginTop: number;
  isMobileBreakpoint: boolean;
}

interface DispatchProps {
  normalizeCartPrices: NormalizeCartPrices;
  toggleOverlay: ToggleOverlay;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

interface State {
  showBelowMinimum: boolean;
}

class MiniCartOverlay extends Component<Props, State> {
  public readonly state: Readonly<State> = {
    showBelowMinimum: false,
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleEsc);
  }

  componentDidUpdate(prevProps: Props) {
    // if we're going from closed to open, fire mini cart viewed event
    if (!prevProps.isMiniCartOpen && this.props.isMiniCartOpen) {
      const {
        cartUuid,
        cartItems,
        rentalLength,
        membershipFee,
        deliveryFee,
        membershipState,
        postalCode,
        deliveryAreaIdentifier,
        cartTotals,
      } = this.props;

      if (
        rentalLength &&
        membershipFee !== null &&
        deliveryFee !== null &&
        deliveryAreaIdentifier &&
        postalCode
      ) {
        Analytics.trackEvent(
          MINI_CART.VIEW,
          cartViewedPayloadMapping({
            membershipState,
            membershipFee,
            cartTotals,
            deliveryFee,
            deliveryZipCode: postalCode,
            deliveryAreaIdentifier,
            cartItems,
            cartUuid,
          })
        );
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEsc);
  }

  handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      this.closeCartOverlay();
    }
  };

  closeCartOverlay = () => {
    this.props.toggleOverlay(Overlays.MiniCartOverlay, false);
  };

  renderMiniCartProducts = () => {
    const {
      cartItems,
      rentalLength,
      deliverToPostal,
      isMobileBreakpoint,
    } = this.props;

    // We've decided not to make this network request each time
    // the users opens the mini cart. By passing an empty array
    // to the `unavailableProducts` prop, we're assuming that all
    // products in the mini cart are available. It's not until the
    // user reaches the cart page that we begin to validate item
    // availability.
    const unavailableProducts: ProductIdentifiers[] = [];

    return (
      <div
        css={css`
          flex-grow: 1;
          overflow: auto;
        `}
        data-cy="mini-cart"
      >
        {!deliverToPostal ? (
          <div
            css={css`
              height: 100%;
              width: 100%;
              z-index: ${Z_INDICIES.MINI_CART_PRODUCT_CARD};
              opacity: 0.78;
              background: ${SHADES.WHITE};
              position: absolute;
              top: 0;
              right: 0;
            `}
          />
        ) : null}

        <MiniCartProductsList
          products={cartItems}
          rentalLength={rentalLength}
          closeCart={this.closeCartOverlay}
          unavailableProducts={unavailableProducts}
          isMobileBreakpoint={isMobileBreakpoint}
        />
      </div>
    );
  };

  render() {
    const {
      bodyMarginTop,
      isMobileBreakpoint,
      isMiniCartOpen,
      cartItems,
    } = this.props;

    return (
      <Fragment>
        <div
          css={css`
            width: ${isMobileBreakpoint ? 100 : 50}vw;
            position: fixed;
            right: ${isMiniCartOpen ? 0 : "-100vw"};
            bottom: 0;
            transition: right 600ms ease-in-out;
            background-color: white;
            top: ${bodyMarginTop}px;
            z-index: ${isMobileBreakpoint
              ? Z_INDICIES.MINI_CART_MOBILE
              : Z_INDICIES.MINI_CART};
            ${isMiniCartOpen &&
            !isMobileBreakpoint &&
            "box-shadow: -16px 0px 24px rgba(51, 51, 51, 0.1);"}
            ${isMobileBreakpoint &&
            `height: calc(100% - ${bodyMarginTop}px);`}
            display: flex;
            flex-direction: column;
          `}
        >
          <div
            css={css`
              position: absolute;
              ${isMobileBreakpoint
                ? `
                top: 0;
                width: 100%;
                height: 35px;
                background-color: ${SHADES.WHITE};
                z-index: ${Z_INDICIES.MINI_CART_CLOSE_ICON};
                padding-left: 24px;
                padding-top: 5px;
                `
                : `
                top: 5px;
                left: 5px;
              `}
            `}
          >
            <CloseSignIcon onClick={this.closeCartOverlay} />
          </div>

          {cartItems.length > 0 ? (
            <Fragment>
              {this.renderMiniCartProducts()}
              <MiniCartFooter />
            </Fragment>
          ) : (
            <MiniCartEmpty closeMiniCart={this.closeCartOverlay} />
          )}
        </div>

        {/* below div needed for closing mini-cart on outside click */}
        {isMiniCartOpen && (
          // ignoring the static element interactions rule here as there is a dedicated button that is accessible
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            onClick={this.closeCartOverlay}
            css={css`
              z-index: ${Z_INDICIES.MINI_CART_OFF_CLICK_CAPTURE};
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
            `}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  cartUuid: getCartUuid(state),
  cartItems: getCartItems(state),
  cartTotals: getCartTotals(state),
  postalCode: getDeliveryZipCode(state),
  rentalLength: getRentalLength(state),
  deliverToPostal: getIsInDeliveryZone(state),
  isMiniCartOpen: getIsMiniCartOpen(state),
  membershipState: getMembershipState(state),
  membershipFee: getMonthlyMembershipFee(state),
  deliveryFee: getDeliveryFee(state),
  deliveryAreaIdentifier: getDeliveryAreaIdentifier(state),
  bodyMarginTop: getBodyMarginTop(state),
  isMobileBreakpoint: getIsMobileBreakpoint(state),
});

const mapDispatchToProps: DispatchProps = {
  toggleOverlay,
  normalizeCartPrices,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MiniCartOverlay)
);
