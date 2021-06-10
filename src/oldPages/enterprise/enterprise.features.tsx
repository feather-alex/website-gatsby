/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Paragraph1 from '../../ui/paragraphs/Paragraph1';
import Analytics from '../../analytics/analytics';
import { ENTERPRISE, AnalyticsEventKey } from '../../analytics/enterprise/events';
import { enterpriseClickLinkPayloadMapping } from '../../analytics/enterprise/payload-mappings';

const Paragraph = styled(Paragraph1)`
  margin-top: 28px;
`;

export const trackCTAClick = (eventKey: AnalyticsEventKey) => () => {
  Analytics.trackEvent(ENTERPRISE.CLICK_CTA, enterpriseClickLinkPayloadMapping({ link: eventKey }));
};

export const ENTERPRISE_FEATURES = {
  1: {
    imageUrl: 'https://img.livefeather.com/pages-new/Enterprise/dining_room.png',
    headerText: 'For stagers & realtors',
    paragraphText: [
      <Paragraph
        key="0"
        css={css`
          margin-top: 8px;
        `}
      >
        Feather offers ideal rental solutions for stagers and realtors so you can get your house sold quickly and at the
        highest price. There’s no long-term commitment or big upfront cost.
      </Paragraph>,
      <Paragraph key="1">
        Get modern furniture that’s comfortable and super stylish—from sofas and beds to tables and lamps and chairs—and
        have everything delivered, assembled, and fully set up in as little as 7 days. Feather can transform any four
        walls into a home that your clients will fall in love with.
      </Paragraph>,
      <Paragraph key="2">For flexible short-term lease options, shop our website under short-term plan.</Paragraph>
    ],
    buttonText: 'Shop All Furniture',
    analyticsKey: AnalyticsEventKey.exploreFurniture
  },
  2: {
    imageUrl: 'https://img.livefeather.com/pages-new/Enterprise/lunch_table.png',
    headerText: 'For special projects',
    paragraphText:
      'Working on a different type of project? Get in touch and share the details—we’re excited to partner in any way we can.',
    buttonText: 'Start a Special Project',
    analyticsKey: AnalyticsEventKey.sectionSpecialProject
  },
  3: {
    imageUrl: 'https://img.livefeather.com/pages-new/Enterprise/fabric_swatches.png',
    headerText: 'Interior design made simple',
    paragraphText: `Our award-winning designers help you select the right furniture for your space, complete with layout plans. And
    your dedicated account manager is always available if you have questions or want to make changes to your order.`,
    buttonText: ''
  },
  4: {
    imageUrl: 'https://img.livefeather.com/pages-new/Enterprise/office_space.png',
    headerText: 'Rent or buy your office furniture',
    paragraphText: `Companies change over time. From growing your headcount to changing offices. It doesn't always make sense to buy
    furniture outright. Feather provides a full-service way to style your office without the big upfront costs and long-term
    commitment of traditional retail.`,
    buttonText: ''
  },
  5: {
    imageUrl: 'https://img.livefeather.com/pages-new/Enterprise/furniture_delivery.png',
    headerText: 'White glove delivery & assembly',
    paragraphText:
      'Our team of trained furniture specialists will do the heavy lifting so you can focus on what you do best.',
    buttonText: ''
  }
};
