/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Header2 from '../../ui/headers/Header2';
import ImageWithText from '../../ui/pageElements/ImageWithText';
import Header3 from '../../ui/headers/Header3';
import { COLORS, BREAKPOINTS } from '../../ui/variables';

const LoveFloydContainer = styled.section`
  padding-top: 112px;
  background-color: ${COLORS.CLOUD};
  text-align: center;
  & > div:last-child {
    @media ${BREAKPOINTS.DESKTOP} {
      padding-bottom: 0;
    }
  }
`;

const Header = styled(Header2)`
  padding: 0 24px 80px;
`;

const WhyWeLoveFloyd = ({ isMobileBreakpoint }: { isMobileBreakpoint: boolean }) => (
  <LoveFloydContainer>
    <Header>Why We Love Floyd&nbsp;Furniture</Header>
    <ImageWithText
      isMobileBreakpoint={isMobileBreakpoint}
      paragraphText={<Header3>Beautiful styles that can be easily paired with Feather furniture.</Header3>}
      imageUrl="https://img.livefeather.com/pages-new/Floyd/flody-sofa-in-living-room.png"
      imageSide="right"
    />
    <ImageWithText
      isMobileBreakpoint={isMobileBreakpoint}
      paragraphText={<Header3>Adaptable modular designs that fit any home.</Header3>}
      imageUrl="https://img.livefeather.com/pages-new/Floyd/floyd-bed-in-condo.png"
      imageSide="left"
    />
    <ImageWithText
      isMobileBreakpoint={isMobileBreakpoint}
      paragraphText={<Header3>Quality craftsmanship and durable materials.</Header3>}
      imageUrl="https://img.livefeather.com/pages-new/Floyd/short-floyd-shelf-with-books.png"
      imageSide="right"
    />
  </LoveFloydContainer>
);

export default WhyWeLoveFloyd;
