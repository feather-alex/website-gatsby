/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import styled from '@emotion/styled';

import Header2 from '../../../ui/headers/Header2';
import Header3 from '../../../ui/headers/Header3';
import Paragraph1 from '../../../ui/paragraphs/Paragraph1';
import Paragraph2 from '../../../ui/paragraphs/Paragraph2';
import Button, { ButtonStyle } from '../../../ui/buttons/Button';
import { LineBreak } from '../AdditionalUnderwriting';
import Caption from '../../../ui/captions/Caption';
import { BRAND, BREAKPOINTS } from '../../../ui/variables';
import SelectInput, { InputType } from '../../../ui/formElements/SelectInput';

const Head = styled.div`
  max-width: 612px;
  margin: auto;
  text-align: center;
  padding-top: 110px;
  @media ${BREAKPOINTS.MOBILE} {
    padding-top: 49px;
  }
`;

const CenteredH3 = styled(Header3)`
  text-align: center;
  margin-bottom: 24px;
`;

const IncomeForm = styled.div`
  max-width: 612px;
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 344px;
  margin-bottom: 32px;
`;

const InputWrap = styled.div`
  position: relative;

  &::before {
    content: '$';
    color: ${BRAND.PRIMARY_TEXT};
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 16px;
  }
`;

const IncomeInput = styled.input`
  border: 1px solid ${BRAND.ACCENT};
  border-radius: 3px;
  width: 100%;
  height: 56px;
  padding-left: 30px;

  &.error {
    border: 1px solid ${BRAND.ERROR};
  }
`;

const IncomeError = styled(Caption)`
  margin-top: 8px;
  display: block;
`;

const IncomeDescText = styled(Caption)`
  margin-bottom: 24px;
  max-width: 450px;
`;

const FormSubmit = styled.div`
  max-width: 608px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TermsAgreement = styled(Paragraph2)`
  color: ${BRAND.SECONDARY_TEXT};
  max-width: 520px;
  margin: auto;
`;

const allowedInputKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace'];

interface Props {
  isPlacingOrder: boolean;
  statedIncome: string;
  onSetStatedIncomeAndPlaceOrder: Function;
}

const UnderwritingConfirmIncome = ({ statedIncome, onSetStatedIncomeAndPlaceOrder, isPlacingOrder }: Props) => {
  const incomePreviouslyStated = !!statedIncome;
  const [income, setIncome] = useState(statedIncome || '');
  const [incomeError, setIncomeError] = useState(false);
  const [verification, setVerification] = useState(false);

  const handleIncomeKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!allowedInputKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedIncome = event.target.value.replace(/\D/g, '');
    setIncome(cleanedIncome);
  };

  const handleSubmit = () => {
    if (income === '0') {
      return setIncomeError(true);
    }
    setIncomeError(false);
    onSetStatedIncomeAndPlaceOrder(income);
  };
  const formattedIncome = income ? Number(income).toLocaleString() : '';

  return (
    <React.Fragment>
      <Head>
        <Header2
          css={css`
            margin-bottom: 24px;
          `}
        >
          Before we can place your order, help us confirm your eligibility.
        </Header2>
        <Paragraph1
          css={css`
            max-width: 607px;
          `}
        >
          Like many businesses, Feather uses your credit score and reported income to evaluate your eligibility to rent
          furniture from us.
        </Paragraph1>
      </Head>

      <LineBreak />

      <IncomeForm>
        <CenteredH3>Enter Your Annual Income</CenteredH3>
        <InputContainer>
          <InputWrap>
            <IncomeInput
              type="tel"
              className={incomeError ? 'error' : ''}
              data-cy="income-input"
              value={formattedIncome}
              placeholder="Your total annual income"
              onKeyPress={handleIncomeKeyUp}
              onChange={handleIncomeChange}
              maxLength={9}
              disabled={incomePreviouslyStated}
            />
          </InputWrap>
          {incomeError && (
            <IncomeError color={BRAND.ERROR}>Uh oh! Please enter an amount greater than zero.</IncomeError>
          )}
        </InputContainer>
        <IncomeDescText>
          Include all income available to you. If you’re under age 21, only include your own income. Income includes
          wages, retirement income, investments, rental properties, etc.
        </IncomeDescText>
        <IncomeDescText>
          You do not need to include alimony, child support, or separate maintenance income if you do not wish to rely
          upon it.
        </IncomeDescText>
      </IncomeForm>

      <LineBreak />

      <FormSubmit>
        <TermsAgreement>
          <SelectInput
            inputType={InputType.Checkbox}
            isChecked={verification}
            dataCy="confirm-income-checkbox"
            onChange={() => setVerification(!verification)}
            css={css`
              margin-bottom: 31px;
            `}
          >
            I certify that all information provided is true, correct, and verifiable.
          </SelectInput>
        </TermsAgreement>

        <Button
          onClick={handleSubmit}
          dataCy="submit-income-button"
          isFullWidth={true}
          isDisabled={isPlacingOrder || !income || !verification}
          css={css`
            margin-bottom: 32px;
          `}
        >
          Submit Income
        </Button>

        <Button to="/cart" color={BRAND.SECONDARY_TEXT} style={ButtonStyle.COMPACT_TEXT}>
          Cancel Order &amp; Return to Cart
        </Button>
      </FormSubmit>
    </React.Fragment>
  );
};

export default UnderwritingConfirmIncome;
