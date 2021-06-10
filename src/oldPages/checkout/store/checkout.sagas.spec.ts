import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import Request, { RequestMethod } from '../../../api/request';
import {
  handleCheckoutRequest,
  handleCheckoutSuccess,
  handleCheckoutFailure,
  handleDepositRequest,
  handleDepositSuccess,
  handleRequestAmounts,
  handleNextCheckoutStep
} from './checkout.sagas';
import { checkoutStepCompleted, depositRequest, processCheckout, processCheckoutAmounts } from './checkout.actions';
import {
  exampleCheckoutRequestPayload,
  exampleAmountsRequestPayload,
  exampleAmountsSuccessPayload
} from './checkout.fixtures';
import {
  CheckoutSuccessResponse,
  CheckoutRequestPayload,
  CheckoutErrors,
  StripeErrorCodes,
  DepositRequestPayload,
  CheckoutStep,
  DepositOrigin,
  CheckoutStateStep
} from './checkout.types';
import { APIError } from '../../../api/error';
import { resetCart } from '../../cart/store/cart.actions';
import { noop } from '../../../utils/ui-helpers';
import { history } from '../../../store/history';
import Analytics from '../../../analytics/analytics';
import {
  trackCheckoutUserPayloadMapping,
  successfulCheckoutPayloadMapping,
  impactOnlineSalePayloadMapping,
  impactClickIdContextMapping,
  checkoutActionsCartUuidPayloadMapping,
  maxTCVExceededPayloadMapping,
  stepCompletedPayloadMapping
} from '../../../analytics/checkout/payload-mappings';
import { CHECKOUT } from '../../../analytics/checkout/events';
import { getCartUuid } from '../../cart/store/cart.selectors';
import { closeOverlay, toggleOverlay } from '../../../app/store/overlay/overlay.actions';
import { Overlays } from '../../../app/store/overlay/overlay.types';
import { getIsAuthenticated } from '../../auth/login/store/login.selectors';
import { getCheckoutStep } from './checkout.selectors';
import { CheckoutFormDataPayload } from './checkoutForms.types';

describe('Checkout sagas', () => {
  describe('Processing a checkout request', () => {
    it('successfully', () => {
      const payload = {
        ...exampleCheckoutRequestPayload
      };
      const action = {
        type: processCheckout.request.type,
        payload
      };

      const response: CheckoutSuccessResponse = {
        id: 10002000
      };
      return expectSaga(handleCheckoutRequest, action)
        .provide([
          [
            matchers.call(
              [Request, 'send'],
              RequestMethod.POST,
              '/checkout',
              undefined,
              exampleCheckoutRequestPayload.checkoutInfo,
              false
            ),
            response
          ]
        ])
        .put(
          processCheckout.success({
            id: response.id,
            checkoutInfo: payload.checkoutInfo,
            cartInfo: payload.cartInfo,
            amounts: payload.amounts
          })
        )
        .run();
    });

    it('unsuccessfully due to there being no stripe token', () => {
      const payload: CheckoutRequestPayload = {
        ...exampleCheckoutRequestPayload,
        stripeToken: null
      };
      const action = {
        type: processCheckout.request.type,
        payload
      };

      const errorResponse = {
        name: 'Error',
        status: 400,
        error: 'Card processing error',
        message: 'No Stripe token present',
        body: { data: { type: CheckoutErrors.StripeCardError, code: StripeErrorCodes.NoToken } }
      };

      return expectSaga(handleCheckoutRequest, action).put(processCheckout.failure(errorResponse)).run();
    });

    it('unsuccessfully due to a prepaid card being used', () => {
      const payload: CheckoutRequestPayload = {
        ...exampleCheckoutRequestPayload,
        stripeToken: {
          card: {
            name: null,
            tokenization_method: null,
            cvc_check: null,
            funding: 'prepaid',
            id: '',
            object: 'card',
            brand: 'Visa',
            country: '',
            dynamic_last4: '',
            exp_month: 2,
            exp_year: 22,
            fingerprint: '',
            last4: '',
            metadata: {},
            address_city: null,
            address_country: null,
            address_line1: null,
            address_line1_check: null,
            address_line2: null,
            address_state: null,
            address_zip: null,
            address_zip_check: null
          },
          id: 'fake_token',
          object: 'token',
          client_ip: '',
          type: '',
          created: 1,
          livemode: false,
          used: false
        }
      };
      const action = {
        type: processCheckout.request.type,
        payload
      };

      const errorResponse = {
        name: 'Error',
        status: 400,
        error: 'Card processing error',
        message: 'Prepaid cards are not accepted',
        body: { data: { type: CheckoutErrors.StripeCardError, code: StripeErrorCodes.InvalidFunding } }
      };

      return expectSaga(handleCheckoutRequest, action).put(processCheckout.failure(errorResponse)).run();
    });

    it('unsuccessfully due to a Stripe processing error', () => {
      const payload = {
        ...exampleCheckoutRequestPayload
      };
      const action = {
        type: processCheckout.request.type,
        payload
      };

      const errorResponse: APIError = {
        name: 'Error',
        status: 400,
        error: 'Card processing error',
        message: 'Could not take your money',
        body: {
          type: CheckoutErrors.StripeCardError,
          code: StripeErrorCodes.InvalidExpiryYear
        }
      };

      return expectSaga(handleCheckoutRequest, action)
        .provide([
          [
            matchers.call(
              [Request, 'send'],
              RequestMethod.POST,
              '/checkout',
              undefined,
              exampleCheckoutRequestPayload.checkoutInfo,
              false
            ),
            Promise.reject(errorResponse)
          ]
        ])
        .put(processCheckout.failure(errorResponse))
        .run();
    });

    it('unsuccessfully due to any other reason', () => {
      const payload = {
        ...exampleCheckoutRequestPayload
      };
      const action = {
        type: processCheckout.request.type,
        payload
      };

      const errorResponse: APIError = {
        name: 'Error',
        status: 500,
        error: 'something unexpected happened',
        message: 'oh noes! an error!'
      };

      return expectSaga(handleCheckoutRequest, action)
        .provide([
          [
            matchers.call(
              [Request, 'send'],
              RequestMethod.POST,
              '/checkout',
              undefined,
              exampleCheckoutRequestPayload.checkoutInfo,
              false
            ),
            Promise.reject(errorResponse)
          ]
        ])
        .put(processCheckout.failure(errorResponse))
        .run();
    });
  });

  describe('Handling a successful checkout', () => {
    it('should handle a successful checkout', () => {
      const payload = {
        ...exampleCheckoutRequestPayload,
        id: 1000001
      };
      const action = {
        type: processCheckout.success.type,
        payload
      };

      const trackUserPayload = {
        properties: trackCheckoutUserPayloadMapping({
          firstName: payload.checkoutInfo.customer.firstName,
          lastName: payload.checkoutInfo.customer.lastName,
          email: payload.checkoutInfo.customer.email,
          company: payload.checkoutInfo.delivery.company
        })
      };

      const successfulCheckoutPayload = successfulCheckoutPayloadMapping({
        firstName: payload.checkoutInfo.customer.firstName,
        lastName: payload.checkoutInfo.customer.lastName,
        email: payload.checkoutInfo.customer.email,
        phone: payload.checkoutInfo.customer.phone,
        transactionId: payload.id,
        transactionTotal: payload.amounts.dueNow,
        transactionTax: payload.amounts.taxDueNow,
        cartItems: payload.cartInfo.cartItems,
        utmData: payload.checkoutInfo.utmData,
        monthlyTotal: payload.amounts.monthlyTotal,
        subtotal: payload.amounts.subtotal,
        membershipFee: payload.amounts.membershipFee,
        promo: payload.amounts.promo,
        cartUuid: payload.cartInfo.cartUuid,
        rentalLength: payload.checkoutInfo.planMonths,
        deliveryFee: payload.amounts.deliveryFee
      });

      const impactAffiliateSalePayload = impactOnlineSalePayloadMapping({
        orderId: payload.id,
        impactClickId: payload.cartInfo.impactClickId,
        promo: payload.amounts.promo,
        cartItems: payload.cartInfo.cartItems,
        rentalLength: payload.checkoutInfo.planMonths,
        subtotal: payload.amounts.subtotal,
        deliveryFee: payload.amounts.deliveryFee
      });

      const tatariPayload = {
        orderId: payload.id,
        total: payload.amounts.monthlyTotal,
        ltv: successfulCheckoutPayload.tcv
      };

      const impactClickIdContext = impactClickIdContextMapping(payload.cartInfo.impactClickId);

      return (
        expectSaga(handleCheckoutSuccess, action)
          // TODO: Fix this the next time the file is edited.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .provide([[matchers.call(history.push as any, `/checkout-success/${payload.id}`), noop]])
          .put(resetCart())
          .call(history.push, `/checkout-success/${payload.id}`)
          .call(Analytics.trackUser, trackUserPayload)
          .call(Analytics.trackEvent, CHECKOUT.SUCCESS, successfulCheckoutPayload)
          .call(Analytics.trackEvent, CHECKOUT.IMPACT_AFFILIATE_SALE, impactAffiliateSalePayload, impactClickIdContext)
          .call(Analytics.tatariEvent, 'purchase', tatariPayload)
          .run()
      );
    });
  });

  describe('Handling an unsuccessful checkout', () => {
    it('should handle an error that has no body by doing nothing at all', () => {
      const action = {
        type: processCheckout.failure.type,
        payload: {
          name: 'Error',
          status: 500,
          error: 'A wild unexpected error',
          message: 'that has no data associated in a body'
        }
      };
      return expectSaga(handleCheckoutFailure, action).run();
    });

    it('should handle a stripe payment related error', () => {
      const action = {
        type: processCheckout.failure.type,
        payload: {
          name: 'Error',
          status: 400,
          error: 'Card processing error',
          message: 'We could not take your money',
          body: {
            data: {
              type: CheckoutErrors.StripeCardError,
              code: StripeErrorCodes.InsufficientFunds
            }
          }
        }
      };
      return expectSaga(handleCheckoutFailure, action)
        .call(Analytics.trackEvent, CHECKOUT.STRIPE_ERROR, { error: StripeErrorCodes.InsufficientFunds })
        .call(history.push, `/checkout/${CheckoutStep.BillingInfo}`)
        .run();
    });

    it('should handle a customer not approved error', () => {
      const action = {
        type: processCheckout.failure.type,
        payload: {
          name: 'Error',
          status: 400,
          error: 'An error!',
          message: 'that occurred during checkout',
          body: {
            data: {
              message: CheckoutErrors.CustomerNotApproved
            }
          }
        }
      };
      const cartUuid = '12345';
      const analyticsPayload = checkoutActionsCartUuidPayloadMapping({ cartUuid });

      return expectSaga(handleCheckoutFailure, action)
        .provide([
          [matchers.select(getCartUuid), cartUuid],
          [matchers.call(history.push, '/credit-check'), noop]
        ])
        .call(Analytics.trackEvent, CHECKOUT.CUSTOMER_NOT_APPROVED, analyticsPayload)
        .call(history.push, '/credit-check')
        .run();
    });

    it('should handle a failed OFAC check error', () => {
      const action = {
        type: processCheckout.failure.type,
        payload: {
          name: 'Error',
          status: 400,
          error: 'An error!',
          message: 'that occurred during checkout',
          body: {
            data: {
              message: CheckoutErrors.OFACCheckFailed
            }
          }
        }
      };
      const cartUuid = '12345';
      const analyticsPayload = checkoutActionsCartUuidPayloadMapping({ cartUuid });

      return expectSaga(handleCheckoutFailure, action)
        .provide([
          [matchers.select(getCartUuid), cartUuid],
          [matchers.call(history.push, '/ofac-check'), noop]
        ])
        .call(Analytics.trackEvent, CHECKOUT.OFAC_CHECK_FAILED, analyticsPayload)
        .call(history.push, '/ofac-check')
        .run();
    });

    it('should handle a self report income error', () => {
      const action = {
        type: processCheckout.failure.type,
        payload: {
          name: 'Error',
          status: 400,
          error: 'An error!',
          message: 'that occurred during checkout',
          body: {
            data: {
              message: CheckoutErrors.SelfReportedIncomeRequiredError
            }
          }
        }
      };
      const cartUuid = '12345';
      const analyticsPayload = checkoutActionsCartUuidPayloadMapping({ cartUuid });

      return expectSaga(handleCheckoutFailure, action)
        .provide([
          [matchers.select(getCartUuid), cartUuid],
          [matchers.call(history.push, '/checkout/eligibility/income'), noop]
        ])
        .call(Analytics.trackEvent, CHECKOUT.CUSTOMER_INCOME_REQUIRED, analyticsPayload)
        .call(history.push, `/checkout/${CheckoutStep.Eligibility}/income`)
        .run();
    });

    it('should handle a max total cart value error', () => {
      const action = {
        type: processCheckout.failure.type,
        payload: {
          name: 'Error',
          status: 400,
          error: 'An error!',
          message: 'that occurred during checkout',
          body: {
            data: {
              message: CheckoutErrors.MaxTCVError,
              eligibleForDeposit: false,
              maxTCV: 4900
            }
          }
        }
      };
      const cartUuid = '12345';
      const analyticsPayload = maxTCVExceededPayloadMapping({ cartUuid, eligibleForDeposit: false });

      return expectSaga(handleCheckoutFailure, action)
        .provide([
          [matchers.select(getCartUuid), cartUuid],
          [matchers.call(history.push, '/checkout/eligibility/reduce-cart-deposit'), noop]
        ])
        .call(Analytics.trackEvent, CHECKOUT.MAX_TCV_EXCEEDED, analyticsPayload)
        .call(history.push, `/checkout/${CheckoutStep.Eligibility}/reduce-cart-deposit`)
        .run();
    });

    it('should handle an additional information required error', () => {
      const action = {
        type: processCheckout.failure.type,
        payload: {
          name: 'Error',
          status: 400,
          error: 'An error!',
          message: 'that occurred during checkout',
          body: {
            data: {
              message: CheckoutErrors.AdditionalInformationRequired
            }
          }
        }
      };
      const cartUuid = '12345';
      const analyticsPayload = checkoutActionsCartUuidPayloadMapping({ cartUuid });

      return expectSaga(handleCheckoutFailure, action)
        .provide([[matchers.select(getCartUuid), cartUuid]])
        .call(Analytics.trackEvent, CHECKOUT.ADDITIONAL_INFO_REQUIRED, analyticsPayload)
        .call(history.push, `/checkout/${CheckoutStep.BillingInfo}`)
        .run();
    });

    it('should handle a credit report not found error', () => {
      const action = {
        type: processCheckout.failure.type,
        payload: {
          name: 'Error',
          status: 400,
          error: 'An error!',
          message: 'that occurred during checkout',
          body: {
            data: {
              message: CheckoutErrors.CreditReportNotFound
            }
          }
        }
      };
      const cartUuid = '12345';
      const analyticsPayload = checkoutActionsCartUuidPayloadMapping({ cartUuid });

      return expectSaga(handleCheckoutFailure, action)
        .provide([[matchers.select(getCartUuid), cartUuid]])
        .call(Analytics.trackEvent, CHECKOUT.CREDIT_REPORT_NOT_FOUND, analyticsPayload)
        .call(history.push, `/checkout/${CheckoutStep.BillingInfo}`)
        .run();
    });

    it('should handle an invalid SSN error', () => {
      const action = {
        type: processCheckout.failure.type,
        payload: {
          name: 'Error',
          status: 400,
          error: 'An error!',
          message: 'that occurred during checkout',
          body: {
            data: {
              message: CheckoutErrors.InvalidSSN
            }
          }
        }
      };
      const cartUuid = '12345';
      const analyticsPayload = checkoutActionsCartUuidPayloadMapping({ cartUuid });

      return expectSaga(handleCheckoutFailure, action)
        .provide([[matchers.select(getCartUuid), cartUuid]])
        .call(Analytics.trackEvent, CHECKOUT.INVALID_SSN, analyticsPayload)
        .call(history.push, `/checkout/${CheckoutStep.BillingInfo}`)
        .run();
    });
  });

  describe('Handling a deposit request', () => {
    const { checkoutInfo, cartInfo } = exampleCheckoutRequestPayload;
    const { customer, delivery, planMonths, promoCode } = checkoutInfo;

    const items = cartInfo.cartItems.map((item) => {
      return {
        title: item.title,
        variantName: item.variantName,
        rentalPrice: item.rentalPrices[item.rentalLength]
      };
    });

    const payload: DepositRequestPayload = {
      customer: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone
      },
      delivery,
      items,
      planMonths,
      promoCode,
      originator: DepositOrigin.AdditionalUnderwriting,
      maxTCV: 900,
      depositAmount: 150
    };

    it('should handle successful deposit request', () => {
      const action = {
        type: depositRequest.request.type,
        payload
      };

      const response = {};

      return expectSaga(handleDepositRequest, action)
        .provide([
          [matchers.call([Request, 'send'], RequestMethod.POST, '/checkout/deposit', undefined, payload), response]
        ])
        .put(depositRequest.success({}))
        .run();
    });

    it('should handle an unsuccessful deposit', () => {
      const action = {
        type: depositRequest.request.type,
        payload
      };

      const errorResponse: APIError = {
        name: 'Error',
        status: 500,
        error: 'something unexpected happened',
        message: 'oh noes! an error!'
      };

      return expectSaga(handleDepositRequest, action)
        .provide([
          [
            matchers.call([Request, 'send'], RequestMethod.POST, '/checkout/deposit', undefined, payload),
            Promise.reject(errorResponse)
          ]
        ])
        .put(depositRequest.failure(errorResponse))
        .run();
    });
  });

  describe('Handling a deposit success', () => {
    it('should handle a successful deposit success', () => {
      const cartUuid = '7510002';
      const analyticsPayload = checkoutActionsCartUuidPayloadMapping({ cartUuid });

      return expectSaga(handleDepositSuccess)
        .provide([
          [matchers.select(getCartUuid), cartUuid],
          [matchers.call(history.push, '/deposit-request'), noop]
        ])
        .call(Analytics.trackEvent, CHECKOUT.DEPOSIT_REQUESTED, analyticsPayload)
        .put(resetCart())
        .put(closeOverlay(Overlays.NoSSNOverlay))
        .call(history.push, '/deposit-request')
        .run();
    });
  });

  describe('handleRequestAmounts', () => {
    it('should handle successfully fetching amounts data', () => {
      const action = processCheckoutAmounts.request(exampleAmountsRequestPayload);

      return expectSaga(handleRequestAmounts, action)
        .provide([
          [
            matchers.call(
              [Request, 'send'],
              RequestMethod.POST,
              '/checkout/amounts',
              undefined,
              exampleAmountsRequestPayload,
              false
            ),
            exampleAmountsSuccessPayload
          ]
        ])
        .put(processCheckoutAmounts.success(exampleAmountsSuccessPayload))
        .run();
    });

    it('should handle unsuccessfully fetching amounts data', () => {
      const action = processCheckoutAmounts.request(exampleAmountsRequestPayload);
      const mockError: APIError = {
        name: 'Error',
        status: 500,
        message: 'A lil copy pasta never hurt nobody!',
        error: 'Server Error'
      };

      return expectSaga(handleRequestAmounts, action)
        .provide([
          [
            matchers.call(
              [Request, 'send'],
              RequestMethod.POST,
              '/checkout/amounts',
              undefined,
              exampleAmountsRequestPayload,
              false
            ),
            Promise.reject(mockError)
          ]
        ])
        .put(processCheckoutAmounts.failure(mockError))
        .run();
    });
  });

  describe('handleNextCheckoutStep', () => {
    const step = CheckoutStateStep.CustomerInfo;

    const payload: CheckoutFormDataPayload = {
      step,
      data: { firstName: 'me', lastName: 'you', email: 'me@mail.com', persona: null }
    };

    const action = checkoutStepCompleted(payload);

    it('should handle moving to the next step if the customer is not authenticated', () => {
      const cartUuid = '123cart';
      const analyticsPayload = stepCompletedPayloadMapping({ step, cartUuid });

      return expectSaga(handleNextCheckoutStep, action)
        .provide([
          [matchers.select(getIsAuthenticated), false],
          [matchers.select(getCheckoutStep), step],
          [matchers.select(getCartUuid), cartUuid],
          [matchers.call(history.push, `/checkout/${step}`), noop]
        ])
        .call(Analytics.trackEvent, CHECKOUT.STEP_COMPLETED, analyticsPayload)
        .call(history.push, `/checkout/${step}`)
        .run();
    });

    it('should handle opening the AddItemsToCurrentPlan overlay and not move to the next step if the customer is authenticated', () => {
      return expectSaga(handleNextCheckoutStep, action)
        .provide([[matchers.select(getIsAuthenticated), true]])
        .put(toggleOverlay(Overlays.AddItemsToCurrentPlanOverlay, true))
        .run();
    });
  });
});
