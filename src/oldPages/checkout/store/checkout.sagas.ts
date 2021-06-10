import { takeLatest, call, put, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  checkoutStepCompleted,
  depositRequest,
  processCheckout,
  processCheckoutAmounts,
  resetCheckoutForms
} from './checkout.actions';
import {
  CheckoutRequestPayload,
  CheckoutSuccessPayload,
  CheckoutSuccessResponse,
  CheckoutErrors,
  DepositRequestPayload,
  StripeErrorCodes,
  AmountsRequestPayload,
  CheckoutStep
} from './checkout.types';
import { CheckoutFormDataPayload } from './checkoutForms.types';
import Request, { RequestMethod } from '../../../api/request';
import { resetCart } from '../../cart/store/cart.actions';
import Analytics from '../../../analytics/analytics';
import { CHECKOUT } from '../../../analytics/checkout/events';
import {
  trackCheckoutUserPayloadMapping,
  successfulCheckoutPayloadMapping,
  impactClickIdContextMapping,
  impactOnlineSalePayloadMapping,
  checkoutActionsCartUuidPayloadMapping,
  maxTCVExceededPayloadMapping,
  calculateTotalContractValue,
  stepCompletedPayloadMapping
} from '../../../analytics/checkout/payload-mappings';
import { history } from '../../../store/history';
import { APIError } from '../../../api/error';
import { getCartUuid } from '../../cart/store/cart.selectors';
import { getTaxDeliveryInfo } from './checkout.service';
import { toggleOverlay } from '../../../app/store/overlay/overlay.actions';
import { Overlays } from '../../../app/store/overlay/overlay.types';
import { closeOverlay } from '../../../app/store/overlay/overlay.actions';
import { getCheckoutStep } from './checkout.selectors';
import { getIsAuthenticated } from '../../auth/login/store/login.selectors';
import { setRegisterEmail } from '../../auth/register/store/register.actions';

export function* handleCheckoutRequest({ payload }: PayloadAction<CheckoutRequestPayload>) {
  const { checkoutInfo, cartInfo, amounts, stripeToken } = payload;

  if (!stripeToken) {
    // Don't bother with a trip to the API, as without a Stripe token
    // we have no chance in succeeding in charging a card
    yield put(
      processCheckout.failure({
        name: 'Error',
        status: 400,
        error: 'Card processing error',
        message: 'No Stripe token present',
        body: { data: { type: CheckoutErrors.StripeCardError, code: StripeErrorCodes.NoToken } }
      })
    );
    return;
  } else if (stripeToken.card && stripeToken.card.funding === 'prepaid') {
    // Don't bother with a trip to the API, as we don't allow prepaid cards
    // but format the error to adhere to the APIError interface
    yield put(
      processCheckout.failure({
        name: 'Error',
        status: 400,
        error: 'Card processing error',
        message: 'Prepaid cards are not accepted',
        body: { data: { type: CheckoutErrors.StripeCardError, code: StripeErrorCodes.InvalidFunding } }
      })
    );
    return;
  }

  try {
    const checkoutResponse: CheckoutSuccessResponse = yield call(
      [Request, 'send'],
      RequestMethod.POST,
      '/checkout',
      undefined,
      checkoutInfo,
      false
    );
    yield put(processCheckout.success({ id: checkoutResponse.id, cartInfo, amounts, checkoutInfo }));
  } catch (error) {
    yield put(processCheckout.failure(error));
  }
}

export function* handleCheckoutSuccess({ payload }: PayloadAction<CheckoutSuccessPayload>) {
  const { id, cartInfo, amounts, checkoutInfo } = payload;
  // clear out the cart
  yield put(resetCart());
  // clear out checkout forms info
  yield put(resetCheckoutForms());
  // auto-populate user's email when they go to set up Feather account.
  yield put(setRegisterEmail(checkoutInfo.customer.email));
  // navigate the user to the checkout success page
  yield call<(x: string) => void>(history.push, `/checkout-success/${id}`);
  // handle checkout analytic events
  yield call(Analytics.trackUser, {
    properties: trackCheckoutUserPayloadMapping({
      firstName: checkoutInfo.customer.firstName,
      lastName: checkoutInfo.customer.lastName,
      email: checkoutInfo.customer.email,
      company: checkoutInfo.delivery.company
    })
  });

  yield call(
    Analytics.trackEvent,
    CHECKOUT.SUCCESS,
    successfulCheckoutPayloadMapping({
      firstName: checkoutInfo.customer.firstName,
      lastName: checkoutInfo.customer.lastName,
      email: checkoutInfo.customer.email,
      phone: checkoutInfo.customer.phone,
      transactionId: id,
      transactionTotal: amounts.dueNow,
      transactionTax: amounts.taxDueNow,
      cartItems: cartInfo.cartItems,
      utmData: checkoutInfo.utmData,
      monthlyTotal: amounts.monthlyTotal,
      subtotal: amounts.subtotal,
      membershipFee: amounts.membershipFee,
      promo: amounts.promo,
      cartUuid: cartInfo.cartUuid,
      deliveryFee: amounts.deliveryFee,
      rentalLength: checkoutInfo.planMonths
    })
  );

  yield call(
    Analytics.trackEvent,
    CHECKOUT.IMPACT_AFFILIATE_SALE,
    impactOnlineSalePayloadMapping({
      orderId: id,
      impactClickId: cartInfo.impactClickId,
      promo: amounts.promo,
      cartItems: cartInfo.cartItems,
      rentalLength: checkoutInfo.planMonths,
      subtotal: amounts.subtotal,
      deliveryFee: amounts.deliveryFee
    }),
    impactClickIdContextMapping(cartInfo.impactClickId)
  );

  yield call(Analytics.tatariEvent, 'purchase', {
    orderId: id,
    total: amounts.monthlyTotal,
    ltv: calculateTotalContractValue({
      dueNow: amounts.dueNow,
      dueMonthly: amounts.monthlyTotal,
      rentalLength: checkoutInfo.planMonths
    })
  });
}

export function* handleCheckoutFailure({ payload: error }: PayloadAction<APIError>) {
  if (error.body) {
    const errorData = error.body['data'];
    if (errorData) {
      if (errorData.type && errorData.type === CheckoutErrors.StripeCardError) {
        yield call(Analytics.trackEvent, CHECKOUT.STRIPE_ERROR, { error: errorData.code });
        yield call<(x: string) => void>(history.push, `/checkout/${CheckoutStep.BillingInfo}`);
      }
      if (errorData.message) {
        const cartUuid = yield select(getCartUuid);
        const analyticsPayload = checkoutActionsCartUuidPayloadMapping({ cartUuid });
        switch (errorData.message) {
          case CheckoutErrors.CustomerNotApproved:
            yield call(Analytics.trackEvent, CHECKOUT.CUSTOMER_NOT_APPROVED, analyticsPayload);
            yield call<(x: string) => void>(history.push, '/credit-check');
            break;
          case CheckoutErrors.OFACCheckFailed:
            yield call(Analytics.trackEvent, CHECKOUT.OFAC_CHECK_FAILED, analyticsPayload);
            yield call<(x: string) => void>(history.push, '/ofac-check');
            break;
          case CheckoutErrors.SelfReportedIncomeRequiredError:
            yield call(Analytics.trackEvent, CHECKOUT.CUSTOMER_INCOME_REQUIRED, analyticsPayload);
            yield call<(x: string) => void>(history.push, `/checkout/${CheckoutStep.Eligibility}/income`);
            break;
          case CheckoutErrors.MaxTCVError:
            yield call(
              Analytics.trackEvent,
              CHECKOUT.MAX_TCV_EXCEEDED,
              maxTCVExceededPayloadMapping({ cartUuid, eligibleForDeposit: errorData.eligibleForDeposit })
            );
            yield call<(x: string) => void>(history.push, `/checkout/${CheckoutStep.Eligibility}/reduce-cart-deposit`);
            break;
          case CheckoutErrors.AdditionalInformationRequired:
            yield call(Analytics.trackEvent, CHECKOUT.ADDITIONAL_INFO_REQUIRED, analyticsPayload);
            yield call<(x: string) => void>(history.push, `/checkout/${CheckoutStep.BillingInfo}`);
            break;
          case CheckoutErrors.CreditReportNotFound:
            yield call(Analytics.trackEvent, CHECKOUT.CREDIT_REPORT_NOT_FOUND, analyticsPayload);
            yield call<(x: string) => void>(history.push, `/checkout/${CheckoutStep.BillingInfo}`);
            break;
          case CheckoutErrors.InvalidSSN:
            yield call(Analytics.trackEvent, CHECKOUT.INVALID_SSN, analyticsPayload);
            yield call<(x: string) => void>(history.push, `/checkout/${CheckoutStep.BillingInfo}`);
            break;
          default:
          // do nothing
        }
      }
    }
  }
}

export function* handleDepositRequest({ payload }: PayloadAction<DepositRequestPayload>) {
  try {
    yield call([Request, 'send'], RequestMethod.POST, '/checkout/deposit', undefined, payload);
    yield put(depositRequest.success({}));
  } catch (error) {
    yield put(depositRequest.failure(error));
  }
}

export function* handleDepositSuccess() {
  const cartUuid = yield select(getCartUuid);
  yield call(Analytics.trackEvent, CHECKOUT.DEPOSIT_REQUESTED, checkoutActionsCartUuidPayloadMapping({ cartUuid }));
  yield put(resetCart());
  yield put(closeOverlay(Overlays.NoSSNOverlay)); // overlay could be opened by the no ssn deposit flow
  yield call<(x: string) => void>(history.push, '/deposit-request');
}

export function* handleRequestAmounts({ payload }: PayloadAction<AmountsRequestPayload>) {
  try {
    const { planMonths, delivery, subtotal, promoCode } = payload;
    const { address1, city, region, postal, area } = delivery;
    const taxDeliveryInfo = getTaxDeliveryInfo(address1, city, region, postal);

    const amountsRequestData = {
      planMonths,
      promoCode,
      subtotal,
      delivery: {
        area,
        ...taxDeliveryInfo
      }
    };

    const response = yield call(
      [Request, 'send'],
      RequestMethod.POST,
      '/checkout/amounts',
      undefined,
      amountsRequestData,
      false
    );

    const orderTCV = calculateTotalContractValue({
      rentalLength: payload.planMonths,
      dueNow: response.totalDueNow,
      dueMonthly: response.totalDueMonthly
    });

    yield put(
      processCheckoutAmounts.success({
        ...response,
        orderTCV
      })
    );
  } catch (error) {
    if (error.body && error.body.error && error.body.error.includes('postal code')) {
      yield put(toggleOverlay(Overlays.DeliveryOverlay, true));
    }
    yield put(processCheckoutAmounts.failure(error));
  }
}

export function* handleNextCheckoutStep({ payload }: PayloadAction<CheckoutFormDataPayload>) {
  const isAuthenticated = yield select(getIsAuthenticated);

  if (isAuthenticated) {
    yield put(toggleOverlay(Overlays.AddItemsToCurrentPlanOverlay, true));
    return;
  }

  const step = yield select(getCheckoutStep);
  const cartUuid = yield select(getCartUuid);

  yield call(
    Analytics.trackEvent,
    CHECKOUT.STEP_COMPLETED,
    stepCompletedPayloadMapping({ step: payload.step, cartUuid })
    // The step coming from the selector has already been updated at that point so we need to make
    // sure we are sending the step that was completed that is sent in the action payload
  );
  yield call<(x: string) => void>(history.push, `/checkout/${step}`);
}

export default function* () {
  yield takeLatest(processCheckout.request.type, handleCheckoutRequest);
  yield takeLatest(processCheckout.success.type, handleCheckoutSuccess);
  yield takeLatest(processCheckout.failure.type, handleCheckoutFailure);
  yield takeLatest(depositRequest.request.type, handleDepositRequest);
  yield takeLatest(depositRequest.success.type, handleDepositSuccess);
  yield takeLatest(processCheckoutAmounts.request.type, handleRequestAmounts);
  yield takeLatest(checkoutStepCompleted.type, handleNextCheckoutStep);
}
