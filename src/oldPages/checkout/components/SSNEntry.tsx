/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { Fragment, ChangeEvent } from "react";
import { Popover } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import { BRAND } from "../../../ui/variables";
import Header3 from "../../../ui/headers/Header3";
import Button, { ButtonStyle } from "../../../ui/buttons/Button";
import Title3 from "../../../ui/titles/Title3";
import Title2 from "../../../ui/titles/Title2";
import TooltipIcon from "../../../assets/icons/ui-elements/tooltip.svg";
import Analytics from "../../../analytics/analytics";
import { CHECKOUT } from "../../../analytics/checkout/events";
import { checkoutActionsCartUuidPayloadMapping } from "../../../analytics/checkout/payload-mappings";
import { useDispatch, useSelector } from "react-redux";
import { toggleOverlay } from "../../../app/store/overlay/overlay.actions";
import { Overlays } from "../../../app/store/overlay/overlay.types";
import { useFormik } from "formik";
import { SSNInfoFields } from "../store/checkoutForms.types";
import { noop } from "../../../utils/ui-helpers";
import CheckoutInputFieldFormik, { InputWidth } from "./CheckoutInputField";
import { validateSSNInfo } from "../store/checkout.validation";
import { updateSSNInfo } from "../store/checkout.actions";
import { getServerSideSSNError } from "../store/checkout.selectors";
import { getCartUuid } from "../../cart/store/cart.selectors";
import { resetErrorsStateValues } from "../store/checkout.actions";

const SectionPadding = styled.div`
  margin: 37px 0 35px 0;
`;

const HeaderPadding = styled.div`
  margin-bottom: 16px;
`;

const popover = (
  <Popover
    className="options-popover"
    id="popover-positioned-bottom"
    style={{ width: "400px" }}
    placement="bottom"
  >
    {/* we want this to match the existing popover, hence the classes */}
    <h6 className="futura reg-14">Additional Information on Soft Checks</h6>
    <p className="futura">
      Soft inquiries (also known as “soft pulls”) typically occur when a person
      or company checks your credit as part of a verification process. This may
      occur, for example, when a credit card issuer checks your credit to see if
      you qualify for certain credit card offers. Your employer might also run a
      soft inquiry before hiring you. We use a VantageScore (versus a FICO
      score) to better to take into account students and people without a long
      credit history.
    </p>
  </Popover>
);

const SSNEntry = () => {
  const dispatch = useDispatch();

  const cartUuid = useSelector(getCartUuid);
  const serverSideSSNError = useSelector(getServerSideSSNError);

  const openNoSSNOverlay = () => {
    dispatch(resetErrorsStateValues());
    dispatch(toggleOverlay(Overlays.NoSSNOverlay, true));
  };

  const { handleBlur, values, errors, touched, handleChange } =
    useFormik<SSNInfoFields>({
      enableReinitialize: true,
      initialValues: {
        ssn: "",
        legalFirstName: "",
        legalLastName: "",
      },
      validate: validateSSNInfo,
      onSubmit: noop,
    });

  return (
    <Fragment>
      <Title2 dataCy="ssn-error">
        <span
          css={css`
            color: ${BRAND.ERROR};
          `}
        >
          Unfortunately, we were unable to find your credit score using your
          provided name and billing address.
        </span>
        <br />
        <br />
        Please submit your Social Security Number and verify your legal name,
        and we’ll run the soft check again.
      </Title2>
      <SectionPadding>
        <HeaderPadding>
          <Header3>Enter Social Security Number</Header3>
        </HeaderPadding>
        <div
          css={css`
            margin: 0 0 16px 0;
          `}
        >
          <CheckoutInputFieldFormik
            inputWidth={InputWidth.Inherit}
            identifier="ssn"
            label=""
            type="password"
            placeholder="Enter your SSN"
            value={values.ssn}
            error={errors.ssn || serverSideSSNError}
            touched={touched.ssn}
            handleChange={(e: ChangeEvent<HTMLInputElement>) => {
              // only process numerical values.
              const ssnValue = e.currentTarget.value;
              if (ssnValue.match(/^\d*$/)) {
                dispatch(updateSSNInfo({ ...values, ssn: ssnValue }));
                handleChange(e);
              }
            }}
            handleBlur={handleBlur}
            maxLength={9}
          />
        </div>
        <Title3>
          Don’t have a Social Security Number? You can still rent with Feather.{" "}
          <Button style={ButtonStyle.INLINE} onClick={openNoSSNOverlay}>
            Learn more
          </Button>
        </Title3>
      </SectionPadding>
      <SectionPadding>
        <HeaderPadding>
          <Header3>Verify legal name</Header3>
        </HeaderPadding>
        <div
          css={css`
            margin-bottom: 16px;
          `}
        >
          <CheckoutInputFieldFormik
            inputWidth={InputWidth.Inherit}
            identifier="legalFirstName"
            label="Legal first name"
            type="text"
            placeholder="Enter your legal first name"
            value={values.legalFirstName}
            error={errors.legalFirstName}
            touched={touched.legalFirstName}
            handleChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch(
                updateSSNInfo({ ...values, legalFirstName: e.target.value })
              );
              handleChange(e);
            }}
            handleBlur={handleBlur}
          />
        </div>
        <CheckoutInputFieldFormik
          inputWidth={InputWidth.Inherit}
          identifier="legalLastName"
          label="Legal last name"
          type="text"
          placeholder="Enter your legal last name"
          value={values.legalLastName}
          error={errors.legalLastName}
          touched={touched.legalLastName}
          handleChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch(
              updateSSNInfo({ ...values, legalLastName: e.target.value })
            );
            handleChange(e);
          }}
          handleBlur={handleBlur}
        />
      </SectionPadding>
      <div
        css={css`
          margin: 32px 0;
          svg > g > g > g > g > circle {
            fill: ${BRAND.PRIMARY_TEXT};
          }
        `}
      >
        <div
          css={css`
            p {
              display: inline;
            }
          `}
        >
          <Title2>
            Placing your order and running the soft check will not affect your
            credit score.{" "}
          </Title2>
          <OverlayTrigger
            trigger="click"
            overlay={popover}
            placement="bottom"
            rootClose={true}
          >
            <TooltipIcon
              className="icon"
              css={css`
                margin-left: 5px;
                margin-bottom: -2px;
              `}
              onClick={() =>
                Analytics.trackEvent(
                  CHECKOUT.CLICK_TOOLTIP,
                  checkoutActionsCartUuidPayloadMapping({ cartUuid })
                )
              }
            />
          </OverlayTrigger>
        </div>
      </div>
    </Fragment>
  );
};

export default SSNEntry;
