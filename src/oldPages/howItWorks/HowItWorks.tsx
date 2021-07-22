/** @jsx jsx */
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";

import {
  getMeta,
  getFAQs,
  getSteps,
  getError,
  getIsFetching,
  getHeader,
} from "./store/howItWorks.selectors";
import { getIsMobileBreakpoint } from "../../app/store/dimensions/dimensions.selectors";
import HorizontalImageWithText from "../../ui/pageElements/HorizontalImageWithText";
import VerticalImageWithText from "../../ui/pageElements/VerticalImageWithText";
import TakeTheQuizPreFooter from "../../ui/footers/TakeTheQuizPreFooter";
import PlanSelection from "../../components/selectPlan/PlanSelection";
import { getHowItWorksContent } from "./store/howItWorks.actions";
import FAQSPreFooter from "../../ui/footers/FAQSPreFooter";
import HeaderContainer from "../../ui/headers/HeaderContainer";
import { CONTENTFUL_IDS } from "../../contentful/contentful.types";
import { HowItWorksStep } from "../../contentful/contentful.types";
import { BREAKPOINTS } from "../../ui/variables";
import Analytics from "../../analytics/analytics";
import Header1 from "../../ui/headers/Header1";
import Helmet from "../../components/Helmet";
import Overview from "./HowItWorksOverview";
import useMount from "../../utils/useMount";
import PAGES from "../../analytics/pages";
import Layout from "../../app/Layout";
import FullscreenErrorPage from "../../ui/miscellaneous/FullscreenErrorPage";
import Loading from "../../components/Loading";

const Plans = styled(PlanSelection)`
  padding: 5vh 5vw;
  @media ${BREAKPOINTS.MOBILE} {
    padding-top: 0;
  }
`;

const renderImageWithText = (
  step: HowItWorksStep,
  isMobileBreakpoint: boolean
) => {
  const ImageWithText =
    step.order % 2 === 0 ? VerticalImageWithText : HorizontalImageWithText;
  return (
    <ImageWithText
      isMobileBreakpoint={isMobileBreakpoint}
      imageUrl={step.detailImageUrl}
      headerText={`${step.order}. ${step.headerText}`}
      paragraphText={step.detailText}
      queryParams={{
        sat: step.detailImageSaturation,
        sharp: step.detailImageSharpness,
      }}
    />
  );
};

const HowItWorks = () => {
  const dispatch = useDispatch();

  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  const isFetching = useSelector(getIsFetching);
  const howItWorksFAQs = useSelector(getFAQs);
  const header = useSelector(getHeader);
  const error = useSelector(getError);
  const steps = useSelector(getSteps);
  const meta = useSelector(getMeta);

  useMount(() => {
    Analytics.trackPage(PAGES.HOW_IT_WORKS);
    dispatch(getHowItWorksContent.request({ id: CONTENTFUL_IDS.HOW_IT_WORKS }));
  });

  const MetaInfo = (
    <Helmet
      title={meta.title}
      description={meta.description}
      imageUrl={meta.imageUrl}
    />
  );

  if (error) {
    return <FullscreenErrorPage meta={meta} error={error} />;
  }

  if (isFetching) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      {MetaInfo}
      <HeaderContainer>
        <Header1>{header}</Header1>
      </HeaderContainer>
      <Overview steps={steps} isMobileBreakpoint={isMobileBreakpoint} />
      {steps.length > 0 && renderImageWithText(steps[0], isMobileBreakpoint)}
      <Plans
        dataCy="how-it-works-plan-selection"
        isInline={true}
        isMobileBreakpoint={isMobileBreakpoint}
      />
      {steps.length > 0 &&
        steps
          .slice(1)
          .map((step) => renderImageWithText(step, isMobileBreakpoint))}
      <FAQSPreFooter faqs={howItWorksFAQs} />
      <TakeTheQuizPreFooter isMobileBreakpoint={isMobileBreakpoint} />
    </Layout>
  );
};

export default HowItWorks;
