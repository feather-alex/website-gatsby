/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { State as GlobalState, APIError } from "../../types/ReduxState";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import CheckoutBillingAddress from "./components/CheckoutBillingAddress";
import OutOfDeliveryZoneModal from "../../oldPages/checkout/components/OutOfDeliveryZoneModal";
import { TrackingParameters } from "../../types/TrackingParameters";
import CheckoutCustomerInfo from "./components/CheckoutCustomerInfo";
import CheckoutDeliveryInfo from "./components/CheckoutDeliveryInfo";
import CheckoutOrderSummary from "../../oldPages/checkout/components/CheckoutOrderSummary";
import { getIsMobileBreakpoint } from "../../app/store/dimensions/dimensions.selectors";
import CheckoutBillingInfo from "../../oldPages/checkout/components/CheckoutBillingInfo";
import { ProductEntities } from "../../app/store/entities/entities.types";
import { withRouter, RouteComponentProps } from "react-router-dom";
import React from "react";
import {
  CartItem,
  ProductIdentifiers,
  PromoState,
  PromoInfo,
} from "../../oldPages/cart/store/cart.types";
import { connect } from "react-redux";
import { compose } from "redux";
import FormValue from "../../types/FormValue";
import Analytics from "../../analytics/analytics";
import Helmet from "../../components/Helmet";
import { Overlays } from "../../app/store/overlay/overlay.types";
import {
  toggleOverlay as toggleOverlayAction,
  ToggleOverlay,
} from "../../app/store/overlay/overlay.actions";
import { getIsDeliveryOverlayOpen } from "../../app/store/overlay/overlay.selectors";
import { getProductEntities } from "../../app/store/entities/entities.selectors";
import { CHECKOUT } from "../../analytics/checkout/events";
import {
  getCartUuid,
  getCartItems,
  getCartContainsUnavailableProducts,
  getPromo,
  getPromoError,
  getPromoState,
  getNumberOfItemsInCart,
  getCartSubtotal,
} from "../../oldPages/cart/store/cart.selectors";
import { getIsAuthenticated } from "../../oldPages/auth/login/store/login.selectors";
import AddItemsToCurrentPlanModal from "../../components/AddItemsToCurrentPlan";
import {
  getRentalLength,
  getDeliveryZipCode,
  getMembershipState,
  getDeliveryAreaIdentifier,
} from "../../app/store/plan/plan.selectors";
import { ActionCreator } from "../../types/FluxStandardActions";
import {
  DeliveryAreaIdentifier,
  MembershipState,
} from "../../app/store/plan/plan.types";
import {
  getUnavailableProductsRequest as getUnavailableProductsRequestAction,
  GetUnavailableProductsRequest,
} from "../../oldPages/cart/store/cart.actions";
import SSNIssueModal from "./components/SSNIssueModal";
import Button, { ButtonStyle } from "../../ui/buttons/Button";
import FeatherWordMarkLogo from "../../ui/logos/FeatherWordMarkLogo";
import { BRAND, BREAKPOINTS, SHADES } from "../../ui/variables";
import { normalizeCheckoutData } from "./store/checkout.service";
import {
  depositRequest,
  processCheckout,
  checkoutStepCompleted,
  processCheckoutAmounts,
  resetErrorsStateValues,
  resetCheckoutForms,
  updateSSNInfo,
  changeCheckoutStep,
} from "./store/checkout.actions";
import {
  CheckoutRequestPayload,
  ItemUnavailableError,
  DepositRequestPayload,
  AmountsRequestPayload,
  CheckoutStep,
  CheckoutStateStep,
  ChangeStepPayload,
  DepositOrigin,
} from "./store/checkout.types";
import {
  getGenerateNewStripeToken,
  getIsPlacingOrder,
  getCardError,
  getItemsError,
  getServerError,
  getCustomerInfo,
  getBillingAddressInfo,
  getDeliveryInfo,
  getMembershipFee,
  getDeliveryFee,
  getTaxDueNow,
  getMonthlyTotal,
  getMonthlyTax,
  getDueNow,
  getDepositAmount,
  getOrderTCV,
  getSSNInfo,
  getCheckoutStep,
  getIsDeliverySameAsBilling,
  getMaxTCVAmount,
} from "./store/checkout.selectors";
import AdditionalUnderwriting from "./AdditionalUnderwriting";
import {
  BillingAddressInfoFields,
  CheckoutFormDataPayload,
  CustomerInfoFields,
  DeliveryInfoFields,
  SSNInfoFields,
} from "./store/checkoutForms.types";
import { Token } from "@stripe/stripe-js";
import { initialState } from "./store/checkout.reducer";

interface StateProps {
  cartItems: CartItem[];
  totalItems: number;
  productEntities: ProductEntities;
  trackingParams: TrackingParameters;
  deliveryAreaIdentifier: DeliveryAreaIdentifier;
  membershipState: MembershipState;
  rentalLength: number;
  postalCode: string;
  isDeliveryOverlayOpen: boolean;
  isMobileBreakpoint: boolean;
  cartUuid: string;
  isAuthenticated: boolean;
  impactClickId?: string;
  unavailableProducts: ProductIdentifiers[];
  cartContainsUnavailableProducts: boolean;
  promo: PromoInfo | null;
  promoState: PromoState;
  promoError: APIError | null;
  generateNewStripeToken: boolean;
  isPlacingOrder: boolean;
  cardError: { error: string | null };
  itemsError: ItemUnavailableError[];
  serverError: APIError;
  maxTCVAmount: number | null;
  membershipFee: number;
  deliveryFee: number;
  taxDueNow: number;
  monthlyTotal: number;
  monthlyTax: number;
  dueNow: number;
  depositAmount: number;
  orderTCV: number;
  customerInfo: CustomerInfoFields;
  deliveryInfo: DeliveryInfoFields;
  billingAddressInfo: BillingAddressInfoFields;
  ssnInfo: SSNInfoFields;
  step: CheckoutStep;
  subtotal: number;
  isDeliverySameAsBilling: boolean;
}

interface DispatchProps {
  toggleOverlay: ToggleOverlay;
  getUnavailableProductsRequest: GetUnavailableProductsRequest;
  processCheckout: ActionCreatorWithPayload<CheckoutRequestPayload>;
  resetErrorsState: ActionCreator;
  submitDepositRequest: ActionCreatorWithPayload<DepositRequestPayload>;
  processCheckoutAmountsRequest: ActionCreatorWithPayload<
    AmountsRequestPayload
  >;
  resetCheckoutForms: ActionCreator;
  checkoutStepCompleted: ActionCreatorWithPayload<CheckoutFormDataPayload>;
  updateSSNInfo: ActionCreatorWithPayload<SSNInfoFields>;
  changeCheckoutStep: ActionCreatorWithPayload<ChangeStepPayload>;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

interface State {
  hasTaxError: boolean;
  stripeToken: Token | null;
  billingZipcode: FormValue<string>;
  googleScriptFailed: boolean;
  statedIncome: string;
}

class Checkout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      billingZipcode: {
        value: "",
        touched: false,
        error: "*required",
      } as FormValue<string>,
      hasTaxError: false,
      stripeToken: null,
      googleScriptFailed: false,
      statedIncome: "",
    };

    this.backToCustomerInfo = this.backToCustomerInfo.bind(this);
    this.backToDeliveryInfo = this.backToDeliveryInfo.bind(this);
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
    this.selectRegionByLocation = this.selectRegionByLocation.bind(this);
    this.backToCart = this.backToCart.bind(this);
    this.handleSetStripeToken = this.handleSetStripeToken.bind(this);
    this.handleNextStepDeliveryInfo = this.handleNextStepDeliveryInfo.bind(
      this
    );
    this.backToBillingAddress = this.backToBillingAddress.bind(this);
    this.handleSetStatedIncomeAndPlaceOrder = this.handleSetStatedIncomeAndPlaceOrder.bind(
      this
    );
  }

  componentDidMount() {
    this.props.getUnavailableProductsRequest();
    this.selectRegionByLocation();

    if (this.props.subtotal !== 0) {
      const {
        processCheckoutAmountsRequest,
        rentalLength,
        promo,
        deliveryAreaIdentifier,
      } = this.props;
      processCheckoutAmountsRequest({
        planMonths: rentalLength,
        promoCode: promo ? promo.code : undefined,
        subtotal: this.props.subtotal,
        delivery: {
          area: deliveryAreaIdentifier,
        },
      });
    } else {
      this.props.history.replace({ pathname: "/cart" });
    }

    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps: Props) {
    const {
      subtotal,
      rentalLength,
      promo,
      deliveryAreaIdentifier,
      processCheckoutAmountsRequest,
      getUnavailableProductsRequest,
      location,
      deliveryInfo,
    } = this.props;
    const { streetAddress, city, state, zipcode } = deliveryInfo;
    const amountsRequestData = {
      subtotal,
      planMonths: rentalLength,
      promoCode: promo ? promo.code : undefined,
      delivery: {
        area: deliveryAreaIdentifier,
        address1: streetAddress,
        city,
        region: state,
        postal: zipcode,
      },
    };

    if (subtotal !== prevProps.subtotal && subtotal > 0) {
      processCheckoutAmountsRequest({ ...amountsRequestData, subtotal });
    }

    if (promo !== prevProps.promo && subtotal > 0) {
      processCheckoutAmountsRequest(amountsRequestData);
    }

    if (location.pathname !== prevProps.location.pathname && subtotal > 0) {
      getUnavailableProductsRequest();
    }
  }

  handleNextStepDeliveryInfo() {
    const {
      subtotal,
      rentalLength,
      promo,
      deliveryAreaIdentifier,
      processCheckoutAmountsRequest,
      deliveryInfo,
    } = this.props;
    const { streetAddress, city, state, zipcode } = deliveryInfo;

    processCheckoutAmountsRequest({
      subtotal,
      planMonths: rentalLength,
      promoCode: promo ? promo.code : undefined,
      delivery: {
        area: deliveryAreaIdentifier,
        address1: streetAddress,
        city,
        region: state,
        postal: zipcode,
      },
    });
  }

  backToCustomerInfo() {
    this.props.changeCheckoutStep({ step: CheckoutStep.CustomerInfo });
    this.props.updateSSNInfo(initialState.ssnInfo);
    this.props.history.push("/checkout");
  }

  backToDeliveryInfo() {
    this.props.changeCheckoutStep({ step: CheckoutStep.DeliveryInfo });
    this.props.updateSSNInfo(initialState.ssnInfo);
    this.props.history.push(`/checkout/${CheckoutStep.DeliveryInfo}`);
  }

  backToBillingAddress() {
    this.props.changeCheckoutStep({ step: CheckoutStep.BillingAddress });
    this.props.updateSSNInfo(initialState.ssnInfo);
    this.props.history.push(`/checkout/${CheckoutStep.BillingAddress}`);
  }

  backToCart() {
    this.props.history.push("/cart");
    this.props.resetCheckoutForms();
  }

  handleGoogleScriptFailed = () => {
    this.setState({ googleScriptFailed: true });
    Analytics.trackEvent(CHECKOUT.GOOGLE_API_SCRIPT_ERROR, {
      cart_id: this.props.cartUuid,
    });
  };

  handleSetStripeToken(stripeToken: Token) {
    this.setState({ stripeToken });
  }

  handleSetStatedIncomeAndPlaceOrder(statedIncome: string) {
    this.setState({ statedIncome }, this.handlePlaceOrder);
  }

  handlePlaceOrder = () => {
    this.props.processCheckout(this.normalizedCheckoutData());
  };

  handleDepositRequest = (originator: DepositOrigin) => {
    const { maxTCVAmount, depositAmount } = this.props;
    const {
      customer,
      delivery,
      planMonths,
      promoCode,
    } = this.normalizedCheckoutData().checkoutInfo;

    const items = this.props.cartItems.map(
      ({ title, variantName, rentalPrices, rentalLength }) => {
        return {
          title,
          variantName,
          rentalPrice: rentalPrices[rentalLength],
        };
      }
    );

    const depositPayload = {
      customer: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        email: customer.email,
      },
      originator,
      delivery,
      items,
      planMonths,
      promoCode,
      maxTCV: maxTCVAmount || 0,
      depositAmount,
    };

    this.props.submitDepositRequest(depositPayload);
  };

  normalizedCheckoutData = () => {
    const {
      cartItems,
      rentalLength,
      deliveryAreaIdentifier,
      promo,
      trackingParams,
      cartUuid,
      impactClickId,
      dueNow,
      taxDueNow,
      monthlyTotal,
      monthlyTax,
      membershipFee,
      deliveryFee,
      subtotal,
    } = this.props;

    const {
      firstName,
      lastName,
      email,
      company,
      persona,
    } = this.props.customerInfo;
    const { ssn, legalFirstName, legalLastName } = this.props.ssnInfo;
    const {
      streetAddress,
      apt,
      city,
      state,
      zipcode,
      phone,
    } = this.props.deliveryInfo;
    const {
      billingStreetAddress,
      billingApt,
      billingCity,
      billingState,
      billingPostalCode,
    } = this.props.billingAddressInfo;

    const { stripeToken, statedIncome } = this.state;

    return {
      checkoutInfo: normalizeCheckoutData({
        deliveryAreaIdentifier,
        cartItems,
        rentalLength,
        promo,
        email,
        firstName,
        lastName,
        persona,
        phone,
        company,
        streetAddress,
        apt,
        city,
        state,
        zipcode,
        billingStreetAddress,
        billingApt,
        billingCity,
        billingState,
        billingPostalCode,
        stripeToken,
        trackingParams,
        ssn,
        legalFirstName,
        legalLastName,
        statedIncome,
      }),
      cartInfo: {
        cartItems,
        cartUuid,
        impactClickId,
      },
      amounts: {
        dueNow,
        taxDueNow,
        monthlyTotal,
        monthlyTax,
        subtotal,
        membershipFee,
        deliveryFee,
        promo,
      },
      stripeToken,
    };
  };

  selectRegionByLocation() {
    const {
      productEntities,
      deliveryAreaIdentifier,
      deliveryInfo,
    } = this.props;
    const deliveryArea = productEntities.deliveryAreas.find(
      (a) => a.identifier === deliveryAreaIdentifier
    );

    // The new-york region offers delivery to two states.
    // Rather than auto populating the `state` value with
    // a potentially incorrect state, leave the value blank,
    // and allow the user to manually make that decision.
    if (deliveryArea && deliveryArea.validRegions.length > 1) {
      return;
    }

    if (deliveryArea) {
      this.props.checkoutStepCompleted({
        step: CheckoutStateStep.DeliveryInfo,
        data: {
          ...deliveryInfo,
          state: deliveryArea.validRegions[0].code,
        },
      });
    }
  }

  render() {
    const { googleScriptFailed, statedIncome } = this.state;
    const {
      location,
      cartUuid,
      toggleOverlay,
      productEntities,
      isDeliveryOverlayOpen,
      cardError,
      itemsError,
      serverError,
      isPlacingOrder,
      isMobileBreakpoint,
      generateNewStripeToken,
      cartContainsUnavailableProducts,
      resetErrorsState,
      subtotal,
      rentalLength,
    } = this.props;
    const { firstName, lastName, email } = this.props.customerInfo;
    const { streetAddress, city, zipcode, phone } = this.props.deliveryInfo;
    const {
      billingStreetAddress,
      billingCity,
      billingState,
      billingPostalCode,
    } = this.props.billingAddressInfo;

    const matchAdditionalUnderwriting = location.pathname.match(
      CheckoutStep.Eligibility
    );
    const isAdditionalUnderwriting = !!(
      matchAdditionalUnderwriting && matchAdditionalUnderwriting.length > 0
    );

    return (
      <div
        css={css`
          background-color: ${isAdditionalUnderwriting
            ? BRAND.BACKGROUND
            : SHADES.WHITE};
        `}
        className="checkout-page"
      >
        <Helmet title="Checkout" description="Feather Checkout" />
        <AddItemsToCurrentPlanModal />
        <OutOfDeliveryZoneModal
          zipcode={zipcode}
          isOpen={isDeliveryOverlayOpen}
          closeOverlay={() => toggleOverlay(Overlays.DeliveryOverlay, false)}
        />

        <SSNIssueModal onDepositSubmission={this.handleDepositRequest} />

        <div className="checkout-page__navbar">
          <div className="logo">
            <Link to="/">
              <FeatherWordMarkLogo />
            </Link>
          </div>
          <Button
            css={css`
              display: block;
              position: absolute;
              right: 20px;
              top: 50%;
              transform: translateY(-50%);
              @media ${BREAKPOINTS.DESKTOP} {
                display: none;
              }
            `}
            style={ButtonStyle.COMPACT_TEXT}
            onClick={this.backToCart}
          >
            Back to Cart
          </Button>
        </div>

        <div className="checkout-page__body">
          <Switch>
            <Route
              path="/checkout"
              exact={true}
              render={(props) => (
                <CheckoutCustomerInfo {...props} backToCart={this.backToCart} />
              )}
            />
            <Route
              path={`/checkout/${CheckoutStep.DeliveryInfo}`}
              render={(props) =>
                firstName && lastName && email ? (
                  <CheckoutDeliveryInfo
                    {...props}
                    moveToNextStep={this.handleNextStepDeliveryInfo}
                    backToCustomerInfo={this.backToCustomerInfo}
                    deliveryAreas={productEntities.deliveryAreas}
                    googleScriptFailed={googleScriptFailed}
                    handleGoogleScriptFailed={this.handleGoogleScriptFailed}
                  />
                ) : (
                  <Redirect
                    to={{
                      pathname: "/checkout",
                    }}
                  />
                )
              }
            />
            <Route
              path={`/checkout/${CheckoutStep.BillingAddress}`}
              render={(props) =>
                streetAddress && city && zipcode && phone ? (
                  <CheckoutBillingAddress
                    {...props}
                    backToCustomerInfo={this.backToCustomerInfo}
                    backToDeliveryInfo={this.backToDeliveryInfo}
                    googleScriptFailed={googleScriptFailed}
                    handleGoogleScriptFailed={this.handleGoogleScriptFailed}
                  />
                ) : (
                  <Redirect
                    to={{
                      pathname: "/checkout",
                    }}
                  />
                )
              }
            />
            <Route
              path={`/checkout/${CheckoutStep.BillingInfo}`}
              render={(props) =>
                billingStreetAddress &&
                billingCity &&
                billingState &&
                billingPostalCode ? (
                  <CheckoutBillingInfo
                    {...props}
                    cartUuid={cartUuid}
                    cardError={cardError}
                    itemsErrors={itemsError}
                    serverError={serverError}
                    isPlacingOrder={isPlacingOrder}
                    setStripeToken={this.handleSetStripeToken}
                    backToCustomerInfo={this.backToCustomerInfo}
                    backToDeliveryInfo={this.backToDeliveryInfo}
                    handlePlaceOrder={this.handlePlaceOrder}
                    backToBillingAddress={this.backToBillingAddress}
                    generateNewStripeToken={generateNewStripeToken}
                    cartContainsUnavailableItems={
                      cartContainsUnavailableProducts
                    }
                    resetErrorsState={resetErrorsState}
                    stripeToken={this.state.stripeToken}
                    isMobileBreakpoint={isMobileBreakpoint}
                  />
                ) : (
                  <Redirect
                    to={{
                      pathname: "/checkout",
                    }}
                  />
                )
              }
            />
            <Route path={`/checkout/${CheckoutStep.Eligibility}`}>
              {firstName && lastName && email ? (
                <AdditionalUnderwriting
                  statedIncome={statedIncome}
                  onPlaceOrder={this.handlePlaceOrder}
                  onSetStatedIncomeAndPlaceOrder={
                    this.handleSetStatedIncomeAndPlaceOrder
                  }
                  onDepositSubmission={this.handleDepositRequest}
                  monthlyFurnitureTotal={subtotal}
                />
              ) : (
                <Redirect
                  to={{
                    pathname: "/checkout",
                  }}
                />
              )}
            </Route>
            <Route
              path="/checkout"
              render={() => (
                <Redirect
                  to={{
                    pathname: "/checkout",
                  }}
                />
              )}
            />
          </Switch>

          {!isAdditionalUnderwriting && (
            <CheckoutOrderSummary
              backToCart={this.backToCart}
              itemsError={itemsError}
              rentalLength={rentalLength}
              monthlyFurnitureTotal={subtotal}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  cartItems: getCartItems(state),
  totalItems: getNumberOfItemsInCart(state),
  postalCode: getDeliveryZipCode(state),
  rentalLength: getRentalLength(state),
  trackingParams: state.trackingParameters,
  productEntities: getProductEntities(state),
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  membershipState: getMembershipState(state),
  deliveryAreaIdentifier: getDeliveryAreaIdentifier(state),
  isDeliveryOverlayOpen: getIsDeliveryOverlayOpen(state),
  cartUuid: getCartUuid(state),
  isAuthenticated: getIsAuthenticated(state),
  impactClickId: state.trackingParameters.irclickid,
  cartContainsUnavailableProducts: getCartContainsUnavailableProducts(state),
  promo: getPromo(state),
  promoState: getPromoState(state),
  promoError: getPromoError(state),
  generateNewStripeToken: getGenerateNewStripeToken(state),
  isPlacingOrder: getIsPlacingOrder(state),
  cardError: getCardError(state),
  itemsError: getItemsError(state),
  serverError: getServerError(state),
  maxTCVAmount: getMaxTCVAmount(state),
  customerInfo: getCustomerInfo(state),
  deliveryInfo: getDeliveryInfo(state),
  billingAddressInfo: getBillingAddressInfo(state),
  membershipFee: getMembershipFee(state),
  deliveryFee: getDeliveryFee(state),
  taxDueNow: getTaxDueNow(state),
  monthlyTotal: getMonthlyTotal(state),
  monthlyTax: getMonthlyTax(state),
  dueNow: getDueNow(state),
  depositAmount: getDepositAmount(state),
  orderTCV: getOrderTCV(state),
  ssnInfo: getSSNInfo(state),
  step: getCheckoutStep(state),
  subtotal: getCartSubtotal(state),
  isDeliverySameAsBilling: getIsDeliverySameAsBilling(state),
});

const mapDispatchToProps: DispatchProps = {
  toggleOverlay: toggleOverlayAction,
  getUnavailableProductsRequest: getUnavailableProductsRequestAction,
  processCheckout: processCheckout.request,
  submitDepositRequest: depositRequest.request,
  resetErrorsState: resetErrorsStateValues,
  processCheckoutAmountsRequest: processCheckoutAmounts.request,
  resetCheckoutForms,
  updateSSNInfo,
  checkoutStepCompleted,
  changeCheckoutStep,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Checkout);
