/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import Carousel from 'nuka-carousel';
import { useState } from 'react';
import Hero from '../../ui/headers/Hero';
import FastCompanyLogo from '../../ui/logos/pressLogos/FastCompanyLogo';
import ForbesLogo from '../../ui/logos/pressLogos/ForbesLogo';
import MindBodyGreenLogo from '../../ui/logos/pressLogos/MindBodyGreenLogo';
import MyDomaineLogo from '../../ui/logos/pressLogos/MyDomaineLogo';
import PureWowLogo from '../../ui/logos/pressLogos/PureWowLogo';
import { COLORS, BREAKPOINTS, GRID_BREAKPOINTS } from '../../ui/variables';
import { HOMEPAGE_PRESS_REVIEWS, MediaName } from './homepage.reviews';

const PressContainer = styled.div`
  background-color: ${COLORS.BLUSH};
  padding: 96px 10vw;
  text-align: center;

  @media ${GRID_BREAKPOINTS.TABLET} {
    padding: 64px 10vw;
  }

  @media ${GRID_BREAKPOINTS.MOBILE} {
    padding: 48px 10vw;
  }
`;

const Logos = styled.div`
  margin-top: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${BREAKPOINTS.MOBILE} {
    text-align: center;
  }
`;

const LogoWrapper = styled.span`
  opacity: 1;
  transition: opacity 200ms linear;
  ${({ isActive }: { isActive: boolean }) => !isActive && 'opacity: 0.2;'}

  @media ${BREAKPOINTS.MOBILE} {
    width: 100%;
    height: 36px;
    ${({ isActive }: { isActive: boolean }) => !isActive && 'display: none;'}
  }
`;

const Quote = styled.div`
  padding: 10px;
`;

const HomepagePress = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeMedia = HOMEPAGE_PRESS_REVIEWS[activeIndex === 4 ? 0 : activeIndex + 1].media;

  return (
    <PressContainer>
      <Carousel
        css={css`
          .slider-frame .slider-list {
            cursor: default !important;
          }
        `}
        autoplay={true}
        autoplayInterval={1500}
        slidesToShow={1}
        speed={1500}
        transitionMode="fade"
        withoutControls={true}
        wrapAround={true}
        swiping={true}
        slideIndex={activeIndex}
        beforeSlide={(index) => setActiveIndex(index)}
      >
        {HOMEPAGE_PRESS_REVIEWS.map((review) => (
          <Quote key={review.quote}>
            <Hero>"{review.quote}"</Hero>
          </Quote>
        ))}
      </Carousel>

      <Logos>
        <LogoWrapper isActive={activeMedia === MediaName.PureWow}>
          <PureWowLogo />
        </LogoWrapper>

        <LogoWrapper isActive={activeMedia === MediaName.MyDomaine}>
          <MyDomaineLogo />
        </LogoWrapper>

        <LogoWrapper isActive={activeMedia === MediaName.MindBodyGreen}>
          <MindBodyGreenLogo />
        </LogoWrapper>

        <LogoWrapper isActive={activeMedia === MediaName.Forbes}>
          <ForbesLogo />
        </LogoWrapper>

        <LogoWrapper isActive={activeMedia === MediaName.FastCompany}>
          <FastCompanyLogo />
        </LogoWrapper>
      </Logos>
    </PressContainer>
  );
};

export default HomepagePress;
