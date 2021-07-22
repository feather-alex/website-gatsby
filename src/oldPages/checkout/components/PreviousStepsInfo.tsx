/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import Button, { ButtonStyle } from "../../../ui/buttons/Button";
import Caption from "../../../ui/captions/Caption";
import Bold from "../../../ui/paragraphs/Bold";
import Paragraph1 from "../../../ui/paragraphs/Paragraph1";
import { SHADES, BRAND } from "../../../ui/variables";
import {
  getBillingAddressInfo,
  getCustomerInfo,
  getDeliveryInfo,
} from "../store/checkout.selectors";

const PreviousStepsContainer = styled.div`
  border-top: 1px solid ${SHADES.SHADE_LIGHTER};
  margin-top: 30px;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;
`;

const Step = styled.div`
  width: 175px;
  margin-top: 30px;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
`;

const Info = styled(Caption)`
  color: ${BRAND.PRIMARY_TEXT};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 5px;
`;

export interface Props {
  currentStep: string;
  backToCustomerInfo: () => void;
  backToDeliveryInfo?: () => void;
  backToBillingAddressInfo?: () => void;
}

const PreviousStepsInfo = ({
  currentStep,
  backToCustomerInfo,
  backToDeliveryInfo,
  backToBillingAddressInfo,
}: Props) => {
  const customerInfo = useSelector(getCustomerInfo);
  const deliveryInfo = useSelector(getDeliveryInfo);
  const billingAddressInfo = useSelector(getBillingAddressInfo);

  const { firstName, lastName, email, company } = customerInfo;
  const { streetAddress, apt, city, state, zipcode, phone } = deliveryInfo;
  const {
    billingStreetAddress,
    billingApt,
    billingCity,
    billingState,
    billingPostalCode,
  } = billingAddressInfo;

  const isCustomerInfoAvailable = firstName && lastName && email;
  const isDeliveryInfoAvailable = streetAddress && phone;
  const isBillingAddressInfoAvailable =
    billingStreetAddress && billingCity && billingState && billingPostalCode;

  return (
    <PreviousStepsContainer data-cy={`${currentStep}-previous-steps-info`}>
      {isCustomerInfoAvailable ? (
        <Step>
          <Paragraph1>
            <Bold>Customer Info &nbsp;&nbsp;</Bold>
            <Button
              style={ButtonStyle.COMPACT_TEXT}
              onClick={backToCustomerInfo}
            >
              Edit
            </Button>
          </Paragraph1>
          <Info>
            {firstName} {lastName}
          </Info>
          {company ? <Info>{company}</Info> : null}
          <Info>{email}</Info>
        </Step>
      ) : (
        ""
      )}

      {isDeliveryInfoAvailable && backToDeliveryInfo ? (
        <Step>
          <Paragraph1>
            <Bold>Delivery Info &nbsp;&nbsp;</Bold>
            <Button
              style={ButtonStyle.COMPACT_TEXT}
              onClick={backToDeliveryInfo}
            >
              Edit
            </Button>
          </Paragraph1>
          <Info>
            {streetAddress} {apt ? apt : ""}
          </Info>
          <Info>
            {city}, {state} {zipcode}
          </Info>
        </Step>
      ) : (
        ""
      )}

      {isBillingAddressInfoAvailable && backToBillingAddressInfo ? (
        <Step>
          <Paragraph1>
            <Bold>Billing Info &nbsp;&nbsp;</Bold>
            <Button
              style={ButtonStyle.COMPACT_TEXT}
              onClick={backToBillingAddressInfo}
            >
              Edit
            </Button>
          </Paragraph1>
          <Info>
            {billingStreetAddress} {billingApt ? billingApt : ""}
          </Info>
          <Info>
            {billingCity}, {billingState} {billingPostalCode}
          </Info>
        </Step>
      ) : (
        ""
      )}
    </PreviousStepsContainer>
  );
};

export default PreviousStepsInfo;
