/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { State as GlobalState } from '../../../types/ReduxState';
import { ItemUnavailableError } from '../store/checkout.types';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import { APIError } from '../../../types/ReduxState';
import StripeForm from './CheckoutBillingStripeForm';
import Analytics from '../../../analytics/analytics';
import { CHECKOUT } from '../../../analytics/checkout/events';
import {
  stepViewedPayloadMapping,
  checkoutActionsCartUuidPayloadMapping
} from '../../../analytics/checkout/payload-mappings';
import { CheckoutStep } from '../store/checkout.types';
import Button, { ButtonStyle } from '../../../ui/buttons/Button';

import AttentionIcon from '../../../assets/icons/icon_attention.svg';
import TooltipIcon from '../../../assets/icons/ui-elements/tooltip.svg';
import PromoEntry from './PromoEntry';
import Title1 from '../../../ui/titles/Title1';
import { BREAKPOINTS } from '../../../ui/variables';
import SSNEntry from './SSNEntry';
import SSNNotFoundMessage from './SSNNotFoundMessage';
import Header4 from '../../../ui/headers/Header4';
import { CheckoutCTAError } from './CheckoutCTAError';
import { CHECKOUT_CTA_ERRORS } from './CheckoutCTAErrors.content';
import PreviousStepsInfo from './PreviousStepsInfo';
import { Token } from '@stripe/stripe-js';
import {
  getIsCreditNotFound,
  getIsDeliverySameAsBilling,
  getIsSSNNotFound,
  getSSNInfo
} from '../store/checkout.selectors';
import { SSNInfoFields } from '../store/checkoutForms.types';
import { validateLegalName, validateSSN } from '../store/checkout.service';
import { getIsCartMinimumMet } from '../../cart/store/cart.selectors';

interface StateProps {
  isCreditNotFound: boolean;
  isSSNNotFound: boolean;
  ssnInfo: SSNInfoFields;
  isCartMinimumMet: boolean;
  isDeliverySameAsBilling: boolean;
}

type Props = StateProps & {
  backToCustomerInfo: () => void;
  backToDeliveryInfo: () => void;
  backToBillingAddress: () => void;
  handlePlaceOrder: Function;
  cardError: { error: string | null };
  serverError: APIError | null;
  itemsErrors: ItemUnavailableError[];
  setStripeToken: (token: Token) => void;
  isPlacingOrder: boolean;
  generateNewStripeToken: boolean;
  cartUuid: string;
  cartContainsUnavailableItems: boolean;
  isMobileBreakpoint: boolean;
  resetErrorsState: () => void;
  stripeToken: Token | null;
};

interface State {
  stripeReady: boolean;
  readyToPlaceOrder: boolean;
  creditCheckConsent: boolean;
  checkoutWithoutConsent: boolean;
  generateStripeToken: null | (() => Promise<null>);
}

class CheckoutBillingInfo extends Component<Props, State> {
  public readonly state: Readonly<State> = {
    stripeReady: false,
    readyToPlaceOrder: false,
    creditCheckConsent: false,
    checkoutWithoutConsent: false,
    generateStripeToken: null
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    Analytics.trackEvent(
      CHECKOUT.STEP_VIEWED,
      stepViewedPayloadMapping({ step: CheckoutStep.BillingInfo, cartUuid: this.props.cartUuid })
    );
  }

  componentWillUnmount() {
    this.props.resetErrorsState();
  }

  handleReadyToSubmit = (isReady: boolean, stripeToken?: Token) => {
    this.setState(
      (prevState) => ({
        stripeReady: isReady,
        readyToPlaceOrder: isReady && prevState.creditCheckConsent
      }),
      () => {
        if (isReady && stripeToken) {
          this.props.setStripeToken(stripeToken);
        }
      }
    );
  };

  ssnFormIsValid = () => {
    const { isCreditNotFound, isSSNNotFound } = this.props;

    const { ssn, legalFirstName, legalLastName } = this.props.ssnInfo;

    // we only care if the form is valid if the form is relevant
    // which is when credit is not found or ssn is not found
    if (isCreditNotFound || isSSNNotFound) {
      return validateSSN(ssn) && validateLegalName(legalFirstName) && validateLegalName(legalLastName);
    }

    return true;
  };

  handleToolTip = () => {
    Analytics.trackEvent(
      CHECKOUT.CLICK_TOOLTIP,
      checkoutActionsCartUuidPayloadMapping({ cartUuid: this.props.cartUuid })
    );
  };

  handlePlaceOrder = async () => {
    // Shouldn't be able to place an order if
    // an order is currently being processed.
    if (this.props.isPlacingOrder) {
      return;
    }

    // Shouldn't be able to place an order if
    // the cart minimum is not met
    if (!this.props.isCartMinimumMet) {
      return;
    }

    // Shouldn't be able to place an order if
    // the SSN form is not valid
    if (!this.ssnFormIsValid()) {
      return;
    }

    // Has all credit card information been entered properly?
    // And did the user try to checkout without consenting to a
    // credit check?
    if (this.state.stripeReady && !this.state.creditCheckConsent) {
      this.setState(
        {
          checkoutWithoutConsent: true
        },
        () => {
          // User has attempted to place an order without consenting to credit check.
          Analytics.trackEvent(
            CHECKOUT.CREDIT_CHECK,
            checkoutActionsCartUuidPayloadMapping({ cartUuid: this.props.cartUuid })
          );
        }
      );
    } else if (!this.props.stripeToken && this.state.generateStripeToken) {
      await this.state.generateStripeToken();
      this.props.handlePlaceOrder();
    } else if (this.state.stripeReady && this.state.creditCheckConsent) {
      // Agree to credit check? Proceed to place order.
      this.props.handlePlaceOrder();
    }
  };

  toggleCreditCheckConsent = () => {
    this.setState((prevState) => ({
      creditCheckConsent: !prevState.creditCheckConsent,
      checkoutWithoutConsent: prevState.creditCheckConsent,
      readyToPlaceOrder: prevState.stripeReady && !prevState.creditCheckConsent
    }));
  };

  render() {
    const {
      cardError,
      itemsErrors,
      serverError,
      backToCustomerInfo,
      backToDeliveryInfo,
      backToBillingAddress,
      cartContainsUnavailableItems,
      cartUuid,
      isMobileBreakpoint,
      isCreditNotFound,
      isSSNNotFound,
      isPlacingOrder,
      isDeliverySameAsBilling
    } = this.props;

    const popoverBottom = (
      <Popover className="options-popover" id="popover-positioned-bottom" style={{ width: '400px' }} placement="auto">
        <h6 className="futura reg-14">Additional Information on Soft Checks</h6>
        <p className="futura">
          Soft inquiries (also known as “soft pulls”) typically occur when a person or company checks your credit as
          part of a verification process. This may occur, for example, when a credit card issuer checks your credit to
          see if you qualify for certain credit card offers. Your employer might also run a soft inquiry before hiring
          you. We use a VantageScore (versus a FICO score) to better to take into account students and people without a
          long credit history.
        </p>
      </Popover>
    );

    let errorMessage: undefined | string;

    if (cardError.error) {
      // Stripe card error (client side)
      errorMessage = cardError.error;
    } else if (itemsErrors && itemsErrors.length > 0) {
      // Item(s) out-of-stock
      errorMessage = `Yikes! It looks like some items are unavailable or no longer in stock. Please remove or change the items and try again, or call us at (347) 352-8599 if you have questions.`;
    } else if (serverError !== null) {
      // Other / unhandled error
      errorMessage = `Yikes! Something went wrong. Please call us at (347) 352-8599 and we'll make it right.`;
    }

    return (
      <div className="checkout-page__billing-info checkout-page__form">
        <StripeForm
          readyToSubmit={this.handleReadyToSubmit}
          createTokenGenerator={(generator) => this.setState({ generateStripeToken: generator })}
        />

        {errorMessage ? (
          <p data-cy="error-message-big" className="error-message-big">
            {errorMessage}
          </p>
        ) : null}

        <div
          css={css`
            width: 60%;
            padding: 12px 0 6px 0;
            @media ${BREAKPOINTS.MOBILE} {
              width: 100%;
            }
          `}
        >
          <Title1>Have a promo code?</Title1>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 60%;
            padding: 12px 0 20px 0;
            @media ${BREAKPOINTS.MOBILE} {
              width: 100%;
            }
          `}
        >
          <PromoEntry isAlwaysOpen={true} cartUuid={cartUuid} />
        </div>

        <div className={`checkout-credit-check ${this.state.checkoutWithoutConsent ? `error` : ``}`}>
          <div
            css={css`
              margin: 16px 0;
            `}
          >
            <Header4>Soft Credit Check Authorization</Header4>
          </div>
          {isCreditNotFound || isSSNNotFound ? (
            <SSNEntry />
          ) : (
            <Fragment>
              <div className="cc-sub-header">
                To provide the best experience to our customers, we run a soft credit check that does{' '}
                <strong>not</strong> affect your credit score.
                <OverlayTrigger trigger="click" overlay={popoverBottom} placement="bottom" rootClose={true}>
                  <TooltipIcon
                    className="icon"
                    style={{ marginLeft: '5px', marginBottom: '-2px' }}
                    onClick={this.handleToolTip}
                  />
                </OverlayTrigger>
              </div>
              <div className="billing-address-checkbox">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={this.state.creditCheckConsent}
                    onChange={this.toggleCreditCheckConsent}
                  />
                  <span data-cy="checkmark" className={`checkmark ${this.state.creditCheckConsent ? `checked` : ``}`} />
                  <span className="text cc-sub-text">
                    I agree and understand that by clicking “Place your order” I am providing “written instructions” to
                    Feather Home, Inc. (“Feather”) under the Fair Credit Reporting Act authorizing Feather to obtain
                    information from my personal credit profile or other information from Experian. I authorize Feather
                    to obtain information solely to determine my eligibility for a lease.
                  </span>
                </label>
              </div>
            </Fragment>
          )}
        </div>

        {this.state.checkoutWithoutConsent ? (
          <p data-cy="cc-error-message" className="cc-error-message">
            <AttentionIcon />
            To continue, please review and agree to the soft credit check above
          </p>
        ) : null}

        {cartContainsUnavailableItems && <CheckoutCTAError {...CHECKOUT_CTA_ERRORS.outOfStock} />}

        <div
          css={css`
            margin: 32px;
            width: ${isMobileBreakpoint ? 100 : 60}%;
          `}
        >
          {isSSNNotFound && <SSNNotFoundMessage />}
          <Button
            dataCy="checkout-button"
            isFullWidth={true}
            isDisabled={cartContainsUnavailableItems || isPlacingOrder}
            isAppearDisabled={!this.state.readyToPlaceOrder || !this.ssnFormIsValid()}
            onClick={this.handlePlaceOrder}
          >
            {isPlacingOrder ? 'Placing Your Order...' : 'Place Your Order'}
          </Button>
        </div>
        {isDeliverySameAsBilling ? (
          <Button style={ButtonStyle.COMPACT_TEXT} onClick={backToDeliveryInfo}>
            Return to Delivery Info
          </Button>
        ) : (
          <Button style={ButtonStyle.COMPACT_TEXT} onClick={backToBillingAddress}>
            Return to Billing Address
          </Button>
        )}

        <PreviousStepsInfo
          currentStep={CheckoutStep.BillingInfo}
          backToCustomerInfo={backToCustomerInfo}
          backToDeliveryInfo={backToDeliveryInfo}
          backToBillingAddressInfo={backToBillingAddress}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  isCreditNotFound: getIsCreditNotFound(state),
  isSSNNotFound: getIsSSNNotFound(state),
  ssnInfo: getSSNInfo(state),
  isCartMinimumMet: getIsCartMinimumMet(state),
  isDeliverySameAsBilling: getIsDeliverySameAsBilling(state)
});

export default connect(mapStateToProps)(CheckoutBillingInfo);
