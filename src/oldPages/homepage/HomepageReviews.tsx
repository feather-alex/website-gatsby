/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

import ColorBorder, { ColorBorderArray, ShadowAngle } from '../../ui/borders/ColorBorder';
import Star from '../../ui/icons/SingleStarIcon';
import Paragraph1 from '../../ui/paragraphs/Paragraph1';
import Paragraph2 from '../../ui/paragraphs/Paragraph2';
import Header1 from '../../ui/headers/Header1';
import { ReviewsFeature } from '../../contentful/contentful.types';
import Button, { ButtonStyle } from '../../ui/buttons/Button';
import { COLORS, GRID_BREAKPOINTS } from '../../ui/variables';
import ArrowRightBold from '../../ui/icons/ArrowRightBold';
import Bold from '../../ui/paragraphs/Bold';
import Analytics from '../../analytics/analytics';
import { AnalyticsEventKey, HOMEPAGE } from '../../analytics/homepage/events';
import { homepageClickLinkPayloadMapping } from '../../analytics/homepage/payload-mappings';

const StarContainer = styled.div`
  display: flex;
`;

const TextContainer = styled.div`
  display: flex;
  padding: 24px 0 32px 0;
`;

const NameContainer = styled.div`
  display: flex;
`;

const CardPadding = styled.div`
  padding: 32px;
  width: 392px;

  @media ${GRID_BREAKPOINTS.TABLET} {
    width: 40vw;
  }

  @media ${GRID_BREAKPOINTS.MOBILE} {
    width: 80vw;
  }
`;

interface ReviewCardProps {
  color: [string, string];
  quote: string;
  name: string;
  city: string;
  state: string;
}

const ReviewCard = ({ color, quote, name, city, state }: ReviewCardProps) => (
  <ColorBorder color={color} shadowAngle={ShadowAngle.TOP_RIGHT}>
    <CardPadding>
      <StarContainer>
        <Star color={color[1]} />
        <Star color={color[1]} />
        <Star color={color[1]} />
        <Star color={color[1]} />
        <Star color={color[1]} />
      </StarContainer>
      <TextContainer>
        <Paragraph1>{quote}</Paragraph1>
      </TextContainer>
      <NameContainer>
        <Bold>
          <Paragraph2>
            - {name}, {city}, {state}
          </Paragraph2>
        </Bold>
      </NameContainer>
    </CardPadding>
  </ColorBorder>
);

const BrowseBorder = styled.div`
  border: 2px solid ${COLORS.CLOUD_HOVER};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 392px;

  @media ${GRID_BREAKPOINTS.TABLET} {
    width: 320px;
  }

  @media ${GRID_BREAKPOINTS.MOBILE} {
    width: 80vw;
  }
`;

const BrowseCard = () => (
  <BrowseBorder>
    <Button
      style={ButtonStyle.SECONDARY}
      to="/reviews"
      onClick={() =>
        Analytics.trackEvent(
          HOMEPAGE.CLICK_CTA,
          homepageClickLinkPayloadMapping({ link: AnalyticsEventKey.reviewsReadAll })
        )
      }
    >
      All Reviews{' '}
      <ArrowRightBold
        css={css`
          margin-top: 3px;
          margin-left: 4px;
        `}
      />
    </Button>
  </BrowseBorder>
);

const ReviewsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 128px;
`;

const TitleContainer = styled.div`
  margin-bottom: 48px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  column-gap: 24px;
  margin: 0 96px 48px;

  @media ${GRID_BREAKPOINTS.TABLET} {
    margin: 0 48px 48px;
  }

  @media ${GRID_BREAKPOINTS.MOBILE} {
    margin: 0 24px 48px;
  }
`;

const CardScrollContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
`;

const RightMargin = styled.div`
  width: 96px;

  @media ${GRID_BREAKPOINTS.TABLET} {
    width: 48px;
  }

  @media ${GRID_BREAKPOINTS.MOBILE} {
    width: 24px;
  }
`;

const HomepageReviews = ({ reviews }: { reviews: ReviewsFeature }) => (
  <ReviewsSection>
    <TitleContainer>
      <Header1>{reviews.title}</Header1>
    </TitleContainer>
    <CardScrollContainer>
      <CardContainer>
        {reviews.reviews.map((review, idx) => (
          <ReviewCard key={review.name} {...review} color={ColorBorderArray[idx % ColorBorderArray.length]} />
        ))}
        <BrowseCard />
        <RightMargin />
      </CardContainer>
    </CardScrollContainer>
  </ReviewsSection>
);

export default HomepageReviews;
