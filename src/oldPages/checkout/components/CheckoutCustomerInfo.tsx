/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import useMount from "../../../utils/useMount";
import Button, { ButtonStyle } from "../../../ui/buttons/Button";
import { CustomerInfoFields } from "../store/checkoutForms.types";
import { CheckoutStateStep, CheckoutStep } from "../store/checkout.types";
import { validateCustomerInfo } from "../store/checkout.validation";
import CheckoutInputFieldFormik, { InputWidth } from "./CheckoutInputField";
import IntendedUseSelect from "./IntendedUseSelect";
import FormValue from "../../../types/FormValue";
import Analytics from "../../../analytics/analytics";
import { CHECKOUT } from "../../../analytics/checkout/events";
import {
  CheckoutNextStepButtonContainer,
  CheckoutPageForm,
  FormHeader,
} from "./CheckoutStyledComponents";
import { MembershipStateDisplayName } from "../../../app/store/plan/plan.types";
import {
  customerInfoPayloadMapping,
  stepViewedPayloadMapping,
} from "../../../analytics/checkout/payload-mappings";
import { CheckoutCTAError } from "./CheckoutCTAError";
import { CHECKOUT_CTA_ERRORS } from "./CheckoutCTAErrors.content";
import Caption from "../../../ui/captions/Caption";
import { BRAND } from "../../../ui/variables";
import { checkoutStepCompleted } from "../store/checkout.actions";
import { getCustomerInfo } from "../store/checkout.selectors";
import {
  getCartMinimum,
  getMembershipState,
} from "../../../app/store/plan/plan.selectors";
import {
  getCartContainsUnavailableProducts,
  getCartUuid,
  getIsCartMinimumMet,
} from "../../cart/store/cart.selectors";
import { getPersona } from "./checkout.service";
import { resetPromo } from "../../cart/store/cart.actions";

interface Props {
  backToCart: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const CheckoutCustomerInfo = ({ backToCart }: Props) => {
  const dispatch = useDispatch();

  const customerInfo = useSelector(getCustomerInfo);
  const cartMinimum = useSelector(getCartMinimum);
  const isCartMinimumMet = useSelector(getIsCartMinimumMet);
  const cartUuid = useSelector(getCartUuid);
  const cartContainsUnavailableItems = useSelector(
    getCartContainsUnavailableProducts
  );
  const membershipState = useSelector(getMembershipState);

  useMount(() => {
    window.scrollTo(0, 0);

    dispatch(resetPromo());
    Analytics.trackEvent(
      CHECKOUT.STEP_VIEWED,
      stepViewedPayloadMapping({ step: CheckoutStep.CustomerInfo, cartUuid })
    );
  });

  const [intendedUse, setIntendedUse] = useState<null | string>(null);
  const [intendedUseOther, setIntendedUseOther] = useState<FormValue<string>>({
    value: "",
    error: null,
    touched: false,
  });

  const handleIntendedUseChange = (update: string) => {
    setIntendedUse(update);
  };

  const handleIntendedUseOtherChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIntendedUseOther({
      value: event.target.value,
      error: null,
      touched: true,
    });
  };

  const handleNextStep = (data: CustomerInfoFields) => {
    const persona = getPersona(intendedUse, membershipState);
    dispatch(
      checkoutStepCompleted({
        step: CheckoutStateStep.CustomerInfo,
        data: { ...data, persona },
      })
    );

    Analytics.trackEvent(CHECKOUT.INTENDED_USE, {
      intended_use: intendedUse,
      intended_use_other: intendedUseOther.value,
    });

    Analytics.trackEvent(CHECKOUT.CUSTOMER_INFO),
      customerInfoPayloadMapping({
        firstName: data.firstName,
        lastName: data.lastName,
        company: data.company ? data.company : "",
        email: data.email,
        cartUuid,
      });
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik<CustomerInfoFields>({
      initialValues: {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
        company: customerInfo.company,
        persona: null,
      },
      validate: validateCustomerInfo,
      onSubmit(data: CustomerInfoFields) {
        handleNextStep(data);
      },
    });

  const areFieldsEmpty =
    values.firstName.length === 0 &&
    values.lastName.length === 0 &&
    values.email.length === 0;
  const isFormValid =
    (Object.keys(touched).length > 0 || !areFieldsEmpty) &&
    Object.keys(errors).length === 0;

  return (
    <CheckoutPageForm>
      <FormHeader>Customer Info</FormHeader>

      <CheckoutInputFieldFormik
        inputWidth={InputWidth.Full}
        autoComplete="given-name"
        identifier="firstName"
        label="First Name"
        type="text"
        value={values.firstName}
        error={errors.firstName}
        touched={touched.firstName}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />

      <CheckoutInputFieldFormik
        inputWidth={InputWidth.Full}
        autoComplete="family-name"
        identifier="lastName"
        label="Last Name"
        type="text"
        value={values.lastName}
        error={errors.lastName}
        touched={touched.lastName}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />

      <CheckoutInputFieldFormik
        inputWidth={InputWidth.Full}
        autoComplete="organization"
        identifier="company"
        label="Company Name (Optional)"
        type="text"
        value={values.company}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />

      <IntendedUseSelect
        handleBlur={handleBlur}
        handleChange={handleIntendedUseChange}
        handleOtherChange={handleIntendedUseOtherChange}
        otherState={intendedUseOther}
        currentValue={intendedUse}
      />

      <CheckoutInputFieldFormik
        inputWidth={InputWidth.Full}
        autoComplete="email"
        identifier="email"
        label="Email"
        type="text"
        value={values.email}
        error={errors.email}
        touched={touched.email}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />

      {!isCartMinimumMet && (
        <Caption color={BRAND.ERROR}>
          As a {MembershipStateDisplayName[membershipState].toLowerCase()}, you
          must meet a ${cartMinimum} minimum in order to checkout
        </Caption>
      )}

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
            cartContainsUnavailableItems
          }
        >
          Continue to Delivery Info
        </Button>
      </CheckoutNextStepButtonContainer>

      <Button style={ButtonStyle.COMPACT_TEXT} onClick={backToCart}>
        Return to Cart
      </Button>
    </CheckoutPageForm>
  );
};

export default CheckoutCustomerInfo;
