/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { parseISO, format as formatDate } from 'date-fns';

import ParagraphWithTitle from '../../../ui/textLockups/ParagraphWithTitle';
import { SHADES, BRAND } from '../../../ui/variables';
import Bold from '../../../ui/paragraphs/Bold';
import Paragraph2 from '../../../ui/paragraphs/Paragraph2';
import Dot from '../../../ui/icons/Dot';
import Header1 from '../../../ui/headers/Header1';
import Header4 from '../../../ui/headers/Header4';
import Subheader2 from '../../../ui/subheaders/Subheader2';
import { useSelector } from 'react-redux';
import {
  getConfirmedDeliveryDate,
  getRequestedDeliveryDate
} from '../accountOverview/store/account.overview.selectors';
import { getIsMobileBreakpoint } from '../../../app/store/dimensions/dimensions.selectors';
import { ExternalNavLinkData } from '../../../app/navbar/components/navbar.link.data';

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: 16px auto;
  row-gap: 16px;
  margin: 16px 0 48px;
  padding: 0px 48px 0px 8px;
`;

// TODO: Remove legacy when Feather transitions to start date agnostic leases.
// https://www.notion.so/livefeather/Cleanup-non-start-date-agnostic-lease-code-e8ad00963a964fa1b3c3be6413089d5c
const LegacyChecklist = ({ buildingQuestionnaire }: { buildingQuestionnaire: ExternalNavLinkData }) => {
  const requestedDeliveryDate = useSelector(getRequestedDeliveryDate);
  const startDate = useSelector(getConfirmedDeliveryDate);
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);

  return (
    <div>
      {!isMobileBreakpoint && <Header1>Upcoming Delivery Details</Header1>}
      <div
        className="upcoming-delivery"
        css={css`
          width: ${isMobileBreakpoint ? '100%' : '532px'};
          background: ${SHADES.WHITE};
          border-radius: 3px;
          padding: 32px;
          margin-top: 50px;
          margin-bottom: ${isMobileBreakpoint ? '54px' : '64px'};
        `}
      >
        <div
          css={css`
            margin-bottom: 25px;
          `}
        >
          <div
            css={css`
              display: flex;
              margin-bottom: 8px;
              align-items: center;
              ${isMobileBreakpoint && 'flex-direction: column; > span { margin-top: 5px;}'}
            `}
          >
            <Header4>{startDate ? 'Your confirmed delivery date' : 'Your delivery date - '}</Header4>

            {!startDate && <Header4 color={BRAND.ACCENT}>*pending confirmation</Header4>}
          </div>

          {startDate ? (
            <Subheader2>{startDate}</Subheader2>
          ) : (
            <Subheader2 color={BRAND.ACCENT}>{`${formatDate(
              parseISO(requestedDeliveryDate!),
              'MMMM d, yyyy'
            )}*`}</Subheader2>
          )}
        </div>

        <Bold>
          <Paragraph2>Before we can deliver your furniture:</Paragraph2>
        </Bold>
        <StepsContainer>
          <Dot color={BRAND.ACCENT} />
          <Paragraph2>
            Please answer a few{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={buildingQuestionnaire.href}
              css={css`
                color: ${BRAND.PRIMARY};
                text-decoration: underline;
                font-weight: 500;
              `}
            >
              {buildingQuestionnaire.label}
            </a>
          </Paragraph2>

          <Dot color={BRAND.ACCENT} />
          <Paragraph2>
            Sign your Feather lease. Keep an eye on your inbox, a member of our team will send your lease details via
            email within 48 hours of your order submission.
          </Paragraph2>
        </StepsContainer>
      </div>
      {!startDate && (
        <div
          css={css`
            margin-bottom: 40px;
          `}
        >
          <ParagraphWithTitle
            titleText="When will my delivery date and time be confirmed?"
            paragraphText="Your pending confirmation date will say confirmed once you've been scheduled for a date and our team will be in touch two days prior with a confirmed arrival window"
          />
        </div>
      )}
    </div>
  );
};

export default LegacyChecklist;
