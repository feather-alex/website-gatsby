/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import Title1 from '../../../ui/titles/Title1';
import { HashLink } from 'react-router-hash-link';
import AllCaps from '../../../ui/headers/AllCaps';
import ErrorIcon from '../../../ui/icons/ErrorIcon';
import Paragraph2 from '../../../ui/paragraphs/Paragraph2';
import { BRAND, SHADES } from '../../../ui/variables';
import Title3 from '../../../ui/titles/Title3';

export interface Props {
  shouldDisplayPastDue: boolean;
  shouldDisplayThankYou: boolean;
}

export const PastDue = ({ shouldDisplayPastDue, shouldDisplayThankYou }: Props) => {
  React.useEffect(() => {
    if (shouldDisplayThankYou) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [shouldDisplayThankYou]);

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      {shouldDisplayPastDue ? (
        <div
          css={css`
            color: ${BRAND.ERROR};
            border: 1px solid ${BRAND.ACCENT};
            border-radius: 3px;
            padding: 16px;
            width: 100%;
            display: flex;
            position: relative;
            top: 30px;
          `}
        >
          <div
            css={css`
              padding-right: 16px;
            `}
          >
            <ErrorIcon />
          </div>
          <div className="error-message">
            <AllCaps>billing issue</AllCaps>
            <Title1 isBold={true}>Please update your card on file</Title1>
            <HashLink
              to="/account/billing/#payment-information"
              scroll={(el) => el.scrollIntoView({ behavior: 'smooth' })}
            >
              <span
                css={css`
                  color: ${BRAND.ERROR};
                  margin-top: 10px;
                `}
              >
                <Title3 isUnderline={true}>Go to payment information</Title3>
              </span>
            </HashLink>
          </div>
        </div>
      ) : null}

      {shouldDisplayThankYou ? (
        <div
          css={css`
            color: ${BRAND.ACCENT_2};
            background-color: ${SHADES.WHITE};
            border-radius: 3px;
            padding: 16px;
            width: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
            top: 30px;
          `}
        >
          <AllCaps>billing issue</AllCaps>
          <Title1 isBold={true}>Thank you for updating your information!</Title1>
          <Paragraph2>Your outstanding payment for this month will be processed in the next few days</Paragraph2>
        </div>
      ) : null}
    </div>
  );
};
