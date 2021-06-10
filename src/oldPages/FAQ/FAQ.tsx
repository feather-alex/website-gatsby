/** @jsx jsx */
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import React from 'react';

import Layout from '../../app/Layout';
import PAGES from '../../analytics/pages';
import HashLinkId from '../../components/HashLinkId';
import { displayPostalInput, DisplayPostalInput } from '../../reducers/navigation';
import { State as GlobalState, APIError } from '../../types/ReduxState';
import {
  getWindowHeight,
  getIsMobileBreakpoint,
  getIsDesktopBreakpoint,
  getBodyMarginTop
} from '../../app/store/dimensions/dimensions.selectors';
import { getFaqContent } from './store/faqs.actions';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Helmet from '../../components/Helmet';
import Analytics from '../../analytics/analytics';
import { FAQS } from '../../analytics/faqs/events';
import { getFAQCategories, getMeta } from './store/faqs.selectors';
import { FaqContentRequestPayload } from './store/faqs.types';
import { BREAKPOINTS, BRAND } from '../../ui/variables';
import Header2 from '../../ui/headers/Header2';
import Title1 from '../../ui/titles/Title1';
import Accordion from '../../ui/miscellaneous/Accordion';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
import Header1 from '../../ui/headers/Header1';
import HeaderContainer from '../../ui/headers/HeaderContainer';
import { getError, getIsFetching } from './store/faqs.selectors';
import ErrorPage from '../../components/ErrorPage';
import Loading from '../../components/Loading';
import { CONTENTFUL_IDS, FAQCategory, Meta } from '../../contentful/contentful.types';
import RichTextWrapper from '../../contentful/RichTextWrapper';

interface StateProps {
  bodyMarginTop: number;
  windowHeight: number;
  isMobileBreakpoint: boolean;
  isDesktopBreakpoint: boolean;
  categories: FAQCategory[];
  apiError: APIError | null;
  isFetching: boolean;
  meta: Meta;
}

interface DispatchProps {
  displayPostalInput: DisplayPostalInput;
  getFaqRequest: ActionCreatorWithPayload<FaqContentRequestPayload>;
}

export type Props = StateProps & DispatchProps;

interface State {
  activeKey: React.MouseEvent<string> | string;
}

class FAQ extends React.Component<Props, State> {
  public readonly state: Readonly<State> = {
    activeKey: ''
  };

  componentDidMount() {
    Analytics.trackPage(PAGES.FAQ);
    this.props.getFaqRequest({ id: CONTENTFUL_IDS.FAQ });
  }

  handleSelect = (activeKey: React.MouseEvent<string>) => {
    this.setState({ activeKey });

    if (activeKey) {
      Analytics.trackEvent(FAQS.CLICK_FAQ, { question: activeKey });
    }
  };

  render() {
    const { activeKey } = this.state;

    const { categories, bodyMarginTop, isMobileBreakpoint, isFetching, apiError, meta } = this.props;

    if (apiError) {
      return (
        <Layout>
          <Helmet title={meta.title} description={meta.description} imageUrl={meta.imageUrl} />
          <ErrorPage
            title="Oh no! Something went wrong when loading this content."
            content="Try refreshing the page, but if that doesn't work you can always reach out to us with questions about renting with Feather."
            to="/contact"
            buttonText="Contact Us"
          />
        </Layout>
      );
    }

    if (isFetching) {
      return (
        <Layout>
          <Helmet title={meta.title} description={meta.description} imageUrl={meta.imageUrl} />

          <Loading />
        </Layout>
      );
    }

    return (
      <Layout>
        <Helmet title={meta.title} description={meta.description} imageUrl={meta.imageUrl} />
        <section
          css={css`
            background-color: ${BRAND.BACKGROUND};
          `}
        >
          <HeaderContainer>
            <Header1>Frequently asked questions</Header1>
          </HeaderContainer>

          <div
            css={css`
              padding-bottom: 200px;
            `}
          >
            {isMobileBreakpoint ? <MobileMenu categories={categories} /> : <DesktopMenu categories={categories} />}
            <div
              css={css`
                max-width: 710px;
                margin: auto;

                // This breakpoint is specific to the FAQ menu so that it stays
                // a safe distance from the QA section on desktop.
                @media screen and (max-width: 1110px) {
                  margin-left: 224px;
                  margin-right: 56px;
                }

                @media ${BREAKPOINTS.MOBILE} {
                  margin: 0 24px;
                }
              `}
            >
              <PanelGroup accordion={true} activeKey={activeKey} id="panel-group-faq-page" onSelect={this.handleSelect}>
                {categories.map((category) => (
                  <div key={category.name}>
                    <HashLinkId
                      css={css`
                        ${isMobileBreakpoint
                          ? // 350 and 300 were determined through experimentation when this was static,
                            // now that it's dynamic 50 x (amount of categories) seems appropriate.
                            // frankly we're still not sure why it's not the 57px of the categories dropdown height
                            `
                          padding-top: ${bodyMarginTop + 50 + 50 * categories.length}px;
                          margin-top: -${bodyMarginTop + 50 * categories.length}px;
                          `
                          : `
                          :not(:first-child) {
                            padding-top: ${bodyMarginTop + 64}px;
                            margin-top: -${bodyMarginTop}px;
                          }
                          :first-child {
                            padding-top: ${bodyMarginTop - 12}px;
                          }
                          `}
                      `}
                      id={category.name}
                    >
                      {isMobileBreakpoint ? (
                        <div
                          css={css`
                            color: ${BRAND.ACCENT};
                            padding-bottom: 24px;
                          `}
                        >
                          <Title1 isBold={true}>{category.name}</Title1>
                        </div>
                      ) : (
                        <div
                          css={css`
                            color: ${BRAND.ACCENT};
                            padding-bottom: 32px;
                          `}
                        >
                          <Header2>{category.name}</Header2>
                        </div>
                      )}
                      {category.faqs &&
                        category.faqs.map((faq) => (
                          <Accordion key={faq.question} header={faq.question} activeKey={activeKey}>
                            <RichTextWrapper
                              css={css`
                                & p {
                                  font-size: inherit;
                                }
                              `}
                              key={faq.answer}
                              text={faq.answer}
                            />
                          </Accordion>
                        ))}
                    </HashLinkId>
                  </div>
                ))}
              </PanelGroup>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  windowHeight: getWindowHeight(state),
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  isDesktopBreakpoint: getIsDesktopBreakpoint(state),
  categories: getFAQCategories(state),
  bodyMarginTop: getBodyMarginTop(state),
  meta: getMeta(state),
  isFetching: getIsFetching(state),
  apiError: getError(state)
});

const mapDispatchToProps: DispatchProps = {
  displayPostalInput,
  getFaqRequest: getFaqContent.request
};

export default connect(mapStateToProps, mapDispatchToProps)(FAQ);
