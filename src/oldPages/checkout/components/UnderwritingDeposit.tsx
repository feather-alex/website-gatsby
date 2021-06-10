/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Paragraph1 from '../../../ui/paragraphs/Paragraph1';
import Subheader2 from '../../../ui/subheaders/Subheader2';
import { BRAND, SHADES } from '../../../ui/variables';
import { LineBreak } from '../AdditionalUnderwriting';
import { formatCurrency } from '../store/checkout.service';

const DepositContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const HowItWorks = styled.div`
  background-color: ${SHADES.WHITE};
  padding: 40px;
  max-width: 608px;
  margin: 48px 0 32px 0;
`;

const HowTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  padding: 0 0 32px 0;
  margin: 0 0 32px 0;
  border-bottom: 1px solid ${BRAND.ACCENT};
`;

const HowList = styled.ol`
  list-style: none;
  counter-reset: li;
  padding: 0;
  position: relative;

  li::before {
    content: counter(li) '. ';
    color: ${BRAND.PRIMARY};
    position: absolute;
    left: 0;
    font-size: 18px;
    font-weight: 500;
  }

  li {
    counter-increment: li;
    margin-bottom: 24px;
    padding-left: 24px;
  }
`;

const BulletPoint = styled(Paragraph1)`
  color: ${BRAND.SECONDARY_TEXT};
  text-align: center;
  max-width: 540px;
`;

interface Props {
  monthlyFurnitureTotal: number;
  depositAmount: number;
}

const UnderwritingDeposit = ({ monthlyFurnitureTotal, depositAmount }: Props) => {
  return (
    <React.Fragment>
      <DepositContainer>
        <Subheader2
          css={css`
            max-width: 736px;
            text-align: center;
            margin-bottom: 32px;
            margin: auto;
          `}
        >
          Send us your original order for review. Based on a furniture spend of ${formatCurrency(monthlyFurnitureTotal)}
          /mo, Feather may accept a one-time deposit of ${formatCurrency(depositAmount)}.
        </Subheader2>

        <HowItWorks>
          <HowTitle>How It Works</HowTitle>
          <HowList>
            <li>
              <Paragraph1>
                Send us your order for review. We’ll look at the annual furniture total of the items you’re leasing and
                will ask for 15% as a deposit.
              </Paragraph1>
            </li>
            <li>
              <Paragraph1>
                Our team will follow up via email within 48 hours to accept your deposit and set up your account.
              </Paragraph1>
            </li>
            <li>
              <Paragraph1>Upon completion of your lease, we’ll refund your deposit*</Paragraph1>
            </li>
          </HowList>
        </HowItWorks>

        <BulletPoint>
          *Your deposit is refundable at the end of your lease term if you have met all terms and conditions (including
          payment of all amounts due) under your Feather furniture lease agreement.
        </BulletPoint>
      </DepositContainer>
      <LineBreak />
    </React.Fragment>
  );
};

export default UnderwritingDeposit;
