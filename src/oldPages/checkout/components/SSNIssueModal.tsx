/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { toggleOverlay } from "../../../app/store/overlay/overlay.actions";

import FeatherModal from "../../../ui/modals/FeatherModal";
import { Overlays } from "../../../app/store/overlay/overlay.types";
import { getIsMobileBreakpoint } from "../../../app/store/dimensions/dimensions.selectors";
import {
  getIsFailedSSNOverlayOpen,
  getIsNoSSNOverlayOpen,
} from "../../../app/store/overlay/overlay.selectors";
import Header2 from "../../../ui/headers/Header2";
import Paragraph1 from "../../../ui/paragraphs/Paragraph1";
import Button, { ButtonStyle } from "../../../ui/buttons/Button";
import Header3 from "../../../ui/headers/Header3";
import Paragraph2 from "../../../ui/paragraphs/Paragraph2";
import { DepositOrigin } from "../store/checkout.types";
import {
  getIsSubmittingDeposit,
  getDepositError,
} from "../store/checkout.selectors";
import Caption from "../../../ui/captions/Caption";
import { BRAND } from "../../../ui/variables";
import {
  MembershipState,
  MembershipStateDisplayName,
} from "../../../app/store/plan/plan.types";

const Container = styled.div`
  max-width: 632px;
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 544px;
`;

const ParagraphContainer = styled.div`
  margin: 40px auto 0;
`;

const ButtonsAndErrors = styled.div`
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-bottom: 28px;
`;

const ErrorMessage = styled(Caption)`
  max-width: 512px;
  margin-top: 4px;
  margin-bottom: 20px;
  text-align: center;
`;

interface Props {
  onDepositSubmission: (originator: DepositOrigin) => void;
}

const FailedSSNContent = {
  header: `You don't need a credit report to rent with Feather.`,
  paragraph: `Like many businesses, Feather uses your Social Security Number to evaluate credit history. In the case we can’t find your records, Feather may accept a deposit equivalent to 1x your monthly rental total instead. This deposit will be returned at the end of your contract term after successful on-time monthly payments (12 for ${MembershipStateDisplayName[
    MembershipState.MEMBER
  ].toLowerCase()} and 3 for ${MembershipStateDisplayName[
    MembershipState.NON_MEMBER
  ].toLowerCase()}).`,
};
const NoSSNContent = {
  header: `You don't need a Social Security number to rent with Feather.`,
  paragraph: `Like many businesses, Feather uses your Social Security number to evaluate credit history. If you don’t have one, Feather may accept a deposit equivalent to 1x your monthly rental total instead. This deposit will be returned at the end of your contract term after successful on-time monthly payments (12 for ${MembershipStateDisplayName[
    MembershipState.MEMBER
  ].toLowerCase()} and 3 for ${MembershipStateDisplayName[
    MembershipState.NON_MEMBER
  ].toLowerCase()}).`,
};

const SSNIssueOverlay = ({ onDepositSubmission }: Props) => {
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  const isFailedSSNOpen = useSelector(getIsFailedSSNOverlayOpen);
  const isNoSSNOpen = useSelector(getIsNoSSNOverlayOpen);
  const isSubmittingDeposit = useSelector(getIsSubmittingDeposit);
  const depositError = useSelector(getDepositError);

  const Header = isMobileBreakpoint ? Header3 : Header2;
  const Paragraph = isMobileBreakpoint ? Paragraph2 : Paragraph1;

  const dispatch = useDispatch();

  const closeOverlay = () => {
    isFailedSSNOpen
      ? dispatch(toggleOverlay(Overlays.FailedSSNOverlay, false))
      : dispatch(toggleOverlay(Overlays.NoSSNOverlay, false));
  };

  const handleDepositRequest = () => {
    onDepositSubmission(DepositOrigin.NoSSN);
  };

  return (
    <FeatherModal
      isFullscreen={true}
      isOpen={isFailedSSNOpen || isNoSSNOpen}
      onClose={closeOverlay}
    >
      <Container>
        <HeaderContainer>
          <Header>
            {isFailedSSNOpen ? FailedSSNContent.header : NoSSNContent.header}
          </Header>
        </HeaderContainer>

        <ParagraphContainer>
          <Paragraph>
            {isFailedSSNOpen
              ? FailedSSNContent.paragraph
              : NoSSNContent.paragraph}
          </Paragraph>
        </ParagraphContainer>

        <ParagraphContainer>
          <Paragraph>
            Submit a deposit request. We'll review your order and follow up in
            24 hours.
          </Paragraph>
        </ParagraphContainer>

        <ButtonsAndErrors>
          <SubmitButton
            onClick={handleDepositRequest}
            isDisabled={isSubmittingDeposit}
          >
            {isSubmittingDeposit ? "Sending..." : "Submit Order for Review"}
          </SubmitButton>

          {depositError && (
            <ErrorMessage color={BRAND.ERROR}>
              Uh oh! Something unexpected happened. Please try again.
            </ErrorMessage>
          )}

          <Button style={ButtonStyle.TEXT} onClick={closeOverlay}>
            No thanks, I'll try again later
          </Button>
        </ButtonsAndErrors>
      </Container>
    </FeatherModal>
  );
};

export default SSNIssueOverlay;
