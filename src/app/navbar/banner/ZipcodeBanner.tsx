/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { connect } from 'react-redux';

import { State as GlobalState } from '../../../types/ReduxState';
import Paragraph2 from '../../../ui/paragraphs/Paragraph2';
import { BRAND, SHADES, COLORS } from '../../../ui/variables';
import { zipcodeSubmit, ZipcodeSubmit } from '../../store/plan/plan.actions';

import Banner from './Banner';
import BannerInputField from './BannerInputField';
import { getIsMobileBreakpoint } from '../../store/dimensions/dimensions.selectors';
import { showNavbarBanner } from '../../store/navbar/navbar.actions';
import { BannerType, ShowNavbarBannerPayload } from '../../store/navbar/navbar.types';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface Props {
  message?: ReactNode;
  isMobileBreakpoint: boolean;
  zipcodeSubmit: ZipcodeSubmit;
  showNavbarBanner: ActionCreatorWithPayload<ShowNavbarBannerPayload>;
}

class ZipcodeBanner extends React.Component<Props> {
  handleSubmit = (zipcode: string) => {
    if (zipcode.length > 1 && zipcode.match(/^\d{5}$/)) {
      this.props.zipcodeSubmit({ zipcode, isInBanner: true });
    } else {
      this.props.showNavbarBanner({
        bannerType: BannerType.ZipCode,
        message: 'Oops! Please enter a valid zip code in NYC, LA or OC to make sure we deliver in your area.'
      });
    }
  };

  render() {
    const { message, isMobileBreakpoint } = this.props;

    return (
      <Banner backgroundColor={message ? BRAND.ERROR : COLORS.CITRON}>
        <div
          css={css`
            ${isMobileBreakpoint && 'margin-bottom: 16px;'}
          `}
        >
          <Paragraph2 color={message ? SHADES.WHITE : BRAND.PRIMARY_TEXT}>
            {message || `Currently available in 2,000+ zip codes. Make sure we deliver to you!`}
          </Paragraph2>
        </div>
        <BannerInputField
          type="tel"
          inputMode="numeric"
          placeholder="Enter Zip Code"
          color={message ? SHADES.WHITE : BRAND.PRIMARY_TEXT}
          onSubmit={this.handleSubmit}
        />
      </Banner>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  isMobileBreakpoint: getIsMobileBreakpoint(state)
});

const mapDispatchToProps = {
  zipcodeSubmit,
  showNavbarBanner
};

export default connect(mapStateToProps, mapDispatchToProps)(ZipcodeBanner);
