/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { useState, useEffect, useCallback } from "react";
import {
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  StripeError,
  Token,
  StripeElementChangeEvent,
  StripeCardElementOptions,
} from "@stripe/stripe-js";
import { useFormik } from "formik";

import Mastercard from "../../../assets/credit-card/credit_card_mastercard.svg";
import Discover from "../../../assets/credit-card/credit_card_discover.svg";
import Amex from "../../../assets/credit-card/credit_card_amex.svg";
import Visa from "../../../assets/credit-card/credit_card_visa.svg";
import { BRAND, FONTS, SHADES } from "../../../ui/variables";
import { StripeCardZipErrors } from "../store/checkout.types";
import Header2 from "../../../ui/headers/Header2";
import CheckoutInputFieldFormik, {
  InputWidth,
  InputContainer,
} from "./CheckoutInputField";
import { noop } from "../../../utils/ui-helpers";
import useMount from "../../../utils/useMount";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardIconsContainer = styled.div`
  align-self: center;
  margin: 10px 0 15px;
  & svg {
    margin-right: 10px;
  }
  width: 100%;
  @media screen and (min-width: 769px) {
    width: 80%;
  }
  @media screen and (min-width: 1050px) {
    width: 60%;
  }
`;

const cardInputCSS = `
  width: 100%;
  height: 46px;
  margin: 10px 0 20px;
  padding-left: 20px;
  padding-top: 13px;
  border-radius: 3px;
  border: 1px solid ${SHADES.SHADE_LIGHTER};
  color: ${BRAND.PRIMARY_TEXT};
`;

const MultiInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (min-width: 769px) {
    width: 80%;
  }
  @media screen and (min-width: 1050px) {
    width: 60%;
  }
`;

const ErrorMessage = styled.div`
  font-size: 13px;
  color: ${BRAND.ERROR};
  font-weight: 500;
  margin-top: -15px;
  text-align: right;
  height: 30px;
  line-height: 14px;
  ${({ isVisible }: { isVisible: boolean }) =>
    isVisible ? "opacity: 1;" : "opacity: 0;"}
`;

interface Props {
  readyToSubmit: (ready: boolean, token?: Token) => void;
  createTokenGenerator: (arg: () => Promise<null>) => void;
}

const inputOptions: StripeCardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      fontFamily: `${FONTS.PRIMARY}, Helvetica, sans-serif`,
      color: BRAND.PRIMARY_TEXT,
      "::placeholder": {
        color: SHADES.SHADE_LIGHTER,
      },
    },
    invalid: {
      color: BRAND.ERROR,
    },
  },
};

export const validateZipcode = ({ zip }: { zip: string }) => {
  if (!zip) {
    return { zip: "*required" };
  } else if (!zip.match(/^\d{5}$/)) {
    return { zip: "*invalid zip code" };
  }
  return undefined;
};

const CheckoutBillingStripeForm = ({
  readyToSubmit,
  createTokenGenerator,
}: Props) => {
  const [stripeError, setStripeError] = useState<StripeError | null>(null);
  const [isCardNumberTouched, setIsCardNumberTouched] = useState(false);
  const [isCardExpiryTouched, setIsCardExpiryTouched] = useState(false);
  const [isCardCvcTouched, setIsCardCvcTouched] = useState(false);
  const [stripeFieldErrors, setStripeFieldErrors] = useState<{
    cardNumber: StripeError | null;
    cardExpiry: StripeError | null;
    cardCvc: StripeError | null;
  }>({ cardNumber: null, cardExpiry: null, cardCvc: null });

  const { handleChange, handleBlur, values, errors, touched } = useFormik<{
    zip: string;
  }>({
    enableReinitialize: true,
    initialValues: {
      zip: "",
    },
    validate: validateZipcode,
    validateOnBlur: true,
    onSubmit: noop,
  });
  const stripe = useStripe();
  const elements = useElements();

  const generateNewStripeToken = useCallback(async () => {
    if (!stripe || !elements) {
      // stripe hasn't loaded yet
      return null;
    }

    const cardNumber = elements.getElement("cardNumber");

    if (errors.zip) {
      readyToSubmit(false);
      return null;
    }

    if (cardNumber) {
      const { token, error } = await stripe.createToken(cardNumber, {
        address_zip: values.zip,
      });
      if (error) {
        setStripeError(error);
        readyToSubmit(false);
      }
      if (token) {
        readyToSubmit(true, token);
      }
    }
    return null;
  }, [stripe, elements, errors, readyToSubmit, values.zip]);

  useMount(() => {
    createTokenGenerator(generateNewStripeToken);
  });

  const onInputChange = useCallback(
    (event: StripeElementChangeEvent) => {
      const { error, elementType } = event;
      if (error) {
        setStripeFieldErrors({ ...stripeFieldErrors, [elementType]: error });
        readyToSubmit(false);
      } else {
        setStripeFieldErrors({ ...stripeFieldErrors, [elementType]: null });
        if (
          isCardCvcTouched &&
          isCardExpiryTouched &&
          isCardNumberTouched &&
          !stripeFieldErrors.cardCvc &&
          !stripeFieldErrors.cardExpiry &&
          !stripeFieldErrors.cardNumber
        ) {
          generateNewStripeToken();
        }
      }
    },
    [
      generateNewStripeToken,
      isCardCvcTouched,
      isCardExpiryTouched,
      isCardNumberTouched,
      readyToSubmit,
      stripeFieldErrors,
    ]
  );

  useEffect(() => {
    if (!errors.zip && touched.zip) {
      onInputChange({ error: undefined } as StripeElementChangeEvent);
    }
    if (errors.zip) {
      readyToSubmit(false);
    }
    // This is disable for this line because it was requiring onInputChange to be added, which is getting re-declared
    // frequently without actually changing, making this an infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.zip, errors.zip, touched.zip]);

  if (!stripe || !elements) {
    // stripe hasn't loaded yet
    return null;
  }

  return (
    <Container>
      <Header2 dataCy="billing-info-header">Billing info</Header2>

      <CardIconsContainer>
        <Mastercard />
        <Amex />
        <Visa />
        <Discover />
      </CardIconsContainer>

      <InputContainer inputWidth={InputWidth.Full}>
        <CardNumberElement
          options={inputOptions}
          onChange={onInputChange}
          onFocus={() => setIsCardNumberTouched(true)}
          css={css`
            ${cardInputCSS}
            ${isCardNumberTouched && stripeFieldErrors.cardNumber
              ? `border-color: ${BRAND.ERROR};`
              : ""}
          `}
        />
        <ErrorMessage
          data-cy="stripe-error"
          isVisible={
            isCardNumberTouched && Boolean(stripeFieldErrors.cardNumber)
          }
        >
          *{stripeFieldErrors.cardNumber?.message}
        </ErrorMessage>
      </InputContainer>

      <MultiInputContainer>
        <InputContainer
          css={css`
            margin-right: 8px;
          `}
          inputWidth={InputWidth.Half}
        >
          <CardExpiryElement
            options={inputOptions}
            onChange={onInputChange}
            onFocus={() => setIsCardExpiryTouched(true)}
            css={css`
              ${cardInputCSS}
              ${isCardExpiryTouched && stripeFieldErrors.cardExpiry
                ? `border-color: ${BRAND.ERROR};`
                : ""}
            `}
          />
          <ErrorMessage
            isVisible={
              isCardExpiryTouched && Boolean(stripeFieldErrors.cardExpiry)
            }
          >
            *{stripeFieldErrors.cardExpiry?.message}
          </ErrorMessage>
        </InputContainer>
        <InputContainer inputWidth={InputWidth.Half}>
          <CardCvcElement
            options={inputOptions}
            onChange={onInputChange}
            onFocus={() => setIsCardCvcTouched(true)}
            css={css`
              ${cardInputCSS}
              ${isCardCvcTouched && stripeFieldErrors.cardCvc
                ? `border-color: ${BRAND.ERROR};`
                : ""}
            `}
          />
          <ErrorMessage
            isVisible={isCardCvcTouched && Boolean(stripeFieldErrors.cardCvc)}
          >
            *{stripeFieldErrors.cardCvc?.message}
          </ErrorMessage>
        </InputContainer>
      </MultiInputContainer>

      <CheckoutInputFieldFormik
        inputWidth={InputWidth.Full}
        identifier="zip"
        label=""
        placeholder="Zip Code"
        type="text"
        value={values.zip}
        error={
          errors.zip ||
          (stripeError?.code &&
            StripeCardZipErrors[stripeError.code] &&
            stripeError?.message)
        }
        touched={touched.zip}
        handleChange={handleChange}
        handleBlur={handleBlur}
        maxLength={5}
      />
    </Container>
  );
};

export default CheckoutBillingStripeForm;
