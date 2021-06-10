import {
  processCheckout,
  processCheckoutAmounts,
  resetErrorsStateValues,
  checkoutStepCompleted,
  resetCheckoutForms,
  updateSSNInfo,
  toggleDeliverySameAsBilling
} from './checkout.actions';
import {
  AmountsRequestPayload,
  AmountsSuccessPayload,
  CheckoutRequestPayload,
  CheckoutSuccessPayload,
  CheckoutStateStep
} from './checkout.types';
import {
  exampleAmountsRequestPayload,
  exampleAmountsSuccessPayload,
  exampleCheckoutRequestPayload
} from './checkout.fixtures';
import { CheckoutFormDataPayload, SSNInfoFields } from './checkoutForms.types';
import { APIError } from '../../../api/error';

describe('Checkout actions', () => {
  it(`should create an action for ${processCheckout.request.type}`, () => {
    const payload: CheckoutRequestPayload = {
      ...exampleCheckoutRequestPayload
    };
    const expectedAction = {
      type: 'CHECKOUT_REQUEST',
      payload
    };

    expect(processCheckout.request(payload)).toEqual(expectedAction);
  });

  it(`should create an action for ${processCheckout.success.type}`, () => {
    const payload: CheckoutSuccessPayload = {
      id: 10008921,
      checkoutInfo: { ...exampleCheckoutRequestPayload.checkoutInfo },
      amounts: { ...exampleCheckoutRequestPayload.amounts },
      cartInfo: { ...exampleCheckoutRequestPayload.cartInfo }
    };

    const expectedAction = {
      type: 'CHECKOUT_SUCCESS',
      payload
    };

    expect(processCheckout.success(payload)).toEqual(expectedAction);
  });

  it(`should create an action for ${processCheckout.failure.type}`, () => {
    const payload: APIError = {
      name: 'Error',
      status: 500,
      message: 'Oh noes, something went wrong!',
      error: 'Server Error'
    };

    const expectedAction = {
      type: 'CHECKOUT_FAILURE',
      payload
    };

    expect(processCheckout.failure(payload)).toEqual(expectedAction);
  });

  it('should create an action for resetting SSN state values', () => {
    const expectedAction = {
      type: 'RESET_ERRORS'
    };

    expect(resetErrorsStateValues()).toEqual(expectedAction);
  });

  it(`should create an action for ${processCheckoutAmounts.request.type}`, () => {
    const payload: AmountsRequestPayload = {
      ...exampleAmountsRequestPayload
    };
    const expectedAction = {
      type: processCheckoutAmounts.request.type,
      payload
    };

    expect(processCheckoutAmounts.request(payload)).toEqual(expectedAction);
  });

  it(`should create an action for ${processCheckoutAmounts.success.type}`, () => {
    const payload: AmountsSuccessPayload = {
      ...exampleAmountsSuccessPayload
    };
    const expectedAction = {
      type: processCheckoutAmounts.success.type,
      payload
    };

    expect(processCheckoutAmounts.success(payload)).toEqual(expectedAction);
  });

  it(`should create an action for ${processCheckoutAmounts.failure.type}`, () => {
    const payload: APIError = {
      name: 'Error',
      status: 500,
      message: 'A lil copy pasta never hurt nobody!',
      error: 'Server Error'
    };

    const expectedAction = {
      type: processCheckoutAmounts.failure.type,
      payload
    };

    expect(processCheckoutAmounts.failure(payload)).toEqual(expectedAction);
  });

  it(`should create an action for completing a checkout step`, () => {
    const payload: CheckoutFormDataPayload = {
      step: CheckoutStateStep.CustomerInfo,
      data: { firstName: 'me', lastName: 'you', email: 'me@mail.com', persona: null }
    };

    const expectedAction = {
      type: 'CHECKOUT_STEP_COMPLETED',
      payload
    };

    expect(checkoutStepCompleted(payload)).toEqual(expectedAction);
  });

  it('should create an action for checkout forms values', () => {
    const expectedAction = {
      type: 'RESET_CHECKOUT_FORMS'
    };

    expect(resetCheckoutForms()).toEqual(expectedAction);
  });

  it(`should create an action for updating SSN Info`, () => {
    const payload: SSNInfoFields = {
      ssn: '097834455',
      legalFirstName: 'Foo',
      legalLastName: 'Bar'
    };

    const expectedAction = {
      type: 'SSN_INFO_UPDATE',
      payload
    };

    expect(updateSSNInfo(payload)).toEqual(expectedAction);
  });

  it('should create an action to toggler delivery is same as billing', () => {
    const expectedAction = {
      type: 'TOGGLE_DELIVERY_SAME_AS_BILLING'
    };

    expect(toggleDeliverySameAsBilling()).toEqual(expectedAction);
  });
});
