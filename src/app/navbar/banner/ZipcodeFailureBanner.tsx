/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import isEmail from 'validator/lib/isEmail';

import { State as GlobalState } from '../../../types/ReduxState';
import Paragraph2 from '../../../ui/paragraphs/Paragraph2';
import { SHADES, BRAND } from '../../../ui/variables';
import {
  newsletterSignupRequest,
  NewsletterSignupRequest
} from '../../store/newsletter-signup/newsletter.signup.actions';

import Banner from './Banner';
import BannerInputField from './BannerInputField';
import { NewsletterInputOrigin } from '../../store/newsletter-signup/newsletter.signup.types';
import { getIsMobileBreakpoint } from '../../store/dimensions/dimensions.selectors';
import { showNavbarBanner } from '../../store/navbar/navbar.actions';
import { BannerType, ShowNavbarBannerPayload } from '../../store/navbar/navbar.types';
import Analytics from '../../../analytics/analytics';
import { ZIPCODE } from '../../../analytics/zipcode/events';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface Props {
  message?: ReactNode;
  isMobileBreakpoint: boolean;
  newsletterSignupRequest: NewsletterSignupRequest;
  showNavbarBanner: ActionCreatorWithPayload<ShowNavbarBannerPayload>;
}

class ZipcodeFailureBanner extends React.Component<Props> {
  componentDidMount() {
    Analytics.trackEvent(ZIPCODE.NO_DELIVERY_VIEWED);
  }

  handleSubmit = (email: string) => {
    if (isEmail(email)) {
      this.props.newsletterSignupRequest({ email, origin: NewsletterInputOrigin.NAVBAR });
    } else {
      this.props.showNavbarBanner({
        bannerType: BannerType.ZipCodeFailure,
        message: `Oops! Please enter a valid email address so we can notify you when we're available in your city.`
      });
    }
  };

  render() {
    const { message, isMobileBreakpoint } = this.props;

    return (
      <Banner backgroundColor={message ? BRAND.ERROR : SHADES.SHADE_DARK}>
        <div
          css={css`
            ${isMobileBreakpoint && 'margin-bottom: 16px;'}
          `}
        >
          <Paragraph2 color={SHADES.WHITE}>
            {message ||
              `Sorry, your zip code is outside of our delivery area. Get notified when we're available in your\xa0city!`}
          </Paragraph2>
        </div>
        <BannerInputField placeholder="Enter your email" color={SHADES.WHITE} onSubmit={this.handleSubmit} />
      </Banner>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  isMobileBreakpoint: getIsMobileBreakpoint(state)
});

const mapDispatchToProps = {
  newsletterSignupRequest,
  showNavbarBanner
};

export default connect(mapStateToProps, mapDispatchToProps)(ZipcodeFailureBanner);
