/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import ResponsiveImage from '../../ui/images/ResponsiveImage';
import { HowItWorksStep } from '../../contentful/contentful.types';
import Paragraph1 from '../../ui/paragraphs/Paragraph1';
import Header3 from '../../ui/headers/Header3';
import Header4 from '../../ui/headers/Header4';
import { BRAND } from '../../ui/variables';

interface Props {
  isMobileBreakpoint: boolean;
  steps: HowItWorksStep[];
}

const MobileOverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DesktopOverviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto 60px 112px;
`;

const MobileResponsiveImageContainer = styled.div`
  margin: 24px 24px 64px;
`;

const MobileStepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 32px;
`;

const MobileStepsHeader = styled(Header4)`
  margin-bottom: 12px;
`;

const StepsImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 24px 40px;
  text-align: center;

  @media (max-width: 1200px) {
    min-width: 33%;
    max-width: 120px;
  }
`;

const StepHeader = styled(Header3)`
  margin-top: 32px;
`;

const renderStep = (step: HowItWorksStep, isMobileBreakpoint: boolean) =>
  isMobileBreakpoint ? (
    <MobileStepsContainer key={step.step}>
      <MobileStepsHeader color={BRAND.PRIMARY}>{step.step}</MobileStepsHeader>
      <Paragraph1>{step.headerText}</Paragraph1>
    </MobileStepsContainer>
  ) : (
    <StepsImageContainer data-cy="how-it-works-steps" key={step.order}>
      <ResponsiveImage
        src={step.headerImageUrl}
        height={215}
        width={250}
        queryParams={{ sat: step.detailImageSaturation, sharp: step.detailImageSharpness }}
      />
      <StepHeader>{`${step.order}. ${step.headerText}`}</StepHeader>
    </StepsImageContainer>
  );

const Overview = ({ isMobileBreakpoint, steps }: Props) =>
  isMobileBreakpoint ? (
    <MobileOverviewContainer>
      <MobileResponsiveImageContainer>
        <ResponsiveImage
          src={'https://img.livefeather.com/pages-new/How_it_works/fullroom.png'}
          height={248}
          width={327}
          queryParams={{
            sat: 25
          }}
        />
      </MobileResponsiveImageContainer>
      {steps.map((step) => renderStep(step, isMobileBreakpoint))}
    </MobileOverviewContainer>
  ) : (
    <DesktopOverviewContainer>{steps.map((step) => renderStep(step, isMobileBreakpoint))}</DesktopOverviewContainer>
  );

export default Overview;
