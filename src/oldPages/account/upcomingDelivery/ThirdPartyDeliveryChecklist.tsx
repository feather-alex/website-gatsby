import React from "react";
import {
  CompleteNote,
  GetReadySteps,
  StepNumber,
  StepTitle,
} from "./FeatherDeliveryChecklist";

const ThirdPartyDeliveryChecklist = () => (
  <React.Fragment>
    <CompleteNote>
      Complete the delivery prep checklist to schedule your Feather delivery.
    </CompleteNote>

    <GetReadySteps>
      <li>
        <StepNumber>1</StepNumber>
        <StepTitle>Sign Your Feather Lease</StepTitle>
        Check your email inbox. We sent your Feather Lease and need you to
        review and sign before we can deliver your items.
      </li>
      <li>
        <StepNumber>2</StepNumber>
        <StepTitle>Schedule Your Delivery</StepTitle>
        Once your lease is signed, our local delivery team will email you within
        2-3 business days to schedule your trip.
      </li>
    </GetReadySteps>
  </React.Fragment>
);

export default ThirdPartyDeliveryChecklist;
