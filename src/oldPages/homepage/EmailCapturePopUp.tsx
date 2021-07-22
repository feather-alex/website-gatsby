/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { NewsletterInputOrigin } from "../../app/store/newsletter-signup/newsletter.signup.types";
import EmailInput from "../../components/EmailInput";
import CloseSignIcon from "../../ui/icons/CloseSignIcon";
import Paragraph1 from "../../ui/paragraphs/Paragraph1";
import { SHADES } from "../../ui/variables";
import { Z_INDICIES } from "../../ui/zIndicies";

const INITIAL_MESSAGE =
  "Your inbox is sacred. We'll only send high‑quality content.";
const SUCCESS_MESSAGE =
  "Thanks for signing up to get Feather emails! We'll keep you in the know about essential furniture updates.";

export interface Props {
  dismissEmailCapture: () => void;
  displayNewsletterSignupSuccess: boolean;
}

const EmailCapturePopUp = ({
  displayNewsletterSignupSuccess,
  dismissEmailCapture,
}: Props) => (
  <section
    css={css`
      position: absolute;
      height: 152px;
      width: 384px;
      padding: 24px 28px 40px;
      margin-top: -112px;
      margin-left: 32px;
      background-color: ${SHADES.WHITE};
      z-index: ${Z_INDICIES.EMAIL_CAPTURE};
    `}
  >
    <div
      css={css`
        max-width: 264px;
        margin-bottom: 8px;
      `}
    >
      <Paragraph1>
        {displayNewsletterSignupSuccess ? SUCCESS_MESSAGE : INITIAL_MESSAGE}
      </Paragraph1>
    </div>
    <div
      css={css`
        position: absolute;
        top: 28px;
        right: 28px;
        cursor: pointer;
      `}
    >
      <CloseSignIcon onClick={dismissEmailCapture} />
    </div>
    {!displayNewsletterSignupSuccess && (
      <EmailInput isFullWidth={true} origin={NewsletterInputOrigin.HOMEPAGE} />
    )}
  </section>
);

export default EmailCapturePopUp;
