/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Button, { ButtonStyle } from "../../../ui/buttons/Button";
import { CheckoutStateStep, CheckoutStep } from "../store/checkout.types";
import { validateBillingAddressInfo } from "../store/checkout.validation";
import CheckoutInputFieldFormik, {
  InputContainer,
  InputWidth,
  Label,
} from "./CheckoutInputField";
import CheckoutGoogleInputField from "./CheckoutGoogleInputField";
import Analytics from "../../../analytics/analytics";
import { CHECKOUT } from "../../../analytics/checkout/events";
import {
  CheckoutDropdown,
  CheckoutNextStepButtonContainer,
  CheckoutPageForm,
  FormHeader,
  MultipleInputsLineContainer,
} from "./CheckoutStyledComponents";
import { stepViewedPayloadMapping } from "../../../analytics/checkout/payload-mappings";
import { CheckoutCTAError } from "./CheckoutCTAError";
import { CHECKOUT_CTA_ERRORS } from "./CheckoutCTAErrors.content";
import { checkoutStepCompleted } from "../store/checkout.actions";
import { BillingAddressInfoFields } from "../store/checkoutForms.types";
import { getBillingAddressInfo } from "../store/checkout.selectors";
import { MenuItem } from "../../../ui/formElements/Dropdown";
import PreviousStepsInfo from "./PreviousStepsInfo";
import { BRAND } from "../../../ui/variables";
import {
  getCartContainsUnavailableProducts,
  getCartUuid,
  getIsCartMinimumMet,
} from "../../cart/store/cart.selectors";
import { statesUS, provincesCA } from "../store/checkout.service";
import useMount from "../../../utils/useMount";

const BillingStateHeader = styled.span`
  font-weight: 500;
  border-bottom: 1px solid ${BRAND.PRIMARY_TEXT};
  width: 100%;
  margin: 0 16px;
`;

enum identifier {
  googleBillingStreetAddress = "googleBillingStreetAddress",
  billingStreetAddress = "billingStreetAddress",
  billingApt = "billingApt",
  billingCity = "billingCity",
  billingState = "billingState",
  billingPostalCode = "billingPostalCode",
}

interface Props {
  backToDeliveryInfo: () => void;
  backToCustomerInfo: () => void;
  googleScriptFailed: boolean;
  handleGoogleScriptFailed: () => void;
}

const CheckoutBillingAddress = ({
  backToCustomerInfo,
  backToDeliveryInfo,
  googleScriptFailed,
  handleGoogleScriptFailed,
}: Props) => {
  const dispatch = useDispatch();

  const [showLoader, setShowLoader] = useState(false);
  const billingAddressInfo = useSelector(getBillingAddressInfo);
  const cartUuid = useSelector(getCartUuid);
  const cartContainsUnavailableItems = useSelector(
    getCartContainsUnavailableProducts
  );
  const isCartMinimumMet = useSelector(getIsCartMinimumMet);

  useMount(() => {
    window.scrollTo(0, 0);

    Analytics.trackEvent(
      CHECKOUT.STEP_VIEWED,
      stepViewedPayloadMapping({ step: CheckoutStep.BillingAddress, cartUuid })
    );

    return () => {
      setShowLoader(false);
    };
  });

  const handleNextStep = (data: BillingAddressInfoFields) => {
    setShowLoader(true);
    dispatch(
      checkoutStepCompleted({ step: CheckoutStateStep.BillingAddress, data })
    );
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldError,
    setFieldTouched,
  } = useFormik<BillingAddressInfoFields>({
    initialValues: {
      billingStreetAddress: billingAddressInfo.billingStreetAddress,
      billingApt: billingAddressInfo.billingApt,
      billingCity: billingAddressInfo.billingCity,
      billingState: billingAddressInfo.billingState,
      billingPostalCode: billingAddressInfo.billingPostalCode,
      googleBillingStreetAddress: billingAddressInfo.googleBillingStreetAddress,
    },
    validate: validateBillingAddressInfo,
    onSubmit(data: BillingAddressInfoFields) {
      handleNextStep(data);
    },
  });

  const handleBlurGoogleBillingStreetAddress = () => {
    setFieldTouched(identifier.googleBillingStreetAddress, true);
  };

  const handleGoogleAddressErrorMessage = (
    error: string | null,
    field: string
  ) => {
    if (error === null) {
      setFieldError(field, undefined);
    } else {
      field === identifier.googleBillingStreetAddress
        ? setFieldError(identifier.billingStreetAddress, error)
        : setFieldError(field, error);
    }
  };

  const handleGoogleAddress = ({
    autocompleteAddress,
    streetAddress,
    city,
    state,
    zipCode,
  }: {
    autocompleteAddress: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
  }) => {
    // set googleBillingStreetAddress
    setFieldValue(identifier.googleBillingStreetAddress, autocompleteAddress);
    // set billingStreetAddress
    setFieldValue(identifier.billingStreetAddress, streetAddress);
    // set billingCity
    setFieldValue(identifier.billingCity, city);
    // set billingState
    setFieldValue(identifier.billingState, state);
    // set billingPostalCode
    setFieldValue(identifier.billingPostalCode, zipCode);
  };

  const clearGoogleAddress = () => {
    // the google field and the streetAddress one are tied together and
    // share the same error message, so when we clear the google field,
    // we need to make sure the streetAddress value and error are set
    // correctly
    setFieldValue(identifier.googleBillingStreetAddress, "");
    setFieldValue(identifier.billingStreetAddress, "");
    setFieldError(identifier.billingStreetAddress, "*required");
  };

  const areFieldsEmpty =
    values.billingStreetAddress.length === 0 &&
    values.billingCity.length === 0 &&
    values.billingState.length === 0 &&
    values.billingPostalCode.length === 0;

  const isFormValid =
    (Object.keys(touched).length > 0 || !areFieldsEmpty) &&
    Object.keys(errors).length === 0;

  return (
    <CheckoutPageForm>
      <FormHeader>Billing Address</FormHeader>

      {!googleScriptFailed
        ? [
            <CheckoutGoogleInputField
              handleBlur={handleBlurGoogleBillingStreetAddress}
              key={identifier.googleBillingStreetAddress}
              identifier={identifier.googleBillingStreetAddress}
              value={values.googleBillingStreetAddress}
              error={errors.billingStreetAddress}
              touched={touched.googleBillingStreetAddress}
              clearGoogleAddress={clearGoogleAddress}
              handleGoogleAddress={handleGoogleAddress}
              handleGoogleScriptFailed={handleGoogleScriptFailed}
              handleGoogleAddressErrorMessage={handleGoogleAddressErrorMessage}
            />,

            <MultipleInputsLineContainer key="billingAptAndZip">
              <CheckoutInputFieldFormik
                inputWidth={InputWidth.Half}
                autoComplete="shipping address-line2"
                identifier={identifier.billingApt}
                label="Apartment, suite, etc."
                type="text"
                value={values.billingApt}
                touched={touched.billingApt}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <CheckoutInputFieldFormik
                inputWidth={InputWidth.Half}
                autoComplete="shipping postal-code"
                identifier={identifier.billingPostalCode}
                label="Zip Code"
                type="text"
                value={values.billingPostalCode}
                error={errors.billingPostalCode}
                touched={touched.billingPostalCode}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isDisabled={true}
              />
            </MultipleInputsLineContainer>,
          ]
        : [
            <CheckoutInputFieldFormik
              key={identifier.billingStreetAddress}
              inputWidth={InputWidth.Full}
              autoComplete="shipping address-line1"
              identifier={identifier.billingStreetAddress}
              label="Street Address"
              type="text"
              value={values.billingStreetAddress}
              error={errors.billingStreetAddress}
              touched={touched.billingStreetAddress}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />,

            <CheckoutInputFieldFormik
              key={identifier.billingApt}
              inputWidth={InputWidth.Full}
              autoComplete="shipping address-line2"
              identifier={identifier.billingApt}
              label="Apartment, suite, etc."
              type="text"
              value={values.billingApt}
              touched={touched.billingApt}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />,

            <CheckoutInputFieldFormik
              key={identifier.billingCity}
              inputWidth={InputWidth.Full}
              autoComplete="shipping address-level2"
              identifier={identifier.billingCity}
              label="City"
              type="text"
              value={values.billingCity}
              error={errors.billingCity}
              touched={touched.billingCity}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />,

            <MultipleInputsLineContainer key="billingStateAndZip">
              <InputContainer inputWidth={InputWidth.Half}>
                <Label>State</Label>
                <CheckoutDropdown
                  id="checkout-billing-dropdown"
                  dataCy="custom-dropdown"
                  isDefaultStyle={false}
                  title={values.billingState}
                  onSelect={(selected: string) =>
                    setFieldValue(identifier.billingState, selected, true)
                  }
                  css={css`
                    .dropdown-menu {
                      max-height: 200px;
                      overflow: scroll;
                    }
                  `}
                >
                  <BillingStateHeader>United States</BillingStateHeader>
                  {statesUS.map((abvState: string, index: number) => (
                    <MenuItem
                      key={index}
                      eventKey={abvState}
                      data-cy={`billing-state-dropdown-${abvState.toLowerCase()}`}
                      data-identifier={identifier.billingState}
                    >
                      {abvState}
                    </MenuItem>
                  ))}
                  <BillingStateHeader>Canada</BillingStateHeader>
                  {provincesCA.map((abvState: string, index: number) => (
                    <MenuItem
                      key={index}
                      eventKey={abvState}
                      data-identifier={identifier.billingState}
                    >
                      {abvState}
                    </MenuItem>
                  ))}
                </CheckoutDropdown>
              </InputContainer>

              <CheckoutInputFieldFormik
                inputWidth={InputWidth.Half}
                autoComplete="shipping postal-code"
                identifier={identifier.billingPostalCode}
                label="Zip Code"
                type="text"
                value={values.billingPostalCode}
                error={errors.billingPostalCode}
                touched={touched.billingPostalCode}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </MultipleInputsLineContainer>,
          ]}

      {cartContainsUnavailableItems && (
        <CheckoutCTAError {...CHECKOUT_CTA_ERRORS.outOfStock} />
      )}

      <CheckoutNextStepButtonContainer>
        <Button
          dataCy="brand-button"
          type="submit"
          isFullWidth={true}
          onClick={() => handleSubmit()}
          isDisabled={
            (Object.keys(touched).length === 0 && areFieldsEmpty) ||
            !(isCartMinimumMet && isFormValid) ||
            cartContainsUnavailableItems ||
            showLoader
          }
        >
          {showLoader
            ? "Continuing to Billing Info..."
            : "Continue to Billing Info"}
        </Button>
      </CheckoutNextStepButtonContainer>

      <Button style={ButtonStyle.COMPACT_TEXT} onClick={backToDeliveryInfo}>
        Return to Delivery Info
      </Button>

      <PreviousStepsInfo
        currentStep={CheckoutStep.BillingAddress}
        backToCustomerInfo={backToCustomerInfo}
        backToDeliveryInfo={backToDeliveryInfo}
      />
    </CheckoutPageForm>
  );
};

export default CheckoutBillingAddress;
