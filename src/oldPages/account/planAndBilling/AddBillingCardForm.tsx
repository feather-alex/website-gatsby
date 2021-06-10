/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { AddBillingCardRequest } from './store/billing.information.actions';
import { useState, Fragment } from 'react';
import {
  StripeError,
  StripeElementChangeEvent,
  CreateTokenCardData,
  StripeCardElementOptions
} from '@stripe/stripe-js';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { BRAND, FONTS, SHADES } from '../../../ui/variables';
import SelectInput, { InputType } from '../../../ui/formElements/SelectInput';
import Title2 from '../../../ui/titles/Title2';
import Button, { ButtonStyle } from '../../../ui/buttons/Button';
import { StripeCardZipErrors } from '../../checkout/store/checkout.types';
import { useFormik } from 'formik';
import { validateZipcode } from '../../checkout/components/CheckoutBillingStripeForm';
import FormikField from '../../../ui/formElements/FormikField';
import { noop } from '../../../utils/ui-helpers';

const ErrorMessage = styled.div`
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 2px;
  color: ${BRAND.ERROR};
  margin-top: -34px;
  text-align: left;
  min-height: 14px;
  ${({ isVisible }: { isVisible: boolean }) => (isVisible ? 'opacity: 1;' : 'opacity: 0;')}
`;

interface Props {
  addBillingCard: AddBillingCardRequest;
  makeDefault: boolean;
  defaultToggle: () => void;
  toggleNewForm: () => void;
  billingName?: string;
  isFetching: boolean;
}

const inputOptions: StripeCardElementOptions = {
  style: {
    base: {
      fontFamily: `${FONTS.PRIMARY}, Helvetica, sans-serif`,
      fontSize: '16px',
      color: BRAND.PRIMARY_TEXT,
      '::placeholder': {
        color: SHADES.SHADE_LIGHT
      }
    },
    invalid: {
      color: `${BRAND.ERROR}`
    }
  }
};

const inputCSS = css`
  border: 0;
  outline: 0;
  border-bottom: 2px solid ${BRAND.PRIMARY_TEXT};
  margin: 30px 0 36px;
  padding: 12px 0;
  max-width: 412px;

  &.StripeElement--invalid {
    border-bottom: 2px solid ${BRAND.ERROR};
  }
`;

const validateForm = ({ zip, billingName }: { zip: string; billingName: string }) => {
  return {
    zip: validateZipcode({ zip })?.zip,
    billingName: billingName ? undefined : '*required'
  };
};

const BillingAddCardForm = ({
  billingName,
  makeDefault,
  defaultToggle,
  toggleNewForm,
  isFetching,
  addBillingCard
}: Props) => {
  const [stripeErrors, setStripeErrors] = useState<{
    cardNumber: StripeError | null;
    cardExpiry: StripeError | null;
    cardCvc: StripeError | null;
  }>({
    cardNumber: null,
    cardExpiry: null,
    cardCvc: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const { handleChange, handleBlur, values, errors, touched, resetForm } = useFormik<{
    zip: string;
    billingName: string;
  }>({
    enableReinitialize: true,
    isInitialValid: false,
    initialValues: {
      zip: '',
      billingName: billingName || ''
    },
    validate: validateForm,
    validateOnBlur: true,
    onSubmit: noop
  });

  if (!stripe || !elements) {
    return null;
  }

  const clearForm = () => {
    const cardNumber = elements.getElement('cardNumber');
    if (cardNumber) {
      cardNumber.clear();
    }
    const cardExpiry = elements.getElement('cardExpiry');
    if (cardExpiry) {
      cardExpiry.clear();
    }
    const cardCvc = elements.getElement('cardCvc');
    if (cardCvc) {
      cardCvc.clear();
    }
    resetForm();
  };

  const createNewCard = async () => {
    setIsLoading(true);

    const options: CreateTokenCardData = {
      name: values.billingName,
      address_zip: values.zip
    };

    const cardNumber = elements.getElement('cardNumber');

    if (cardNumber) {
      const { token, error } = await stripe.createToken(cardNumber, options);
      if (error) {
        setStripeErrors({ ...stripeErrors, cardNumber: error });
      }
      if (token) {
        addBillingCard(token.id, makeDefault);
        toggleNewForm();
        clearForm();
      }
    }

    setIsLoading(false);
  };

  const onInputChange = (event: StripeElementChangeEvent) => {
    const { error, elementType } = event;
    if (error) {
      setStripeErrors({ ...stripeErrors, [elementType]: error });
    } else {
      setStripeErrors({ ...stripeErrors, [elementType]: null });
    }
  };

  return (
    <Fragment>
      <form className="add-billing-card-form">
        <FormikField
          data-cy="billing-name"
          id="billingName"
          placeholder="Billing Name"
          type="text"
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.billingName}
          error={errors.billingName}
          touched={touched.billingName}
        />
        <CardNumberElement css={inputCSS} options={inputOptions} onChange={onInputChange} />
        <ErrorMessage isVisible={Boolean(stripeErrors.cardNumber)}>{stripeErrors.cardNumber?.message}</ErrorMessage>
        <div
          css={css`
            display: flex;
            max-width: 412px;
          `}
        >
          <div
            css={css`
              flex: 1;
            `}
          >
            <CardExpiryElement
              css={css`
                ${inputCSS}
              `}
              options={inputOptions}
              onChange={onInputChange}
            />
            <ErrorMessage isVisible={Boolean(stripeErrors.cardExpiry)}>{stripeErrors.cardExpiry?.message}</ErrorMessage>
          </div>
          <div
            css={css`
              margin-left: 20px;
              flex: 1;
            `}
          >
            <CardCvcElement css={inputCSS} options={inputOptions} onChange={onInputChange} />
            <ErrorMessage isVisible={Boolean(stripeErrors.cardCvc)}>{stripeErrors.cardCvc?.message}</ErrorMessage>
          </div>
        </div>
        <FormikField
          id="zip"
          type="text"
          placeholder="Zip Code"
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.zip}
          error={errors.zip}
          touched={touched.zip}
          maxLength={5}
        />
        <ErrorMessage
          isVisible={Boolean(
            touched.zip &&
              (errors.zip || (stripeErrors['cardNumber']?.code && StripeCardZipErrors[stripeErrors['cardNumber'].code]))
          )}
        >
          {stripeErrors['cardNumber']?.message || errors.zip}
        </ErrorMessage>
      </form>

      <div
        css={css`
          display: flex;
          align-items: center;
          margin: 20px 0;
        `}
      >
        <SelectInput inputType={InputType.Checkbox} isChecked={makeDefault} onChange={defaultToggle}>
          <Title2 color={makeDefault ? BRAND.PRIMARY : BRAND.PRIMARY_TEXT}>Make primary card</Title2>
        </SelectInput>
      </div>

      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Button
          dataCy="save-card-button"
          isDisabled={
            isLoading ||
            Boolean(stripeErrors['cardNumber'] || stripeErrors['cardExpiry'] || stripeErrors['cardCvc']) ||
            Boolean(errors.billingName || errors.zip) ||
            Boolean(!values.billingName || !values.zip)
          }
          onClick={createNewCard}
        >
          {isFetching ? `Saving...` : `Save`}
        </Button>
        <div
          css={css`
            margin-left: 20px;
          `}
        >
          <Button style={ButtonStyle.TEXT} onClick={toggleNewForm}>
            Cancel
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default BillingAddCardForm;
