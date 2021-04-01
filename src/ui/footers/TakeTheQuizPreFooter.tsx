/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

import Button from "../buttons/Button";
import Header2 from "../headers/Header2";
import Header3 from "../headers/Header3";
import Paragraph1 from "../paragraphs/Paragraph1";
import { SHADES, BREAKPOINTS } from "../variables";
import ResponsiveImage from "../images/ResponsiveImage";
import { Z_INDICIES } from "../zIndicies";

const Section = styled.section`
  display: flex;
  width: 100%;
  @media ${BREAKPOINTS.MOBILE} {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  width: 56%;
  display: flex;
  justify-content: center;
  @media ${BREAKPOINTS.MOBILE} {
    width: 100%;
  }

  & > div {
    display: flex;
    align-items: center;
    @media ${BREAKPOINTS.DESKTOP} {
      min-width: 694px;
    }
  }
`;

const TextContainer = styled.div`
  width: 44%;
  padding: 48px 24px 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${Z_INDICIES.FURNITURE_PARALYSIS_TEXT};
  background-color: ${({
    backgroundColor = SHADES.WHITE,
  }: {
    backgroundColor?: string;
  }) => backgroundColor};
  @media ${BREAKPOINTS.MOBILE} {
    width: 100%;
  }
  @media ${BREAKPOINTS.DESKTOP} {
    padding: 0 24px;
  }
`;

const TextCenter = styled.div`
  display: flex;
  flex-direction: column;
  @media ${BREAKPOINTS.MOBILE} {
    text-align: center;
    align-items: center;
  }
`;

interface Props {
  isMobileBreakpoint: boolean;
  backgroundColor?: string;
}

const TakeTheQuizPreFooter = ({
  isMobileBreakpoint,
  backgroundColor,
}: Props) => {
  const Header = isMobileBreakpoint ? Header3 : Header2;

  return (
    <Section>
      <ImageContainer>
        <ResponsiveImage
          src="https://img.livefeather.com/pages-new/Homepage/relaxing-in-the-living-room.png"
          width={812}
          height={424}
        />
      </ImageContainer>
      <TextContainer backgroundColor={backgroundColor}>
        <TextCenter>
          <Header>Furniture paralysis?</Header>
          <Paragraph1
            css={css`
              margin: 16px 0 32px;
              ${isMobileBreakpoint ? "max-width: 302px;" : "max-width: 332px;"}
            `}
          >
            Take our quick quiz now to find furniture that fits your space &
            style.
          </Paragraph1>
          <Button to="/style-quiz">Take the Quiz</Button>
        </TextCenter>
      </TextContainer>
    </Section>
  );
};

export default TakeTheQuizPreFooter;
