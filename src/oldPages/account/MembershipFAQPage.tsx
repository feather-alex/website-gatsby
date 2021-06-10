/** @jsx jsx */
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import React from 'react';

import { getIsMobileBreakpoint } from '../../app/store/dimensions/dimensions.selectors';
import * as accountSelectors from './accountOverview/store/account.overview.selectors';
import { FaqContentRequestPayload } from '../FAQ/store/faqs.types';
import { PlanType } from './accountOverview/store/account.overview.types';
import { State as GlobalState, APIError } from '../../types/ReduxState';
import * as faqsSelectors from '../FAQ/store/faqs.selectors';
import { getFaqContent } from '../FAQ/store/faqs.actions';
import DividingHeader from '../../ui/textLockups/DividingHeader';
import { FAQCategory } from '../../contentful/contentful.types';
import ResponsiveImage from '../../ui/images/ResponsiveImage';
import FixedSizeImage from '../../ui/images/FixedSizeImage';
import { BREAKPOINTS } from '../../ui/variables';
import MembershipPageFAQs from './AccountPagesFAQs';
import ErrorPage from '../../components/ErrorPage';
import Analytics from '../../analytics/analytics';
import Header1 from '../../ui/headers/Header1';
import AllCaps from '../../ui/headers/AllCaps';
import Loading from '../../components/Loading';
import PAGES from '../../analytics/pages';

interface StateProps {
  isMobileBreakpoint: boolean;
  planType: PlanType;
  planName: string;
  faqCategories: FAQCategory[];
  apiError: APIError | null;
  isFetching: boolean;
  contentfulID: string;
}

interface DispatchProps {
  getFaqRequest: ActionCreatorWithPayload<FaqContentRequestPayload>;
}

type Props = StateProps & DispatchProps;

class MembershipInfo extends React.Component<Props> {
  componentDidMount() {
    Analytics.trackPage(PAGES.ACCOUNT_FAQ);
    this.props.getFaqRequest({ id: this.props.contentfulID });
  }

  render() {
    const { isMobileBreakpoint, planName, faqCategories, isFetching, apiError } = this.props;

    if (apiError) {
      return (
        <ErrorPage
          title="Oh no! Something went wrong when loading this content."
          content="Try refreshing the page, but if that doesn't work you can always reach out to us with questions about renting with Feather."
          to="/contact"
          buttonText="Contact Us"
        />
      );
    }

    if (isFetching) {
      return <Loading />;
    }

    const Image = isMobileBreakpoint ? ResponsiveImage : FixedSizeImage;

    return (
      <div>
        <div
          data-cy="plan-details"
          css={css`
            ${isMobileBreakpoint ? `margin-bottom: 54px;` : `margin-bottom: 70px;`}
          `}
        >
          {!isMobileBreakpoint && <Header1>{planName + ' Details'}</Header1>}
        </div>
        <div
          css={css`
            margin-top: 40px;
            display: flex;
            text-align: center;
            justify-content: center;

            @media ${BREAKPOINTS.MOBILE} {
              flex-direction: column;
              text-align: left;
            }
          `}
        >
          <div
            css={css`
              ${isMobileBreakpoint ? `margin-bottom: 20px;` : ''}
            `}
          >
            <Image
              src="https://img.livefeather.com/pages-new/Accounts/customer_accounts_2.jpg"
              to="https://www.instagram.com/livefeather"
              width={isMobileBreakpoint ? 654 : 600}
              height={290}
              objectPosition={isMobileBreakpoint ? 'bottom' : 'center'}
              target="_blank"
            >
              <div
                css={css`
                  margin: 5px 0;
                `}
              >
                <AllCaps>Follow @livefeather on instagram</AllCaps>
              </div>
            </Image>
          </div>
        </div>

        <div>
          {faqCategories.map((category) => (
            <div key={category.name}>
              <div
                id={category.name}
                css={css`
                  height: 1px;
                `}
              />
              <DividingHeader>{category.name}</DividingHeader>
              {category.faqs.map((faq) => (
                <MembershipPageFAQs key={faq.question} titleText={faq.question} paragraphText={faq.answer} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  planType: accountSelectors.getPlanType(state),
  planName: accountSelectors.getPlanName(state),
  faqCategories: faqsSelectors.getFAQCategories(state),
  isFetching: faqsSelectors.getIsFetching(state),
  apiError: faqsSelectors.getError(state),
  contentfulID: accountSelectors.getMembershipPageFAQsID(state)
});

const mapDispatchToProps: DispatchProps = {
  getFaqRequest: getFaqContent.request
};

export default connect(mapStateToProps, mapDispatchToProps)(MembershipInfo);
