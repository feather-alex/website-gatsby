/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Button, { ButtonStyle } from "../../../ui/buttons/Button";
import { CheckoutStep, CheckoutStateStep } from "../store/checkout.types";
import { validateDeliveryInfo } from "../store/checkout.validation";
import CheckoutInputFieldFormik, {
  InputContainer,
  inputFullStyles,
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
import {
  deliveryInfoPayloadMapping,
  stepViewedPayloadMapping,
} from "../../../analytics/checkout/payload-mappings";
import { CheckoutCTAError } from "./CheckoutCTAError";
import { CHECKOUT_CTA_ERRORS } from "./CheckoutCTAErrors.content";
import { SHADES } from "../../../ui/variables";
import {
  checkoutStepCompleted,
  toggleDeliverySameAsBilling,
} from "../store/checkout.actions";
import { DeliveryInfoFields } from "../store/checkoutForms.types";
import {
  getAmountError,
  getDeliveryInfo,
  getIsDeliverySameAsBilling,
} from "../store/checkout.selectors";
import { MenuItem } from "../../../ui/formElements/Dropdown";
import { DeliveryArea } from "../../../app/store/entities/entities.types";
import {
  getDeliveryAreaIdentifier,
  getDeliveryZipCode,
} from "../../../app/store/plan/plan.selectors";
import Title2 from "../../../ui/titles/Title2";
import { NavLink } from "react-router-dom";
import Caption from "../../../ui/captions/Caption";
import PreviousStepsInfo from "./PreviousStepsInfo";
import {
  getCartContainsUnavailableProducts,
  getCartUuid,
  getIsCartMinimumMet,
} from "../../cart/store/cart.selectors";
import useMount from "../../../utils/useMount";
import { CalendarIcon2 } from "../../../ui/icons/CalendarIcon2";
import { AwardIcon } from "../../../ui/icons/AwardIcon";
import Subheader2 from "../../../ui/subheaders/Subheader2";
import { DeliveryAreaIdentifier } from "../../../app/store/plan/plan.types";

enum identifier {
  googleDeliveryStreetAddress = "googleDeliveryStreetAddress",
  streetAddress = "streetAddress",
  apt = "apt",
  city = "city",
  state = "state",
  zipcode = "zipcode",
  phone = "phone",
}

export const DateConfirmation = styled(Caption)`
  width: 100%;
  text-align: center;
`;

export const LearnMore = styled(NavLink)`
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
`;

export const CovidStandard = styled(Title2)`
  margin-top: 32px;
  text-align: left;
  width: 60%;
  ${inputFullStyles}
`;

const DeliveryProcessContainer = styled.div`
  border-top: 1px solid ${SHADES.SHADE_LIGHTER};
  border-bottom: 1px solid ${SHADES.SHADE_LIGHTER};
  padding: 32px 0;
  color: ${SHADES.BLACK};
  ${inputFullStyles}
`;

const DeliveryProcessHeader = styled(Subheader2)`
  margin-bottom: 24px;
`;

const DeliveryProcessPointContainer = styled.div`
  display: flex;
  margin-top: 16px;
`;

const DeliveryProcessText = styled(Caption)`
  width: 324px;
  margin-left: 16px;
`;

const CheckboxContainer = styled(InputContainer)`
  margin-bottom: 17px;
`;

interface Props {
  moveToNextStep: () => void;
  backToCustomerInfo: () => void;
  googleScriptFailed: boolean;
  handleGoogleScriptFailed: () => void;
  deliveryAreas: DeliveryArea[];
}

const CheckoutDeliveryInfo = ({
  moveToNextStep,
  backToCustomerInfo,
  googleScriptFailed,
  handleGoogleScriptFailed,
  deliveryAreas,
}: Props) => {
  const dispatch = useDispatch();

  const [showLoader, setShowLoader] = useState(false);
  const deliveryInfo = useSelector(getDeliveryInfo);
  const deliveryZipCode = useSelector(getDeliveryZipCode);
  const deliveryAreaIdentifier = useSelector(getDeliveryAreaIdentifier);
  const amountRequestError = useSelector(getAmountError);
  const cartUuid = useSelector(getCartUuid);
  const cartContainsUnavailableItems = useSelector(
    getCartContainsUnavailableProducts
  );
  const isCartMinimumMet = useSelector(getIsCartMinimumMet);
  const isDeliverySameAsBilling = useSelector(getIsDeliverySameAsBilling);

  const selectedArea =
    deliveryAreas &&
    deliveryAreas.find((d) => d.identifier === deliveryAreaIdentifier);

  useMount(() => {
    window.scrollTo(0, 0);

    Analytics.trackEvent(
      CHECKOUT.STEP_VIEWED,
      stepViewedPayloadMapping({ step: CheckoutStep.DeliveryInfo, cartUuid })
    );

    return () => {
      setShowLoader(false);
    };
  });

  const handleToggleDeliverySameAsBilling = () => {
    dispatch(toggleDeliverySameAsBilling());
  };

  const handleNextStep = (data: DeliveryInfoFields) => {
    setShowLoader(true);
    dispatch(
      checkoutStepCompleted({ step: CheckoutStateStep.DeliveryInfo, data })
    );

    // moveToNextStep needed here to fire processCheckoutAmountsRequest
    moveToNextStep();

    Analytics.trackEvent(CHECKOUT.DELIVERY_INFO),
      deliveryInfoPayloadMapping({
        streetAddress: data.streetAddress,
        apartment: data.apt ? data.apt : "",
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
        phone: data.phone,
        deliveryAreaIdentifier: deliveryAreaIdentifier!,
        googleScriptFailed,
        cartUuid,
      });
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
    status,
    setStatus,
  } = useFormik<DeliveryInfoFields>({
    initialValues: {
      streetAddress: deliveryInfo.streetAddress,
      apt: deliveryInfo.apt,
      city: deliveryInfo.city,
      state: deliveryInfo.state,
      zipcode: deliveryZipCode ? deliveryZipCode : deliveryInfo.zipcode,
      googleDeliveryStreetAddress: deliveryInfo.googleDeliveryStreetAddress,
      phone: deliveryInfo.phone,
    },
    validate: validateDeliveryInfo,
    onSubmit(data: DeliveryInfoFields) {
      handleNextStep(data);
    },
  });

  // TODO: improve the flow when the API returns a 'Undeliverable postal code' error
  // for now this is the only way to show the correct error message if the zipcode is out of our delivery zone
  useEffect(() => {
    if (
      amountRequestError &&
      amountRequestError.body &&
      Object.values(amountRequestError.body)[0].includes("Undeliverable")
    ) {
      setStatus({ zipcode: "*undeliverable zip code" });
      setShowLoader(false);

      Analytics.trackEvent(CHECKOUT.ZIP_ERROR, {
        error: "zipcode invalid or not used within the selected state",
      });
    }
  }, [amountRequestError, setFieldTouched, setFieldError, setStatus]);

  const handleBlurZipcode = () => {
    setFieldTouched(identifier.zipcode, true);
    setStatus(null);
  };

  const handleBlurGoogleDeliveryStreetAddress = () => {
    setFieldTouched(identifier.googleDeliveryStreetAddress, true);
  };

  const handleGoogleAddressErrorMessage = (
    error: string | null,
    field: string
  ) => {
    if (error === null) {
      setFieldError(field, undefined);
    } else {
      field === identifier.googleDeliveryStreetAddress
        ? setFieldError(identifier.streetAddress, error)
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
    // set googleDeliveryStreetAddress
    setFieldValue(identifier.googleDeliveryStreetAddress, autocompleteAddress);
    // set streetAddress
    setFieldValue(identifier.streetAddress, streetAddress);
    // set city
    setFieldValue(identifier.city, city);
    // set state
    setFieldValue(identifier.state, state);
    // set zipcode
    setFieldValue(identifier.zipcode, zipCode);
  };

  const clearGoogleAddress = () => {
    // the google field and the streetAddress one are tied together and
    // share the same error message, so when we clear the google field,
    // we need to make sure the streetAddress value and error are set
    // correctly
    setFieldValue(identifier.googleDeliveryStreetAddress, "");
    setFieldValue(identifier.streetAddress, "");
    setFieldError(identifier.streetAddress, "*required");
  };

  const areFieldsEmpty =
    values.streetAddress.length === 0 &&
    values.city.length === 0 &&
    values.state.length === 0 &&
    values.phone.length === 0;

  const isFormValid =
    (Object.keys(touched).length > 0 || !areFieldsEmpty) &&
    Object.keys(errors).length === 0;

  return (
    <CheckoutPageForm>
      <FormHeader>Delivery Address</FormHeader>

      {!googleScriptFailed
        ? [
            <CheckoutGoogleInputField
              handleBlur={handleBlurGoogleDeliveryStreetAddress}
              key={identifier.googleDeliveryStreetAddress}
              identifier={identifier.googleDeliveryStreetAddress}
              value={values.googleDeliveryStreetAddress}
              error={errors.streetAddress}
              touched={touched.googleDeliveryStreetAddress}
              clearGoogleAddress={clearGoogleAddress}
              handleGoogleAddress={handleGoogleAddress}
              handleGoogleScriptFailed={handleGoogleScriptFailed}
              handleGoogleAddressErrorMessage={handleGoogleAddressErrorMessage}
            />,

            <MultipleInputsLineContainer key="deliveryAptAndZip">
              <CheckoutInputFieldFormik
                inputWidth={InputWidth.Half}
                autoComplete="shipping address-line2"
                identifier={identifier.apt}
                label="Apartment, suite, etc."
                type="text"
                value={values.apt}
                touched={touched.apt}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <CheckoutInputFieldFormik
                inputWidth={InputWidth.Half}
                autoComplete="shipping postal-code"
                identifier={identifier.zipcode}
                label="Zip code"
                type="text"
                value={values.zipcode}
                error={
                  status && status.zipcode ? status.zipcode : errors.zipcode
                }
                touched={touched.zipcode}
                handleChange={handleChange}
                handleBlur={handleBlurZipcode}
                isDisabled={true}
              />
            </MultipleInputsLineContainer>,
          ]
        : [
            <CheckoutInputFieldFormik
              key={identifier.streetAddress}
              inputWidth={InputWidth.Full}
              autoComplete="shipping address-line1"
              identifier={identifier.streetAddress}
              label="Street Address"
              type="text"
              value={values.streetAddress}
              error={errors.streetAddress}
              touched={touched.streetAddress}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />,

            <CheckoutInputFieldFormik
              key={identifier.apt}
              inputWidth={InputWidth.Full}
              autoComplete="shipping address-line2"
              identifier={identifier.apt}
              label="Apartment, suite, etc."
              type="text"
              value={values.apt}
              touched={touched.apt}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />,

            <CheckoutInputFieldFormik
              key={identifier.city}
              inputWidth={InputWidth.Full}
              autoComplete="shipping address-level2"
              identifier={identifier.city}
              label="City"
              type="text"
              value={values.city}
              error={errors.city}
              touched={touched.city}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />,

            <MultipleInputsLineContainer key="stateAndZip">
              <InputContainer inputWidth={InputWidth.Half}>
                <Label>State</Label>
                <CheckoutDropdown
                  id="checkout-delivery-dropdown"
                  dataCy="custom-dropdown"
                  isDefaultStyle={false}
                  title={values.state}
                  onSelect={(selected: string) =>
                    setFieldValue(identifier.state, selected, true)
                  }
                >
                  {selectedArea &&
                    selectedArea.validRegions.map(
                      (region: { code: string }) => (
                        <MenuItem
                          key={region.code}
                          eventKey={region.code}
                          data-cy={`checkout-state-dropdown-${region.code.toLowerCase()}`}
                          data-identifier={identifier.state}
                        >
                          {region.code}
                        </MenuItem>
                      )
                    )}
                </CheckoutDropdown>
              </InputContainer>

              <CheckoutInputFieldFormik
                inputWidth={InputWidth.Half}
                autoComplete="shipping postal-code"
                identifier={identifier.zipcode}
                label="Zip code"
                type="text"
                value={values.zipcode}
                error={
                  status && status.zipcode ? status.zipcode : errors.zipcode
                }
                touched={touched.zipcode}
                handleChange={handleChange}
                handleBlur={handleBlurZipcode}
              />
            </MultipleInputsLineContainer>,
          ]}

      <CheckoutInputFieldFormik
        inputWidth={InputWidth.Full}
        autoComplete="shipping tel"
        identifier={identifier.phone}
        label="Phone"
        type="tel"
        value={values.phone}
        error={errors.phone}
        touched={touched.phone}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />

      <CheckboxContainer inputWidth={InputWidth.Full}>
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={isDeliverySameAsBilling}
            onChange={handleToggleDeliverySameAsBilling}
          />
          <span
            style={{ top: 2 }}
            data-cy="checkmark"
            className={`checkmark ${isDeliverySameAsBilling ? "checked" : ""}`}
          />
          <span className="text">Use this address for my billing address</span>
        </label>
      </CheckboxContainer>

      <DeliveryProcessContainer>
        <DeliveryProcessHeader>Scheduling your delivery:</DeliveryProcessHeader>
        <DeliveryProcessPointContainer>
          <CalendarIcon2 />
          <DeliveryProcessText>
            Once you place your order and sign your lease, you pick your
            delivery date.
          </DeliveryProcessText>
        </DeliveryProcessPointContainer>
        <DeliveryProcessPointContainer>
          <AwardIcon />
          <DeliveryProcessText>
            {deliveryAreaIdentifier === DeliveryAreaIdentifier.DC
              ? "Delivery in your area typically takes 9-12 days."
              : "We deliver in as little as 7 days!"}
          </DeliveryProcessText>
        </DeliveryProcessPointContainer>
      </DeliveryProcessContainer>

      <CovidStandard>
        Feather’s standard in-home delivery and assembly is available for all
        orders! We’re also offering a no-contact option in response to COVID-19{" "}
        <LearnMore to="/faqs#COVID-19">Learn more</LearnMore>
      </CovidStandard>

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

      <Button style={ButtonStyle.COMPACT_TEXT} onClick={backToCustomerInfo}>
        Return to Customer Info
      </Button>

      <PreviousStepsInfo
        currentStep={CheckoutStep.DeliveryInfo}
        backToCustomerInfo={backToCustomerInfo}
      />
    </CheckoutPageForm>
  );
};
export default CheckoutDeliveryInfo;
