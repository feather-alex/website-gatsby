/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

import { BRAND, BREAKPOINTS } from '../../../ui/variables';
import Button, { ButtonStyle } from '../../../ui/buttons/Button';

export const CompleteNote = styled.div`
  border-top: 1px solid ${BRAND.ACCENT};
  border-bottom: 1px solid ${BRAND.ACCENT};
  padding: 16px 0;
  margin-bottom: 32px;

  @media ${BREAKPOINTS.MOBILE} {
    text-align: center;
  }
`;

export const GetReadySteps = styled.ol`
  padding: 0;
  list-style: none;

  li {
    position: relative;
    padding-left: 36px;
    margin-bottom: 32px;
  }
`;

export const StepNumber = styled.span`
  border: 1px solid ${BRAND.ACCENT};
  border-radius: 16px;
  position: absolute;
  width: 28px;
  height: 28px;
  left: 0;
  top: 0;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

export const StepTitle = styled.strong`
  display: block;
  font-weight: 500;
  margin-bottom: 6px;
  padding-top: 2px;
`;

const FeatherDeliveryChecklist = ({
  buildingQuestionsLink,
  hasSignedLease,
  handleDisplaySelectDeliveryDate
}: {
  buildingQuestionsLink: string;
  hasSignedLease: boolean;
  handleDisplaySelectDeliveryDate: () => void;
}) => {
  return (
    <React.Fragment>
      <CompleteNote>Complete the delivery prep checklist to schedule your Feather delivery.</CompleteNote>

      <GetReadySteps>
        <li>
          <StepNumber>1</StepNumber>
          <StepTitle>Sign Your Feather Lease</StepTitle>
          Check your email inbox. We sent your Feather Lease and need you to review and sign before we can deliver your
          items.
        </li>
        <li>
          <StepNumber>2</StepNumber>
          <StepTitle>Share Your Building Details</StepTitle>
          Please take a few moments to fill out the building questionnaire. Getting to know your building helps us plan
          the smoothest delivery possible.
          <Button
            css={css`
              margin-top: 16px;
              display: inline-block;
            `}
            style={ButtonStyle.TEXT}
            external={buildingQuestionsLink}
          >
            Fill Out The Questionnaire
          </Button>
        </li>
        <li>
          <StepNumber>3</StepNumber>
          <StepTitle>Choose Your Delivery Date</StepTitle>
          Once you've signed your lease and shared your building details, come back here to choose your delivery date.
          <Button
            css={css`
              margin-top: 36px;
            `}
            isDisabled={!hasSignedLease}
            onClick={handleDisplaySelectDeliveryDate}
          >
            Schedule Delivery
          </Button>
        </li>
      </GetReadySteps>
    </React.Fragment>
  );
};

export default FeatherDeliveryChecklist;
